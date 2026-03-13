'use client';

import { Voter } from '@/hooks/use-voter-search';

/* ================= SHARE SLIP ================= */

export async function shareSlip(
  voter: Voter,
  candidateName: string,
  ballotNumber: string,
  organization: string
) {
  try {
    if (typeof window === "undefined") return;

    const imageUrl = `${window.location.origin}/priya_lehga.jpeg`;

    const message =
`🗳️ ${organization} Election 2026 Voting Slip

👤 Name: ${voter.name}
🔢 Serial No: ${voter.sr_no}
📍 Place Of Voting: ${voter.place_of_voting}

━━━━━━━━━━━━━━

🙏 Kindly vote for:

⭐ ${candidateName}
📌 Ballot No: ${ballotNumber}

🗳️ Please mark as First / Best Preference

Thank you.`;

    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const file = new File(
      [blob],
      "VotingSlip.jpg",
      { type: blob.type }
    );

    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "Voting Slip",
        text: message,
        files: [file],
      });
    } else {
      const whatsappURL =
        `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");
    }

  } catch (error) {
    console.error("Share failed:", error);
  }
}

/* ================= DOWNLOAD SLIP ================= */

export function downloadSlip(
  voter: Voter,
  candidateName: string,
  ballotNumber: string
) {
  if (typeof window === "undefined") return;

  const html = `
  <html>
  <body style="font-family:Arial;padding:20px;">
  <h2>${candidateName}</h2>
  <h3>Ballot No: ${ballotNumber}</h3>
  <hr/>
  <p><b>Name:</b> ${voter.name}</p>
  <p><b>Serial No:</b> ${voter.sr_no}</p>
  <p><b>Place Of Voting:</b> ${voter.place_of_voting}</p>
  <p>Please vote as First / Best Preference</p>
  </body>
  </html>
  `;

  const blob = new Blob([html], { type: "text/html" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "VotingSlip.html";
  a.click();
}
