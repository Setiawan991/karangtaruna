import prisma from "@/src/lib/prisma";

import { NextResponse } from "next/server";
interface Props {
  params: { id: string };
}
export async function DELETE(req: Request, { params }: Props) {
  const { id } = params;

  try {
    const del = await prisma.transaction.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ status: 200, data: del });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "failed delete" });
  }
}

export async function PUT(req: Request, { params }: Props) {
  const { id } = params;
  const body = await req.json();

  try {
    const update = await prisma.transaction.update({
      where: {
        id: Number(id),
      },

      data: body,
    });
    return NextResponse.json({ status: 200, data: update });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "failed delete" });
  }
}

export async function GET(req: Request, { params }: Props) {
  const { id } = params;

  try {
    const fetchTransaction = await prisma.transaction.findUnique({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(fetchTransaction);
  } catch (error) {
    return NextResponse.json({ error: "failed fetch" }, { status: 500 });
  }
}
