import 'bootstrap/dist/css/bootstrap.min.css';
import CoinsTable from './components/CoinsTable';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Container style={{ marginTop: 30, maxWidth: 600 }}>
      <CoinsTable
        data={[
          {
            id: 'bitcoin',
            icon: 'https://static.coinstats.app/coins/1650455588819.png',
            name: 'Bitcoin',
            symbol: 'BTC',
            rank: 1,
            price: 23002.0486,
          },
        ]}
      />
    </Container>
  );
}

export default App;
