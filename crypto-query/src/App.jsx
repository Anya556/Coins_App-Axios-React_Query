import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoinsTable from './components/CoinsTable';
import Container from 'react-bootstrap/Container';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

async function fetchCoins(page = 0) {
  const { data } = await axios.get(
    `https://api.coinstats.app/public/v1/coins?page=${page}&limit=10`
  );
  return data.coins;
}

export default function App() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['coins', page],
    queryFn: () => fetchCoins(page),
    keepPreviousData: true,
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

      <Button
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
      </Button>
    </Container>
  );
}
