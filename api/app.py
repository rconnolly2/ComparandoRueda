import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from scraper import ObtenerCochesWallapop

app = Flask(__name__)
CORS(app)
archivo_resultados_busqueda = 'wallapop.json'

def cargar_resultados():
    try:
        with open(archivo_resultados_busqueda, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def guardar_resultados_busqueda(resultados):
    with open(archivo_resultados_busqueda, 'w') as file:
        json.dump(resultados, file)

@app.route('/api/coches', methods=['GET'])
def obtener_coches():
    palabra_clave = request.args.get('modelo', default='Seat Mii', type=str)
    
    resultados_busqueda = cargar_resultados()
    
    if palabra_clave in resultados_busqueda:
        print(f"Usando resultados guardados para '{palabra_clave}'")
        coches = resultados_busqueda[palabra_clave]
    else:
        print(f"Buscando coches para '{palabra_clave}'")
        coches = ObtenerCochesWallapop(palabra_clave)
        resultados_busqueda[palabra_clave] = coches
        guardar_resultados_busqueda(resultados_busqueda)
    
    return jsonify(coches)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
