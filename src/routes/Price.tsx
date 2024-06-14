import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 30px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.tapColor};
  border-radius: 10px;
  width: 100%;
  height: 70px;
  margin: 5px 0;
`;

const ContentTitle = styled.div`
  font-size: 10px;
  margin-bottom: 10px;
  font-weight: 800;
`;

const ConTentMain = styled.div<{ checker?: number }>`
  font-size: 18px;
  color: ${(props) =>
    props.checker!
      ? props.checker > 0
        ? 'crimson'
        : 'skyblue'
      : props.theme.accentColor};
`;

interface ITickersData {
  state: {
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  };
}

function Price() {
  const {
    state: { quotes },
  } = useLocation() as ITickersData;

  return (
    <Container>
      <Content>
        <ContentTitle>ALL TIME HIGH PRICE</ContentTitle>
        <ConTentMain>${quotes?.USD.ath_price}</ConTentMain>
      </Content>
      <Content>
        <ContentTitle>MARKET CAP</ContentTitle>
        <ConTentMain>${quotes?.USD.market_cap}</ConTentMain>
      </Content>
      <Content>
        <ContentTitle>PRICE CHANGE IN 1H</ContentTitle>
        <ConTentMain checker={quotes?.USD.percent_change_1h}>
          {quotes?.USD.percent_change_1h}%
        </ConTentMain>
      </Content>

      <Content>
        <ContentTitle>COIN VOLUME IN 24H</ContentTitle>
        <ConTentMain>{quotes?.USD.volume_24h}</ConTentMain>
      </Content>
    </Container>
  );
}

export default Price;
