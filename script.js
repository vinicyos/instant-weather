// elementos interativos
const barraDePesquisa = document.getElementById('barra-de-pesquisa-input');
const botaoDePesquisa = document.getElementById('barra-de-pesquisa-botao');

// elementos de exibição
const dataAtual = document.getElementById('data-atual');
const cidadeNome = document.getElementById('cidade-nome');
const iconeTempo = document.getElementById('icone-tempo');
const condiçaoTempo = document.getElementById('condiçao-tempo');
const temperaturaValor = document.getElementById('temperatura-valor');
const velocidadeVento = document.getElementById('velocidade-vento');
const sensaçaoTermica = document.getElementById('sensaçao-termica');
const umidadeValor = document.getElementById('umidade-valor');
const nascerSol = document.getElementById('nascer-sol-time');
const porSol = document.getElementById('por-sol-time');

const api_key="4a64020f0f17775e76175f434e730236";

botaoDePesquisa.addEventListener("click", () => {
    
    let nomeCidade = barraDePesquisa.value
    pegarTemperaturaCidade(nomeCidade)
})
// tentativa de fazer pesquisar no enter

document.addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
       const btn = document.querySelector("#barra-de-pesquisa-botao");

       btn.click()
    }

})



// ----------------------


// https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&units=metric&lang=pt_br&appid=${api_key}


navigator.geolocation.getCurrentPosition(
    (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        getCurrentLocation(lat, lon)
    },
    (err) => {
        if (err.code === 1) { 
        alert("localização negada pelo usuário, busque manualmente sua localização.")
        } else {
        console.log(err)
        }   
    }    
)

function getCurrentLocation(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => displayTempo(data))
}

       
function pegarTemperaturaCidade(nomeCidade) {
    iconeTempo.src = ` assets/loading-icon.svg`

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => displayTempo(data))
}

function displayTempo(data) {
    let { 
        dt,
        name,
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
    }= data

    dataAtual.textContent = formatDate(dt);
    cidadeNome.textContent = name;
    iconeTempo.src = ` assets/${icon}.svg`
    condiçaoTempo.textContent = description;
    temperaturaValor.textContent = `${Math.round(temp)}°C`;
    velocidadeVento.textContent = `${Math.round(speed * 3.6)}km`;
    sensaçaoTermica.textContent = `${Math.round(feels_like)}°C`;
    umidadeValor.textContent = `${humidity}%`;
    nascerSol.textContent = formatTime(sunrise);
    porSol.textContent = formatTime(sunset);
}

function formatDate(epochTime) {
    let date = new Date(epochTime * 1000)
    let formattedDate = date.toLocaleDateString('pt-br', {month: "long", day: 'numeric'})
    return `Hoje, ${formattedDate}`
}

function formatTime(epochTime) {
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes}`
}











