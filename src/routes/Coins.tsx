import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: #fff;
  color: ${({ theme }) => theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${({ theme }) => theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${({ theme }) => theme.textColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
      </Header>
      {isLoading ? (
        <Loader>'Loading...'</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ coin: coin }}>
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                  alt="icon"
                ></Img>
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
