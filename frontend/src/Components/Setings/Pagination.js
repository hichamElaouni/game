import React from "react";
import Paginations from '@material-ui/lab/Pagination';
import "./Setings.css"


export default function Pagination(props) {
  const { lengthPages, nextPage } = props
  return <div className="pagination" style={lengthPages < 1 ? { display: "none" } : { display: "flex" }}>
    <Paginations count={lengthPages} onClick={(event) => { nextPage(event) }} />
  </div>
}
