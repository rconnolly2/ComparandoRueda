export const CLAVE_API_YOUTUBE = 'AIzaSyDFbkryWlTCpptSUrW4K87lUjGFxmUHQNM';

export class GaleriaVideos {
    constructor(clave_api) {
        this.clave_api = clave_api;
    }

    async BuscarVideos(modelo, tipo = 'comparativa') {
        if (!modelo) return;

        const contenedor_videos = document.getElementById('contenedor-videos');
        contenedor_videos.innerHTML = '';

        // Aquí junto el modelo de coche con lo que quiero por ej: Seat Ibiza review
        const termino_busqueda = `${modelo} ${tipo}`;
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${termino_busqueda}&key=${this.clave_api}&maxResults=2`;

        try {
            const respuesta = await fetch(url);
            const datos = await respuesta.json();

            if (datos.items) {
                datos.items.forEach((item) => {
                    const video = document.createElement('div');
                    video.classList.add('video');

                    video.innerHTML = `
                        <a href="https://www.youtube.com/watch?v=${item.id.videoId}" class="enlace-video" title="${item.snippet.title}">
                            <div class="contenedor-imagen">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icono-video" viewBox="0 0 64 64">
                                    <path d="M32,64C14.3,64,0,49.7,0,32S14.3,0,32,0s32,14.3,32,32S49.7,64,32,64z M32,4C16.5,4,4,16.5,4,32s12.5,28,28,28s28-12.5,28-28S47.5,4,32,4z"></path>
                                    <polygon points="26,46.9 26,17.1 44,32"></polygon>
                                </svg>
                                <img src="${item.snippet.thumbnails.high.url}" alt="Imagen del video" class="imagen-video">
                            </div>

                            <div class="informacion-video">
                                <div class="etiqueta-${ (tipo == 'comparativa') ? 'comp' : 'review'}">
                                    <span class="texto-etiqueta">${tipo.toUpperCase()}</span>
                                </div>
                            </div>

                            <div class="contenido-video">
                                <p class="titulo-video">${item.snippet.title}</p>
                                <p class="descripcion-video">${item.snippet.description}</p>
                            </div>
                        </a>
                    `;

                    contenedor_videos.appendChild(video);
                });
            } else {
                throw new Error(`No he encontrado videos con estas palabras al buscar videos: ${termino_busqueda}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}
