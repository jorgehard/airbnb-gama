
// const api_url = "api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
const api_url = "https://cors-anywhere.herokuapp.com/http://fenix.atlasware.com.br/api_v2.json";

const records_per_page = 6;
window.page = 1;

let button = document.getElementById('showMore');
button.addEventListener("click", function () { carregarMais(page) }, true);

//Buscar API
async function buscarApi(val1) {
    const data = await fetch(val1);
    return data.json();
}

//Mostrar Dados iniciais
function mostrarDados(data) {
    const total_result = Object.keys(data).length;
    document.getElementById("totalJs").innerHTML = total_result;

    console.log(page);
    for (var i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
        const root = document.getElementById("apiBox");

        let div = document.createElement("div");
        div.setAttribute("class", "col-4");
        // div.addEventListener("click", pageDados);

        let boxImg = document.createElement("div");
        boxImg.setAttribute("class", "boxImg");

        let image = document.createElement("img");
        image.setAttribute("src", data[i].photo);

        let boxTitle = document.createElement("div");
        boxTitle.setAttribute("class", "boxTitle");

        let propertyType = document.createElement("p");
        propertyType.setAttribute("class", "propertyType");
        propertyType.innerHTML = data[i].property_type;

        let nameType = document.createElement("p");
        nameType.setAttribute("class", "nameType");
        nameType.innerHTML = data[i].name;

        let priceType = document.createElement("p");
        priceType.setAttribute("class", "price");
        priceType.innerHTML = `<b>R$ ${data[i].price},00</b> / diária`;

        root.appendChild(div);
        div.appendChild(boxImg);
        boxImg.appendChild(image);
        boxImg.appendChild(boxTitle);
        boxTitle.appendChild(propertyType);
        boxTitle.appendChild(nameType);
        boxTitle.appendChild(priceType);

    }
    if (numPages(total_result) <= page) {
        let button = document.getElementById('showMore');
        button.setAttribute("style", "display:none")
    }
}

function carregarMais(pagex) {
    page = pagex + 1;
    buscarApi(api_url)
        .then(mostrarDados);
}

function numPages(total_result) {
    return Math.ceil(total_result / records_per_page);
}

// Chamando API Inicial
buscarApi(api_url)
    .then(mostrarDados);

//Melhor forma seria usando JQuery / Ajax porém o objetivo era usar JS vanilla entao utilizei dessa forma

var form = document.getElementById("myForm");
form.addEventListener('submit', handleForm);

function handleForm(event) {
    event.preventDefault();

    var idCheckin = JSON.stringify(document.getElementById('idCheckin').value);
    var idCheckout = JSON.stringify(document.getElementById('idCheckout').value);
    var location = JSON.stringify(document.getElementById('idLocalizacao').value);

    sessionStorage.setItem('idCheckin', idCheckin);
    sessionStorage.setItem('idCheckout', idCheckout);
    sessionStorage.setItem('location', location);

    window.location.href = 'buscar.html';
}
