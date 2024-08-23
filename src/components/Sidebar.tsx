"use client";
import { useState } from "react";

import Link from "next/link";
import {
  AddressBookTabs,
  ArrowsInSimple,
  Calendar,
  CaretCircleDown,
  CaretCircleUp,
  CaretDoubleLeft,
  CaretDoubleRight,
  CashRegister,
  Person,
  Plus,
  UserPlus,
  UsersThree,
} from "@phosphor-icons/react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [select, setselect] = useState(false);

  const handleSelect = () => {
    setselect(!select);
  };

  const handlerButton = () => {
    setOpen(!open);
  };

  return (
    <div className="flex ">
      <div
        className={`${open ? "w-60" : "w-20"} bg-primary  min-h-screen  text-bw`}
      >
        <div className=" p-5">
          {open ? (
            <div className="flex justify-between text-center ">
              <div className=" ">
                <p>karang taruna rw 14</p>
              </div>
              <button onClick={handlerButton}>
                <CaretDoubleLeft size={32} className="text-bw" />
              </button>
            </div>
          ) : (
            <div className="flex justify-between text-center ">
              <button onClick={handlerButton}>
                <CaretDoubleRight size={32} className="text-bw" />
              </button>
            </div>
          )}

          <ul className="mt-10  flex justify-center items-center flex-col gap-10 text-center  ">
            {open ? (
              <>
                <li>
                  <Link href={"/"}>transaksi</Link>
                </li>
                <li>
                  <Link href={"/anggotaPanitia"}>anggota panitia</Link>
                </li>
                <li>
                  <Link href={"/kalender"}>kalender</Link>
                </li>
                <li>
                  {!select ? (
                    <div className=" flex gap-2">
                      <h1>rekap keuangan</h1>
                      <button onClick={handleSelect}>
                        <CaretCircleDown size={20} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className=" flex gap-2">
                        <h1>rekap keuangan</h1>
                        <button onClick={handleSelect}>
                          <CaretCircleUp size={20} />
                        </button>
                      </div>
                      <div className="p-5">
                        <ul className="text-sm flex gap-5 flex-col">
                          <Link href={"/rekapKeuangan/pemasukan"}>
                            <li>pemasukan</li>
                          </Link>

                          <Link href={"/rekapKeuangan/pengeluaran"}>
                            <li>pengeluaran</li>
                          </Link>

                          <Link href={"/rekaptahunan"}>
                            <li>rekap pertahun</li>
                          </Link>
                          <Link href={"/KategoriPengeluaran/logistik"}>
                            <li>rekap pengeluaran logistik</li>
                          </Link>
                          <Link href={"/KategoriPengeluaran/konsumsi"}>
                            <li>rekap pengeluaran konsumsi</li>
                          </Link>
                          <Link href={"/KategoriPengeluaran/transportasi"}>
                            <li>rekap pengeluaran transportasi</li>
                          </Link>
                        </ul>
                      </div>
                    </>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href={"/"}>
                    <CashRegister size={32} />
                  </Link>
                </li>
                <li>
                  <Link href={"/anggotaPanitia"}>
                    <UsersThree size={32} />
                  </Link>
                </li>
                <li>
                  <Link href={"/kalender"}>
                    <Calendar size={32} />
                  </Link>
                </li>
                <li>
                  <Link href={"/rekaptahunan"}>
                    <ArrowsInSimple size={32} />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
