// app/api/transactions/route.ts
import { NextResponse } from "next/server";

import prisma from "@/src/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
  const unique = url.searchParams.get("where");
  const type = url.searchParams.get("type");

  const whereClause: any = {};

  if (type) {
    whereClause.type = type;
  }
  if (unique) {
    whereClause.type = unique;
  }

  if (isNaN(page) || isNaN(pageSize)) {
    return NextResponse.json(
      { error: "Invalid page or pageSize" },
      { status: 400 }
    );
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        date: "asc",
      },
    });

    const allTransaction = await prisma.transaction.findMany({
      where: whereClause,
    });

    const totalTransaction = allTransaction.reduce(
      (acc, item) => acc + item.amount,
      0
    );
    const allpage = await prisma.transaction.count({
      where: whereClause,
    });

    const totalpage = Math.ceil(allpage / pageSize);

    return NextResponse.json({
      data: transactions,
      totalpage: totalpage,
      totalTransaksi: totalTransaction,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
