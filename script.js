document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault()

  let input = document.querySelector('#searchInput').value

  if (input !== '') {
    clearInfo()
    showWarning('Carregando...')

    let keyAPI = '8224fed4c59d812dc0d5a9bc715e5aa5'


    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${keyAPI}&units=metric&lang=pt_br`

    let result = await fetch(url)
    let json = await result.json()

    console.log('O que tem no json --->', json)

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      })
    } else {
      clearInfo()
      showWarning('Oops! Localização não encontrada :(')
    }

  } else {
    clearInfo()
    showWarning('Preencha o campo')
  }
})

function showInfo(json) {
  showWarning('')

  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h</span>`

  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

  document.querySelector('.resultado').style.display = 'block'
}

function clearInfo() {
  showWarning('')
  document.querySelector('.resultado').style.display = 'none'
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg
}