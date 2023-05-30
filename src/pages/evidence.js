import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Box, Container, Pagination, TableContainer, TableHead, Paper, Table, TableCell, TableBody, TableRow } from '@mui/material';
import { controls } from '../__mocks__/controls';
import ProductListToolbar from '../components/product/product-list-toolbar';
import ProductCard from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import Pdf from '../components/product/pdf';
import Chat from '../components/chat';

export default function Page() {

  const [currentControl, setCurrentControl] = useState('');
  const [evidence, setEvidence] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => console.log(file), [file]);
  useEffect(() => console.log(evidence), [evidence]);

  return (
    <>
      <Head>
        <title>
          Evidence | Controlcognizant
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar
            controls={controls}
            setFile={setFile}
            setCurrentControl={value => setCurrentControl(value)}
            setEvidence={value => setEvidence(value)}
            align={"center"}
          />
          <Box sx={{ pt: 3 }}>
            <TableContainer component={Paper}>
              <Table>
                {!currentControl ||
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ background: "#eee" }} colSpan={3}>Current control: {currentControl}</TableCell>
                    </TableRow>
                  </TableHead>}
                {(!evidence)
                  || (evidence.length == 0 && <TableBody><TableRow><TableCell align="center">No Evidence</TableCell></TableRow></TableBody>)
                  || <TableBody>{evidence && evidence.map ? evidence.map(row => (<ProductCard sx={{'&:last-child td, &:last-child th': {border: 0}}} row={row} setFile={setFile} />)): []}</TableBody>}
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3,
              mb: 5
            }}
          >
            <Pagination
              color="primary"
              count={3}
              size="small"
            />
          </Box>
          {<><Chat conversationID={file && file.chatid ? file.chatid : null} />{file && file.base64 && file.type ? <embed src={`data:${file.type};base64,${file.base64}`} />: <></>}{/*<Pdf file={file.file} />*/}</> }
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
