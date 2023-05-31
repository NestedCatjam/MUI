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
import React, { useEffect, useState } from 'react';
import AttachmentIcon from '@mui/icons-material/Attachment';


export default function ProductListToolbar(props) {

  const [category, setCategory] = useState('');
  const [controls, setControls] = useState('');
  const [control, setControl] = useState('');
  const [organization, setOrganization1] = useState('');

 

  const [nistControls, setNistControls] = useState([]);
  const [nistControl, setNistControl] = useState('');
  const [nistControlCategory, setNistControlCategory1] = useState('');
  const [nistControlCategories, setNistControlCategories] = useState([]);
  const [dropdownDisabled, setDropdownDisabled] = useState(false);


  const setNistControlCategory = value => {
    setNistControlCategory1(value);
    setNistControl('');
  }

  const setOrganization = value => {
    setOrganization1(value);
    setNistControlCategory('');
  
  };

  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetch("/api/organizations").then(raw => raw.json()).then(organization => { console.log(organization); return organization }).then(organizations => setOrganizations(organizations))

  }, []);



  useEffect(() => {
    fetch("/api/categories").then(raw => raw.json()).then(categories => { console.log(categories); setNistControlCategories(categories); });
  }, []);

  const [uploadFile, setUploadFile] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  // const [allEvidence, setAllEvidence] = useState(evidence);

  let evidence = getEvidence();

  const findEvidence = (title) => {
    console.log("findEvidence title:", title);
    console.log({ evidence });
    const result = evidence.filter(row => row.control == title);
    console.log("resulting evidence:", result, result[0].evidence);
    props.setEvidence(result[0].evidence);
  };

  const handleNistControlCategoryChange = e => {
    setNistControlCategory(e.target.value);
    setNistControls([]);
    setNistControl('');
    setDropdownDisabled(true);
    fetch(`/api/categories/${encodeURIComponent(e.target.value)}`)
    .then(raw => raw.json())
    .then(nistControls => {console.log("NIST controls", nistControls); return nistControls; })
    .then(nistControls => {
      console.log(nistControls);
      setNistControls(nistControls);
      setDropdownDisabled(false);
    });
  };

  const handleCategoryChange = (e) => {
    setControls('');
    setControl('');
    props.setFile('');
    props.setEvidence(null);
    setCategory(e.target.value)
    props.controls.forEach(listing => {
      if (listing.category === e.target.value) {
        setControls(listing.controlRequirement);
      }
    });
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
    .then(raw => {console.log(raw.status); return raw.json();})
    .then(evidence => {
      console.log("evidence: ", evidence);

      props.setEvidence(evidence);
      setDropdownDisabled(false);
    });



  };


  const handleControlChange = (e) => {
    setControl(e.target.value);
    props.setCurrentControl(e.target.value);
    console.log("setcurrentcontrol worked, or at least didn't break the program:", e.target.value);
    findEvidence(e.target.value);
  };

  const handleImport = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]

      console.log("uploadFile:", i);
      setUploadFile(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const handleUpload = async (e) => {
    const body = new FormData();
    body.append("file", uploadFile);
    console.log("About to fetch");
    const response = await fetch(`/api/organizations/${organization}/controls/${nistControl}/evidence`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    console.log("upload file:", uploadFile);
    console.log("upload file name:", uploadFile.name);

    console.log({ control });
    const update = evidence.map(obj => {
      if (obj.control == control) {
        obj.evidence.push(uploadFile.name);
      }
      return obj;
    })
    updateEvidence(update);
    setUploadFile(null);
  };

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
        {!nistControl || <Box sx={{ m: 1 }}>
          <object src={createObjectURL}></object>
          {!uploadFile || <Typography>{uploadFile.name}</Typography>}
          <form action={`/api/organizations/${organization}/controls/${nistControl}/evidence`} method='post' encType='multipart/form-data'>
            <input type='file' name='file'></input>
            <Button variant="contained" startIcon={(<UploadIcon fontSize='small'/>)} sx={{mr: 1}} type='submit'>Upload</Button>
          </form>
          {/* <Button
            startIcon={(<AttachmentIcon fontSize="small" />)}
            variant="contained"
            component="button"
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
          </Button> */}
        </Box>}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Container>
              <FormControl sx={{ minWidth: 180, pb: 2 }}>
                <InputLabel id="organizationLabel">Organization</InputLabel>
                <Select labelId="Organization" id="organizations" label="Organization" value={organization} onChange={handleOrganizationChange}>
                  {organizations ? organizations.map(organization => (<MenuItem value={organization.id}>{organization.display_name}</MenuItem>)) : []}
                </Select>
              </FormControl>
              {organization ? <FormControl sx={{ minWidth: 180, pb: 2 }} disabled={dropdownDisabled}>
                <InputLabel id="nistControlCategoryLabel">NIST control category</InputLabel>
                <Select labelId="NistControlCategory" id="nistControlCategories" label="Nist control category" value={nistControlCategory} onChange={handleNistControlCategoryChange}>
                  {nistControlCategories && nistControlCategories.map ? nistControlCategories.map(nistControlCategory => (<MenuItem value={nistControlCategory}>{nistControlCategory}</MenuItem>)): <></>}
                </Select>
              </FormControl> : <></>}
              {nistControlCategory ? <FormControl sx={{ minWidth: 180, pb: 2 }}>
                <InputLabel id="nistControlLabel">NIST control</InputLabel>
                <Select labelId="NistControl" id="nistControls" label="NistControl" value={nistControl} onChange={handleNistControlChange}>
                  {nistControls && nistControls.map ? [...new Set(nistControls.map(nistControl => { console.log(nistControl); return (<MenuItem value={nistControl.id}>{nistControl.controlName}: {nistControl.controlDescription}</MenuItem>)}))] : []}
                </Select>
              </FormControl> : <></>}
              <FormControl sx={{ minWidth: 180, pb: 2 }}>

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
              <br />

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
