import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoinsTable from './components/CoinsTable';
import Container from 'react-bootstrap/Container';
import { useQuery } from '@tanstack/react-query';
import API_KEY from './config';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

async function fetchCoins(page) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': API_KEY,
    },
  };

  const response = await axios.get(
    `https://openapiv1.coinstats.app/coins?page=${page}`,
    options
  );
  return response.data;
}

export default function App() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['coins', page],
    queryFn: () => fetchCoins(page),
    keepPreviousData: true,
  });
  console.log(data);

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
      <Button
        variant="outline-primary"
        style={{ marginRight: 15 }}
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
      >
        Back
      </Button>
      <Button variant="outline-primary" onClick={() => setPage((p) => p + 1)}>
        Next
      </Button>
    </Container>
  );
}
