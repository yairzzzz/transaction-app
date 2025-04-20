import { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { transactionStore } from "../store/transactionStore";

export default function Pagination() {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { getTransactions } = transactionStore();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getTransactions({ page, limit: rowsPerPage });
  }, [rowsPerPage, page, getTransactions]);

  return (
    <TablePagination
      component="div"
      count={1000}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      style={{ color: "grey" }}
    />
  );
}
