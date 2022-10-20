import React, { useEffect, useState } from "react";
import Pagination from "../../../Setings/Pagination"
export default function Messages() {

  useEffect(() => {

    console.log("message");
  }, [])
  return (
    <>
      <div className="boxMassages">
        <h1>message</h1>
      </div>
      <div className="Pagination">
        <Pagination />
      </div>
    </>
  )
}
