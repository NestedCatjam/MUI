import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TabletIcon from '@mui/icons-material/Tablet';
import React, { useState, useEffect } from 'react';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

export const TrafficByDevice = (props) => {
  const theme = useTheme();

  const [nistControls, setNistControls] = useState(0);
  const [satisfiedNistControls, setSatisfiedNistControls] = useState(-1);

  useEffect(() => {
    console.log("fetching all NIST controls");
    fetch("/api/nist_controls").then(raw => raw.json())
    .then( output => { 
      console.log(typeof(output) + " output:" + output);
      let size = 0;
      for(let key in output){
        if(output.hasOwnProperty(key)){
          size++;
        }
      };
      setNistControls(size);
      return output; })
    .then(() => console.log("stored nistControls:", nistControls));
  }, [nistControls]);

  useEffect(() => {
    console.log("fetching all satisfied NIST controls");
    fetch("/api/satisfied_nist_controls").then(raw => raw.json())
    .then( output => { 
      console.log(output); 
      let size = 0;
      for(let key in output){
        if(output.hasOwnProperty(key)){
          size++;
        }
      };
      setSatisfiedNistControls(size);
      return output; })
    .then(() => console.log("stored satisfied nistControls:", satisfiedNistControls));
  }, []);

  const data = {
    datasets: [
      {
        // data: [26, 61, 13],
        // backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        data: [(satisfiedNistControls / nistControls).toFixed(2), 100-(satisfiedNistControls / nistControls).toFixed(2)],
        backgroundColor: ['#3F51B5', '#e53935'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    // labels: ['Compliant', 'Non-compliant', 'Under Review']
    labels: ['Compliant', 'Non-compliant']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const devices = [
    {
      title: 'Compliant',
      value: (100 * satisfiedNistControls / nistControls).toFixed(2),
      icon: CheckBoxIcon,
      color: '#3F51B5',
      iconColor: 'primary'
    },
    {
      title: 'Non-compliant',
      value: 100-(100 * satisfiedNistControls / nistControls).toFixed(2),
      icon: DisabledByDefaultIcon,
      color: '#E53935',
      iconColor: "error"
    },
    // {
    //   title: 'Under Review',
    //   value: 13,
    //   icon: PhoneIcon,
    //   color: '#FB8C00'
    // }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Compliance Statistics (NIST)" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value,
            iconColor
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color={iconColor} />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              {nistControls !== -1 && satisfiedNistControls !== -1 && <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
