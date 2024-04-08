"use server";
import prisma from "@/lib/db";
import { scaffoldDemoContent } from "./demo-content";

export const createExercise = async (name: string, demoContent: boolean) => {
  try {
    const exercise = await prisma.exercise.create({
      data: {
        name,
      },
    });

    if (exercise && demoContent) {
      const demoContent = await scaffoldDemoContent(exercise.id);
    }
    return { data: exercise };
  } catch (e) {
    return { error: e };
  }
};

export const getAllExercises = async () => {
  try {
    const exercises = await prisma.exercise.findMany();
    return { data: exercises };
  } catch (e) {
    return { error: e };
  }
};
