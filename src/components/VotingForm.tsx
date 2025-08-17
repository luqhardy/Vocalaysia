"use client"; // <-- This is the most important line!

import { useState } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/navigation'; // <-- Import the router
import { supabase } from '../supabaseClient';
import { Producer, MalaysianState } from '../types'; // Your types file from before

interface SelectOption {
  value: number;
  label: string;
}

// The component now accepts the lists as props
interface VotingFormProps {
  producers: Producer[];
  states: MalaysianState[];
}

export function VotingForm({ producers, states }: VotingFormProps) {
  const router = useRouter(); // <-- Initialize the router
  const [selectedProducer, setSelectedProducer] = useState<SelectOption | null>(null);
  const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // The useEffect for fetching data is now GONE!

  const producerOptions: SelectOption[] = producers.map(p => ({ value: p.id, label: p.name }));
  const stateOptions: SelectOption[] = states.map(s => ({ value: s.id, label: s.name }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProducer || !selectedState) {
      setMessage('Please select both a producer and a state.');
      return;
    }
    setLoading(true);
    setMessage('');
    const { error } = await supabase.from('votes').insert({
      producer_id: selectedProducer.value,
      state_id: selectedState.value,
    });
    setLoading(false);
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Thank you for your vote!');
      setSelectedProducer(null);
      setSelectedState(null);
      // This is the new way to refresh server-fetched data
      router.refresh(); 
    }
  };

  // The JSX part remains exactly the same as before
  return (
    <div className="bg-[#469da9] text-white p-8 rounded-3xl shadow-lg w-full max-w-md">
      {/* ... The entire form JSX is unchanged ... */}
       <form onSubmit={handleSubmit} noValidate>
        <div className="mb-6">
          <label className="block mb-2 text-lg">
            <span className="bg-[#469da9] px-2 relative top-3 left-3 text-sm">① Choose your favorite Vocaloid Producer!</span>
          </label>
          <Select
            instanceId="producer-select"
            options={producerOptions}
            value={selectedProducer}
            onChange={setSelectedProducer}
            placeholder="Pilih producer favorite korang!"
            isSearchable
            isLoading={producers.length === 0}
            styles={{
              control: (base) => ({ ...base, borderRadius: '9999px', padding: '0.5rem' }),
              singleValue: (base) => ({ ...base, color: '#222', fontWeight: 500 }),
              option: (base, state) => ({
                ...base,
                color: '#222',
                backgroundColor: state.isSelected ? '#e5e7eb' : state.isFocused ? '#f3f4f6' : '#fff',
              }),
              input: (base) => ({ ...base, color: '#222' }),
              placeholder: (base) => ({ ...base, color: '#888' }),
            }}
          />
        </div>
        <div className="mb-8">
          <label className="block mb-2 text-lg">
            <span className="bg-[#469da9] px-2 relative top-3 left-3 text-sm">② Choose your state!</span>   
          </label>
          <Select
            instanceId="state-select"
            options={stateOptions}
            value={selectedState}
            onChange={setSelectedState}
            placeholder="Pilih negeri korang!"
            isLoading={states.length === 0}
            styles={{
              control: (base) => ({ ...base, borderRadius: '9999px', padding: '0.5rem' }),
              singleValue: (base) => ({ ...base, color: '#222', fontWeight: 500 }),
              option: (base, state) => ({
                ...base,
                color: '#222',
                backgroundColor: state.isSelected ? '#e5e7eb' : state.isFocused ? '#f3f4f6' : '#fff',
              }),
              input: (base) => ({ ...base, color: '#222' }),
              placeholder: (base) => ({ ...base, color: '#888' }),
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-gray-800 font-bold py-4 px-4 rounded-full text-xl hover:bg-gray-200 transition duration-300 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'VOTE • UNDI'}
        </button>
        {message && <p className="text-center mt-4">{message}</p>}
      </form>
    </div>
  );
}