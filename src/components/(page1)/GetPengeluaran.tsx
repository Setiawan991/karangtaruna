"use client";
import { useEffect, useState } from "react";
import MapData from "../MapData";
import Pagination from "../Pagination";

interface Props {
  initialPage: number;
  where: string;
  field: string;
}

const GetPengeluaran = ({ initialPage, field, where }: Props) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalpage, setTotalPage] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/v1/transaction/GetKategoriPengeluaran?page=${page}&pageSize=10&where=${where}&field=${field}`
        );
        const result = await response.json();
        setData(result.data);
        setTotal(result.totalTransaksi);
        setTotalPage(result.totalpage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  return (
    <div className="w-full">
      {loading ? <p>Loading...</p> : <MapData data={data} total={total} />}

      <Pagination setCurrentPage={setPage} totalpage={totalpage} />
    </div>
  );
};

export default GetPengeluaran;
