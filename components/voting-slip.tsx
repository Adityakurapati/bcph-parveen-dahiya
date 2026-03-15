'use client';

import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Voter } from '@/hooks/use-voter-search';
import { Share2, Download, MessageCircle } from 'lucide-react';

interface VotingSlipProps {
  voter: Voter;
}

const FIXED_CANDIDATE_NAME = "ADVOCATE PARVEEN DAHIYA (Ms.)";
const FIXED_BALLOT_NUMBER = "127";
const ORGANIZATION = "BAR COUNCIL OF PUNJAB & HARYANA";

const WHATSAPP_NUMBER = "";

export function VotingSlip({ voter }: VotingSlipProps) {

  const slipRef = useRef<HTMLDivElement>(null);

  const generateImage = async () => {
    if (!slipRef.current) return null;

    const dataUrl = await htmlToImage.toPng(slipRef.current, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    });

    return dataUrl;
  };

  const handleWhatsAppShare = async () => {
    if (!slipRef.current) return;

    try {

      const dataUrl = await htmlToImage.toPng(slipRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "VotingSlip.png", {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare({ files: [file] })) {

        await navigator.share({
          title: "Voting Slip",
          text: "Please find your voting slip for Bar Council Election",
          files: [file],
        });

      } else {

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "VotingSlip.png";
        link.click();

      }

    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handleShare = async () => {

    try {

      const dataUrl = await generateImage();
      if (!dataUrl) return;

      const blob = await (await fetch(dataUrl)).blob();

      const file = new File([blob], "VotingSlip.png", {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare({ files: [file] })) {

        await navigator.share({
          title: "Voting Slip",
          files: [file],
        });

      } else {

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "VotingSlip.png";
        link.click();

      }

    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handleDownload = async () => {

    try {

      const dataUrl = await generateImage();
      if (!dataUrl) return;

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "VotingSlip.png";
      link.click();

    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (

    <div className="w-full max-w-4xl mx-auto">

      {/* SLIP */}
      <div
        ref={slipRef}
        className="w-full max-w-4xl mx-auto bg-white shadow-lg border overflow-hidden"
      >

        {/* TOP */}
        <div className="flex justify-between items-start px-6 py-4 border-b">

          {/* LEFT */}
          <div className="space-y-1">

            <p className="text-sm font-semibold text-gray-700">
              SR. NO : {voter.sr_no}
            </p>

            <h2 className="text-xl font-bold tracking-wide">
              {voter.name.toUpperCase()}
            </h2>

            <p className="text-sm">
              <span className="font-semibold">Place Of Voting :</span>{" "}
              {voter.place_of_voting}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Address :</span>{" "}
              {voter.address}
            </p>

          </div>

          {/* RIGHT */}
          <div className="text-center flex flex-col items-center gap-3">

            {/* Candidate Photo */}
            <img
              src="/parveen_dahiya.jpeg"
              alt="Advocate Parveen Dahiya"
              className="w-20 h-20 object-cover rounded-full border-2 border-green-700"
            />

            <div>

              <p className="text-green-700 font-bold text-lg">
                {FIXED_CANDIDATE_NAME}
              </p>

              <p className="text-red-600 font-semibold text-sm">
                First / Best Preference
              </p>

            </div>

            <div className="w-28 h-28">

              <svg viewBox="0 0 200 200" className="w-full h-full">

                <circle cx="100" cy="100" r="90" stroke="#065f46" strokeWidth="6" fill="none" />
                <circle cx="100" cy="100" r="60" stroke="#065f46" strokeWidth="2" fill="none" />

                <path id="topArc" d="M 30 100 A 70 70 0 0 1 170 100" fill="none" />

                <text fontSize="18" fontWeight="bold" fill="#065f46" letterSpacing="3">
                  <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                    SERIAL
                  </textPath>
                </text>

                <path id="bottomArc" d="M 20 100 A 80 80 0 0 0 180 100" fill="none" />

                <text fontSize="18" fontWeight="bold" fill="#065f46" letterSpacing="3">
                  <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
                    NUMBER
                  </textPath>
                </text>

                <text
                  x="100"
                  y="115"
                  textAnchor="middle"
                  fontSize="50"
                  fontWeight="bold"
                  fill="#dc2626"
                >
                  {FIXED_BALLOT_NUMBER}
                </text>

              </svg>

            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="bg-yellow-100 px-6 py-4 text-center">

          <p className="text-base text-gray-800">

            Please vote for{" "}
            <span className="font-bold text-green-700">
              {FIXED_CANDIDATE_NAME}
            </span>{" "}

            (Serial No.{" "}
            <span className="font-bold text-red-600">
              {FIXED_BALLOT_NUMBER}
            </span>
            )

            {" "}as{" "}

            <span className="font-bold text-red-600">
              First / Best Preference
            </span>{" "}

            in {ORGANIZATION}

          </p>

        </div>

      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-8 mt-6">

        <div className="flex flex-col items-center">
          <button
            onClick={handleWhatsAppShare}
            className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-md transition hover:scale-105"
          >
            <MessageCircle size={20} />
          </button>
          <span className="text-[11px] text-gray-700 mt-1">
            WhatsApp
          </span>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={handleShare}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition hover:scale-105"
          >
            <Share2 size={20} />
          </button>
          <span className="text-[11px] text-gray-700 mt-1">
            Share
          </span>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={handleDownload}
            className="w-12 h-12 rounded-full bg-gray-800 hover:bg-black text-white flex items-center justify-center shadow-md transition hover:scale-105"
          >
            <Download size={20} />
          </button>
          <span className="text-[11px] text-gray-700 mt-1">
            Download
          </span>
        </div>

      </div>

    </div>
  );
}