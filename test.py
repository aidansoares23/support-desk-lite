import requests
from bs4 import BeautifulSoup

def decode_secret_message(url): 
    # Download doc
    response = requests.get(url)
    response.raise_for_status()

    # Parse HTML table
    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table")

    positions = {}
    max_x = 0
    max_y = 0

    for row in table.find_all("tr")[1:]:
        cells = row.find_all("td")

        x = int(cells[0].get_text(strip=True))
        char = cells[1].get_text(strip=True)
        y = int(cells[2].get_text(strip=True))

        # Store each char by position
        positions[(x,y)] = char

        max_x = max(max_x, x)
        max_y = max(max_y, y)

    # Print top to bottom
    for y in range(max_y, -1, -1):
        line = ""
        for x in range(max_x + 1):
            line += positions.get((x, y), " ")
        print(line)

secret_message_url = "https://docs.google.com/document/d/e/2PACX-1vSvM5gDlNvt7npYHhp_XfsJvuntUhq184By5xO_pA4b_gCWeXb6dM6ZxwN8rE6S4ghUsCj2VKR21oEP/pub"

decode_secret_message(secret_message_url)