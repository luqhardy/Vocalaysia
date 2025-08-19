"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Producer, MalaysianState } from "@/types";

interface MapViewProps {
  states: MalaysianState[];
  topProducerByState: Record<number, Producer | null>;
}

const stateCoordinates: Record<string, { x: number; y: number }> = {
  // --- Final Tuned Coordinates for Peninsular Malaysia ---
  Perlis: { x: 13, y: 17 },
  Kedah: { x: 14, y: 26 },
  Penang: { x: 10, y: 36 },      // Pushed further off the coast
  Kelantan: { x: 24, y: 24 },
  Terengganu: { x: 31, y: 38 },  // Pushed further off the coast
  Perak: { x: 16.5, y: 46 },
  Pahang: { x: 27, y: 58 },
  Selangor: { x: 17, y: 64 },      // Moved up and left
  KL: { x: 20.5, y: 67 },
  Putrajaya: { x: 20, y: 71 },   // Included for completeness
  NegeriSembilan: { x: 23, y: 75 },  // Pushed right for separation
  Melaka: { x: 21, y: 82 },
  Johor: { x: 25, y: 91 },

  // East Malaysia (unchanged)
  Sarawak: { x: 58, y: 73 },
  Labuan: { x: 63, y: 45 },
  Sabah: { x: 78, y: 33 },
};

export const MapView: React.FC<MapViewProps> = ({
  states,
  topProducerByState,
}) => {
  const [selectedStateId, setSelectedStateId] = useState<number | "all">("all");

  return (
    <>
      <div
        className="w-full max-w-[1000px] mx-auto relative"
        style={{ aspectRatio: "1000/420" }}
      >
        <Image
          src="/malaysia.svg"
          alt="Map of Malaysia"
          width={1000}
          height={420}
          className="w-full h-auto object-contain"
          priority
        />

        {states
          .filter(
            (state) =>
              selectedStateId === "all" || state.id === Number(selectedStateId)
          )
          .map((state) => {
            const topProducer = topProducerByState[state.id];
            const coords =
              stateCoordinates[state.name as keyof typeof stateCoordinates];

            if (!topProducer || !coords) return null;

            return (
              <div
                key={state.id}
                className="absolute z-10 font-bold text-white bg-[#6bb7b7] shadow-md whitespace-nowrap rounded-xl
                       px-[clamp(5px,1vw,10px)] py-[clamp(1px,0.5vw,4px)]
                       text-[clamp(8px,1.2vw,12px)]"
                style={{
                  left: `${coords.x}%`,
                  top: `${coords.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {topProducer.name}
              </div>
            );
          })}
      </div>
      <div className="mt-4 text-center">
        <label htmlFor="state-filter" className="mr-2 text-gray-600">
          Filter by state:
        </label>
        <select
          id="state-filter"
          value={selectedStateId}
          onChange={(e) =>
            setSelectedStateId(e.target.value === "all" ? "all" : Number(e.target.value))
          }
          className="border border-gray-300 rounded p-2 text-gray-600 bg-white"
        >
          <option value="all">All States</option>
          {states.map((state) => (<option key={state.id} value={state.id}>{state.name}</option>))}
        </select>
      </div>
    </>
  );
};