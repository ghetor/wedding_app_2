"use client";

import { useRouter } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/layout/PageTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <PageContainer>
      <Card>
        <PageTitle
          title="Benvenuti"
          subtitle="Un modo moderno e divertente per partecipare al nostro regalo."
        />

        <p className="page-subtitle" style={{ marginBottom: "20px" }}>
          Scegli le aziende, distribuisci il tuo importo e invia il tuo regalo
          sotto forma simbolica di investimento.
        </p>

        <Button onClick={() => router.push("/profilo")}>Inizia</Button>
      </Card>
    </PageContainer>
  );
}
