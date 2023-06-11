import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';

const useChartOptions = (theCategories) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: theCategories,
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const ChartCategorySpending = (props) => {
  const { transactions, sx } = props;
  const theCategories = transactions.summary.map(obj => obj.category);

  const theSeries = transactions.summary.map(obj => obj.subtotal);
  let grand_total = 0;
  theSeries.forEach((number) => {
      grand_total += number;
  });
  const grand_total_text = "grand total: " + grand_total;
  const chart_data = [
                {
                  name: 'This year',
                  data: theSeries
                }]



  const chartOptions = useChartOptions(theCategories);
  console.log(theSeries);
  let theTitle = "Category Spending";
  if (theSeries.length == 0) {
    theTitle = theTitle + " - UPLOAD a file to begin!"
  }
  return (
    <Card sx={sx}>
      <CardHeader
        action={(
          <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            )}
          >
            Sync
          </Button>
        )}
        title={theTitle}
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chart_data}
          type="bar"
          width="100%"
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          /*endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}*/
          size="small"
        >
          {grand_total_text}
        </Button>
      </CardActions>
    </Card>
  );
};

ChartCategorySpending.protoTypes = {
  transactions: PropTypes.shape({
      transactions: PropTypes.array,
      summary: PropTypes.array
    }),
  sx: PropTypes.object
};
