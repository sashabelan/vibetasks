export type Filter = "all" | "active" | "completed";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

type TaskFiltersProps = {
  filter: Filter;
  activeTaskCount: number;
  onFilterChange: (filter: Filter) => void;
};

export function TaskFilters({
  filter,
  activeTaskCount,
  onFilterChange,
}: TaskFiltersProps) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4 border-b border-zinc-800 pb-4">
      <div className="flex gap-1" aria-label="Filter tasks">
        {filters.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onFilterChange(option.value)}
            aria-pressed={filter === option.value}
            className={`rounded-lg px-3 py-1.5 text-sm transition ${
              filter === option.value
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="shrink-0 text-sm text-zinc-500">
        {activeTaskCount} {activeTaskCount === 1 ? "task" : "tasks"} left
      </p>
    </div>
  );
}
