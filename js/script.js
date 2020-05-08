const api_url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";

async function buscarApi(val1) {
    const data = await fetch(val1);
    return data.json();
}

//Mostrando API
function mostrarDados(data) {
    data.map(elemento => {
        const root = document.getElementById("root");
        const { photo, name, property_type, price } = elemento;

        div = document.createElement("div");

    });
}

buscarApi(api_url)
    .then((mostrarDados))