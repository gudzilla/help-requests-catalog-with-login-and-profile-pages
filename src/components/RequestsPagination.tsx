import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';

type RequestsPaginationProps = {
  totalPages: number;
  currentPage: number;
  setPage: (v: number) => void;
};

export function RequestsPagination(props: RequestsPaginationProps) {
  const { totalPages, currentPage, setPage } = props;
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
      />
    </Box>
  );
}
