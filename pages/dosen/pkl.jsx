import Head from "next/head";
import { useEffect, useState } from "react";
import StackedBarChart from "../../components/charts/StackedBarChart";

export default function PKLDosen() {
  const [selected, setSelected] = useState(true);
  const [selected2, setSelected2] = useState(true);
  const [angkatan, setAngkatan] = useState("");
  const [showChart, setShowChart] = useState(true);
  const [hidden, setHidden] = useState("");
  const currentYear = new Date().getFullYear();

  const selectedStyle =
    "bg-violet-500 hover:bg-violet-700 text-white flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition duration-100 ease-in-out";

  const selectedStyle2 =
    "bg-pink-500 hover:bg-pink-700 text-white flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition duration-100 ease-in-out";

  const unselectedStyle =
    "bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition duration-100 ease-in-out";

  const showChartStyle =
    "opacity-100 my-5 transition duration-300 ease-in-out ";
  const hideChartStyle = "opacity-0 my-5 transition duration-300 ease-in-out ";

  useEffect(() => {
    if (!showChart) {
      setTimeout(() => {
        setHidden("hidden");
      }, 300);
    } else {
      setTimeout(() => {
        setHidden("");
      }, 300);
    }
  }, [showChart]);

  return (
    <>
      <Head>
        <title>Data PKL</title>
      </Head>
      <div className="flex items-center mx-8 justify-between">
        <h2 className="text-left font-bold text-2xl">Data PKL</h2>

        <div className="">
          <label htmlFor="angkatan">Angkatan:</label>
          <select
            onChange={(e) => {
              setAngkatan(e.target.value);
              if (e.target.value == "") {
                setShowChart(true);
              } else {
                setShowChart(false);
              }
            }}
            id="angkatan"
            className="cursor-pointer ml-1"
          >
            <option value="" selected>
              Semua
            </option>
            {[...Array(5)].map((_, i) => (
              <option key={currentYear - i} value={currentYear - i}>
                {currentYear - i}
              </option>
            ))}
          </select>
        </div>
      </div>
      <StackedBarChart
        className={showChart ? showChartStyle : hideChartStyle + hidden}
        left={selected}
        right={selected2}
      />

      <div className="grid grid-cols-2 mx-8 my-3 gap-8 transition-all duration-300 ease-in-out">
        <div
          onClick={() => setSelected(!selected)}
          className={selected ? selectedStyle : unselectedStyle}
        >
          <div className="">Total Mahasiswa Sudah PKL</div>
          <div className="text-8xl font-bold my-3">45</div>
          <div>Mahasiswa</div>
        </div>
        <div
          onClick={() => setSelected2(!selected2)}
          className={selected2 ? selectedStyle2 : unselectedStyle}
        >
          <div className="">Total Mahasiswa Belum PKL</div>
          <div className="text-8xl font-bold my-3">69</div>
          <div>Mahasiswa</div>
        </div>
      </div>
    </>
  );
}
