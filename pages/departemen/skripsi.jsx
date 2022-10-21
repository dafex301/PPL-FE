import Head from "next/head";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Pagination from "../../components/pagination";
import { paginate } from "../../utils/functions/paginate";
import useSWR from "swr";
import { getCookie } from "cookies-next";
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

            
      let dataPerTahunBelum = [];
      let dataPerTahunSudah = [];
      for(let i=0;i<variasiTahun.length;i++){
        dataPerTahunBelum.push(0);
        dataPerTahunSudah.push(0);
      } 

      for (let i = 0; i < rekapData.length; i++) {
          for(let j=0;j<variasiTahun.length;j++){ 
            if (rekapData[i].status_konfirmasi === "belum" && rekapData[i].angkatan === variasiTahun[j]) dataPerTahunBelum[j]++;
            else if (rekapData[i].status_konfirmasi === "sudah" && rekapData[i].angkatan === variasiTahun[j]) dataPerTahunSudah[j]++;
        }
      }
      // console.log(dataPerTahunSudah);
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
      {rekapData ? (
        <div class="flex flex-col items-center mt-4">
          <div class="py-2 my-2 overflow-x-auto w-full px-6">
            <div class="inline-block w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table class="min-w-full">
                <thead>
                  <tr>
                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Nama
                    </th>
                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      NIM
                    </th>
                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Angkatan
                    </th>
                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Status
                    </th>
                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Aksi
                    </th>
                  </tr>
                </thead>
                {/* show data in table body with access to status.name */}
                {/* iterasi data pada rekap data */}
                <tbody class="bg-white">
                  {rekapData.map((el, idx) => {
                    return (
                      <tr key={idx}>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div class="flex items-center">
                            <div class="ml-4">
                              <div class="text-sm leading-5 font-medium text-gray-900">
                                {el.nama}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div class="text-sm leading-5 text-gray-900">
                            {el.nim}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div class="text-sm leading-5 text-gray-900">
                            {el.angkatan}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span
                            class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              el.status_konfirmasi === "belum"
                                ? "bg-red-300 text-red-900"
                                : "bg-green-300 text-green-900"
                            }`}
                          >
                            {el.status_konfirmasi}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span
                            class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full `}
                          >
                            Detail
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <br />
            <br />
            {/* <Pagination
            items={5}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange} 
          /> */}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
