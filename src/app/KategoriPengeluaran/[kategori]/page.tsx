import React from "react";

import GetPengeluaran from "@/src/components/(page1)/GetPengeluaran";
interface Props {
  params: { kategori: string };
}

const page = async ({ params }: Props) => {
  const { kategori } = params;

  return (
    <div className="w-full overflow-hidden">
      <GetPengeluaran initialPage={1} where={kategori} field="item_type" />
    </div>
  );
};

export default page;
