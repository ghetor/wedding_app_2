"use client";

import { useRouter } from "next/navigation";
import { useGiftStore } from "@/store/useGiftStore";
import { useState } from "react";

import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/layout/PageTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import BackButton from "@/components/layout/BackButton";

export default function ProfiloPage() {
  const router = useRouter();
  const { amount, setAmount, setParticipants, setMessage } = useGiftStore();

  const [participants, updateParticipants] = useState([{ nome: "", cognome: "" }]);
  const [message, updateMessage] = useState("");

  function changeAmount(delta: number) {
    setAmount(Math.max(0, amount + delta));
  }

  function updateP(i: number, field: "nome" | "cognome", val: string) {
    const copy = [...participants];
    copy[i][field] = val;
    updateParticipants(copy);
  }

  function add() {
    updateParticipants([...participants, { nome: "", cognome: "" }]);
  }

  function remove() {
    if (participants.length > 1) updateParticipants(participants.slice(0, -1));
  }

  function handleContinue() {
    if (amount <= 0) return alert("Inserisci un importo valido.");
    for (const p of participants) {
      if (!p.nome || !p.cognome) return alert("Completa tutti i campi.");
    }
    setParticipants(participants);
    setMessage(message);
    router.push("/aziende");
  }

  return (
    <PageContainer>
      <BackButton />

      <Card>
        <PageTitle title="Chi sta facendo il regalo?" />

        <p className="page-subtitle">Inserisci l'importo da regalare</p>

        <div className="flex-center" style={{ gap: "16px", marginBottom: "22px" }}>
          <button className="btn-circle" onClick={() => changeAmount(-10)}>
            –
          </button>

          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="text-center"
            style={{ maxWidth: "180px", fontSize: "22px" }}
          />

          <button className="btn-circle" onClick={() => changeAmount(+10)}>
            +
          </button>
        </div>

        <h3 className="page-subtitle" style={{ textAlign: "left" }}>
          Partecipanti
        </h3>

        {participants.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <Input
              placeholder="Nome"
              value={p.nome}
              onChange={(e) => updateP(i, "nome", e.target.value)}
            />
            <Input
              placeholder="Cognome"
              value={p.cognome}
              onChange={(e) => updateP(i, "cognome", e.target.value)}
            />
          </div>
        ))}

        <div className="flex-center" style={{ gap: "20px", margin: "20px 0" }}>
          <button className="btn-circle" onClick={remove}>
            −
          </button>
          <button className="btn-circle" onClick={add}>
            +
          </button>
        </div>

        <TextArea
          placeholder="Messaggio (opzionale)"
          value={message}
          onChange={(e) => updateMessage(e.target.value)}
        />

        <Button onClick={handleContinue} className="mt-22">
          Continua
        </Button>
      </Card>
    </PageContainer>
  );
}
