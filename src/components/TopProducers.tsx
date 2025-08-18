import React from 'react';
import { Producer } from '@/types';

interface TopProducersProps {
  producers: Producer[];
  votes: { producer_id: number; state_id: number }[];
}

export const TopProducers: React.FC<TopProducersProps> = ({ producers, votes }) => {
  // Count total votes for each producer
  const producerVoteCounts: Record<number, number> = {};
  votes.forEach(vote => {
    producerVoteCounts[vote.producer_id] = (producerVoteCounts[vote.producer_id] || 0) + 1;
  });

  // Sort producers by vote count
  const sortedProducerIds = Object.keys(producerVoteCounts).sort(
    (a, b) => (producerVoteCounts[Number(b)] || 0) - (producerVoteCounts[Number(a)] || 0)
  );

  // Get top 5 producers in sorted order
  const topProducers = sortedProducerIds
    .slice(0, 5)
    .map(id => producers.find(p => p.id === Number(id)))
    .filter((p): p is Producer => Boolean(p));

  return (
    <div className="w-full max-w-4xl p-2 mt-5 mb-5 rounded-lg text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-500">Top Producers in Malaysia</h2>
      <ol className="list-decimal list-inside text-gray-400">
        {topProducers.length > 0 ? (
          topProducers.map(producer => (
            <li key={producer.id} className="py-2">
              <span className="font-semibold">{producer.name}</span> - {producerVoteCounts[producer.id]} votes
            </li>
          ))
        ) : (
          <li className="py-2">No votes yet!</li>
        )}
      </ol>
    </div>
  );
};
