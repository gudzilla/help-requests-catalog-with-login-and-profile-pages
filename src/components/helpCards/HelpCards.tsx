import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { SingleCard } from '@/components/helpCards/singleCard';
import { DataForSingleCard } from '@/components/helpCards/singleCard/types';
import { RTKQueryRequestError } from '@/lib/api/types';

import NoResultsIcon from '@/assets/not-found-result.svg?react';
import { ResponsiveErrorIcon } from './ResponsiveErrorIcon';
import { theme } from '../../styles/theme';

const StyleToStrechContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '30px',
  height: { md: '40vh', lg: '64vh' },
};

type HelpCardsProps = {
  cards: DataForSingleCard[];
  error: RTKQueryRequestError;
  isLoading: boolean;
  hasNoResults: boolean | undefined;
  messageForNoResults?: string;
  refetchRequests: () => void;
};

export const HelpCards = (props: HelpCardsProps) => {
  const {
    cards,
    error,
    isLoading,
    hasNoResults,
    messageForNoResults = 'Запросы не найдены',
    refetchRequests,
  } = props;

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (isLoading) {
    return (
      <Box sx={StyleToStrechContainer}>
        <CircularProgress size="5rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={StyleToStrechContainer}>
        <Stack gap={{ xs: '10px', md: '20px' }}>
          <ResponsiveErrorIcon />
          <Typography color="error" variant={isSmallScreen ? 'h6' : 'h5'}>
            Ошибка! Не удалось загрузить информацию
          </Typography>
          <Button variant="outlined" onClick={refetchRequests}>
            Повторить запрос
          </Button>
        </Stack>
      </Box>
    );
  }

  if (hasNoResults) {
    return (
      <Box sx={StyleToStrechContainer}>
        <NoResultsIcon style={{ marginBottom: '24px' }} />
        <Typography variant="h5">{messageForNoResults}</Typography>
      </Box>
    );
  }

  return (
    // <Grid container rowSpacing="16px" columnSpacing="24px">
    <Grid
      container
      rowSpacing={isSmallScreen ? '16px' : '16px'}
      columnSpacing={isSmallScreen ? '16px' : '24px'}
    >
      {cards.map((request: DataForSingleCard) => {
        return <SingleCard key={request.id} dataForRequestCard={request} />;
      })}
    </Grid>
  );
};
