import React from "react";
import prisma from "@/src/lib/prisma";
import MapData from "@/src/components/MapData";
import GetData from "@/src/components/(page1)/GetData";
interface Props {
  params: { type: string };
}

const page = async ({ params }: Props) => {
  const { type } = params;

  return (
    <div className="w-full overflow-hidden">
      <GetData initialPage={1} where={type} field="type" />
    </div>
  );
};

export default page;
