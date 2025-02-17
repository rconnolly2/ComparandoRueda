const CX = 'a33bec68fe9b34e1a';
const KEY_API = 'AIzaSyARlv5hZTp4SAv56-0KscHFJD_yJowKVD8';

class GaleriaVehiculo {
    constructor(key_api, cx) {
        this.API_KEY = key_api;
        this.CX = cx;
    }
    async BuscarModeloDeCoche(modelo) {
        if (!modelo) return;

        const contenedor_imagenes = document.getElementById('contenedor-imagenes');
        contenedor_imagenes.innerHTML = '';
        
        const url = `https://www.googleapis.com/customsearch/v1?q=${modelo}&cx=${this.CX}&key=${this.API_KEY}&searchType=image&num=7&start=4`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.items) {
                data.items.forEach((item) => {
                    const imagen = document.createElement('img');
                    imagen.src = item.link;
                    imagen.alt = item.title;
                    // Paso la url de la imagen a AbrirModal
                    imagen.onclick = () => GaleriaVehiculo.AbrirModal(item.link);
                    contenedor_imagenes.appendChild(imagen);
                });
            } else {
                alert('No hay imágenes en Google para este para este modelo.');
            }
        } catch (error) {
            console.error(`Error al buscar las imágenes: ${error}`);
        }
    }

    static AbrirModal(url_imagen) {
        const modal = document.getElementById('modal-galeria-vehiculo');
        const modal_imagen = document.getElementById('modal-img-galeria-vehiculo');
    
        modal.style.display = 'block';
        modal_imagen.src = url_imagen;
    }
    
    static CerrarModal() {
        const modal = document.getElementById('modal-galeria-vehiculo');
        modal.style.display = 'none';
    }
}

const galeria = new GaleriaVehiculo(KEY_API, CX);
galeria.BuscarModeloDeCoche(vehiculo.GetDescripcion());