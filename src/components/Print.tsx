"use client";


const Print = () => {
  const handlePrint = async () => {
    window.print();
  };
  return (
    <div>
      <button onClick={handlePrint} className="btn">
        cetak
      </button>
    </div>
  );
};

export default Print;
