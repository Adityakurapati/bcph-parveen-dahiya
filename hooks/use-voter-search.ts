import { useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "@/lib/firebase";

export interface Voter {
  sr_no: number;
  enrolment_no: string;
  name: string;
  address: string;
  place_of_voting: string;
}

export const useVoterSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchVoter = async (searchTerm: string): Promise<Voter[] | null> => {
    const cleaned = searchTerm.trim();
    if (!cleaned) return null;

    setLoading(true);
    setError(null);

    try {
      const isNumberSearch = /^\d+$/.test(cleaned);

      // 🔹 SERIAL NUMBER SEARCH (fast)
      if (isNumberSearch) {
        const snapshot = await get(ref(database, `voters/${cleaned}`));
        if (snapshot.exists()) return [snapshot.val()];
        return [];
      }

      // 🔹 NAME SEARCH (may map to multiple IDs)
      const upperName = cleaned.toUpperCase();
      const indexSnap = await get(ref(database, `indexes/${upperName}`));

      if (!indexSnap.exists()) return [];

      const idMap = indexSnap.val(); // object like { "8": true, "14030": true }
      const voterIds = Object.keys(idMap);

      // Fetch all voters by ID
      const voters: Voter[] = [];

      for (const id of voterIds) {
        const voterSnap = await get(ref(database, `voters/${id}`));
        if (voterSnap.exists()) voters.push(voterSnap.val());
      }

      return voters;
    } catch (err) {
      console.error("Search Error:", err);
      setError("Something went wrong while searching.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { searchVoter, loading, error };
};
