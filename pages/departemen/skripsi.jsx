import Head from "next/head";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Pagination from "../../components/pagination";
import { paginate } from "../../utils/functions/paginate";
import useSWR from "swr";
import { getCookie } from "cookies-next";
import TabelRekap from "../../components/TableRekap";
const token = getCookie("accessToken");

// fetcher function with token
const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());


const data = [100, 200, 5, 2, 1, 50];

const StackedBar = dynamic(() => import("../../components/charts/StackedBar"), {
  ssr: false,
});
 
export default function SkripsiDosen() {
  const [selected, setSelected] = useState(true);
  const [selected2, setSelected2] = useState(true);
  const [angkatan, setAngkatan] = useState("");
  const currentYear = new Date().getFullYear();

  // jumlah sudah skripsi
  const [sudahSkripsi, setSudahSkripsi] = useState(0);
  // jumlah belum skripsi
  const [belumSkripsi, setBelumSkripsi] = useState(0);
  // array variasi tahun
  const [tahun, setTahun] = useState([]);
  // array data yang sudah skripsi per tahun
  const [dataSudah, setDataSudah] = useState([]);
  // array data yang belum skripsi per tahun
  const [dataBelum, setDataBelum] = useState([]);

  // fetch data dari back-end
  const { data: rekapData, errorKab } = useSWR(
    "http://localhost:8080/all-skripsi",
    fetcher
  );

  // hitung yang belum dan sudah skripsi
  useEffect(() => { 
    if (rekapData) {
      let countBlm = 0;
      let countSdh = 0;
      // menghitung jumlah yang sudah dan belum skripsi
      for (let i = 0; i < rekapData.length; i++) {
        if (rekapData[i].status_konfirmasi === "belum") countBlm++;
        else if (rekapData[i].status_konfirmasi === "sudah") countSdh++;
      }
      setSudahSkripsi(countSdh);
      setBelumSkripsi(countBlm);

      // mehitung banyak variasi tahun
      let tahun = new Set();
      let variasiTahun = [];

      rekapData.forEach((element) => {
        if (!tahun.has(element.angkatan)) {
          tahun.add(element.angkatan);
          variasiTahun.push(element.angkatan);
        }
      });
      // set tahun berdasarkan 
      variasiTahun.sort();   
      setTahun(variasiTahun);

      // array jumlah mahasiswa belum skripsi per tahun
      let dataPerTahunBelum = [];
      // array jumlah mahasiswa sudah skripsi per tahun
      let dataPerTahunSudah = [];
      // intialisasi nilai array dengan 0
      for(let i=0;i<variasiTahun.length;i++){
        dataPerTahunBelum.push(0);
        dataPerTahunSudah.push(0);
      } 

      // menghitung frekuensi jumlah yang sudah dan belum skripsi setiap tahun nya
      for (let i = 0; i < rekapData.length; i++) {
          for(let j=0;j<variasiTahun.length;j++){ 
            if (rekapData[i].status_konfirmasi === "belum" && rekapData[i].angkatan === variasiTahun[j]) dataPerTahunBelum[j]++;
            else if (rekapData[i].status_konfirmasi === "sudah" && rekapData[i].angkatan === variasiTahun[j]) dataPerTahunSudah[j]++;
        }
      }
      // mengset data untuk ditampilkan
      setDataSudah(dataPerTahunSudah);
      setDataBelum(dataPerTahunBelum);

    }
  }, [rekapData]);

  const selectedStyle =
    "bg-green-500 hover:bg-green-700 text-white flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition duration-100 ease-in-out";

  const selectedStyle2 =
    "bg-red-500 hover:bg-red-700 text-white flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition duration-100 ease-in-out";

  const unselectedStyle =
    "bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition duration-100 ease-in-out";

  return (
    <>
      <Head>
        <title>Data Skripsi</title>
      </Head>
      {/* Header */}
      <div className="flex items-center mx-8 justify-between">
        <h2 className="text-left font-bold text-2xl">Data Skripsi</h2>

        <div className="">
          <label htmlFor="angkatan">Angkatan:</label>
          <select
            onChange={(e) => {
              setAngkatan(e.target.value);
            }}
            id="angkatan"
            className="cursor-pointer ml-1"
          >
            <option value="">Semua</option>
            {[...Array(5)].map((_, i) => (
              <option key={currentYear - i} value={currentYear - i}>
                {currentYear - i}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* End of Header */}

      {/* Bar */}
      <StackedBar dataLulus={dataSudah} tahun={tahun} dataBelum={dataBelum}/>
      {/* End of Bar */}

      {/* Boxes */}
      <div className="grid grid-cols-2 mx-8 my-3 gap-8 transition-all duration-300 ease-in-out">
        <div
          onClick={() => setSelected(!selected)}
          className={selected ? selectedStyle : unselectedStyle}
        >
          <div className="">Total Mahasiswa Sudah PKL</div>
          <div className="text-8xl font-bold my-3">{sudahSkripsi}</div>
          <div>Mahasiswa</div>
        </div>
        <div
          onClick={() => setSelected2(!selected2)}
          className={selected2 ? selectedStyle2 : unselectedStyle}
        >
          <div className="">Total Mahasiswa Belum PKL</div>
          <div className="text-8xl font-bold my-3">{belumSkripsi}</div>
          <div>Mahasiswa</div>
        </div>
      </div>
      {/* End of Boxes */}

      {/* Table */}
      <TabelRekap rekapData={rekapData} />
    </>
  );
}
