import type { Filter } from "./task-filters";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  visibleTasks: Task[];
  filter: Filter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskList({
  tasks,
  visibleTasks,
  filter,
  onToggle,
  onDelete,
}: TaskListProps) {
  if (visibleTasks.length === 0) {
    return (
      <p className="py-14 text-center text-zinc-600">
        {tasks.length === 0
          ? "No tasks yet. Add one above."
          : `No ${filter} tasks.`}
      </p>
    );
  }

  return (
    <ul className="divide-y divide-zinc-800/80">
      {visibleTasks.map((task) => (
        <li key={task.id} className="group flex items-center gap-3 py-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
            className="h-5 w-5 shrink-0 cursor-pointer accent-violet-500"
          />
          <span
            className={`min-w-0 flex-1 break-words ${
              task.completed
                ? "text-zinc-600 line-through"
                : "text-zinc-200"
            }`}
          >
            {task.title}
          </span>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
            className="rounded-lg px-2 py-1 text-sm text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400 focus-visible:text-red-400 focus-visible:outline-2 focus-visible:outline-red-400"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
