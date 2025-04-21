import { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { transactionStore } from "../store/transactionStore";

export default function Pagination() {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { getTransactions, totalCount, filterQuery, setFilterQuery } =
    transactionStore();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setFilterQuery({ page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setFilterQuery({ limit: +event.target.value });
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getTransactions(filterQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery?.page ?? 0, filterQuery?.limit ?? 10]);

  return (
    <TablePagination
      component="div"
      count={totalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      style={{ color: "grey" }}
    />
  );
}
