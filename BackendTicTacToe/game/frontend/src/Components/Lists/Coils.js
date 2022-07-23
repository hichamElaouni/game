import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";

const generateCells = (data) => {
  if (!data || data.length === 0)
    return (
      <TableRow>
        <TableCell align="left">No Data Exist</TableCell>
        <TableCell align="right"></TableCell>
      </TableRow>
    );
  const { date, ...rest } = data[0];
  return Object.entries(rest).map(([key, value]) => {
    return (
      <TableRow>
        <TableCell align="left">{key}</TableCell>
        <TableCell align="right">
          {value ? (
            <DoneIcon style={{ fill: "#34A853" }} />
          ) : (
            <ClearIcon style={{ fill: "#EA4335" }} />
          )}
        </TableCell>
      </TableRow>
    );
  });
};

const CoilList = (props) => {
  const { title, data } = props;

  return (
    <>
      <h1 style={{ float: "left", margin: "3vh" }}>{title}</h1>
      <div style={{ margin: "1vh 5vh 5vh 5vh" }}>
        <TableContainer style={{ height: "50vh" }} component={Paper}>
          <Table
            sx={{ minHeight: 100 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Attribut</b>
                </TableCell>
                <TableCell align="right">
                  <b>Value</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{generateCells(data)}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CoilList;
