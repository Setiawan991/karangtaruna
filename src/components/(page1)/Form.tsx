"use client";

import { useEffect, useState } from "react";

const FormMurid = () => {
  const [modal, setModal] = useState(false);
  const [type, setType] = useState("");
  const [amount, setamount] = useState("");
  const [date, setdate] = useState("");
  const [description, setdescription] = useState("");
  const [item_type, setItemType] = useState("");
  const [status, setstatus] = useState(false);

  useEffect(() => {
    if (type === "pemasukan") {
      setItemType("none");
    }
  }, [type]);

  const handleModal = () => {
    setModal(!modal);
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setstatus(true);
    if (
      type == "" ||
      amount == "" ||
      date == "" ||
      description == "" ||
      item_type == ""
    ) {
      alert("silahkan di isi terlebih dahulu formnya");
      setstatus(false);
    } else {
      const intMount = parseFloat(amount);
      const formaterDate = new Date(date);
      const data = {
        type,
        amount: intMount,
        date: formaterDate,
        description,
        item_type,
      };
      console.log(data);

      const respone = await fetch("/api/v1/transaction", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const responeTransaction = await respone.json();

      if (responeTransaction.isCreated) {
        setType("");
        setamount("");
        setdate("");
        setdescription("");
        setItemType("");
        setModal(false);
        setstatus(false);
      } else {
        alert("gagal");
        setstatus(false);
      }
    }
  };

  return (
    <div>
      <button className="btn bg-accent" onClick={handleModal}>
        tambah transaksi
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
              <select
                required
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
                required
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
                required
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
                required
                type="text"
                className="input w-full"
                placeholder="keterangan"
                name="description"
                onChange={(e) => setdescription(e.target.value)}
                value={description}
              />
            </div>

            {type == "pengeluaran" ? (
              <div>
                <select
                  required
                  name="item_type"
                  onChange={(e) => setItemType(e.target.value)}
                  value={item_type}
                  className="w-full select"
                >
                  <option value="" disabled>
                    type
                  </option>
                  <option value="none">none</option>
                  <option value="logistik">logistik</option>
                  <option value="konsumsi">konsumsi</option>
                  <option value="transportasi">transportasi</option>
                </select>
              </div>
            ) : null}

            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="disabled:bg-slate-300 bg-accent btn"
                onClick={handleClick}
                disabled={status}
              >
                {status ? (
                  <p className="text-white">please wait</p>
                ) : (
                  <p>save</p>
                )}
              </button>
              <button type="button" className="btn" onClick={handleModal}>
                close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormMurid;
