const app = document.querySelector('#app')
const temp = document.querySelector('.main-temp')
const description = document.querySelector('.description')
const city = document.querySelector('.place')
const wind = document.querySelector('.wind .info')
const humidity = document.querySelector('.humidity .info')
const footer = document.querySelector('footer')

const api = {
    key: '5499337e5165c2d553efb6f9d6d1eee1',
    url: 'https://api.openweathermap.org/data/2.5/',
    lang: 'pt_br',
    unit: 'metric'
}

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError)
    } else {
        alert('Este navegador não suporta geolocalização')
    }

    function setPosition(position) {
        let lat = position.coords.latitude
        let long = position.coords.longitude
        coordResults(lat, long)
        appearFooter()
    }

    function showError() {
        alert('Para obter informações climáticas da sua região, por favor ative a geolocalização do seu navegador.')
    }

    function appearFooter() {
        footer.style.display = 'block'
        app.style.padding = '14.4rem 0 0'
    }
})

async function coordResults(lat, long) {
    try {
        const request = await fetch(`${api.url}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.unit}&APPID=${api.key}`)
        const response = await request.json()

        displayResults(response)
    } catch (error) {
        console.log(error)
    }
}

function displayResults(weather) {
    const weatherDescription = weather.weather[0].description

    temp.innerHTML = `
    ${Math.round(weather.main.temp)}<sup>°C</sup>
    `
    wind.innerHTML = `
    ${Math.round(weather.wind.speed * 3.6)} <span>km/h</span>
    `
    humidity.innerHTML = `
    ${weather.main.humidity} <span>%</span>
    `
    description.innerHTML = `
    ${weatherDescription[0].toUpperCase() + weatherDescription.substr(1)}
    `
    city.innerHTML = `${weather.name}`
}


