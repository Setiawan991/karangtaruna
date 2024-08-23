// app/api/transactions/route.ts
import { NextResponse } from "next/server";

import prisma from "@/src/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

  if (isNaN(page) || isNaN(pageSize)) {
    return NextResponse.json(
      { error: "Invalid page or pageSize" },
      { status: 400 }
    );
  }

  try {
    const transactions = await prisma.transaction.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        date: "asc",
      },
    });

    const income = await prisma.transaction.findMany({
      where: { type: "pemasukan" },
    });
    const expand = await prisma.transaction.findMany({
      where: { type: "pengeluaran" },
    });
    const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);
    const totalExpand = expand.reduce((acc, item) => acc + item.amount, 0);

    const totalTransaction = totalIncome - totalExpand;

    const totalpage = await prisma.transaction.count();

    const allpage = Math.ceil(totalpage / pageSize);

    return NextResponse.json({
      data: transactions,
      totalpage: allpage,
      totalTransaksi: totalTransaction,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
