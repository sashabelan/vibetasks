import type { FormEvent } from "react";

type TaskFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function TaskForm({ value, onChange, onSubmit }: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-3">
      <label htmlFor="new-task" className="sr-only">
        New task
      </label>
      <input
        id="new-task"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="What needs to be done?"
        className="min-w-0 flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
      />
      <button
        type="submit"
        className="rounded-xl bg-violet-500 px-5 py-3 font-medium text-white transition hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
      >
        Add
      </button>
    </form>
  );
}
