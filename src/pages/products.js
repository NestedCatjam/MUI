import Head from 'next/head';
import React, { useState } from 'react';
import { Box, Container, Grid, List, ListItem, ListItemText, Pagination, Typography } from '@mui/material';
import { controls } from '../__mocks__/controls';
import ProductListToolbar from '../components/product/product-list-toolbar';
import ProductCard from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import  Pdf  from '../components/product/pdf';

export default function Page() {

  const [currentControl, setCurrentControl] = useState('');
  const [evidence, setEvidence] = useState(null);

  return (
    <>
      <Head>
        <title>
          Products | Controlcognizant
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
          <ProductListToolbar controls={controls} setCurrentControl={value => setCurrentControl(value)} setEvidence={value => setEvidence(value)} />
          <Box sx={{ pt: 3 }}>
            {!currentControl || <Typography align="center" mb="3"><b>Current control:</b> {currentControl}</Typography>}
            <List>
              {(!evidence) || (evidence.length == 0 && <Typography align="center" pt="2">No Evidence</Typography>) || evidence.map(row => (
                <ProductCard row={row} />
              ))}
            </List>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination
              color="primary"
              count={3}
              size="small"
            />
          </Box>
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
