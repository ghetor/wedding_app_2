"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { companies } from "@/data/companies";
import { useGiftStore } from "@/store/useGiftStore";

export default function AziendePage() {
  const router = useRouter();
  const { selectedCompanies, setSelectedCompanies } = useGiftStore();

  interface Company {
    name: string;
    logo: string;
    category: string;
    description: string;
  }

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [popupCompany, setPopupCompany] = useState<Company | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  const categories = Array.from(new Set(companies.map((c) => c.category)));

  const filtered = companies
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (c) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(c.category)
    )
    .sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  function toggleCategory(cat: string) {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  }

  function toggleCompany(company: Company) {
    const exists = selectedCompanies.find((c) => c.name === company.name);

    if (exists) {
      setSelectedCompanies(selectedCompanies.filter((c) => c.name !== company.name));
    } else {
      setSelectedCompanies([
        ...selectedCompanies,
        { name: company.name, logo: company.logo, category: company.category, percentage: 0 },
      ]);
    }
  }

  useEffect(() => {
    const onScroll = () => setScrollTopVisible(window.scrollY > 350);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectedNames = selectedCompanies.map((c) => c.name);

  return (
    <div className="container-ghet fade">

      <h1 className="title-ghet">Seleziona le aziende</h1>

      {/* SEARCH BAR */}
      <input
        className="input-ghet"
        placeholder="Cerca azienda..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER BUTTONS */}
      <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
        <button className="company-pill" onClick={() => setShowFilterMenu(!showFilterMenu)}>
          Filtri
        </button>
        <button className="company-pill" onClick={() => setSortAsc(!sortAsc)}>
          Ordina
        </button>
      </div>

      {/* FILTER MENU */}
      {showFilterMenu && (
        <div className="card" style={{ marginTop: "18px" }}>
          <h3 className="subtitle-ghet" style={{ textAlign: "left" }}>Categorie</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className="company-pill"
                style={{
                  borderColor: selectedCategories.includes(cat)
                    ? "var(--accent)"
                    : "transparent",
                }}
                onClick={() => toggleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {filtered.map((c) => {
          const selected = selectedNames.includes(c.name);
          return (
            <button
              key={c.name}
              className="card"
              onClick={() => toggleCompany(c)}
              style={{
                padding: "18px",
                border: selected ? "2px solid var(--accent)" : "2px solid transparent",
              }}
            >
              <div
                style={{ position: "absolute", top: "12px", right: "12px", fontSize: "12px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setPopupCompany(c);
                }}
              >
                ℹ️
              </div>

              <Image src={c.logo} alt={c.name} width={60} height={60} className="company-logo" />

              <p style={{ marginTop: "10px" }}>{c.name}</p>
            </button>
          );
        })}
      </div>

      {/* CONTINUA */}
      <button
        className="btn-ghet"
        disabled={selectedCompanies.length === 0}
        onClick={() => router.push("/distribuzione")}
        style={{ marginTop: "30px", opacity: selectedCompanies.length === 0 ? 0.4 : 1 }}
      >
        Continua
      </button>

      {/* POPUP */}
      {popupCompany && (
        <div
          onClick={() => setPopupCompany(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 9999,
          }}
        >
          <div
            className="card"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "420px", textAlign: "center" }}
          >
            <Image src={popupCompany.logo} width={60} height={60} alt={popupCompany.name} />
            <h2 className="subtitle-ghet" style={{ marginTop: "12px" }}>
              {popupCompany.name}
            </h2>
            <p style={{ opacity: 0.9, marginBottom: "25px" }}>
              {popupCompany.description}
            </p>
            <button className="btn-ghet" onClick={() => setPopupCompany(null)}>
              Chiudi
            </button>
          </div>
        </div>
      )}

      {/* SCROLL TOP */}
      {scrollTopVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="company-pill"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            borderRadius: "50%",
            padding: "0",
            width: "50px",
            height: "50px",
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}
