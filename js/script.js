// const api_url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";


import { apiTest } from "js/apitest.js"
apiTest.map(item => console.log(item + 1))

// // 
// 
// // 
// 
// // 

//Buscar API
async function buscarApi(val1) {
    const data = await fetch(val1);
    return data.json();
}

//Mostrando API
function mostrarDados(data) {
    const total_result = Object.keys(data).length;
    document.getElementById("totalJs").innerHTML = total_result;
    data.map(elemento => {
        const root = document.getElementById("apiBox");
        const { photo, name, property_type, price } = elemento;

        let div = document.createElement("div");
        div.setAttribute("class", "col-4");
        div.addEventListener("click", pageDados);

        let boxImg = document.createElement("div");
        boxImg.setAttribute("class", "boxImg");

        let image = document.createElement("img");
        image.setAttribute("src", photo);

        let boxTitle = document.createElement("div");
        boxTitle.setAttribute("class", "boxTitle");

        let propertyType = document.createElement("p");
        propertyType.setAttribute("class", "propertyType");
        propertyType.innerHTML = property_type;

        let nameType = document.createElement("p");
        nameType.setAttribute("class", "nameType");
        nameType.innerHTML = name;

        let priceType = document.createElement("p");
        priceType.setAttribute("class", "price");
        priceType.innerHTML = `<b>R$ ${price},00</b> / diária`;

        root.appendChild(div);
        div.appendChild(boxImg);
        boxImg.appendChild(image);
        boxImg.appendChild(boxTitle);
        boxTitle.appendChild(propertyType);
        boxTitle.appendChild(nameType);
        boxTitle.appendChild(priceType);
    });
}
function pageDados(data) {
    console.log("ok");
}

// Chamando API Inicial
buscarApi(api_url)
    .then((mostrarDados))