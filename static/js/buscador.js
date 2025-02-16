async function BuscarMatricula() {
    let matricula = document.getElementById("matricula").value.trim().toUpperCase();
    if (!matricula) {
        alert("Por favor, ingrese una matrícula.");
        return;
    }

    let datos_guardados = ObtenerDeLocalStorage();
    if (datos_guardados) {
        MostrarDatos(datos_guardados);
        return;
    }

    let url = `https://www.matriculaapi.com/API/reg.asmx/CheckSpain?RegistrationNumber=${matricula}&username=rob34`;

    try {
        let response = await fetch(url);
        let text = await response.text();

        let parser = new DOMParser();
        let xml_doc = parser.parseFromString(text, "text/xml");

        // Saco vehicleJson del XML:
        let vehicle_json_text = xml_doc.getElementsByTagName("vehicleJson")[0]?.textContent;

        if (!vehicle_json_text) {
            alert("No se encontraron datos para esta matrícula.");
            return;
        }

        let vehicle_json = JSON.parse(vehicle_json_text);

        // Guardo el json el localStorage
        GuardarEnLocalStorage("matricula", vehicle_json);
        MostrarDatos(vehicle_json);

    } catch (error) {
        alert("Error al buscar la matrícula. Inténtalo de nuevo.");
        console.error(error);
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

function ObtenerDeLocalStorage() {
    let datos = localStorage.getItem("matricula");
    return datos ? JSON.parse(datos) : null;
}

function CerrarPopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}
