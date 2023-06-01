import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoneyIcon from '@mui/icons-material/Money';
import React, { useState, useEffect } from 'react';

export const Budget = (props) => {

  const [nistControls, setNistControls] = useState(0);
  const [satisfiedNistControls, setSatisfiedNistControls] = useState(-1);
  const [lastMonth, setLastMonth] = useState(0);

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

  return(
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              CONTROLS COMPLIANT
            </Typography>
            {satisfiedNistControls !== -1 && satisfiedNistControls !== -1 &&<Typography
              color="textPrimary"
              variant="h4"
            >
              ({satisfiedNistControls}/{nistControls})
            </Typography>}
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'error.main',
                height: 56,
                width: 56
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {satisfiedNistControls !== -1 && satisfiedNistControls !== -1 &&<ArrowUpwardIcon color="success" />}
          {satisfiedNistControls !== -1 && satisfiedNistControls !== -1 &&<Typography
            color="success"
            sx={{
              mr: 1
            }}
            variant="body2"
          >
            {(satisfiedNistControls / nistControls) - lastMonth}%
          </Typography>}
          {satisfiedNistControls !== -1 && satisfiedNistControls !== -1 &&<Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>}
        </Box>
      </CardContent>
    </Card>
)};
