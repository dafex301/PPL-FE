import Head from "next/head";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Pagination from "../pagination";
import { paginate } from "../../utils/functions/paginate";
import useSWR from "swr";
import { getCookie } from "cookies-next";
import TabelRekap from "../TableRekap";
import Search from "../Search";
import TotalNum from "./TotalNum";
const token = getCookie("accessToken");

// Styling
const selectedStyle =
  "bg-green-500 hover:bg-green-700 text-white flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition duration-100 ease-in-out";

const selectedStyle2 =
  "bg-red-500 hover:bg-red-700 text-white flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition duration-100 ease-in-out";

const unselectedStyle =
  "bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition duration-100 ease-in-out";

// fetcher function with token
const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());

const StackedBar = dynamic(() => import("./StackedBar"), {
  ssr: false,
});
const PieChart = dynamic(() => import("../../components/charts/PieChart"), {
  ssr: false,
});

// Get the current year
const currentYear = new Date().getFullYear();

// Get a list of current year up to 5 years ago
const years = [...Array(5)].map((_, i) => currentYear - i);

// Sort years in ascending order
years.sort((a, b) => a - b);

// Convert to string
const yearsString = years.map((year) => year.toString());

export default function RekapStatistik({ API, label, title }) {
  const { data: rekapData, errorKab } = useSWR(API, fetcher);

  const [selected, setSelected] = useState(true);
  const [selected2, setSelected2] = useState(true);
  // angkatan yang mau dicara
  const [angkatan, setAngkatan] = useState("");
  // jumlah sudah skripsi
  const [sudahSkripsi, setSudahSkripsi] = useState(0);
  // jumlah belum skripsi
  const [belumSkripsi, setBelumSkripsi] = useState(0);
  // array variasi tahun
  const [tahun, setTahun] = useState(yearsString);
  // array data yang sudah skripsi per tahun
  const [dataSudah, setDataSudah] = useState([0, 0, 0, 0, 0]);
  // array data yang belum skripsi per tahun
  const [dataBelum, setDataBelum] = useState([0, 0, 0, 0, 0]);

  // Search data
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("nama");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleKategori = (e) => {
    setKategori(e.target.value);
  };

  // Table data
  const [data, setData] = useState([]);

  // hitung yang belum dan sudah skripsi
  useEffect(() => {
    if (rekapData) {
      let sudah = 0;
      let belum = 0;
      let dataSdh = [0, 0, 0, 0, 0];
      let dataBlm = [0, 0, 0, 0, 0];

      rekapData.forEach((data, index) => {
        // Remove data that angkatan is not in years array
        if (!yearsString.includes(data.angkatan)) {
          rekapData.splice(index, 1);
        } else {
          if (data.status_konfirmasi == "sudah") {
            sudah++;
            dataSdh[yearsString.indexOf(data.angkatan)]++;
          } else {
            belum++;
            dataBlm[yearsString.indexOf(data.angkatan)]++;
          }
        }
      });

      setSudahSkripsi(sudah);
      setBelumSkripsi(belum);
      setDataSudah(dataSdh);
      setDataBelum(dataBlm);
      setData(rekapData);
    }
  }, [rekapData, API, angkatan]);

  // Search data and angkatan
  useEffect(() => {
    if (rekapData) {
      let sudah = 0;
      let belum = 0;
      let filtered = rekapData;
      if (angkatan) {
        filtered = filtered.filter((item) =>
          item.angkatan.toLowerCase().includes(angkatan.toLowerCase())
        );
      }
      filtered.forEach((data) => {
        if (data.status_konfirmasi == "sudah") {
          sudah++;
        } else {
          belum++;
        }
      });
      if (search) {
        if (kategori == "nama") {
          filtered = filtered.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          );
        } else {
          filtered = filtered.filter((item) =>
            item.nim.toLowerCase().includes(search.toLowerCase())
          );
        }
      }
      setData(filtered);
      setSudahSkripsi(sudah);
      setBelumSkripsi(belum);
    }
  }, [angkatan, kategori, rekapData, search]);

  return (
    <>
      <Head>
        <title>Data {label}</title>
      </Head>
      {/* Header */}
      <div className="flex items-center mx-8 justify-between">
        <h2 className="text-left font-bold text-2xl">Data {label}</h2>

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
      <div className="mx-5">
        {angkatan === "" ? (
          <StackedBar
            dataLulus={dataSudah}
            tahun={tahun}
            dataBelum={dataBelum}
          />
        ) : (
          <div className="flex justify-center">
            <PieChart
              dataLulus={dataSudah}
              angkatan={angkatan}
              dataBelum={dataBelum}
            />
          </div>
        )}
      </div>
      {/* End of Bar */}

      {/* Boxes */}
      <TotalNum
        belumSkripsi={
          angkatan === ""
            ? belumSkripsi
            : dataBelum[yearsString.indexOf(angkatan)]
        }
        sudahSkripsi={
          angkatan === ""
            ? sudahSkripsi
            : dataSudah[yearsString.indexOf(angkatan)]
        }
        label={label}
      />
      {/* End of Boxes */}

      {/* Search */}
      <div className="mx-8">
        <Search
          setSearch={handleSearch}
          setKategori={handleKategori}
          kategori={kategori}
          listKategori={["Nama", "NIM"]}
        />
      </div>

      {/* End of Search */}

      {/* Table */}
      <TabelRekap rekapData={data} />
      {/* End of Table */}
    </>
  );
}
