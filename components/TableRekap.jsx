import { useState, useEffect } from "react";
import titlecase from "../utils/functions/titlecase";
import Link from "next/link";

export default function TabelRekap({ rekapData, role }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (rekapData) {
      setData(rekapData);
    }
  }, [rekapData]);

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="py-2 my-2 overflow-x-auto w-full px-6">
        <div className="inline-block w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Nama
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  NIM
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Angkatan
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Aksi
                </th>
              </tr>
            </thead>
            {/* show data in table body with access to status.name */}
            {/* iterasi data pada rekap data */}
            <tbody className="bg-white">
              {data.map((el, idx) => {
                return (
                  <tr key={el.nim}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {el.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {el.nim}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {el.angkatan}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          el.status_konfirmasi === "belum"
                            ? "bg-red-300 text-red-900"
                            : "bg-green-300 text-green-900"
                        }`}
                      >
                        {titlecase(el.status_konfirmasi)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Link href={`/${role}/mhs/${el.nim}`}>
                          <a>Detail</a>
                        </Link>
                      </a>
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
  );
}
