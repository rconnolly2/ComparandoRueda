class Vehiculo {
    constructor(datos) {
        this.marca = datos.CarMake.CurrentTextValue ? datos.CarMake.CurrentTextValue : "No encontrado";
        this.modelo = datos.CarModel.CurrentTextValue ? datos.CarModel.CurrentTextValue : "No encontrado";
        this.anio_registro = datos.RegistrationYear ? datos.RegistrationYear : "No encontrado";
        this.variante = datos.VariantType ? datos.VariantType : "No encontrado";
        this.combustible = datos.Fuel ? datos.Fuel : "No encontrado";
        this.imagen_url = datos.ImageUrl ? datos.ImageUrl : "";
        this.descripcion = datos.Description ? datos.Description : "No encontrado";
        this.potencia = datos.DynamicPower ? datos.DynamicPower : "No encontrado";
        this.precio_indicativo = datos.IndicativePrice ? datos.IndicativePrice : "No encontrado";
        this.fecha_registro = datos.RegistrationDate ? datos.RegistrationDate : "No encontrado";
        this.tipo_vehiculo = datos.VehicleType ? datos.VehicleType : "No encontrado";
        this.puertas = datos.Doors ? datos.Doors : "No disponible";
        this.tamanio_motor = datos.EngineSize ? datos.EngineSize : "No disponible";
        this.vehiculo_robado = datos.Stolen !== null ? "Vehículo robado" : "No robado";
        this.variacion = datos.Variation ? datos.Variation : "No disponible";
    }

    GetMarca() {
        return this.marca;
    }

    GetModelo() {
        return this.modelo;
    }

    GetAnioRegistro() {
        return this.anio_registro;
    }

    GetVariante() {
        return this.variante;
    }

    GetCombustible() {
        return this.combustible;
    }

    GetImagenUrl() {
        return this.imagen_url;
    }

    GetDescripcion() {
        return this.descripcion;
    }

    GetPotencia() {
        return this.potencia;
    }

    GetPrecioIndicativo() {
        return this.precio_indicativo;
    }

    GetFechaRegistro() {
        return this.fecha_registro;
    }

    GetTipoVehiculo() {
        return this.tipo_vehiculo;
    }

    GetPuertas() {
        return this.puertas;
    }

    GetTamanioMotor() {
        return this.tamanio_motor;
    }

    GetVehiculoRobado() {
        return this.vehiculo_robado;
    }

    GetVariacion() {
        return this.variacion;
    }
}

class LocalStorageParser {
    constructor(matricula) {
        this.matricula_regex = /[0-9]{4}[A-Z]{3}/;

        this.matricula = matricula;
        this.vehiculo = this.CrearVehiculo();

        if (!this.vehiculo) {
            window.location.href = "/src/index.html";
        }
    }

    CrearVehiculo() {
        const datos = localStorage.getItem(this.matricula);
        return datos ? new Vehiculo(JSON.parse(datos)) : null;
    }

    GetVehiculo() {
        return this.vehiculo;
    }
}

const parser = new LocalStorageParser("matricula");
const vehiculo = parser.GetVehiculo();
