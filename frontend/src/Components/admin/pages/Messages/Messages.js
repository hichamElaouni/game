import React, { useEffect, useState } from 'react'
import Pagination from '../../../Setings/Pagination'
// import { getLengthTable } from '../../../service/api'


export default function Messages() {
  const [lengthTable, setLengthTable] = useState(5);

  // const LengthTable = async () => {
  //   const { data: { data } } = await getLengthTable();
  //   setLengthTable(data / 10);
  //   console.log(data);
  // }
  // useEffect(() => {
  //   LengthTable();
  // }, [])

  return (
    <>
      <Pagination lengthPages={lengthTable} />
    </>

  )
}
