"use client";
import React from "react";
import { DeleteIcon } from "./DeleteIcon";
interface Props {
  id: number;
}

const Delete = ({ id }: Props) => {
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Apakah kamu yakin ingin menghapus transaksi ini?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/v1/transaction/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();
        if (data.status == 200) {
          alert("Transaksi berhasil dihapus");

          window.location.reload();
        } else {
          alert("Gagal menghapus transaksi");
        }
      } catch (error) {
        console.error("Error delete transaction:", error);
      }
    }
  };
  return (
    <button onClick={handleDelete}>
      <DeleteIcon />
    </button>
  );
};

export default Delete;
