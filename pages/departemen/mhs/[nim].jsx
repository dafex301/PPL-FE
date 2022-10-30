import React from 'react'
import DetailPage from '../../../components/detail/detailPage';
import { useRouter } from "next/router";
 
function DetailMahasiswaDosen() {
    // nilai NIM dari paramter
    const router = useRouter();
    const { nim } = router.query;
  return (
    <>
      <DetailPage role={"departemen"} API={`${process.env.BACKEND_API}/departemen/mahasiswa/${nim}`}  nim={nim} />
    </>
  )
}

export default DetailMahasiswaDosen;




