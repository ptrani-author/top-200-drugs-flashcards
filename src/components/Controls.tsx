// FILE: src/components/Controls.tsx
type Props = {
  onPrev: () => void;
  onNext: () => void;
  index: number;
  total: number;
};

export function Controls({ onPrev, onNext, index, total }: Props) {
  const disabled = total <= 0;

  return (
    <div className="px-4 pb-6">
      <div className="mx-auto max-w-md">
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={disabled}
            className="flex-1 rounded-2xl bg-blue/80 border border-white/10 text-white py-3 text-[15px] font-semibold shadow-premium disabled:opacity-40"
            aria-label="Previous card"
          >
            Previous
          </button>

          <div className="min-w-[72px] text-center text-white/80 text-[13px] tabular-nums">
            {total > 0 ? `${index + 1}/${total}` : "0/0"}
          </div>

          <button
            type="button"
            onClick={onNext}
            disabled={disabled}
            className="flex-1 rounded-2xl bg-blue/80 border border-white/10 text-white py-3 text-[15px] font-semibold shadow-premium disabled:opacity-40"
            aria-label="Next card"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
