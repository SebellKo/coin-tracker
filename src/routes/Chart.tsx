import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ApexChart from 'react-apexcharts';
import { fetchCoinHistory } from '../api';

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        // <ApexChart
        //   type="line"
        //   series={[
        //     {
        //       name: 'Price',
        //       data: data?.map((price) => parseFloat(price.close)) ?? [],
        //     },
        //   ]}
        //   options={{
        //     theme: {
        //       mode: 'dark',
        //     },
        //     chart: {
        //       height: 300,
        //       width: 500,
        //       toolbar: {
        //         show: false,
        //       },
        //       background: 'transparent',
        //     },
        //     grid: { show: false },
        //     stroke: {
        //       curve: 'smooth',
        //       width: 3,
        //     },
        //     yaxis: { show: false },
        //     xaxis: {
        //       categories: data?.map((price) => price.time_close),
        //       axisBorder: { show: false },
        //       axisTicks: { show: false },
        //       labels: { show: false },
        //       type: 'datetime',
        //     },
        //     fill: {
        //       type: 'gradient',
        //       gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
        //     },
        //     colors: ['#0fbcf9'],
        //     tooltip: {
        //       y: {
        //         formatter: (value) => `$ ${value.toFixed(2)}`,
        //       },
        //     },
        //   }}
        // ></ApexChart>
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((item) => {
                  return {
                    x: item.time_close,
                    y: [
                      Number(item.open).toFixed(2),
                      Number(item.high).toFixed(2),
                      Number(item.low).toFixed(2),
                      Number(item.close).toFixed(2),
                    ],
                  };
                }) ?? [],
            },
          ]}
          options={{
            chart: {
              type: 'candlestick',
              height: 350,
              background: 'transparent',
              toolbar: {
                show: false,
              },
            },
            title: {
              text: `chart`,
              align: 'center',
              style: {
                fontSize: '17px',
              },
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#ff817b',
                  downward: '#3bc1f1',
                },
                wick: {
                  useFillColor: true,
                },
              },
            },
            theme: {
              mode: 'dark',
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
