"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="btn-circle"
      style={{
        width: "40px",
        height: "40px",
        top: "18px",
        left: "18px",
        fontSize: "20px",
        zIndex: 1000,
        position: "fixed",
      }}
    >
      ←
    </button>
  );
}
