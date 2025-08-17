
interface ResultsDisplayProps {
  totalVotes: number;
  lastUpdated: string;
}

export function ResultsDisplay({ totalVotes, lastUpdated }: ResultsDisplayProps) {
  const lastUpdatedDate = new Date(lastUpdated);

  // Using toLocaleString will format the date according to the user's browser settings,
  // which is great for international audiences.
  const formattedDate = lastUpdatedDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return (
    <div className="text-center my-12 text-gray-400">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
        Over <span className="text-gray-800">{totalVotes.toLocaleString()}</span> total entries!
      </h1>
      <p className="text-xl mt-2">Lebih {totalVotes.toLocaleString()} telah mengundi!</p>
      <p className="text-xs mt-2 text-gray-500">Last updated: {formattedDate}</p>
    </div>
  );
}