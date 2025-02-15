import { Box, Paper, Stack, Typography } from '@mui/material';
import { useGetRequestsQuery } from '@/lib/api/api';
import { transformDataForCardsView } from '@/components/helpCards/singleCard';
import { HelpCards } from '@/components';
import { ToggleCardsView } from '@/components';
import { RequestsPagination } from '@/components';
import React, { useEffect } from 'react';
import { usePagination } from '@/lib/usePagination';
import { useFilteredDataSelector, useFiltersStateSelector } from '../../state/selectors';
import { safeScrollToTop } from '@/lib/safeScrollToTop';

export const Results = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const {
    isLoading: isLoadingRequests,
    error,
    isFetching: isFetchingRequests,
    refetch: refetchRequests,
  } = useGetRequestsQuery();
  const filters = useFiltersStateSelector();

  // Cтейт чтобы удлинить отображение загрузки
  const [isFakeLoading, setIsFakeLoading] = React.useState(true);

  const isLoading = isLoadingRequests || isFakeLoading || isFetchingRequests;
  const noErrorOrLoading = !(error || isLoading);

  // ОТФИЛЬТРОВАННЫЕ ДАННЫЕ
  const filteredData = useFilteredDataSelector();
  const resultsFound = filteredData.length;

  const hasNoResultsOnFilter = filteredData?.length === 0;
  const dataNotEmpty = filteredData?.length > 0;
  const showPagination = filteredData && dataNotEmpty && !error && !isLoading;

  // ---------------------- PAGINATION -----------------
  const { currentItems, totalPages } = usePagination(filteredData, 6, currentPage);
  const itemsReadyForRender = transformDataForCardsView(currentItems);

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
    safeScrollToTop();
  };

  const handleRefetchRequests = () => {
    refetchRequests();
  };

  // Удлиняю время отображения загрузки в UI через isFakeLoading с setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFakeLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // ----------- ПЕРЕХОД НА 1-ю СТР ПРИ СМЕНЕ ФИЛЬТРОВ
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <Paper>
      <Box>
        <Stack padding="12px 36px 40px 36px" gap="20px">
          {noErrorOrLoading && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">Найдено: {resultsFound}</Typography>
              <ToggleCardsView />
            </Stack>
          )}
          <HelpCards
            cards={itemsReadyForRender}
            error={error}
            isLoading={isLoading}
            hasNoResults={hasNoResultsOnFilter}
            refetchRequests={handleRefetchRequests}
          />
          {/* {showPagination && (
            <RequestsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              setPage={handlePageChange}
            />
          )} */}
        </Stack>
      </Box>
    </Paper>
  );
};
