"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateDefaultAccount(accountId: string) {
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

    await db.account.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });

    const account = await db.account.updateMany({
      where: {
        userId: user.id,
        id: accountId,
      },
      data: {
        isDefault: true,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      data: account,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getAccountWithTransactions(accountId: string) {
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

    const account = await db.account.findUnique({
      where: {
        id: accountId,
        userId: user.id,
      },
      include: {
        transactions: {
          orderBy: {
            date: "desc",
          },
        },
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    if (!account) return null;

    return { account };
  } catch (error) {}
}
