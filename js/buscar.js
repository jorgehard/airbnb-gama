
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
    var locationEnd = JSON.parse(sessionStorage.getItem('locationEnd'));
    document.getElementById("idLocalizacao").value = locationEnd;

    var idCheckin = JSON.parse(sessionStorage.getItem('idCheckin'));
    document.getElementById("idCheckin").value = idCheckin;

    var idCheckout = JSON.parse(sessionStorage.getItem('idCheckout'));
    document.getElementById("idCheckout").value = idCheckout;

    document.getElementById("dateBox").classList.add("invisible");
    //Calculando data de hospedagem
    if (locationEnd !== '') {
        document.getElementById("locationTop").innerHTML = locationEnd;
        let dias_calculo = 1;

        data = data.filter((locationx) => {
            return locationx.keyword === locationEnd;
        });

        const total_result = Object.keys(data).length;
        document.getElementById("totalJs").innerHTML = total_result;

        if (idCheckin !== '' && idCheckout !== '') {
            document.getElementById("dateBox").classList.remove("invisible");
            document.getElementById("checkinDate").innerHTML = formatData(idCheckin);
            document.getElementById("checkoutDate").innerHTML = formatData(idCheckout);

            const now = new Date(idCheckout);
            const past = new Date(idCheckin);
            const diff = Math.abs(now.getTime() - past.getTime());
            var calcularDatas = true;
            dias_calculo = Math.ceil(diff / (1000 * 60 * 60 * 24));
        } else {
            var calcularDatas = false;
        }
        for (var i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
            try {
                const root = document.getElementById("apiBox");

                let div = document.createElement("div");
                div.setAttribute("class", "col-4 cursor-div");
                div.addEventListener("click", pageDados);

                let boxImg = document.createElement("div");
                boxImg.setAttribute("class", "boxImg");

                let image = document.createElement("img");
                image.setAttribute("class", "imgBuscar");
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

                if (calcularDatas === true) {

                    var price_totalNum = data[i].price * dias_calculo;

                    var priceBox = document.createElement("p");
                    priceBox.setAttribute("class", "priceTotal");
                    priceBox.innerHTML = `Total de <b>R$ ${price_totalNum},00</b>`;
                    boxTitle.appendChild(priceBox);


                }
            } catch (e) {
                continue;
            }
        }
        if (numPages(total_result) <= page || total_result < records_per_page) {
            let button = document.getElementById('showMore');
            button.setAttribute("style", "display:none")
        }
    } else {

        locationEnd = 'Nada encontrado';
        document.getElementById("locationTop").innerHTML = locationEnd;
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


//Mostrar locations
function mostrarLocation(data) {
    var locationEnd = JSON.parse(sessionStorage.getItem('locationEnd'));
    if (locationEnd !== '') {
        document.getElementById("locationTop").innerHTML = locationEnd;
        let dias_calculo = 1;
        var location_complete = '';
        data = data.filter((locationx) => {
            return locationx.keyword === locationEnd;
        });
        data.forEach((response) => {
            location_complete += '{ name: "' + response.location + '", iconEtapa: "1" },';
        });
    }
    return console.log(location_complete);
}

//Melhor forma seria usando JQuery / Ajax porém o objetivo era usar JS vanilla entao utilizei dessa forma

function pageDados(varx) {
    alert('Fazer pagina para receber os itens');
}
function handleForm(event) {
    event.preventDefault();

    var idCheckin = JSON.stringify(document.getElementById('idCheckin').value);
    var idCheckout = JSON.stringify(document.getElementById('idCheckout').value);
    var locationEnd = JSON.stringify(document.getElementById('idLocalizacao').value);

    sessionStorage.setItem('idCheckin', idCheckin);
    sessionStorage.setItem('idCheckout', idCheckout);
    sessionStorage.setItem('locationEnd', locationEnd);

    window.location.href = 'buscar.html';
}

var form = document.getElementById("myForm");
form.addEventListener('submit', handleForm);


function formatData(dateStr) {
    var arr = dateStr.split("-");
    return arr[2] + '/' + arr[1] + '/' + arr[0];
}
function formatDataBr(varDate) {
    var data = new Date(varDate),
        dia = data.getDate() + 1,
        dia = dia.toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
}

