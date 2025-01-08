"use client";

import { updateDefaultAccount } from "@/actions/account";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/useFetch";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "sonner";

interface IAccount {
  account: {
    name: string;
    type: "SAVINGS" | "CURRENT";
    balance: string;
    isDefault: boolean;
    id: string;
  };
}

const AccountCard = ({ account }: IAccount) => {
  const { balance, id, isDefault, name, type } = account;

  const {
    data: updatedDefaultAccount,
    error,
    fn: updateDefaultAccountfn,
    loading: updateDefaultAccountLoading,
  } = useFetch(updateDefaultAccount);

  useEffect(() => {
    if (updatedDefaultAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedDefaultAccount, updateDefaultAccountLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  const handleDefautChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isDefault) {
      toast.warning("Atleast one default account is needed");
      return;
    }

    await updateDefaultAccountfn(id);
  };

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          <Switch
            checked={isDefault}
            onClick={handleDefautChange}
            disabled={updateDefaultAccountLoading}
          />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold capitalize">
            ₹&nbsp;{parseFloat(balance).toFixed(2)}
          </div>

          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>

        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 size-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 size-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default AccountCard;
