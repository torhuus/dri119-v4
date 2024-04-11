"use server";
import prisma from "@/lib/db";
import { scaffoldDemoContent } from "./demo-content";
import { cookies } from "next/headers";

export const createExercise = async (name: string, demoContent: string) => {
  try {
    const exercise = await prisma.exercise.create({
      data: {
        name,
      },
    });

    if (exercise && demoContent === "true") {
      const demoContent = await scaffoldDemoContent(exercise.id);
    }
    cookies().delete("token");
    cookies().set("exerciseId", exercise.id);
    return { data: exercise };
  } catch (e) {
    console.log(e);
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
