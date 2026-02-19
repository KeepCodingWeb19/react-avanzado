"use client";

import { createProjectAction } from "@/app/dashboard/actions";
import CreateProjectButton from "../buttons/create-project-button";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
  requestId: 0,
};

export default function ProjectForm() {
  const [state, formAction] = useActionState(createProjectAction, initialState);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-3 border p-4 rounded"
    >
      <label htmlFor="project-title" className="block text-sm font-semibold">
        Nuevo Proyecto
      </label>
      <input
        id="project-title"
        name="title"
        type="text"
        placeholder="Ej. Proyecto mutaciones genéticas"
        className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <CreateProjectButton />

      {state.message && (
        <p
          className={`mt-2 text-sm ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
