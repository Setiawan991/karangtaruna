import prisma from "@/src/lib/prisma";
export async function POST(request: any) {
  const { type, amount, date, description, item_type } = await request.json();

  if (
    type == null ||
    amount == null ||
    date == null ||
    description == null ||
    item_type == null
  ) {
    return Response.json({ status: 404, message: "field undifined" });
  } else {
    try {
      const formaterDate = new Date(date);
      const data = { type, amount, date: formaterDate, description, item_type };
      console.log(data);
      const createTransaction = await prisma.transaction.create({ data });

      if (!createTransaction)
        return Response.json({ status: 500, isCreated: false });
      else return Response.json({ status: 200, isCreated: true });
    } catch (error) {
      return Response.json({ status: 500, error: error });
    }
  }
}
