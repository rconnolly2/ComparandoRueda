from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import re
import math

def ConfigurarNavegador():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    return driver

def AceptarCookiesWallapop(driver):
    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "onetrust-accept-btn-handler")))
        aceptar_btn = driver.find_element(By.ID, "onetrust-accept-btn-handler")
        aceptar_btn.click()
    except Exception:
        pass

def ObtenerCochesWallapop(modelo, año):
    url = f"https://es.wallapop.com/app/search?filters_source=side_bar_filters&keywords={modelo}&category_ids=100&latitude=39.5694515&longitude=2.6499457&order_by=price_low_to_high&min_sale_price=2000&min_year={año}&distance=100000"
    driver = ConfigurarNavegador()
    driver.get(url)

    AceptarCookiesWallapop(driver)

    try:
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".ItemCardWide__title")))

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        ads = soup.find_all('div', class_='ItemCardWide')

        coches = []
        for ad in ads[:5]:
            titulo = ad.find('span', class_='ItemCardWide__title').get_text(strip=True)
            precio = ad.find('span', class_='ItemCardWide__price').get_text(strip=True)

            precio = re.sub(r'[^\d,]', '', precio)
            precio = precio.replace(',', '.')

            if '.' in precio:
                precio = precio.split('.')[0]

            try:
                precio = int(precio)
            except ValueError:
                precio = 0

            extra_info = ad.find('div', class_='ItemExtraInfo d-flex')
            detalles = [label.get_text(strip=True) for label in extra_info.find_all('label')] if extra_info else []

            description_tag = ad.find('span', class_='mt-2 ItemCardWide__description')
            descripcion = description_tag.get_text(strip=True) if description_tag else ''
            descripcion = ' '.join(descripcion.split()[:40])

            imagen_url_tag = ad.find('img')
            imagen_url = imagen_url_tag['src'] if imagen_url_tag else ''

            coches.append({
                'titulo': titulo,
                'precio': precio,
                'detalles': detalles,
                'descripcion': descripcion,
                'imagen': imagen_url
            })

        return coches

    except Exception as e:
        print(f"Error al obtener los coches: {e}")
        return []

    finally:
        driver.quit()