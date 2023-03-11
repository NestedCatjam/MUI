import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Select,
  InputLabel,
  FormControl,
  MenuItem
} from '@mui/material';
import { Download as DownloadIcon } from '../../icons/download';
import { Upload as UploadIcon } from '../../icons/upload';
import { evidence } from '../../__mocks__/evidence';
import React, { useState } from 'react';


// export const ProductListToolbar = (props) => (
export default function ProductListToolbar(props) {

  const [category, setCategory] = useState('');
  const [controls, setControls] = useState('');
  const [control, setControl] = useState('');

  const findEvidence = (title) => {
    console.log("findEvidence title:", title);
    console.log({evidence});
    const result = evidence.filter(row =>  row.control == title);
    console.log("resulting evidence:", result, result[0].evidence);
    props.setEvidence(result[0].evidence);
  }

  const handleCategoryChange = (e) => {
    setControls('');
    setControl('');
    props.setEvidence(null);
    setCategory(e.target.value)
    props.controls.forEach(listing => {
      if(listing.category === e.target.value) {
        setControls(listing.controlRequirement);
      }
    });
  }

  const handleControlChange = (e) => {
    setControl(e.target.value);
    props.setCurrentControl(e.target.value);
    console.log("setcurrentcontrol worked, or at least didn't break the program:", e.target.value);
    findEvidence(e.target.value);
  }

  return (
    <Box {...props}>

      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Products
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Import
          </Button>
          <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <Button
            color="primary"
            variant="contained"
          >
            Add products
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Container>
              <FormControl sx={{ minWidth: 180, pb: 3, pr: 2 }}>
                <InputLabel id="categoryLabel">Category</InputLabel>
                <Select
                  labelId="Category"
                  id="categories"
                  label="Category"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  {props.controls.map(listing => (
                    <MenuItem value={listing.category} key={listing.key}>{listing.category}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {!category ||
                <FormControl sx={{ minWidth: 180 }}>
                  <InputLabel id="controlLabel">Controls</InputLabel>
                  <Select
                    labelId="Control"
                    id="controls"
                    label="Control"
                    value={control}
                    onChange={handleControlChange}
                  >
                    {controls.map(control => (
                      <MenuItem value={control} key={control}>{control}</MenuItem>
                    ))}
                  </Select>
                </FormControl>}
            </Container>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};