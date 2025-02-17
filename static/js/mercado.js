class ObtenerPreciosCoches {
    constructor(vehiculo) {
        this.vehiculo = vehiculo;
    }

    async ObtenerDatos() {
        try {
            const url = `http://127.0.0.1:5000/api/coches?coche=${this.vehiculo.GetMarca()} ${this.vehiculo.GetModelo()}&anio=${this.vehiculo.GetAnioRegistro()}`;
            const respuesta = await fetch(url);
            const datos = await respuesta.json();
            console.log(datos);
            this.GenerarCartas(datos);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    GenerarCartas(datos) {
        const contenedor_ofertas = document.getElementById('ofertas-coches');
        datos.forEach(dato => {
            contenedor_ofertas.appendChild(CartaOferta.CrearCarta(this.vehiculo, dato.descripcion, dato.precio, dato.imagen, dato.detalles));
        });
    }
}

class CartaOferta {
    static CrearCarta(vehiculo, descripcion, precio, imagen_url, detalles) {
        const carta_oferta = document.createElement('div');
        carta_oferta.classList.add('carta-oferta');
    
        const titulo_oferta = document.createElement('h3');
        titulo_oferta.id = 'titulo-oferta';
        titulo_oferta.textContent = `${vehiculo.GetMarca()} ${vehiculo.GetModelo()} ${vehiculo.GetAnioRegistro()}`;
        carta_oferta.appendChild(titulo_oferta);
    
        const imagen_oferta = document.createElement('img');
        imagen_oferta.id = 'img-oferta';
        imagen_oferta.classList.add('img-oferta');
        imagen_oferta.src = imagen_url;
        imagen_oferta.alt = 'Imagen de wallapop';
        carta_oferta.appendChild(imagen_oferta);
    
        // Creo la descripción
        const descripcion_oferta = document.createElement('p');
        descripcion_oferta.classList.add('descripcion-oferta');
        descripcion_oferta.textContent = descripcion;
        carta_oferta.appendChild(descripcion_oferta);
    
        const detalles_oferta = document.createElement('div');
        detalles_oferta.id = 'detalles-oferta';
        detalles_oferta.classList.add('detalles-oferta');
    
        // Creo las dos listas
        const lista_detalles_1 = document.createElement('ul');
        const lista_detalles_2 = document.createElement('ul');

        detalles.forEach((detalle, index) => {
            if (index % 2 === 0) {
                lista_detalles_1.innerHTML += `<li><i class="fas fa-check-circle"></i> ${detalle}</li>`;
            } else {
                lista_detalles_2.innerHTML += `<li><i class="fas fa-check-circle"></i> ${detalle}</li>`;
            }
        });

        detalles_oferta.appendChild(lista_detalles_1);
        detalles_oferta.appendChild(lista_detalles_2);
    
        carta_oferta.appendChild(detalles_oferta);
    
        const precio_oferta = document.createElement('h2');
        precio_oferta.id = 'precio-oferta';
        precio_oferta.textContent = `Precio: ${precio}€`;
        carta_oferta.appendChild(precio_oferta);
    
        const boton_mas_info = document.createElement('button');
        boton_mas_info.classList.add('button');
        boton_mas_info.textContent = 'Más información';
        carta_oferta.appendChild(boton_mas_info);
    
        return carta_oferta;
    }    
}

const obtener_precios = new ObtenerPreciosCoches(vehiculo);
obtener_precios.ObtenerDatos();