"use client";

import { useRouter } from "next/navigation";
import { useGiftStore } from "@/store/useGiftStore";
import { useEffect, useState } from "react";
import Image from "next/image";

import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/layout/PageTitle";
import Card from "@/components/ui/Card";
import Slider from "@/components/ui/Slider";
import Button from "@/components/ui/Button";
import BackButton from "@/components/layout/BackButton";

export default function DistribuzionePage() {
  const router = useRouter();
  const { amount, selectedCompanies, updateCompanyPercentage } = useGiftStore();

  const [localPercentages, setLocalPercentages] = useState<number[]>(
    selectedCompanies.map((c) => c.percentage)
  );

  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  useEffect(() => {
    const listener = () => setScrollTopVisible(window.scrollY > 250);
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);

  function handleChange(i: number, value: number) {
    const adjusted = Math.max(0, Math.min(100, value));
    const updated = [...localPercentages];
    updated[i] = adjusted;
    setLocalPercentages(updated);
    updateCompanyPercentage(i, adjusted);
  }

  // step percentuale equivalente a 10€
  const stepPercentage = (10 / amount) * 100;

  const totalPercentage = localPercentages.reduce((a, b) => a + b, 0);
  const euroPartial = localPercentages.map((p) => (amount * p) / 100);

  return (
    <PageContainer>
      <BackButton />

      <PageTitle
        title="Distribuisci l’importo"
        subtitle="Scegli quanto assegnare a ciascuna azienda"
      />

      {selectedCompanies.map((c, i) => (
        <Card key={c.name} className="mb-section">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Image src={c.logo} width={48} height={48} alt={c.name} className="company-logo" />
              <span style={{ fontSize: "20px" }}>{c.name}</span>
            </div>

            <div style={{ color: "var(--accent)", fontSize: "20px", fontWeight: 600 }}>
              {euroPartial[i].toFixed(2)} €
            </div>
          </div>

          <Slider
            value={localPercentages[i]}
            min={0}
            max={100}
            step={stepPercentage}
            onChange={(e) => handleChange(i, Number(e.target.value))}
          />

          <div style={{ textAlign: "right", marginTop: "6px", fontSize: "18px" }}>
            {localPercentages[i]}%
          </div>
        </Card>
      ))}

      <Card className="text-center mb-section">
        <h3 style={{ marginBottom: "8px", fontSize: "20px" }}>Totale allocato</h3>
        <p
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: totalPercentage === 100 ? "#3BD16F" : "#FF5555",
          }}
        >
          {totalPercentage}% · {(amount * totalPercentage / 100).toFixed(2)} €
        </p>
      </Card>

      <Button
        onClick={() => router.push("/riepilogo")}
        disabled={totalPercentage !== 100}
        className="mt-section"
      >
        Continua
      </Button>

      {scrollTopVisible && (
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
