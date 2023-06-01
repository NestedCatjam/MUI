import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import React, { useState, useEffect } from 'react';

export const TasksProgress = (props) => {

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
            PROGRESS THROUGH NIST:
          </Typography>
          {props.nistControls !== -1 && satisfiedNistControls !== -1 && <Typography
            color="textPrimary"
            variant="h4"
          >
            {(100 * satisfiedNistControls / nistControls).toFixed(2)}%
          </Typography>}
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      {nistControls !== -1 && satisfiedNistControls !== -1 && <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={(props.satisfiedNistControls / props.nistControls)}
          variant="determinate"
        />
      </Box>}
    </CardContent>
  </Card>
  )
};
