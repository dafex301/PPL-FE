import { useState, useEffect } from "react";

export default function TabelRekap({ rekapData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (rekapData) {
      setData(rekapData);
    }
  }, [rekapData]);

  return (
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
              {data.map((el, idx) => {
                return (
                  <tr key={idx + Math.floor(Math.random) * 1000}>
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
  );
}
