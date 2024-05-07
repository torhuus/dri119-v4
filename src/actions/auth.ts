"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "@/lib/db";
import { Area, Exercise, User } from "@prisma/client";

dotenv.config();

export const createUser = async (name: string, exerciseId: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        exerciseId,
      },
    });
    return { data: user };
  } catch (e) {
    return { error: e };
  }
};

export const signin = async (userId: string, exerciseId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        exerciseId: exerciseId,
      },
      include: {
        Exercise: true,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    createToken(user);
    // redirect("/app");
    return { status: 200 };
  } catch (e) {
    return { error: e };
  }
};

export type Token = {
  userId: string;
  username: string;
  exerciseId: string;
  exerciseName: string;
  activeArea: string;
};

export const createToken = async (user: any) => {
  const token = jwt.sign(
    {
      userId: user.id,
      username: user.name,
      exerciseId: user.Exercise.id,
      exerciseName: user.Exercise.name,
      activeArea: "" as Area,
    },
    process.env.JWT_SECRET || "defaultKey"
  );

  cookies().delete("token");
  cookies().set("token", token);
};

export const getToken = () => {
  const token = cookies().get("token");
  if (!token) {
    cookies().delete("token");
    redirect("/");
  }

  try {
    const decoded = jwt.verify(
      token.value,
      process.env.JWT_SECRET || "defaultKey"
    );
    return decoded;
  } catch (e) {
    cookies().delete("token");
    redirect("/");
  }
};

const createNewToken = async (token: Token) => {
  const newToken = await jwt.sign(
    token,
    process.env.JWT_SECRET || "defaultKey"
  );
  return newToken;
};

export const changeArea = async (area: string, pathname: string) => {
  let token = (await getToken()) as Token;

  if (!token) {
    console.error("No token found");
    return;
  }

  if (token.activeArea === area) {
    return;
  } else {
    token.activeArea = area === "" ? "" : area;
    const newToken = await createNewToken(token);
    cookies().delete("token");
    cookies().set("token", newToken);
    revalidatePath(pathname);
  }
};

export const signout = () => {
  cookies().delete("token");
  cookies().delete("exerciseId");
  redirect("/");
};

export const setExerciseCookie = (exerciseId: string) => {
  cookies().delete("token");
  cookies().set("exerciseId", exerciseId);
  return;
};
