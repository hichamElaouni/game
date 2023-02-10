import React, { useEffect, useState } from 'react'
import Pagination from '../../../Setings/Pagination'
import Filter from '../../questions/Filter';
import Login from '../Auth/Login';
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
      <h1>Messages</h1>
      {/* <Login /> */}

      {/* <div className="container ">

        <Filter dataFilter={subjects} />
      </div> */}

      {/* <Pagination lengthPages={lengthTable} /> */}
    </>

  )
}
const subjects = [
  {
    id: 1,
    name: "Math",
  },
  {
    id: 2,
    name: "English",
  },
  {
    id: 3,
    name: "phisic",
  }
]