export class DatosDGT {
    constructor(vehiculo) {
        if (!vehiculo) {
            throw new Error("Vehículo no válido.");
        }

        this.vehiculo = vehiculo;
        this.ActualizarTituloDetalles();
        this.ActualizarDetallesDGT();
        this.ActualizarEstadoVehiculo();
    }

    ActualizarTituloDetalles() {
        const titulo = document.getElementById("titulo-detalles");
        if (titulo) {
            titulo.innerHTML = `Datos de Matriculación: ${this.vehiculo.GetDescripcion()}`;
        }
    }

    ActualizarDetallesDGT() {
        const informacion_vehiculo = document.querySelector(".informacion-vehiculo");
        if (informacion_vehiculo) {
            informacion_vehiculo.innerHTML = `
                <ul>
                    <li id="año-matriculacion">
                        <i class="fa fa-calendar-alt"></i> Año de Matriculación: ${this.vehiculo.GetAnioRegistro()}
                    </li>
                </ul>

                <ul>
                    <li id="fecha-matriculacion">
                        <i class="fa fa-calendar"></i> Fecha de Matriculación: ${this.vehiculo.GetFechaRegistro()}
                    </li>
                </ul>
            `;
        }
    }

    ActualizarEstadoVehiculo() {
        const estado_coche = document.getElementById("estado_coche");
        if (!estado_coche) {
            throw new Error("El elemento con clase estado_coche no existe...");
        }

        const estado = this.vehiculo.GetVehiculoRobado();

        if (estado === "No robado") {
            estado_coche.className = "estado-coche no-robado";
            estado_coche.innerHTML = `
                <i class="fa fa-car"></i>
                <h1>¡Enhorabuena, no te han robado el coche!</h1>
                <p>Pero te recomiendo que mires este video para que no pase en el futuro...</p><br>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/xve3yJJAQv0?si=e2Qtw8xuP9-nCJoG"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            `;
        } else {
            estado_coche.className = "estado-coche robado";
            estado_coche.innerHTML = `
                <i class="fa fa-warning" style="color: red;"></i>
                <h1>🚨 ¡ALERTA! Tu coche ha sido robado 🚨</h1>
                <p>Te recomendamos que contactes con las autoridades lo antes posible.</p>
                <p>Si necesitas ayuda, revisa este enlace para denunciarlo:</p>
                <a href="https://www.policia.es/">Reportar Robo</a>
            `;
        }
    }
}
