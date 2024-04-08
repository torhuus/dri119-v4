"use server";
import prisma from "@/lib/db";

export const getAllUsersByExerciseId = async (exerciseId: string) => {
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
