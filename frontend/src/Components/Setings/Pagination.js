import React from "react";
import Paginations from '@material-ui/lab/Pagination';
import "./Setings.css"


export default function Pagination(props) {
  const { lengthPages, onclick, onchange } = props


  return <div className="pagination" style={lengthPages < 0 ? { display: "none" } : { display: "flex" }}>

    <Paginations count={Math.ceil(lengthPages)} onClick={(event) => { onclick(event) }} />
    <select className="selectPagination" onChange={(event) => { onchange(event) }}>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="75">75</option>
      <option value="100">100</option>
    </select>
  </div>
}
