# -*- coding: utf-8 -*-
"""
Created on Sat Dec  6 15:21:33 2025

@author: Gaetano
"""

import os
import requests

# -------------------------------------------------------
# 🏢 LISTA AZIENDE → puoi aggiungerne quante vuoi
# name  = come verrà salvato il file
# domain = dominio dell'azienda usato da Clearbit
# -------------------------------------------------------
COMPANIES = [
    # 🇮🇹 Italia
    {"name": "enel", "domain": "enel.com"},
    {"name": "eni", "domain": "eni.com"},
    {"name": "intesasanpaolo", "domain": "intesasanpaolo.com"},
    {"name": "unicredit", "domain": "unicreditgroup.eu"},
    {"name": "ferrari", "domain": "ferrari.com"},
    {"name": "stellantis", "domain": "stellantis.com"},
    {"name": "pirelli", "domain": "pirelli.com"},
    {"name": "a2a", "domain": "a2a.eu"},
    {"name": "terna", "domain": "terna.it"},
    {"name": "posteitaliane", "domain": "poste.it"},
    {"name": "asroma", "domain": "asroma.com"},   # non quotata ma inclusa su richiesta

    # 🇪🇺 Europa (quotate)
    {"name": "lvmh", "domain": "lvmh.com"},
    {"name": "kering", "domain": "kering.com"},
    {"name": "hermes", "domain": "hermes.com"},
    {"name": "moncler", "domain": "monclergroup.com"},
    {"name": "inditex", "domain": "inditex.com"},
    {"name": "adidas", "domain": "adidas.com"},
    {"name": "puma", "domain": "puma.com"},

    # Auto Europa
    {"name": "mercedesbenz", "domain": "mercedes-benz.com"},
    {"name": "bmw", "domain": "bmw.com"},
    {"name": "volkswagen", "domain": "volkswagenag.com"},
    {"name": "porsche", "domain": "porsche.com"},
    {"name": "renault", "domain": "renaultgroup.com"},

    # Viaggi / Aviazione Europa
    {"name": "ryanair", "domain": "ryanair.com"},
    {"name": "lufthansa", "domain": "lufthansagroup.com"},
    {"name": "airfranceklm", "domain": "airfranceklm.com"},
    {"name": "booking", "domain": "bookingholdings.com"},

    # Food & Beverage Europa
    {"name": "heineken", "domain": "theheinekencompany.com"},
    {"name": "carlsberg", "domain": "carlsberg.com"},
    {"name": "nestle", "domain": "nestle.com"},

    # 🇺🇸 USA (tutte quotate)
    # Tech
    {"name": "apple", "domain": "apple.com"},
    {"name": "amazon", "domain": "amazon.com"},
    {"name": "google", "domain": "abc.xyz"},
    {"name": "microsoft", "domain": "microsoft.com"},
    {"name": "meta", "domain": "meta.com"},
    {"name": "tesla", "domain": "tesla.com"},
    {"name": "nvidia", "domain": "nvidia.com"},
    {"name": "intel", "domain": "intel.com"},
    {"name": "amd", "domain": "amd.com"},
    {"name": "netflix", "domain": "netflix.com"},

    # Food & Retail
    {"name": "cocacola", "domain": "coca-colacompany.com"},
    {"name": "pepsi", "domain": "pepsico.com"},
    {"name": "mcdonalds", "domain": "mcdonalds.com"},
    {"name": "starbucks", "domain": "starbucks.com"},
    {"name": "kfc", "domain": "yum.com"},

    # Sport & Apparel
    {"name": "nike", "domain": "nike.com"},
    {"name": "underarmour", "domain": "underarmour.com"},
]

# -------------------------------------------------------
# 📁 CARTELLA DI DESTINAZIONE
# -------------------------------------------------------
LOGO_DIR = "public/logos"

def ensure_folder(path):
    if not os.path.exists(path):
        os.makedirs(path)
        print(f"Creata cartella: {path}")

def download_logo(name, domain):
    url = f"https://logo.clearbit.com/{domain}"
    filepath = os.path.join(LOGO_DIR, f"{name}.png")

    print(f"➡️ Scaricando {name} da {url}...")

    try:
        response = requests.get(url, timeout=10)

        # Controlla se l’immagine è valida
        if response.status_code == 200 and response.headers["Content-Type"].startswith("image"):
            with open(filepath, "wb") as f:
                f.write(response.content)
            print(f"✔️ Salvato: {filepath}")
        else:
            print(f"❌ Logo non trovato per {name} ({domain})")

    except Exception as e:
        print(f"⚠️ Errore durante il download di {name}: {e}")

def main():
    ensure_folder(LOGO_DIR)

    for company in COMPANIES:
        download_logo(company["name"], company["domain"])

    print("\n✨ Completato! Loghi scaricati in public/logos ✨")

if __name__ == "__main__":
    main()
