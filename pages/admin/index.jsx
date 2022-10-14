import Head from "next/head";

export default function HomeAdmin() {
  return (
    <>
      <Head>
        <title>Home Admin</title>
      </Head>
      <h2 className="text-left font text-2xl pl-5 pt-4">
        Selamat datang, <span className="font-semibold">Operator</span>
      </h2>
    </>
  );
}
