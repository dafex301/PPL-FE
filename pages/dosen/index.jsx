import React from 'react'
import DonutChart from '../../components/charts/DonutChart'

export default function index() {
  return (
    <>
      <DonutChart API={`${process.env.BACKEND_API}/rekap/dosen`} label={"Home Departemen"} angkatan={"#"} />
    </>
  )
}



