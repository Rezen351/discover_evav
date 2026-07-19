import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Simfoni Evav — Kepulauan Kei, Maluku Tenggara";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f1c2e",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: 2,
            color: "#ffffff",
          }}
        >
          Simfoni Evav
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 40,
            color: "#ff7eb6",
            fontWeight: 500,
          }}
        >
          Kepulauan Kei · Maluku Tenggara
        </div>
      </div>
    ),
    { ...size }
  );
}
