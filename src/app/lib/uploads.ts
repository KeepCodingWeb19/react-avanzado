import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function saveImageInPublic(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const filename = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const uploadPath = path.join(uploadDir, filename);

  await mkdir(uploadDir, { recursive: true });
  const bytes = await file.arrayBuffer();
  await writeFile(uploadPath, Buffer.from(bytes));

  return `/uploads/${filename}`;
}
