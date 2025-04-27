import { useRef, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { transactionStore } from "../store/transactionStore";

export default function Pagination() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { getTransactions, totalCount, filterQuery, setFilterQuery } =
    transactionStore();

  let timeout = useRef(); // makes timeout defined between renders. used for debounce logic below
  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    clearTimeout(timeout.current);
    // debounce logic
    timeout.current = setTimeout(() => {
      const currentQuery = { ...filterQuery, page: newPage };
      setFilterQuery({ page: newPage });

      getTransactions(currentQuery);
    }, 500);
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(+event.target.value);
    setRowsPerPage(newLimit);
    setFilterQuery({ limit: newLimit });
    const currentQuery = { ...filterQuery, limit: newLimit };

    if (page > 0) {
      setPage(0);
      currentQuery.page = 0;
      setFilterQuery({ page: 0 });
    }

    getTransactions(currentQuery);
  };

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
