import { getAccountWithTransactions } from "@/actions/account";
import { notFound } from "next/navigation";
import React from "react";

const AccountsPage = async ({ params }: { params: { id: string } }) => {
  const accountData = await getAccountWithTransactions(params.id);

  // console.log(account);

  if (!accountData) notFound();

  const { transactions, ...account } = accountData.account;

  return (
    <div className="space-y-8 px-5 flex gap-4 items-end justify-between">
      <div>
        <h1 className="text-5xl sm:text-6xl font-bold gradient-title capitalize">
          {account.name}
        </h1>
        <p className="text-muted-foreground">
          {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
        </p>
      </div>

      <div className="text-right pb-2">
        <div className="text-xl sm:text-2xl font-bold">
          ₹&nbsp; {parseFloat(account.balance.toString()).toFixed(2)}
        </div>
        <div className="text-sm text-muted-foreground">
          {account._count.transactions} transactions
        </div>
      </div>

      {/* chart section */}
    </div>
  );
};

export default AccountsPage;
