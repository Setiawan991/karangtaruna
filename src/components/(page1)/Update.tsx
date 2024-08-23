"use client";
import React, { useEffect, useState } from "react";
import { EditIcon } from "./EditIcon";
import prisma from "@/src/lib/prisma";

interface Props {
  id: number;
}
const Update = ({ id }: Props) => {
  const [type, setType] = useState("");
  const [amount, setamount] = useState("");
  const [date, setdate] = useState("");
  const [description, setdescription] = useState("");
  const [item_type, setItemType] = useState("");

  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (type === "pemasukan") {
      setItemType("none");
    }
  }, [type]);

  useEffect(() => {
    const queryUpdate = async () => {
      try {
        const response = await fetch(`/api/v1/transaction/${id}`);
        const data = await response.json();

        setType(data.type);
        setamount(data.amount);
        setdate(data.date);
        setdescription(data.description);
        setItemType(data.item_type);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (modal) {
      queryUpdate();
    }
  }, [modal, id]);
  const handleModal = async () => {
    setModal(!modal);
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formaterDate = new Date(date);
    try {
      const data = {
        type,
        amount: parseFloat(amount),
        date: formaterDate,
        description,
        item_type,
      };
      const respone = await fetch(`/api/v1/transaction/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (respone.status == 200) {
        alert(" data berhasil di ubah");
        setModal(false);
        console.log(data);
      } else {
        alert("data gagal di ubah");
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleModal}>
          <EditIcon />
        </button>

        <input
          type="checkbox"
          checked={modal}
          onChange={handleModal}
          className="modal-toggle"
        />

        <div className="modal">
          <div className="modal-box">
            <form className=" flex flex-col gap-7">
              <h3>tambahkan murid</h3>
              <div>
                <div>
                  <select
                    name="type"
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    className="w-full select"
                  >
                    <option value="" disabled>
                      type
                    </option>
                    <option value="pemasukan">pemasukan</option>
                    <option value="pengeluaran">pengeluaran</option>
                  </select>
                </div>

                <div>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="jumlah"
                    name="amount"
                    onChange={(e) => setamount(e.target.value)}
                    value={amount}
                  />
                </div>

                <div>
                  <input
                    type="date"
                    className="input w-full"
                    placeholder="tanggal lahir"
                    name="ttl"
                    onChange={(e) => setdate(e.target.value)}
                    value={date}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="keterangan"
                    name="description"
                    onChange={(e) => setdescription(e.target.value)}
                    value={description}
                  />
                </div>
              </div>

              {type == "pengeluaran" ? (
                <div>
                  <select
                    name="item_type"
                    onChange={(e) => setItemType(e.target.value)}
                    value={item_type}
                    className="w-full select"
                  >
                    <option value="" disabled>
                      type
                    </option>
                    <option value="logistik">logistik</option>
                    <option value="konsumsi">konsumsi</option>
                    <option value="transportasi">transportasi</option>
                  </select>
                </div>
              ) : null}

              <div className="flex justify-end gap-4">
                <button type="submit" onClick={handleClick}>
                  save
                </button>
                <button type="button" onClick={handleModal}>
                  close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
