import Head from 'next/head';
import { useState, useEffect } from "react";
import { getCookie } from 'cookies-next';
import useSWR from 'swr';
import Pagination from '../../components/pagination';
import { paginate } from "../../utils/functions/paginate";

const token = getCookie('accessToken');
// Fetcher and set header x-access-token with token
const fetcher = (...args) =>
    fetch(...args, {
        headers: {
            'x-access-token': token,
        },
    }).then((res) => res.json());

export default function AccountAdmin() {
    const [posts, setposts] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const pageSize = 8;

    const { data: user, error } = useSWR(
        `${process.env.BACKEND_API}/list-user`,
        fetcher
    );

    // useEffect for setposts
    useEffect(() => {
        if (user) {
            setposts(user);
        }
    }, [user]);

    const handlePageChange = (page) => {
        setcurrentPage(page);
    };

    const userPosts = paginate(posts, currentPage, pageSize);

    return (
        <>
            <Head>
                <title>List Akun</title>
            </Head>
            <div class="flex flex-col items-center mt-4">
                <div class="py-2 my-2 overflow-x-auto w-full px-6">
                    <div class="inline-block w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <table class="min-w-full">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Username
                                    </th>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Email
                                    </th>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Role
                                    </th>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            {/* show data in table body */}
                            <tbody class="bg-white">
                                {userPosts &&
                                    userPosts.map((u) => (
                                        <tr key={u._id}>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div class="flex items-center">
                                                    <div class="ml-4">
                                                        <div class="text-sm leading-5 font-medium text-gray-900">
                                                            {u.username}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div class="text-sm leading-5 text-gray-900">
                                                    {u.email}
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div class="text-sm leading-5 text-gray-900">
                                                    {u.roles.name}
                                                </div>
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
                        </table>
                    </div>
                    <br />
                    <br />
                    <Pagination items={posts.length} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
                </div>
            </div>
        </>
    );
}
