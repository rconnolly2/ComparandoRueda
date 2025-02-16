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

def ObtenerCochesWallapop(modelo):
    # Busco por modelo en Mallorca y mas de 2000 Euros, precio ascendente
    url = f"https://es.wallapop.com/app/search?filters_source=side_bar_filters&keywords={modelo}&category_ids=100&latitude=39.5694515&longitude=2.6499457&order_by=price_low_to_high&min_sale_price=2000"
    driver = ConfigurarNavegador()
    driver.get(url)

    AceptarCookiesWallapop(driver)

    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".ItemCardWide__title")))
        time.sleep(3)

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        ads = soup.find_all('div', class_='ItemCardWide')

        coches = []
        for ad in ads[:5]:
            title = ad.find('span', class_='ItemCardWide__title').get_text(strip=True)
            price = ad.find('span', class_='ItemCardWide__price').get_text(strip=True)

            price = re.sub(r'[^\d,]', '', price)
            price = price.replace(',', '.')

            if '.' in price:
                price = price.split('.')[0]

            try:
                price = int(price)
            except ValueError:
                price = 0

            coches.append({'titulo': title, 'precio': price})

        return coches

    except Exception as e:
        print(f"Error al obtener los coches: {e}")
        return []

    finally:
        driver.quit()
