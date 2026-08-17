"use client";

import { FormEvent, useEffect, useState } from "react";
import { TaskFilters, type Filter } from "./_components/task-filters";
import { TaskForm } from "./_components/task-form";
import { TaskList, type Task } from "./_components/task-list";

const TASKS_STORAGE_KEY = "vibetasks.tasks.v1";

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) return false;

  const task = value as Record<string, unknown>;
  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.completed === "boolean"
  );
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hasLoadedTasks, setHasLoadedTasks] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);

      if (savedTasks !== null) {
        const parsedTasks: unknown = JSON.parse(savedTasks);
        if (Array.isArray(parsedTasks) && parsedTasks.every(isTask)) {
          // Storage is client-only, so hydrate state after the component mounts.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setTasks(parsedTasks);
        }
      }
    } catch {
      // Keep the default empty list if storage is unavailable or invalid.
    } finally {
      setHasLoadedTasks(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedTasks) return;

    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // The app remains usable if storage is unavailable or full.
    }
  }, [hasLoadedTasks, tasks]);

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
            Build in flow
          </p>
          <h1 id="page-title" className="text-4xl font-semibold tracking-tight">
            VibeTasks
          </h1>
          <p className="mt-3 text-zinc-400">
            A small place to keep track of what matters.
          </p>
        </header>

        <TaskForm value={newTask} onChange={setNewTask} onSubmit={addTask} />
        <TaskFilters
          filter={filter}
          activeTaskCount={activeTaskCount}
          onFilterChange={setFilter}
        />
        <TaskList
          tasks={tasks}
          visibleTasks={visibleTasks}
          filter={filter}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </section>
    </main>
  );
}
