// FILE: src/lib/suffixHighlight.tsx
import React from "react";

const SUFFIXES = [
  // CV / Renale
  "pril",
  "sartan",
  "olol",
  "zem",
  "dipine",
  "zosin",
  "afil",
  "parin",

  // Lipidi / metabolismo
  "statin",
  "glitazone",
  "gliptin",
  "gliflozin",
  "thiazide",

  // GI
  "prazole",
  "tidine",

  // Respiratorio / Allergia
  "terol",
  "tropium",
  "lukast",

  // Anti-infettivi
  "floxacin",
  "cycline",
  "mycin",
  "cillin",
  "conazole",
  "azole",
  "vir",

  // Neuro / psichiatria
  "pam",
  "zine",
  "oxetine",
  "triptyline",
  "done",
  "setron",
  "mab",

  // Ormoni / steroidi / altri
  "sone",
  "olone",
  "steride",
  "prost",
  "caine"
] as const;


// Highlights suffix matches at the end of each word token.
// If no match, returns the original text (no forced fallback).
export function highlightGenericName(input: string): React.ReactNode {
  const text = input.trim();
  if (!text) return text;

  // Split by spaces but keep spaces (so we preserve original spacing)
  const parts = text.split(/(\s+)/);

  return parts.map((part, i) => {
    if (/^\s+$/.test(part)) return <React.Fragment key={i}>{part}</React.Fragment>;

    const word = part;
    const lower = word.toLowerCase();

    const match = SUFFIXES
      .slice()
      .sort((a, b) => b.length - a.length)
      .find((suf) => lower.endsWith(suf));

    if (!match) return <React.Fragment key={i}>{word}</React.Fragment>;

    const start = word.length - match.length;
    const head = word.slice(0, start);
    const tail = word.slice(start);

    return (
      <span key={i}>
        {head}
        <span className="font-bold text-gold">{tail}</span>
      </span>
    );
  });
}
