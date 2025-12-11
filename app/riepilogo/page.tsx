"use client";

import { useRouter } from "next/navigation";
import { useGiftStore } from "@/store/useGiftStore";
import Image from "next/image";

import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/layout/PageTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import BackButton from "@/components/layout/BackButton";

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function RiepilogoPage() {
  const router = useRouter();
  const { amount, selectedCompanies, participants, message } = useGiftStore();

  async function inviaSelezione() {
    try {
      const code = generateCode();

      const allocations = Object.fromEntries(
        selectedCompanies.map((c) => [c.name, c.percentage])
      );

      await fetch("/api/sendToSheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          code,
          amount,
          companies: selectedCompanies.map((c) => c.name),
          allocations,
          participants,
          message,
          user_agent: navigator.userAgent,
        }),
      });

      router.push("/grazie");
    } catch (err) {
      alert("Errore durante l’invio. Riprova.");
      console.error(err);
    }
  }

  return (
    <PageContainer>
      <BackButton />

      <PageTitle title="Riepilogo del tuo regalo" />

      <Card className="text-center mb-section">
        <h2 style={{ fontSize: "20px", marginBottom: "6px" }}>Importo totale</h2>
        <p style={{ fontSize: "32px", fontWeight: "700", color: "var(--accent)" }}>
          {amount.toFixed(2)} €
        </p>
      </Card>

      <h3 className="page-subtitle" style={{ textAlign: "left" }}>
        Distribuzione del regalo
      </h3>

      {selectedCompanies.map((c) => {
        const euro = (amount * c.percentage) / 100;

        return (
          <Card key={c.name} className="mb-section">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Image src={c.logo} width={42} height={42} alt={c.name} className="company-logo" />

                <div>
                  <p style={{ fontSize: "18px", fontWeight: 600 }}>{c.name}</p>
                  <p style={{ opacity: 0.7 }}>{c.percentage}%</p>
                </div>
              </div>

              <div style={{ fontSize: "20px", fontWeight: "600", color: "var(--accent)" }}>
                {euro.toFixed(2)} €
              </div>
            </div>
          </Card>
        );
      })}

      <h3 className="page-subtitle" style={{ textAlign: "left", marginTop: "5px" }}>
        Partecipanti
      </h3>

      <Card className="mb-section">
        {participants.map((p, i) => (
          <p
            key={i}
            style={{
              padding: "6px 0",
              borderBottom:
                i < participants.length - 1
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "none",
            }}
          >
            {p.nome} {p.cognome}
          </p>
        ))}
      </Card>

      <Button onClick={inviaSelezione}>
        Conferma e invia la tua selezione agli sposi
      </Button>
    </PageContainer>
  );
}
