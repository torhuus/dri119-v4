"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getAllUsersByExerciseId = async (exerciseId: string) => {
  revalidatePath("/login");
  try {
    const users = await prisma.user.findMany({
      where: {
        exerciseId,
      },
    });
    return { data: users };
  } catch (e) {
    return { error: e };
  }
};
