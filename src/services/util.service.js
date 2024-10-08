export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    getRandomTimestamp,
    getDateDetails,
    debounce,
    loadFromStorage,
    saveToStorage,
    getRandomEmailUsername
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}



function getRandomTimestamp() {
    const currentDate = new Date()

    const fiveYearsAgo = new Date()
    fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5)

    const randomTimestamp = Math.floor(
        Math.random() * (currentDate.getTime() - fiveYearsAgo.getTime()) + fiveYearsAgo.getTime()
    )

    return randomTimestamp
}


function getDateDetails(timestamp) {

    const date = new Date(timestamp)


    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]


    const day = date.getDate()


    const monthName = monthNames[date.getMonth()]


    const year = date.getFullYear()

    return {
        day: day,
        monthName: monthName,
        year: year
    };
}


function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function debounce(func, wait = 100) {
    let timeout

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

function getRandomEmailUsername() {
    const usernames = [
        'johnDoe',
        'janeSmith',
        'user123',
        'coolUser',
        'techGuru',
        'admin',
        'testUser',
        'sampleUser',
        'randomGuy',
        'awesomeDude',
        'usernameX',
        'happyCamper',
        'userXYZ',
        'theRealUser',
        'nameWithNumbers123'
    ];

    if (usernames.length === 0) {
        return null; // Return null if the array is empty
    }
    const randomIndex = Math.floor(Math.random() * usernames.length);
    return `@${usernames[randomIndex]}`; // Prepend '@' to the random username
}


