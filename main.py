from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
import json

driver = webdriver.ChromiumEdge()
driver.get("https://ps.hket.com/srde001/%E4%B8%80%E6%89%8B%E6%88%90%E4%BA%A4%E7%B4%80%E9%8C%84")
sleep(4)

page = 1
id = 1
cols = []
all_rows = []

try:
    cookie_button = driver.find_elements(By.CLASS_NAME, "cookie-btn")[0]
    cookie_button.click()
except:
    print("No cookie button")

advanced_search_field = driver.find_elements(By.CSS_SELECTOR, "[aria-label='firsthand-search-project-name']")[0]
advanced_search_field.send_keys("University Hill")
advanced_search_field.submit()

while True:
    sleep(4)
    rows = driver.find_elements(By.CLASS_NAME, "rt-tr")

    if not cols:
        cols = ['id'] + rows[0].text.split("\n")

    next_button = driver.find_elements(By.CSS_SELECTOR, "[aria-label='Next page']")[0]

    print("Page: ", page, " done")

    for row in rows[1:]:
        all_rows.append([str(id)] + row.text.split("\n"))
        id += 1

    if next_button.get_attribute("aria-disabled") != "false":
        break
    else:
        location = next_button.location_once_scrolled_into_view
        driver.execute_script(f"window.scrollTo({location['x']}, {location['y']},);")
        page += 1
        try:
            next_button.click()
        except:
            print("Could not click next button")

for row in range(1, len(all_rows)):
    with open("data.json", "a", encoding='utf8') as file:
        json.dump(dict(zip(cols, all_rows[row])), file)
