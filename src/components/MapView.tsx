"use client";
import React from "react";
import Image from "next/image";
import { Producer, MalaysianState } from "@/types";

interface MapViewProps {
  states: MalaysianState[];
  topProducerByState: Record<number, Producer | null>;
}

// マップ座標は画像 (1000x420) に合わせている
const stateCoordinates: Record<string, { x: number; y: number }> = {
  Johor: { x: 230, y: 380 },
  Kedah: { x: 140, y: 120 },
  Kelantan: { x: 220, y: 100 },
  Melaka: { x: 210, y: 340 },
  "Negeri Sembilan": { x: 220, y: 300 },
  Pahang: { x: 260, y: 240 },
  "Pulau Pinang": { x: 130, y: 150 },
  Perak: { x: 170, y: 200 },
  Perlis: { x: 140, y: 80 },
  Selangor: { x: 190, y: 250 },
  Terengganu: { x: 290, y: 150 },
  Sabah: { x: 670, y: 150 },
  Sarawak: { x: 510, y: 300 },
  "W.P. Kuala Lumpur": { x: 200, y: 270 },
  "W.P. Labuan": { x: 600, y: 180 },
  "W.P. Putrajaya": { x: 205, y: 280 },
};

export const MapView: React.FC<MapViewProps> = ({
  states,
  topProducerByState,
}) => {
  return (
    <div
      className="w-full max-w-[600px] mx-auto"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1000px",
      }}
    >
      {/* SVG マップ */}
      <Image
        src="/malaysia.svg"
        alt="Map of Malaysia"
        width={1000}
        height={420}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />

      {/* 各州ラベル */}
      {states.map((state) => {
        const topProducer = topProducerByState[state.id];
        const coords =
          stateCoordinates[state.name as keyof typeof stateCoordinates];
        if (!topProducer || !coords) return null;

        // 画像サイズに基づいたパーセンテージ座標
        const left = `${(coords.x / 1000) * 100}%`;
        const top = `${(coords.y / 420) * 100}%`;

        return (
          <div
            key={state.id}
            style={{
              position: "absolute",
              left,
              top,
              transform: "translate(-50%, -50%)", // 中央揃え
              padding: "clamp(3px, 1vw, 7px) clamp(7px, 2vw, 14px)",
              background: "#6bb7b7",
              color: "white",
              borderRadius: "14px",
              fontSize: "clamp(10px, 2.5vw, 14px)",
              fontWeight: "bold",
              boxShadow: "0 2px 8px rgba(0,0,0,0.13)",
              whiteSpace: "nowrap",
              zIndex: 2,
            }}
          >
            {topProducer.name}
          </div>
        );
      })}
    </div>
  );
};
