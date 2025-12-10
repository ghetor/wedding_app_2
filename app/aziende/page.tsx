"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { companies } from "@/data/companies";
import { useGiftStore } from "@/store/useGiftStore";

export default function AziendePage() {
  const router = useRouter();

  // -------------------------------
  // STORE ZUSTAND
  // -------------------------------
  const { selectedCompanies, setSelectedCompanies } = useGiftStore();

  interface Company {
    name: string;
    logo: string;
    category: string;
    description: string;
  }

  // -------------------------------
  // LOCAL UI STATE
  // -------------------------------
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [popupCompany, setPopupCompany] = useState<Company | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Local names for highlight
  const localSelectedNames = selectedCompanies.map((c) => c.name);

  // CATEGORIES
  const categories = Array.from(new Set(companies.map((c) => c.category)));

  // FILTERING + SORTING
  const filteredCompanies = companies
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (c) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(c.category)
    )
    .sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  // TOGGLE CATEGORY
  function toggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  // -------------------------------
  // TOGGLE COMPANY — CORRETTO
  // -------------------------------
  function toggleCompany(company: Company) {
    const exists = selectedCompanies.find((c) => c.name === company.name);

    if (exists) {
      // Rimuovi
      setSelectedCompanies(
        selectedCompanies.filter((c) => c.name !== company.name)
      );
    } else {
      // Aggiungi come SelectedCompany
      setSelectedCompanies([
        ...selectedCompanies,
        {
          name: company.name,
          logo: company.logo,
          category: company.category,
          percentage: 0, // necessario per distribuzione
        },
      ]);
    }
  }

  // Scroll to top
  useEffect(() => {
    function onScroll() {
      setShowScrollTop(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0F141A",
        padding: "40px 20px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >

      <h1 style={{ fontSize: "42px", marginBottom: "30px", fontWeight: "700" }}>
        Seleziona le aziende
      </h1>

      {/* SEARCH + FILTER + SORT */}
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <input
          type="text"
          placeholder="Cerca azienda..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flexGrow: 1,
            padding: "14px 20px",
            borderRadius: "14px",
            backgroundColor: "#1E2327",
            border: "2px solid rgba(255,255,255,0.15)",
            color: "white",
            fontSize: "16px",
          }}
        />

        <button
          onClick={() => setShowFilterMenu(!showFilterMenu)}
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "14px",
            backgroundColor: "#1E2327",
            border: "2px solid rgba(255,255,255,0.20)",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ☰
        </button>

        <button
          onClick={() => setSortAsc(!sortAsc)}
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "14px",
            backgroundColor: "#1E2327",
            border: "2px solid rgba(255,255,255,0.20)",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ⇅
        </button>
      </div>

      {/* FILTER MENU */}
      {showFilterMenu && (
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "#242B2E",
            padding: "24px 30px",
            borderRadius: "18px",
            marginBottom: "25px",
          }}
        >
          <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
            Filtra per categoria
          </h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "999px",
                  border: selectedCategories.includes(cat)
                    ? "2px solid #1B9AAA"
                    : "2px solid rgba(255,255,255,0.25)",
                  backgroundColor: selectedCategories.includes(cat)
                    ? "#144453"
                    : "#2E3236",
                  color: "white",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* COMPANY GRID */}
      <div
        style={{
          width: "140%",
          maxWidth: "960px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredCompanies.map((c) => {
          const isSelected = localSelectedNames.includes(c.name);

          return (
            <div
              key={c.name}
              onClick={() => toggleCompany(c)}
              style={{
                backgroundColor: "#1E2327",
                padding: "18px",
                borderRadius: "18px",
                textAlign: "center",
                cursor: "pointer",
                border: isSelected
                  ? "3px solid #1B9AAA"
                  : "2px solid rgba(255,255,255,0.15)",
                transition: "0.25s",
                boxShadow: isSelected
                  ? "0 0 20px #1B9AAA88"
                  : "0 4px 15px rgba(0,0,0,0.25)",
                height: "140px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* INFO ICON */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setPopupCompany(c);
                }}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#144453",
                  color: "white",
                  fontSize: "14px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                i
              </div>

              <Image
                src={c.logo}
                alt={c.name}
                width={100}
                height={100}
                style={{ margin: "10% auto 10px" }}
              />

              <p style={{ fontSize: "15px", marginTop: "6px" }}>{c.name}</p>
            </div>
          );
        })}
      </div>

      {/* POPUP */}
      {popupCompany && (
        <div
          onClick={() => setPopupCompany(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#242B2E",
              padding: "30px",
              borderRadius: "25px",
              maxWidth: "420px",
              textAlign: "center",
            }}
          >
            <Image
              src={popupCompany.logo}
              width={60}
              height={60}
              alt={popupCompany.name}
            />

            <h2 style={{ marginTop: "15px" }}>{popupCompany.name}</h2>

            <p style={{ opacity: 0.9, marginBottom: "25px" }}>
              {popupCompany.description}
            </p>

            <button
              onClick={() => setPopupCompany(null)}
              style={{
                padding: "10px 25px",
                borderRadius: "999px",
                backgroundColor: "#144453",
                color: "white",
                border: "2px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
              }}
            >
              Chiudi
            </button>
          </div>
        </div>
      )}

      {/* CONTINUE BUTTON */}
      <div style={{ marginTop: "50px", marginBottom: "60px" }}>
        <button
          onClick={() => router.push("/distribuzione")}
          style={{
            padding: "16px 42px",
            backgroundColor: "#144453",
            border: "2px solid rgba(255,255,255,0.25)",
            color: "white",
            fontSize: "20px",
            borderRadius: "999px",
            cursor: "pointer",
            opacity: selectedCompanies.length === 0 ? 0.35 : 1,
            pointerEvents: selectedCompanies.length === 0 ? "none" : "auto",
          }}
        >
          CONTINUA
        </button>
      </div>

      {/* SCROLL TO TOP */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            right: "20px",
            bottom: "30px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(6px)",
            color: "white",
            fontSize: "22px",
            border: "2px solid rgba(255,255,255,0.25)",
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          ↑
        </button>
      )}

      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        style={{
          position: "fixed",
          top: "28px",
          left: "28px",
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(6px)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          border: "2px solid rgba(255,255,255,0.25)",
          cursor: "pointer",
          zIndex: 9999,
        }}
      >
        ←
      </button>
    </div>
  );
}
