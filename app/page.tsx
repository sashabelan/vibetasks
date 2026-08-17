"use client";

import { FormEvent, useState } from "react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeTaskCount = tasks.filter((task) => !task.completed).length;

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = newTask.trim();
    if (!title) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
    setNewTask("");
  }

  function toggleTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    );
  }

  return (
    <main className="flex min-h-screen items-start justify-center px-5 py-16 sm:py-24">
      <section className="w-full max-w-xl" aria-labelledby="page-title">
        <header className="mb-10">
          <p className="mb-2 text-sm font-medium tracking-widest text-violet-400 uppercase">
            Stay in flow
          </p>
          <h1 id="page-title" className="text-4xl font-semibold tracking-tight">
            VibeTasks
          </h1>
          <p className="mt-3 text-zinc-400">
            A small place to keep track of what matters.
          </p>
        </header>

        <form onSubmit={addTask} className="flex gap-3">
          <label htmlFor="new-task" className="sr-only">
            New task
          </label>
          <input
            id="new-task"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
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

        <div className="mt-8 flex items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="flex gap-1" aria-label="Filter tasks">
            {filters.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
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

        {visibleTasks.length > 0 ? (
          <ul className="divide-y divide-zinc-800/80">
            {visibleTasks.map((task) => (
              <li key={task.id} className="group flex items-center gap-3 py-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
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
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                  className="rounded-lg px-2 py-1 text-sm text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400 focus-visible:text-red-400 focus-visible:outline-2 focus-visible:outline-red-400"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-14 text-center text-zinc-600">
            {tasks.length === 0
              ? "No tasks yet. Add one above."
              : `No ${filter} tasks.`}
          </p>
        )}
      </section>
    </main>
  );
}
