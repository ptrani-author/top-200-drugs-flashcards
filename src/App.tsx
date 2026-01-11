// FILE: src/App.tsx
import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { CategoryFilter } from "./components/CategoryFilter";
import { Flashcard } from "./components/Flashcard";
import { Controls } from "./components/Controls";
import type { Drug, DrugsData } from "./types/drug";

import drugsData from "./data/drugs.json";

function uniqSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export default function App() {
  const allDrugs = drugsData as DrugsData;

  const categories = useMemo(() => {
    return uniqSorted(allDrugs.map((d) => d.category).filter(Boolean));
  }, [allDrugs]);

  const [category, setCategory] = useState<string>("__ALL__");
  const [index, setIndex] = useState(0);

  const filtered = useMemo(() => {
    const list =
      category === "__ALL__"
        ? allDrugs
        : allDrugs.filter((d) => d.category === category);

    return list;
  }, [allDrugs, category]);

  const current: Drug | null = filtered.length > 0 ? filtered[index] : null;

  const setSafeIndex = (next: number) => {
    const total = filtered.length;
    if (total <= 0) return setIndex(0);
    const wrapped = ((next % total) + total) % total;
    setIndex(wrapped);
  };

  const onPrev = () => setSafeIndex(index - 1);
  const onNext = () => setSafeIndex(index + 1);

  return (
    <div className="min-h-screen bg-deepNavy">
      <Header />

      <main className="pb-8">
        <CategoryFilter
          categories={categories}
          value={category}
          onChange={(next) => {
            setCategory(next);
            setIndex(0);
          }}
        />

        <Flashcard drug={current} />

        <Controls onPrev={onPrev} onNext={onNext} index={index} total={filtered.length} />
      </main>
    </div>
  );
}
