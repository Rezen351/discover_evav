import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Eksplorasi — Simfoni Evav, Kepulauan Kei";

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
            fontSize: 80,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          Eksplorasi
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 40,
            color: "#ff7eb6",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Simfoni Evav · Kepulauan Kei
        </div>
      </div>
    ),
    { ...size }
  );
}
