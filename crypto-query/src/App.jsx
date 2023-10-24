import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoinsTable from './components/CoinsTable';
import Container from 'react-bootstrap/Container';
import { useQuery } from '@tanstack/react-query';
import API_KEY from './config';
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';

async function fetchCoins() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': API_KEY,
    },
  };
  const { data } = await axios.get(
    'https://openapiv1.coinstats.app/coins',
    options
  );
  return data.coins;
}

export default function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['coins', fetchCoins],
    queryFn: fetchCoins,
    // queryFn: () => fetchCoins(page),
    // keepPreviousData: true,
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>Error</h3>;
  }

  if (!data) {
    return <h3> No data</h3>;
  }

  return (
    <Container style={{ marginTop: 30, maxWidth: 600 }}>
      <CoinsTable data={data} />

      {/* <Button
        style={{ marginRight: 20 }}
        variant="outline-primary"
        onClick={() => setPage((page) => page - 10)}
        disabled={!page}
      >
        Back
      </Button>
      <Button
        variant="outline-primary"
        onClick={() => setPage((page) => page + 10)}
      >
        Next
      </Button> */}
    </Container>
  );
}
