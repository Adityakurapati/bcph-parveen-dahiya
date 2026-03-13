'use client';

import { useState, FormEvent } from 'react';
import {
  Search,
  Loader2,
  AlertCircle,
  X,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';

import { useVoterSearch, Voter } from '@/hooks/use-voter-search';
import { VotingSlip } from '@/components/voting-slip';
import { VoterResults } from '@/components/voter-results';
import Image from 'next/image';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);
  const [searchResults, setSearchResults] = useState<Voter[] | null>(null);
  const [showResults, setShowResults] = useState(false);

  const { searchVoter, loading, error } = useVoterSearch();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const results = await searchVoter(searchTerm);
    if (!results) return;

    setSearchResults(results);

    if (results.length === 1) {
      setSelectedVoter(results[0]);
      setShowResults(false);
    } else if (results.length > 1) {
      setShowResults(true);
      setSelectedVoter(null);
    }
  };

  const handleSelectVoter = (voter: Voter) => {
    setSelectedVoter(voter);
    setShowResults(false);
  };

  const handleCloseSlip = () => {
    setSelectedVoter(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-3 py-3 space-y-4">

      {/* 🔹 LOGO + BALLOT (Clean Direct Image) */}
<div className="w-full max-w-4xl">
  <div className="grid grid-cols-10 gap-3 items-center">

    {/* 🔹 LOGO – 30% (Direct Image, No Border) */}
    <div className="col-span-3 flex items-center">
  <Image
    src="/logo.png"
    alt="Campaign Logo"
    width={200}
    height={80}
    priority
    className="
      object-contain
      w-full
      max-w-[160px]      /* Mobile Bigger */
      sm:max-w-[130px]   /* Small devices */
      md:max-w-[110px]   /* Tablet */
      lg:max-w-[90px]    /* Desktop Smaller */
      h-auto
    "
  />
</div>


    {/* 🔹 BALLOT – 70% */}
    <div className="col-span-7 bg-primary text-white rounded-md flex flex-col justify-center items-center h-16 shadow-sm">
      <p className="text-xs leading-tight">
        1st / Best Preference
      </p>
      <p className="text-base font-bold leading-tight">
        Ballot No. 137
      </p>
    </div>

  </div>
</div>


      {/* 🔹 SEARCH SECTION */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-sm font-semibold text-center mb-3">
          Voting Slip Finder
        </h2>

        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Enter name or serial number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
            className="w-full pl-3 pr-20 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />

          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-white rounded-md"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </button>
        </form>

        {error && (
          <div className="mt-2 flex items-center gap-2 text-xs text-red-600">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>

      {/* 🔹 VOTING SLIP MODAL */}
      {selectedVoter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/80 backdrop-blur-sm px-3">
          <div className="relative w-full max-w-4xl">

            <button
              onClick={handleCloseSlip}
              className="absolute -top-4 right-0 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>

            <VotingSlip voter={selectedVoter} />
          </div>
        </div>
      )}

      {/* 🔹 MULTIPLE RESULTS MODAL */}
      {showResults && searchResults && (
        <VoterResults
          voters={searchResults}
          onSelectVoter={handleSelectVoter}
          onClose={() => {
            setShowResults(false);
            setSearchResults(null);
            setSearchTerm('');
          }}
        />
      )}

      {/* 🔹 CAMPAIGN HERO SECTION (Compact) */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-4 space-y-4">

        {/* Image + Name + Ballot */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div className="flex items-center gap-3">
            <div className="relative w-34 h-38 rounded-md overflow-hidden border border-yellow-400 shadow-sm">
              <Image
                src="/priya_lehga.jpeg"
                alt="Priya Legha"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold">PRIYA LEGHA</h1>
              <p className="text-xs text-gray-600">Advocate</p>
              <p className="text-xs font-medium">
                Candidate – Bar Council Punjab & Haryana
              </p>
            </div>
          </div>

        
        </div>

        {/* Vote / Support / Elect */}
        <div className="flex justify-center gap-6 mt-8 text-xs font-semibold text-gray-700">
          <span>Vote</span>
          <span>Support</span>
          <span>Elect</span>
        </div>

        {/* Contact + Dates (2x2 Compact Grid) */}
        <div className="grid grid-cols-2 gap-3 mt-8 text-xs">

          <div className="flex gap-2 border rounded-md p-2">
            <MapPin className="w-4 h-4 text-primary mt-0.5" />
            <div>
              <p className="font-semibold">Chamber 306</p>
              <p>District & Session Courts, Bhiwani</p>
            </div>
          </div>

          <div className="flex gap-2 border rounded-md p-2">
            <Phone className="w-4 h-4 text-primary mt-0.5" />
            <div>
              <p className="font-semibold">Contact</p>
              <p>90344-44612</p>
            </div>
          </div>

          <div className="flex gap-2 border rounded-md p-2">
            <Calendar className="w-4 h-4 text-primary mt-0.5" />
            <div>
              <p className="font-semibold">17 March</p>
              <p>High Court</p>
            </div>
          </div>

          <div className="flex gap-2 border rounded-md p-2">
            <Calendar className="w-4 h-4 text-primary mt-0.5" />
            <div>
              <p className="font-semibold">18 March</p>
              <p>District Courts</p>
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}
