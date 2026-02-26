"use client";

import {
  createProjectOptimisticAction,
  ProjectActionResult,
} from "@/app/dashboard/actions";
import { useActionState, useEffect, useState } from "react";
import CreateProjectButton from "../buttons/create-project-button";
import Image from "next/image";

const initialState: ProjectActionResult = {
  success: false,
  message: "",
  requestId: 0,
};

export default function ProjectOptimisticForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [state, formAction] = useActionState(
    createProjectOptimisticAction,
    initialState,
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }

    const nextUrl = URL.createObjectURL(file);
    setPreview(nextUrl);

    return () => {
      URL.revokeObjectURL(nextUrl);
    };
  };

  return (
    <form action={formAction} className="flex flex-col gap-3 p-4 rounded">
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
      {state.errors?.title && (
        <p className="text-red-600 text-sm mt-1">{state.errors.title[0]}</p>
      )}
      <input
        id="project-description"
        name="description"
        type="text"
        placeholder="Ej. Descripción del proyecto"
        className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
      />
      {state.errors?.description && (
        <p className="text-red-600 text-sm mt-1">
          {state.errors.description[0]}
        </p>
      )}
      <input
        id="project-image"
        name="image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
      />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Preview"
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
        />
      )}
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
