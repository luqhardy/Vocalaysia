import { createClient } from '@supabase/supabase-js';
import { VotingForm } from '@/components/VotingForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { Producer, MalaysianState } from '@/types';
import { MapView } from '@/components/MapView';
import Image from 'next/image';

// This page is a Server Component, so we can make it async and fetch data directly.
// We're setting revalidate to 60 seconds. This means Vercel will cache the page
// but regenerate it if a request comes in after 60 seconds, ensuring data is fresh
// without hitting the database on every single request.
export const revalidate = 60;

export default async function HomePage() {
  
  const Header: React.FC = () => (
    <header className="text-center p-6 rounded-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 tracking-wider">
            <Image src="/Vocalaysia.png" alt="Icon" width={160} height={160} className="inline-block h-40 w-160 h-auto align-middle mr-2" /> 
        </h1>
        <p className="text-gray-500 text-xs mt-2"> My Japanese friends keep asking me about the Malaysians&apos; favorite VocaloP. It&apos;s time for a definitive answer. <br /> Built with Next.js, React, Tailwind CSS, Typescript, Vercel, Supabase </p>
    </header>
);
  // Create a server-side Supabase client for this one-time fetch
  // It's safe to use keys here because this code ONLY runs on the server
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  // Fetch all data in parallel for efficiency
  const [producerRes, stateRes, voteCountRes, votesRes] = await Promise.all([
    supabase.from('producers').select('id, name').order('name'),
    supabase.from('malaysian_states').select('id, name').order('name'),
    supabase.from('votes').select('*', { count: 'exact', head: true }),
    supabase.from('votes').select('producer_id, state_id')
  ]);

  const producers: Producer[] = producerRes.data || [];
  const states: MalaysianState[] = stateRes.data || [];
  const totalVotes: number = voteCountRes.count || 0;
  const votes: { producer_id: number; state_id: number }[] = votesRes.data || [];
  const lastUpdated = new Date().toISOString();

  // Calculate top-voted producer per state
  const topProducerByState: Record<number, Producer | null> = {};
  states.forEach(state => {
    // Count votes for each producer in this state
    const votesForState = votes.filter(v => v.state_id === state.id);
    const countByProducer: Record<number, number> = {};
    votesForState.forEach(v => {
      countByProducer[v.producer_id] = (countByProducer[v.producer_id] || 0) + 1;
    });
    // Find producer with max votes
    let topProducerId: number | null = null;
    let maxVotes = 0;
    Object.entries(countByProducer).forEach(([pid, count]) => {
      if (count > maxVotes) {
        maxVotes = count as number;
        topProducerId = Number(pid);
      }
    });
    topProducerByState[state.id] = topProducerId ? producers.find(p => p.id === topProducerId) || null : null;
  });

  return (
    <div className="bg-[#f0f4f5] min-h-screen font-sans flex flex-col items-center justify-center p-4">
      <Header />

      {/* Map View Section */}
      <div className="mb-0">
        <MapView states={states} topProducerByState={topProducerByState} />
      </div>

      <div className="relative w-full max-w-4xl">
        <ResultsDisplay totalVotes={totalVotes} lastUpdated={lastUpdated} />
      </div>

      <main className="w-full flex justify-center">
        <VotingForm producers={producers} states={states} />
      </main>

      <footer className="text-gray-500 text-sm mt-12 w-full max-w-md flex flex-col items-center gap-2">
        <div className="w-full justify-between text-center  ">
          <a href="#" className="hover:underline">Why did I build this app? (WIP)</a><br />
          <a href="#" className="hover:underline">Source code & privacy information (WIP)</a>
        </div>
        <div className="mt-2 text-center">
          Another project by Luqman Hadi.{' '}
          <a href="https://luqmanhadi.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">Visit luqmanhadi.com for more projects like these!</a>
        </div>
      </footer>
    </div>
  );
}