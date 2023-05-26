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
import { getEvidence, updateEvidence } from '../../__mocks__/evidence';
import React, { useState } from 'react';
import AttachmentIcon from '@mui/icons-material/Attachment';


export default function ProductListToolbar(props) {

  const [category, setCategory] = useState('');
  const [controls, setControls] = useState('');
  const [control, setControl] = useState('');

  const [uploadFile, setUploadFile] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  // const [allEvidence, setAllEvidence] = useState(evidence);

  let evidence = getEvidence();

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
    props.setFile('');
    props.setEvidence(null);
    setCategory(e.target.value)
    props.controls.forEach(listing => {
      if(listing.category === e.target.value) {
        setControls(listing.controlRequirement);
      }
    });
<<<<<<< Updated upstream
  }
=======
  };

  const handleOrganizationChange = e => {
    setOrganization(e.target.value);
    console.log(e.target.value);

  };

  const handleNistControlChange = e => {
    setNistControl(e.target.value);
    props.setCurrentControl(e.target.value);
    console.log(e.target.value);
    const selectedNistControl = e.target.value;
    setDropdownDisabled(true);
    fetch(`/api/organizations/${organization}/controls/${selectedNistControl}/evidence`)
    .then(raw => raw.json())
    .then(evidence => {
      console.log("evidence: ", evidence);

      props.setEvidence(evidence);
    })



  };
>>>>>>> Stashed changes

  const handleControlChange = (e) => {
    setControl(e.target.value);
    props.setCurrentControl(e.target.value);
    console.log("setcurrentcontrol worked, or at least didn't break the program:", e.target.value);
    findEvidence(e.target.value);
  }

  const handleImport = (e) => {
    if(e.target.files && e.target.files[0]){
      const i = e.target.files[0]

      console.log("uploadFile:", i);
      setUploadFile(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const handleUpload = async (e) => {
    const body = new FormData();
    body.append("file", uploadFile);
    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });

    console.log("upload file:", uploadFile);
    console.log("upload file name:", uploadFile.name);

    console.log({control});
    const update = evidence.map(obj => {
      if(obj.control == control){
        obj.evidence.push(uploadFile.name);
      }
      return obj;
    })
    updateEvidence(update);
    setUploadFile(null);
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
          Evidence
        </Typography>
        {!control || <Box sx={{ m: 1 }}>
          <object src={createObjectURL}></object>
          {!uploadFile || <Typography>{uploadFile.name}</Typography>}
          <Button
          startIcon={(<AttachmentIcon fontSize="small" />)}
            variant="contained"
            component="label"
            sx={{ mr: 1 }}            
            >
            Import
          <input hidden type="file" name="myFile" onChange={handleImport}></input>
          </Button>
          <Button
            variant="contained"
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
            onClick={handleUpload}
          >
            Upload File
          </Button>
        </Box>}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Container>
              <FormControl sx={{ minWidth: 180, pb:2 }}>
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
              <br/>

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