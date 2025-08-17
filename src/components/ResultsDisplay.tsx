
interface ResultsDisplayProps {
  totalVotes: number;
}

export function ResultsDisplay({ totalVotes }: ResultsDisplayProps) {
  return (
    <div className="text-center my-12 text-gray-400">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
        Over <span className="text-gray-800">{totalVotes.toLocaleString()}</span> total entries!
      </h1>
      <p className="text-xl mt-2">Lebih {totalVotes.toLocaleString()} telah mengundi!</p>
    </div>
  );
}