// FILE: src/components/CategoryFilter.tsx
type Props = {
  categories: string[];
  value: string;
  onChange: (next: string) => void;
};

export function CategoryFilter({ categories, value, onChange }: Props) {
  return (
    <div className="px-4">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl bg-navy/60 border border-white/10 shadow-premium">
          <select
            className="w-full bg-transparent text-white px-4 py-3 rounded-2xl text-[15px] outline-none"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label="Category filter"
          >
            <option value="__ALL__" className="bg-deepNavy">
              All Categories
            </option>
            {categories.map((c) => (
              <option key={c} value={c} className="bg-deepNavy">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
