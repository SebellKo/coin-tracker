import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Coin from './Coin';
import Coins from './Coins';
import Price from './Price';
import Chart from './Chart';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin></Coin>}>
          <Route path="price" element={<Price></Price>}></Route>
          <Route path="chart" element={<Chart></Chart>}></Route>
        </Route>
        <Route path="/" element={<Coins></Coins>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
