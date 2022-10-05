// Import navbar
import Navbar from '../components/navbar';

export default function Home() {
	// Use state profilePopUp
	return (
    <div>
      <Navbar />
      <div class="flex justify-center">
    <div class="flex justify-center gap-5 py-10 w-3/4">
        <div class="w-1/4">
            <div class="bg-white rounded-lg pb-5 shadow-lg">
                <div class="flex justify-center pt-3 gap-3">
                    <div
                        class="w-14 h-14 bg-blue-400 rounded-full mt-2"
                    ></div>
                    <div class="text-left">
                        <p class="font-bold">Nama</p>
                        <p class="text-sm">Role</p>
                        <p class="text-sm">Fakultas Sains dan Matematika</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-lg mt-4 flex flex-col">
                <div>
                    <div
                        class="flex items-center flex-row py-3 pl-3 hover:bg-gray-100 rounded-t-lg"
                    >
                        <i class="fa-solid fa-house pr-2"></i>
                        <p class="">Home</p>
                    </div>
                    <div
                        class="flex items-center flex-row py-3 pl-3 hover:bg-gray-100"
                    >
                        <i class="fa-solid fa-user pr-3"></i>
                        <p>Manajemen Akun</p>
                    </div>
                    <div
                        class="flex items-center flex-row py-3 pl-3 hover:bg-gray-100"
                    >
                        <i class="fa-solid fa-user-group pr-2"></i>
                        <p>Data Mahasiswa</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-3/4 pb-3 bg-white rounded-lg shadow-lg">
            <div class="flex justify-between">
                <h2 class="text-left font-bold text-2xl pl-5 pt-4">
                    Manajemen Akun
                </h2>
                <div
                    class="bg-green-500 rounded text-white pt-1 mr-6 mt-4 px-4 items-center shadow-slate-50"
                >
                    Add
                </div>
            </div>
            <div class="flex flex-col items-center mt-4">
                <div class="py-2 my-2 overflow-x-auto w-full px-6">
                    <div
                        class="inline-block w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
                    >
                        <table class="min-w-full">
                            <thead>
                                <tr>
                                    <th
                                        class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                                    >
                                        Name
                                    </th>
                                    <th
                                        class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                                    >
                                        NIM
                                    </th>
                                    <th
                                        class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                                    >
                                        Edit
                                    </th>
                                    <th
                                        class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                                    >
                                        Delete
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="bg-white">
                                <tr>
                                    <td
                                        class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                                    >
                                        <div class="flex items-center">
                                            <div
                                                class="flex-shrink-0 w-10 h-10"
                                            >
                                                <img
                                                    class="w-10 h-10 rounded-full"
                                                    src="https://source.unsplash.com/user/erondu"
                                                    alt="admin dashboard ui"
                                                />
                                            </div>

                                            <div class="ml-4">
                                                <div
                                                    class="text-sm font-medium leading-5 text-gray-900"
                                                >
                                                    John Doe
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td
                                        class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                                    >
                                        <div
                                            class="text-sm leading-5 text-gray-500"
                                        >
                                            24060120120001
                                        </div>
                                    </td>

                                    <td
                                        class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-6 h-6 text-blue-400 cursor-pointer"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-6 h-6 text-red-400 cursor-pointer"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                                    >
                                        <div class="flex items-center">
                                            <div
                                                class="flex-shrink-0 w-10 h-10"
                                            >
                                                <img
                                                    class="w-10 h-10 rounded-full"
                                                    src="https://source.unsplash.com/user/erondu"
                                                    alt="admin dashboard ui"
                                                />
                                            </div>

                                            <div class="ml-4">
                                                <div
                                                    class="text-sm font-medium leading-5 text-gray-900"
                                                >
                                                    John Doe
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td
                                        class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                                    >
                                        <div
                                            class="text-sm leading-5 text-gray-500"
                                        >
                                            24060120120002
                                        </div>
                                    </td>

                                    <td
                                        class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-6 h-6 text-blue-400 cursor-pointer"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-6 h-6 text-red-400 cursor-pointer"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                                    >
                                        <div class="flex items-center">
                                            <div
                                                class="flex-shrink-0 w-10 h-10"
                                            >
                                                <img
                                                    class="w-10 h-10 rounded-full"
                                                    src="https://source.unsplash.com/user/erondu"
                                                    alt="admin dashboard ui"
                                                />
                                            </div>

                                            <div class="ml-4">
                                                <div
                                                    class="text-sm font-medium leading-5 text-gray-900"
                                                >
                                                    John Doe
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td
                                        class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                                    >
                                        <div
                                            class="text-sm leading-5 text-gray-500"
                                        >
                                            24060120120003
                                        </div>
                                    </td>

                                    <td
                                        class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-6 h-6 text-blue-400 cursor-pointer"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-6 h-6 text-red-400 cursor-pointer"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
	);
}
