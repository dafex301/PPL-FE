import Head from "next/head";
import Link from "next/link";

export default function MhsDosen() {
  return (
    <>
      <Head>
        <title>Data Mahasiswa</title>
      </Head>
      <Link href="/dosen/mhs/24060120130106">
        <a>Detail Mahasiswa</a>
      </Link>
    </>
  );
}
