"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="btn-circle"
      style={{
        position: "fixed",
        top: "22px",
        left: "22px",
        zIndex: 1000,
      }}
    >
      ←
    </button>
  );
}
