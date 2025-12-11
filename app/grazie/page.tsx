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
      <Card>
        <PageTitle title="Grazie di cuore!" />

        <p className="page-subtitle">
          La tua selezione è stata inviata con successo agli sposi.
        </p>

        <p className="page-subtitle" style={{ marginTop: "10px" }}>
          Durante il matrimonio ci sarà un piccolo gioco speciale legato alle
          aziende che avete scelto… chissà, potrebbero portarvi fortuna!
        </p>

        <Button onClick={() => router.push("/")} className="mt-4">
          Torna alla Home
        </Button>
      </Card>
    </PageContainer>
  );
}
