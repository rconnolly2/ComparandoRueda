export class DatosVehiculo {
    constructor(vehiculo) {
        if (!vehiculo instanceof Vehiculo) {
            throw new Error("Vehículo no válido.");
        }

        this.vehiculo = vehiculo;
        this.ActualizarTituloDetalles();
        this.ActualizarDetallesVehiculo();
    }

    ActualizarTituloDetalles() {
        const titulo = document.getElementById("titulo-detalles");
        titulo.innerHTML = `Tu ${this.vehiculo.GetMarca()} ${this.vehiculo.GetModelo()}`
    }

    ActualizarDetallesVehiculo() {
        const informacion_vehiculo = document.querySelector(".informacion-vehiculo");
        if (informacion_vehiculo) {
            informacion_vehiculo.innerHTML = `
                <ul>
                    <li id="descripcion-vehiculo">
                      <i class="fa fa-car"></i> Descripción: ${this.vehiculo.GetDescripcion()}
                    </li>
                    <li id="puertas">
                      <i class="fa fa-door-open"></i> Puertas: ${this.vehiculo.GetPuertas()}
                    </li>
                    <li id="potencia-dinamica">
                      <i class="fa fa-bolt"></i> Potencia Dinámica: ${this.vehiculo.GetPotencia()}
                    </li>
                    <li id="tamaño-motor">
                      <i class="fa fa-cogs"></i> Tamaño del Motor: ${this.vehiculo.GetTamanioMotor()}
                    </li>
                    <li id="combustible">
                      <i class="fa fa-gas-pump"></i> Combustible: ${this.vehiculo.GetCombustible()}
                    </li>
                </ul>
                
                <ul>
                    <li id="marca">
                      <i class="fa fa-registered"></i> Marca: ${this.vehiculo.GetMarca()}
                    </li>
                    <li id="modelo">
                      <i class="fa fa-info-circle"></i> Modelo: ${this.vehiculo.GetModelo()}
                    </li>
                    <li id="fecha-matriculacion">
                      <i class="fa fa-calendar"></i> Fecha de Matriculación: ${this.vehiculo.GetFechaRegistro()}
                    </li>
                    <li id="año-matriculacion">
                      <i class="fa fa-calendar-alt"></i> Año de Matriculación: ${this.vehiculo.GetAnioRegistro()}
                    </li>
                    <li id="tipo-variacion">
                      <i class="fa fa-car-battery"></i> Tipo de Variación: ${this.vehiculo.GetVariante()}
                    </li>
                </ul>
            `;
        }
    }
}