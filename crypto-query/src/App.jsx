import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoinsTable from './components/CoinsTable';
import Container from 'react-bootstrap/Container';
import { useQuery } from '@tanstack/react-query';
import API_KEY from './config';

async function fetchCoins() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': API_KEY,
    },
  };

  const response = await axios.get(
    'https://openapiv1.coinstats.app/coins',
    options
  );
  return response.data;
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
