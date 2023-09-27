import Paginations from "@material-ui/lab/Pagination";
import "./Setings.css";

export default function Pagination(props) {
  const { lengthPages, setPage, setLimit } = props;

  return (
    <div
      className="pagination"
      style={lengthPages < 0 ? { display: "none" } : { display: "flex" }}
    >
      <Paginations
        count={Math.ceil(lengthPages)}
        onClick={(event) => {
          setPage(event.target.textContent);
        }}
      />
      <select
        className="selectPagination"
        onChange={(event) => {
          setLimit(event.target.value);
        }}
      >
        <option value="15">15</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}
