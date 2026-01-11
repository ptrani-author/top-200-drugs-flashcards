// FILE: src/components/Flashcard.tsx
import { useEffect, useMemo, useState } from "react";
import type { Drug } from "../types/drug";
import { highlightGenericName } from "../lib/suffixHighlight";

type Props = {
  drug: Drug | null;
};

export function Flashcard({ drug }: Props) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [drug?.slug]);

  const genericNode = useMemo(() => {
    if (!drug) return null;
    return highlightGenericName(drug.genericName);
  }, [drug]);

  if (!drug) {
    return (
      <div className="px-4 mt-4">
        <div className="mx-auto max-w-md rounded-3xl bg-navy/60 border border-white/10 p-6 text-white/80 shadow-premium">
          No cards found.
        </div>
      </div>
    );
  }

  const toggle = () => setFlipped((v) => !v);

  return (
    <div className="px-4 mt-4">
      <div className="mx-auto max-w-md card-perspective">
        <button
          type="button"
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
          className="w-full text-left outline-none"
          aria-label="Flip flashcard"
        >
          <div
            className={[
              "relative h-[420px] sm:h-[460px] w-full",
              "transition-transform duration-300 ease-out",
              "preserve-3d"
            ].join(" ")}
            style={{
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }}
          >
            {/* FRONT */}
            <div
              className={[
                "absolute inset-0 backface-hidden",
                "rounded-3xl bg-white text-deepNavy shadow-premium",
                "border border-white/10 overflow-hidden"
              ].join(" ")}
            >
              <div className="h-full flex flex-col">
                <div className="p-5">
                  <span className="inline-flex items-center rounded-full bg-deepNavy text-white px-3 py-1 text-[12px] font-semibold">
                    {drug.category}
                  </span>
                </div>

                <div className="flex-1 flex items-center justify-center px-6">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                      {drug.brandName}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-[12px] text-deepNavy/60">
                    Tap to flip
                  </div>
                </div>
              </div>
            </div>

            {/* BACK */}
            <div
              className={[
                "absolute inset-0 backface-hidden",
                "rounded-3xl bg-navy text-white shadow-premium",
                "border border-white/10 overflow-hidden"
              ].join(" ")}
              style={{ transform: "rotateY(180deg)" }}
            >
              <div className="h-full flex flex-col">
                <div className="p-5 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-white/10 text-white px-3 py-1 text-[12px] font-semibold">
                    {drug.category}
                  </span>
                  <span className="text-[12px] text-white/70">Tap to flip</span>
                </div>

                <div className="flex-1 px-6 pb-6 overflow-auto">
                  <div className="space-y-4">
                    <div>
                      <div className="text-white/70 text-[12px] tracking-wide uppercase">
                        Generic Name
                      </div>
                      <div className="mt-1 text-2xl font-bold leading-snug">
                        {genericNode}
                      </div>
                    </div>

                    {drug.drugClass ? (
                      <div>
                        <div className="text-white/70 text-[12px] tracking-wide uppercase">
                          Drug Class
                        </div>
                        <div className="mt-1 text-[15px] leading-relaxed">
                          {drug.drugClass}
                        </div>
                      </div>
                    ) : null}

                    {drug.primaryUse ? (
                      <div>
                        <div className="text-white/70 text-[12px] tracking-wide uppercase">
                          Primary Use
                        </div>
                        <div className="mt-1 text-[15px] leading-relaxed">
                          {drug.primaryUse}
                        </div>
                      </div>
                    ) : null}

                    {drug.keyRedFlag ? (
                      <div className="rounded-2xl bg-deepNavy/50 border border-white/10 p-4">
                        <div className="text-gold text-[12px] tracking-wide uppercase font-semibold">
                          Key Red-Flag
                        </div>
                        <div className="mt-1 text-[15px] leading-relaxed">
                          {drug.keyRedFlag}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="p-5">
                  <div className="h-[1px] bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
