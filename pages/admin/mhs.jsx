import Head from 'next/head';
import { useState, useEffect } from "react";
import { getCookie } from 'cookies-next';
import useSWR from 'swr';


const token = getCookie('accessToken');
// Fetcher and set header x-access-token with token
const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      'x-access-token': token,
    },
  }).then((res) => res.json());

export default function MahasiswaAdmin() {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);

  const Mhs = () => {
    const { data: mahasiswa, error } = useSWR(
      `${process.env.BACKEND_API}/list-mahasiswa?page=${pageIndex}`,
      fetcher
    );
  };



  return (
    <>
      <Head>
        <title>Data Mahasiswa</title>
      </Head>
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

              <tbody class="bg-white">
                {mahasiswa &&
                  mahasiswa.map((mhs) => (
                    <tr tr key={mhs._id} >
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm leading-5 font-medium text-gray-900">
                              {mhs.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div class="text-sm leading-5 text-gray-900">
                          {mhs.nim}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div class="text-sm leading-5 text-gray-900">
                          {mhs.angkatan}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <span
                          class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${mhs.status.name === 'Aktif' || mhs.status.name === 'Lulus'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {mhs.status.name}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                        <a
                          href="#"
                          class="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
              <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
