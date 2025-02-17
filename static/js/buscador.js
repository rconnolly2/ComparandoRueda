async function BuscarMatricula() {
    let matricula = document.getElementById("matricula").value.trim().toUpperCase();
    if (!matricula) {
        alert("Por favor, ingrese una matrícula.");
        return;
    }

    let url = `https://www.matriculaapi.com/API/reg.asmx/CheckSpain?RegistrationNumber=${matricula}&username=rob888`;

    try {
        let response = await fetch(url);
        let text = await response.text();

        if (response.status >= 500) { // Si la respuesta tiene un código mayor o igual a 500 sera que me he quedado sin créditos :(
            alert("El creador de la API es un pesetero y solo me ha dado 10 llamadas, cambia el usuario con una de la lista de usuarios llamada api_pesetera.txt");
            return;
        }

        let parser = new DOMParser();
        let xml_doc = parser.parseFromString(text, "text/xml");

        // Saco vehicleJson del XML:
        let vehicle_json_text = xml_doc.getElementsByTagName("vehicleJson")[0]?.textContent;

        if (!vehicle_json_text) {
            alert("No he encontrado datos para esta matrícula.");
            return;
        }

        let vehicle_json = JSON.parse(vehicle_json_text);

        // Guardo el json en el localStorage
        GuardarEnLocalStorage("matricula", vehicle_json);
        MostrarDatos(vehicle_json);

    } catch (error) {
        console.error(`Error al buscar la matricula: ${error}`);
    }
}

function MostrarDatos(vehicle_json) {
    document.getElementById("marca").textContent = `Marca: ${ObtenerDato(vehicle_json.CarMake?.CurrentTextValue)}`;
    document.getElementById("modelo").textContent = `Modelo: ${ObtenerDato(vehicle_json.CarModel?.CurrentTextValue)}`;
    document.getElementById("anio").textContent = `Año de Registro: ${ObtenerDato(vehicle_json.RegistrationYear)}`;
    document.getElementById("variante").textContent = `Variante: ${ObtenerDato(vehicle_json.VariantType)}`;
    document.getElementById("combustible").textContent = `Combustible: ${ObtenerDato(vehicle_json.Fuel)}`;

    let imagen = document.getElementById("imagen");
    imagen.src = (vehicle_json.ImageUrl !==null ) ? vehicle_json.ImageUrl : '';
    imagen.alt = "Imagen del vehículo";

    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function ObtenerDato(dato) {
    return dato && dato.trim() ? dato : "No encontrado";
}

function GuardarEnLocalStorage(matricula, datos) {
    localStorage.setItem(matricula, JSON.stringify(datos));
}

function CerrarPopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}
