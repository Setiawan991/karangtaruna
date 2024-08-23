"use client";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalpage: number;
}

const Pagination = ({ setCurrentPage, totalpage }: Props) => {
  const Nextpage = () => {
    setCurrentPage((prev) => (prev < totalpage ? prev + 1 : totalpage));
  };
  const PrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <div className="flex gap-5 justify-center items-center pb-7">
      <button onClick={PrevPage}>prev</button>
      <h1>1 .... {totalpage}</h1>
      <button onClick={Nextpage}>next</button>
    </div>
  );
};

export default Pagination;
