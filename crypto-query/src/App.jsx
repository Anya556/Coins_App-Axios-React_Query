import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoinsTable from './components/CoinsTable';
import Container from 'react-bootstrap/Container';
import { useQuery } from '@tanstack/react-query';

async function fetchCoins() {
  const { data } = await axios.get(
    `https://api.coinstats.app/public/v1/coins?limit=10`
  );
  return data.coins;
}

export default function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['coins'],
    queryFn: fetchCoins,
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
    </Container>
  );
}
