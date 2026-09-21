import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ENASH — Practical technology for startups and growing companies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "white", color: "#0c0c0d", padding: "70px", fontFamily: "Arial" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 800 }}><div style={{ width: 44, height: 44, background: "#0c0c0d", borderRadius: 10, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>E</div>enash<span style={{ color: "#2457ff" }}>.</span></div>
      <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: "-4px", fontWeight: 800, maxWidth: 980 }}>Build what your business needs next.</div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #0c0c0d", paddingTop: 24, fontSize: 25 }}><span>Software · Web · AI · Cloud · Data</span><span>South Africa</span></div>
    </div>, size
  );
}
