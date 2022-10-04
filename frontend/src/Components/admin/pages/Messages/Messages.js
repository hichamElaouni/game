import React, { useEffect, useState } from "react";

export default function Messages() {

  useEffect(() => {

    console.log("message");
  }, [])
  return <div className="boxMassages">

    <h1>message</h1>

  </div>;
}
