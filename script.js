//Dolar
fetch('https://economia.awesomeapi.com.br/last/USD-BRL').then(resposta => {
    return resposta.json()
}).then(economia => {
    console.log(economia)
    document.getElementById('valorDolar').innerHTML ="Valor R$" + economia.USDBRL.bid
    document.getElementById('maiorDolar').innerHTML = "Maior Valor R$" + economia.USDBRL.high
    document.getElementById('menorDolar').innerHTML = "Menor Valor R$" + economia.USDBRL.low
})
setTimeout(function(){ location.reload(); }, 10000);

// CEP
//Preencher os input

let preencherFormulario = (endereco) =>{
    document.getElementById('rua').value = endereco.logradouro
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.estado
}

//Autopreenchimento
let cepValido = (cep) => {
    if(cep.lenght == 8){
        return true;
    } else { 
        return false;
    }
}

// Buscar API - Consumir API
let pesquisarCEP = async () => {
    let cep = document.getElementById('cep').value
    let url = `https://viacep.com.br/ws/${cep}/json/`

    if(cepValido(cep)){
        let dados = await fetch(url)
        let endereco = await dados.json()
            preencherFormulario(endereco)
    }
}
document.getElementById("cep").addEventListener("focusout", pesquisarCEP)
// Clima
async function getWeather() {
    //Criar variável do valor inserido pelo usuário
    let cidade = document.getElementById('city').value

    //Conectar com a API - Clima
    let resposta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=64ed82577ced7f69cb1687f0ce536131`)
    
    console.log(resposta)

    //Variavel para consumir o JSON da temperatura
    let tempCelsius = resposta.data.main.temp

    console.log(tempCelsius)

    //Imprimir no FRONT END e concatenar com JQUERY
    document.getElementById('tempMundial').innerHTML = `A temperatura atual da cidade ${cidade} é de: ${tempCelsius.toFixed(0)} °C`

}

//Chamar a função
getWeather()

