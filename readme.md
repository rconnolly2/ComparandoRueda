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

---
