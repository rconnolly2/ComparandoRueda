# ComparandoRuedas: Obtén datos de un coche

ComparandoRuedas es un proyecto de entorno cliente que básicamente tiene como objetivo hacer un buscador de historial de coches utilizando la matrícula. Al principio, me di cuenta de que no cumplía con el mínimo de endpoints, por lo que decidí usar diferentes APIs relacionadas. Por ejemplo, la API de Google Imágenes me sirve para obtener 7 imágenes de un modelo de coche, las cuales luego inserto en un div que se utiliza como galería interactiva. También decidí usar una API de YouTube para obtener miniaturas, títulos y enlaces a videos relacionados con dos temas: comparativas con otros coches y reseñas. Me inspiré mucho en el diseño de coches.net para este tipo de sugerencias de video. 😉

![Pagina principal](/docs/img/home.png)
---

## Funcionalidades principales

Las tres funcionalidades principales de la aplicación son las siguientes. La idea es que pongas la matrícula de tu coche o de un coche que deseas comprar y obtendrás un historial del coche, pero principalmente 3 cosas:

- **Datos del coche**: Aquí podrás obtener todos los datos principales del coche como motor, puertas, modelo, fotos y videos, etc.

![Datos coche](/docs/img/datos.png)  

- **Registro DGT**: Aquí podrás obtener la fecha de la primera matrícula, tanto por día y mes y solo año. Además, podrás saber si te han robado el coche. 😂

![Datos DGT](/docs/img/datos-dgt.png)


- **Mercado del coche**: Aquí podrás obtener un resumen de los coches más baratos en las Islas Baleares, con modelos y años similares al tuyo (dentro de un rango). Estos datos los obtengo de una API que he creado, la cual obtiene la información mediante web scraping de la web de Wallapop. Ha sido complicado realizar el scraping, ya que Wallapop tiene medidas para evitar que se haga web scraping en su sitio, pero finalmente lo he conseguido 😊.

![Precio de mercado](/docs/img/mercado.png)

## Buscador

Básicamente, así funciona el buscador:

El usuario pone una matrícula válida en el campo del input. Esta se valida en la función `BuscarMatricula`. Si es válida, se hace la solicitud a la API de matrículas de coches. Si no se encuentra nada y se obtiene un `error 500`, es porque me he quedado sin saldo. Si se obtiene otro error, muestro el mensaje por consola y termino la búsqueda.

El siguiente paso sería procesar la respuesta, ya que la API devuelve los datos en formato XML, pero tiene un campo `<vehicleJson></vehicleJson>` que contiene una versión de los datos. Esos son los datos que obtengo.

El siguiente paso es procesar cada campo por la función `MostrarDatos`, que se encarga de mostrar los datos en el popup. Esta función llama a `ObtenerDato`, pasando el campo del JSON. Lo que hace esta función básicamente es que, si el campo es nulo, lo pone como `No encontrado`. Por último, se cierra el popup.

![Buscador diagrama](/docs/diagramas/buscador_sequence.png)

## Datos Vehículo

Al llegar a la página, crea un objeto de tipo `LocalStorageParser`, que se encarga de buscar en el `localStorage` si existe una key `matricula`. Si no existe, se redirige al cliente al `index.html`. Si existe, se parsea el JSON del `localStorage` y se crea un vehículo utilizando el constructor de la clase `Vehiculo`.

La clase `Vehiculo` tiene getters que luego utilizaremos para la clase `DatosVehiculo`.

La clase `DatosVehiculo()` se encarga primero de verificar que el vehículo que se pasa es efectivamente de tipo `Vehiculo` y luego llama a su función `ActualizarTituloDetalles()`, que lo que hace es actualizar la marca y modelo del `h1` de la página donde se crea el objeto. Luego también está `ActualizarDetallesVehiculo()`, que hace lo mismo pero con más campos, como por ejemplo el campo de puertas, motor, variación, etc.

![Datos vehículo](/docs/diagramas/datos-vehiculo.png)

## Galería imágenes coche

En la página `vehiculo.html`, donde ya he cargado `local-storage-parser.js`, se han parseado los datos almacenados en el local storage con la key llamada `matricula`, y ya he creado el objeto de tipo `Vehiculo`.

Luego, creo un `div` en el HTML llamado `contenedor-imagenes`, que almacenará todas las imágenes del modelo de coche. Después, incluyo la clase `GaleriaVehiculo`, que básicamente utiliza el método `GetDescription()` del objeto `Vehiculo` para llamar a la API de Google Imágenes con la función que he creado llamada `BuscarModeloDeCoche(modelo)`.  

Esta función llama al endpoint: `/customsearch/v1?q=${modelo}&cx=${this.CX}&key=${this.API_KEY}&searchType=image&num=7&start=4`
Este endpoint usa la key que he obtenido en la Google Developer Console para buscar únicamente imágenes a partir de la página 4, evitando imágenes repetidas y obteniendo solo 7 imágenes del modelo de coche que nos interesa.  

A estas imágenes, como mencioné anteriormente, les asigno los atributos `src` y `alt`, y la función `AbrirModal(link-img)` con el link de la imagen para tener algo parecido a una "galería". Si no se encuentran imágenes del coche, lo cual sería raro, lanzo un `alert`...

Si no se encuentran imágenes del coche que seria raro lanzo un alert...

![Galería vehículo](/docs/diagramas/galeria-imagenes.png)
![Galería](/docs/img/galeria.png)

## Sugerencias de videos modelo de coche

En la página `vehiculo.html`, mi idea era tener algo muy similar a **coches.net**. Me gustaba mucho que, cuando miras algún anuncio de cualquier coche, sin importar el año del modelo, justo abajo aparecen diferentes videos de reviews de ese mismo coche, incluso comparativas.  

![Videos coches.net](/docs/img/coches-net-videos.png)  

Entonces decidí que sería buena idea tener esta misma funcionalidad en mi proyecto.  

También creé otra clase similar a `GaleriaVehiculo()`, pero esta vez llamada `GaleriaVideos()`, que se encargará de hacer una petición AJAX a la API de YouTube de Google y obtendrá información como miniaturas, textos, títulos, etc., de **dos videos**.  

### ¿Cómo funciona?  
Básicamente, el constructor toma la clave de la API, y la clase tiene una única función llamada `BuscarVideos()`, que recibe dos parámetros: el modelo que se quiere buscar y el tipo de video que se desea. Para los dos videos, hay dos opciones: por defecto, está en `comparativa`, pero también puede ser `review`.  

El siguiente paso es que creo un término de búsqueda. Por ejemplo, para comparativas sería: **seat comparativa**.  

Luego, hago la petición AJAX a este endpoint: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${termino_busqueda}&key=${this.clave_api}&maxResults=2`

Y por ultimo, voy insertando en el `div` llamado `contenedor-videos` las 2 sugerencias de video. Como muestro en esta imagen, simplemente creo un `div` con la clase de CSS `video`, que contiene un elemento `<a></a>` con `href` al video, la miniatura del video, una etiqueta del tipo de video (como en la web de coches.net), el título y una descripción.  

![Sugerencias vehiculos](/docs/diagramas/galeria-video.png)  

En caso de no encontrar estos dos videos, lanzo un `alert`.  

En el HTML de datos del vehículo, lo que hago es llamar a esta función **dos veces**, una con `comparativa` y otra con `review`, para obtener **cuatro sugerencias de video**, lo que se vería así:  

![Diagrama videos](/docs/img/sugerencias-video.png) 

## Datos DGT

En la página `datos-dgt.html`, he decidido mostrar los datos del objeto `Vehiculo`, pero solo el año/mes de matrícula. Esta vez, gracias a la función `ActualizarEstadoVehiculo()`, se actualiza el `div` con una alerta dependiendo de si el coche ha sido robado o no. Si no ha sido robado, muestro un video con consejos para evitar el robo.  

![Diagrama datos DGT](/docs/diagramas/datos-dgt.png)  

Aquí está el código para actualizar el div que nos verifica si nos han robado el coche:  

![Código actualizar estado](/docs/img/codigo-actualizar-estado.png)  

Los datos de la API que me interesan los guardo en el `localStorage`:
![Datos JSON](/docs/img/robado-json.png)  

Y este es el resultado al llamar a la función `ActualizarEstadoVehiculo()`. Si el coche no ha sido robado, se muestra como no robado y te da consejos para evitar que te lo roben... 😂

![No robado](/docs/img/no-robado.png)  
