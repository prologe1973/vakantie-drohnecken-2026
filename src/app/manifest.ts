import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rijnland-Pfalts 2026 · Vakantiegids & Reisverslag",
    short_name: "Rijnland-Pfalts 2026",
    description:
      "Vakantiegids, wandelkaarten, reisschema en reisdagboek voor Dhronecken, Hunsrück en Moezel.",
    start_url: "/",
    display: "standalone",
    background_color: "#17331f",
    theme_color: "#17331f",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
