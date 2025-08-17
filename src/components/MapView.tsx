"use client";
import React from 'react';
import Image from 'next/image';
import { Producer, MalaysianState } from '@/types';

interface MapViewProps {
  states: MalaysianState[];
  topProducerByState: Record<number, Producer | null>;
}

const stateCoordinates: Record<string, { x: number; y: number }> = {
  Johor: { x: 230, y: 480 },
  Kedah: { x: 140, y: 120 },
  Kelantan: { x: 220, y: 160 },
  Melaka: { x: 210, y: 440 },
  'Negeri Sembilan': { x: 220, y: 400 },
  Pahang: { x: 260, y: 340 },
  'Pulau Pinang': { x: 130, y: 170 },
  Perak: { x: 170, y: 260 },
  Perlis: { x: 140, y: 80 },
  Selangor: { x: 190, y: 200 },
  Terengganu: { x: 290, y: 220 },
  Sabah: { x: 670, y: 180 },
  Sarawak: { x: 510, y: 370 },
  'W.P. Kuala Lumpur': { x: 200, y: 370 },
  'W.P. Labuan': { x: 600, y: 220 },
  'W.P. Putrajaya': { x: 205, y: 380 },
};

export const MapView: React.FC<MapViewProps> = ({ states, topProducerByState }) => {
  return (
    <div
      className="w-full max-w-[600px] px-0 md:px-0 mx-auto"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        height: 'auto',
      }}
    >
      {/* Use intrinsic sizing so container height matches the SVG exactly and removes extra whitespace */}
      <Image
        src="/malaysia.svg"
        alt="Map of Malaysia"
        width={1000}
        height={420}
        style={{ width: '100%', height: 'auto', objectFit: 'contain', objectPosition: 'top center' }}
      />

      {states.map((state) => {
        const topProducer = topProducerByState[state.id];
        const coords = stateCoordinates[state.name as keyof typeof stateCoordinates];
        if (!topProducer || !coords) return null;

        const left = `${(coords.x / 1000) * 100}%`;
        const top = `${(coords.y / 700) * 100}%`;

        return (
          <div
            key={state.id}
            style={{
              position: 'absolute',
              left: `calc(${left})`,
              top: `calc(${top})`,
              transform: 'translate(-50%, -50%)',
              padding: 'clamp(3px, 1vw, 7px) clamp(7px, 2vw, 14px)',
              background: '#6bb7b7',
              color: 'white',
              borderRadius: '14px',
              fontSize: 'clamp(10px, 2.5vw, 14px)',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0,0,0,0.13)',
              whiteSpace: 'nowrap',
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