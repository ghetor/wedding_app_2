"use client";

import { useRouter } from "next/navigation";

import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/layout/PageTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function GraziePage() {
  const router = useRouter();

  return (
    <PageContainer>
      <Card className="fade" style={{ padding: "2rem 1.6rem", marginTop: "20px" }}>
        <PageTitle title="Grazie di cuore!" />

        <p className="page-subtitle" style={{ marginBottom: "15px" }}>
          La tua selezione è stata inviata con successo agli sposi.
        </p>

        <p className="page-subtitle" style={{ opacity: 0.75 }}>
          Durante il matrimonio ci sarà un piccolo gioco speciale legato alle aziende che avete scelto… chissà, potrebbero portarvi fortuna!
        </p>

        <Button onClick={() => router.push("/")} className="mt-section">
          Torna alla Home
        </Button>
      </Card>
    </PageContainer>
  );
}
