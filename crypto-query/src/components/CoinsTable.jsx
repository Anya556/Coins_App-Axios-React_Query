import React from 'react';
import Table from 'react-bootstrap/Table';

const CoinsTable = ({ data }) => {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>№</th>
          <th>Title</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {data.map((obj) => (
          <tr>
            <td>{obj.rank}</td>
            <td>
              <img
                src={obj.icon}
                width={20}
                style={{ marginRight: 10 }}
                alt="Coin"
              />
              {obj.name}
            </td>
            <td>$ {obj.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CoinsTable;
