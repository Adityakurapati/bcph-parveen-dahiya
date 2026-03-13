'use client';

import { CheckCircle2, Phone, MapPin, Calendar } from 'lucide-react';

export function CampaignHero() {
  return (
    <div className="w-full max-w-xl mx-auto px-2 py-2 space-y-3">

      {/* 🔹 Compact Badge */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1 px-2 py-0.5 text-[10px] bg-accent/20 rounded border border-accent/40">
          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
          Bar Council Election Campaign
        </div>
      </div>

      {/* 🔹 Name + Position */}
      <div className="text-center leading-tight">
        <h1 className="text-lg font-bold">PRIYA LEGHA</h1>
        <p className="text-[11px] text-muted-foreground">Advocate</p>
        <p className="text-[11px] font-semibold">
          Candidate – Bar Council Punjab & Haryana
        </p>
      </div>

      {/* 🔹 Compact Vote Row */}
      <div className="grid grid-cols-3 gap-1 text-center text-[10px]">
        {['Vote', 'Support', 'Elect'].map((item) => (
          <div key={item} className="flex flex-col items-center py-1 border rounded">
            <CheckCircle2 className="w-3 h-3 text-accent mb-0.5" />
            <span className="font-semibold">{item}</span>
          </div>
        ))}
      </div>

      {/* 🔹 Ballot Info */}
      <div className="text-center bg-primary text-white rounded py-1.5">
        <p className="text-[10px]">1st / Best Preference</p>
        <p className="text-base font-bold">Ballot No. 137</p>
      </div>

      {/* 🔹 Compact Info Grid */}
      <div className="grid grid-cols-1 gap-2 text-[10px]">

        {/* Address */}
        <div className="flex gap-2 border rounded p-2">
          <MapPin className="w-3 h-3 text-primary mt-0.5" />
          <div className="leading-tight">
            <p className="font-semibold">Chamber 306</p>
            <p>District & Session Courts, Bhiwani</p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-2">

          <div className="flex gap-1 border rounded p-1.5">
            <Calendar className="w-3 h-3 text-accent mt-0.5" />
            <div>
              <p className="font-semibold">17 March</p>
              <p>High Court</p>
            </div>
          </div>

          <div className="flex gap-1 border rounded p-1.5">
            <Calendar className="w-3 h-3 text-accent mt-0.5" />
            <div>
              <p className="font-semibold">18 March</p>
              <p>District Courts</p>
            </div>
          </div>

        </div>
      </div>

      {/* 🔹 Compact Contact */}
      <div className="border rounded p-2 text-[10px] space-y-1">
        <div className="flex items-center gap-1 font-semibold">
          <Phone className="w-3 h-3 text-accent" />
          Contact
        </div>
        <div className="grid grid-cols-2 gap-1">
          <p>FB: priyalegha01</p>
          <p>IG: adv.priyalegha</p>
          <p>Ph: 90344-44612</p>
        </div>
      </div>

    </div>
  );
}
