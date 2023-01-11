import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import { useEffect, useState } from 'react';

const Page = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetch(`/api/users`, { method: 'GET' }).then(raw => raw.json()).then(rows => {
        console.log(rows)
        setRows(rows);
    });
  }, []);
  return (
    <>
      <Head>
        <title>
          Administrator | Controlcognizant
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
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            {<CustomerListResults customers={rows} />}
          </Box>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
