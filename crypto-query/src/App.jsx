import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoinsTable from './components/CoinsTable';
import Container from 'react-bootstrap/Container';

function App() {
  const [coins, setCoins] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchCoins() {
    try {
      const { data } = await axios.get(
        `https://api.coinstats.app/public/v1/coins?limit=10`
      );
      setCoins(data.coins);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Error</h3>;
  }

  if (!coins) {
    return <h3> No data</h3>;
  }

  return (
    <Container style={{ marginTop: 30, maxWidth: 600 }}>
      <CoinsTable data={coins} />
    </Container>
  );
}

export default App;
