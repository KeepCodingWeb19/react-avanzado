"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/app/login/actions";
import { initialLoginState } from "@/app/login/types";

type LoginFormProps = {
  from: string;
};

function getInputClassName(hasError: boolean) {
  return [
    "w-full rounded border bg-background px-3 py-2 text-sm",
    hasError
      ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
      : "border-border",
  ].join(" ");
}

export default function LoginForm({ from }: LoginFormProps) {
  const [state, formAction] = useActionState(loginAction, initialLoginState);
  const [password, setPassword] = useState("");
  const safeState = state ?? initialLoginState;

  return (
    <form
      action={formAction}
      className="rounded-lg border border-border bg-card p-6 space-y-4"
    >
      {/* <input type="hidden" name="from" value={from} /> */}

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={safeState.values.email}
          placeholder="admin@marketplace.com"
          className={getInputClassName(Boolean(safeState.errors.email?.length))}
        />
        {safeState.errors.email?.[0] ? (
          <p className="text-xs text-red-600 dark:text-red-400">
            {safeState.errors.email[0]}
          </p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-semibold">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="1234"
          className={getInputClassName(
            Boolean(safeState.errors.password?.length),
          )}
        />
        {safeState.errors.password?.[0] ? (
          <p className="text-xs text-red-600 dark:text-red-400">
            {safeState.errors.password[0]}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        Iniciar sesión
      </button>

      {safeState.message ? (
        <p className="text-sm text-red-600 dark:text-red-400">
          {safeState.message}
        </p>
      ) : null}
    </form>
  );
}
