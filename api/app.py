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
    coche = request.args.get('coche', default='Seat Mii', type=str)
    año = request.args.get('anio', default='2020', type=str)
    
    resultados_busqueda = cargar_resultados()
    
    if coche in resultados_busqueda:
        print(f"Usando resultados guardados para '{coche}'")
        coches = resultados_busqueda[coche]
    else:
        print(f"Buscando coches para '{coche}'")
        coches = ObtenerCochesWallapop(coche, año)
        resultados_busqueda[coche] = coches
        guardar_resultados_busqueda(resultados_busqueda)
    
    return jsonify(coches)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
