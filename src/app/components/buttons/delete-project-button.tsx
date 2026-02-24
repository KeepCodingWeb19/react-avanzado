import { deleteProjectAction } from "@/app/dashboard/actions";

interface DeleteProjectButtonProps {
  projectId: number
}

export default function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  return (
    <form action={deleteProjectAction}>
      <input type="hidden" name="projectId" value={projectId} />
      <button type="submit" className="rounded bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground">
        Borrar
      </button>
    </form>
  )
}