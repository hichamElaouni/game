import React from "react";
import CustumCombobox from "../../../Setings/CustumCombobox";
import Data from "./DataStudents.json";

export default function FilterStudents(props) {
  //const {ages,classStudet,citys,students}=props;

  return (
    <div className="filters">
      <CustumCombobox title="Ages" data={ages} />
      <CustumCombobox title="Class Student" data={classStudet} />
      <CustumCombobox title="citys" data={citys} />
      <CustumCombobox title="Search" data={students} />
    </div>
  );
}
const ages = ["5=>7", "7=>9", "9=>11", "11=>13", "13=>15"];

const classStudet = Data.map((dataStudent) => dataStudent.classStudent);

const citys = ["city 1", "city 2", "city 3", "city 4", "city 5"];

const students = Data.map((dataStudent) => dataStudent.FullNameStudent);
