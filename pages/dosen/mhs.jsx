import Head from "next/head";
import Link from "next/link";

export default function MhsDosen() {
  return (
    <>
      <Head>
        <title>Data Mahasiswa</title>
      </Head>
      <Link href="/dosen/mhs/1">
        <a>Detail Mahasiswa</a>
      </Link>
    </>
  );
}
