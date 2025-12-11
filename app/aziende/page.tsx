"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { companies } from "@/data/companies";
import { useGiftStore } from "@/store/useGiftStore";

import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/layout/PageTitle";
import BackButton from "@/components/layout/BackButton";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import CompanyCard from "@/components/ui/CompanyCard";
import Popup from "@/components/ui/Popup";

export default function AziendePage() {
  const router = useRouter();
  const { selectedCompanies, setSelectedCompanies } = useGiftStore();

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [popupCompany, setPopupCompany] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categories = Array.from(new Set(companies.map((c) => c.category)));
  const selectedNames = selectedCompanies.map((c) => c.name);

  useEffect(() => {
    const sc = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", sc);
    return () => window.removeEventListener("scroll", sc);
  }, []);

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((x) => x !== cat) : [...prev, cat]
    );
  }

  function toggleCompany(company: any) {
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

  const filtered = companies
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (c) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(c.category)
    )
    .sort((a, b) => (sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));

  return (
    <PageContainer>
      <BackButton />

      <PageTitle title="Seleziona le aziende" />

      <Input
        placeholder="Cerca azienda..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTRI */}
      <div style={{ display: "flex", gap: "12px", marginTop: "14px" }}>
        <button className="btn-circle" onClick={() => setShowFilters(!showFilters)}>
          ☰
        </button>
        <button className="btn-circle" onClick={() => setSortAsc(!sortAsc)}>
          ⇅
        </button>
      </div>

      {showFilters && (
        <Card className="mt-section">
          <h3 className="page-subtitle" style={{ marginBottom: "10px", textAlign: "left" }}>
            Filtra per categoria
          </h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className="btn-ghet"
                style={{
                  padding: "9px 16px",
                  background: selectedCategories.includes(cat)
                    ? "var(--accent)"
                    : "var(--bg-card)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  width: "auto",
                }}
                onClick={() => toggleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Card>
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
        {filtered.map((c) => (
          <CompanyCard
            key={c.name}
            name={c.name}
            logo={c.logo}
            selected={selectedNames.includes(c.name)}
            onClick={() => toggleCompany(c)}
            onInfo={() => setPopupCompany(c)}
          />
        ))}
      </div>

      <Button
        onClick={() => router.push("/distribuzione")}
        disabled={selectedCompanies.length === 0}
        className="mt-section"
      >
        Continua
      </Button>

      {popupCompany && (
        <Popup
          logo={popupCompany.logo}
          name={popupCompany.name}
          description={popupCompany.description}
          onClose={() => setPopupCompany(null)}
        />
      )}

      {showScrollTop && (
        <button
          className="btn-circle"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: 999,
          }}
        >
          ↑
        </button>
      )}
    </PageContainer>
  );
}
