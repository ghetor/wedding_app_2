"use client";

import { useRouter } from "next/navigation";

export default function GraziePage() {
  const router = useRouter();

  return (
    <div className="container-ghet fade" style={{ paddingTop: "60px" }}>
      <div className="card" style={{ textAlign: "center" }}>
        <h1 className="title-ghet">Hai completato tutti gli step!</h1>

        <p className="subtitle-ghet">
          La tua selezione è stata inviata con successo agli sposi.
        </p>

        <p className="subtitle-ghet" style={{ marginTop: "15px" }}>
          Durante il matrimonio ci sarà un piccolo gioco speciale legato alle aziende che avete scelto…
          chissà, potrebbero portarvi fortuna!
        </p>

        <button
          className="btn-ghet"
          onClick={() => router.push("/")}
          style={{ marginTop: "25px" }}
        >
          Torna alla Home
        </button>
      </div>
    </div>
  );
}
