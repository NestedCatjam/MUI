import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const Sales = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        backgroundColor: '#FFF',
        barPercentage: 0.5,
        //barThickness is the width of the bar container, effectively used for padding
        barThickness: 0,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [100, 0, 0, 0],
        label: '',
        //maxBarThickness is the width of the visible bar
        maxBarThickness: 20
      },
      {
        backgroundColor: '#AAA',
        barPercentage: 0.5,
        //barThickness is the width of the bar container, effectively used for padding
        barThickness: 25,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [26, 5, 17, 99],
        label: 'This month',
        //maxBarThickness is the width of the visible bar
        maxBarThickness: 20
      },
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 25,
        borderRadius: 4,
        categoryPercentage: 0.5,
        // data: [18, 20, 17, 29, 30, 25, 13],
        data: [46, 25, 47, 99],
        label: 'Last month',
        maxBarThickness: 20
      },
      {
        backgroundColor: '#FFF',
        barPercentage: 0.5,
        //barThickness is the width of the bar container, effectively used for padding
        barThickness: 0,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [100, 0, 0, 0],
        label: '',
        //maxBarThickness is the width of the visible bar
        maxBarThickness: 20
      }
    ],
    labels: ['NIST', 'SOC2', 'GDPR', 'HITRUST']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: false,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        // action={(
        //   <Button
        //     endIcon={<ArrowDropDownIcon fontSize="small" />}
        //     size="small"
        //   >
        //     Last 7 days
        //   </Button>
        // )}
        //title="Latest Sales"
        title="Compliance Ratings"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};
