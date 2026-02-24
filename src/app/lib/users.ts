import prisma from "./prisma";
import { UserDto } from "./users.types";

export async function getUserByEmail(email: string): Promise<UserDto | null> {

  const userDb = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true }
  })

  if (!userDb) {
    return null;
  }

  return {
    id: userDb.id,
    email: userDb.email
  }
}