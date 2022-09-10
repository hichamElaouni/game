import React from "react";

export default function AddStudent(props) {
  const { getInfoStudent } = props;
  return <>
    <div className="textBox">
      <div className="titlebox">
        <h2>Full Name </h2>
        <input type="text" name="fullName" placeholder="Full Name" onChange={(event) => { getInfoStudent(event) }} required pattern="" title="" />
      </div>
      <div className="titlebox">
        <h2>Email</h2>
        <input type="email" name="email" placeholder="Email" onChange={(event) => { getInfoStudent(event) }} required pattern="" title="" />
      </div>
      <div className="titlebox">
        <h2>Password</h2>
        <input type="text" name="password" placeholder="Password" onChange={(event) => { getInfoStudent(event) }} required pattern="" title="" />
      </div>
      <div className="titlebox">
        <h2>Adress</h2>
        <input type="text" name="adress" placeholder="Adress" onChange={(event) => { getInfoStudent(event) }} pattern="" title="" />
      </div>
      <div className="titlebox">
        <h2>Telephone</h2>
        <input type="text" name="telephone" placeholder="Telephone" onChange={(event) => { getInfoStudent(event) }} pattern="" title="" />
      </div>
      <div className="titlebox">
        <h2>Date Born</h2>
        <input type="Date" name="dateBorn" placeholder="Date Born" onChange={(event) => { getInfoStudent(event) }} required pattern="" title="" />
      </div>
      <div className="titlebox">
        <h2>Class</h2>
        <input type="text" name="classStudent" placeholder="Class" onChange={(event) => { getInfoStudent(event) }} required pattern="" title="" />
      </div>


    </div>

  </>;
}
