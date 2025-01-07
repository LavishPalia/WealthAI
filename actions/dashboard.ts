"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface CreateAccountData {
  name: string;
  type: "SAVINGS" | "CURRENT";
  balance: string;
  isDefault: boolean;
}

export async function createAccount(data: CreateAccountData) {
  const { balance, isDefault } = data;

  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("You must be logged in to create an account");
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // convert incoming balance to float
    const balanceFloat = parseFloat(balance);

    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

    const existingAccounts = await db.account.findMany({
      where: {
        userId: user.id,
      },
    });

    const shouldSetDefault = existingAccounts.length === 0 || isDefault;

    if (shouldSetDefault) {
      await db.account.updateMany({
        where: {
          userId: user.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const account = await db.account.create({
      data: {
        ...data,
        userId: user.id,
        balance: balanceFloat,
        isDefault: shouldSetDefault,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      data: { ...account, balance: account.balance.toNumber() },
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getUserAccounts(userId: string) {}
