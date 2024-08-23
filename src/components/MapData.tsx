"use client";
import FormMurid from "./(page1)/Form";
import prisma from "@/src/lib/prisma";
import Delete from "@/src/components/(page1)/Delete";
import Update from "./(page1)/Update";
import Print from "./Print";
import { useRef } from "react";

interface muridRegisterPorps {
  id: number;
  type: string;
  amount: number;
  date: Date;
  description: string;
  item_type: string;
}

interface register {
  data: muridRegisterPorps[];
  total: number;
}

const MapData = ({ data, total }: register) => {
  const formater = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const formatTotal = formater.format(total);
  const printRef = useRef(null);

  return (
    <div className="p-5 w-full overflow-hidden">
      <div className="overflow-x-auto ">
        <div className="flex ">
          <FormMurid />
          <div className="flex justify-end w-full ">
            <Print />
          </div>
        </div>
        <table className="table text-center " ref={printRef}>
          <thead>
            <tr>
              <th>type</th>
              <th>jumlah</th>
              <th>tanggal</th>
              <th>keterangan</th>
              <th>kategori pengeluaran</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((result, index) => (
              <tr key={index}>
                <td>{result.type}</td>
                <td>{formater.format(result.amount)}</td>
                <td>
                  {result.date
                    ? new Date(result.date).toLocaleDateString("id-ID")
                    : "tanggal tidak tersedia"}
                </td>
                <td>{result.description}</td>
                <td>{result.item_type}</td>
                <td className="flex justify-center items-center text-center gap-3 md:gap-7">
                  <div>
                    <Delete id={result.id} />
                  </div>
                  <div>
                    <Update id={result.id} />
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td>total</td>
              <td>{formatTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MapData;
