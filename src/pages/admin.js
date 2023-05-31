import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import { useEffect, useState } from 'react';

const Page = () => {
  const [rows, setRows] = useState([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const [didRequest, setDidRequest] = useState(false);

  const handleDelete = async () => {
    console.log('Deleting selected users');
    console.log(rows);
    console.log(selectedCustomerIds);
    // for (const user of rows.filter(row => {console.log(row); return selectedCustomerIds.indexOf(row.user_id) >= 0;}) ) {
    //   const result = await fetch(`/api/users/${encodeURIComponent(user.user_id)}`, {method: 'DELETE'});
    //   if (result.ok) {

    //   } else {
    //     alert('Delete failed');
    //   }
    // }
  }
  useEffect(() => {
    if (!didRequest && (!rows || rows.length <= 0)) {
      fetch(`/api/organizations`, { method: 'GET' }).then(raw => raw.json()).then(organizations => {
          console.log(organizations)
          if (!rows || rows.length <= 0) {
            setRows(organizations);
          }
          
      });
      setDidRequest(true);
    }
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
          <CustomerListToolbar onDelete={handleDelete} rowType={"organization"} addRowLink={"/create-organization"} pageTitle="Administrator" />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={rows} selectedCustomerIds={selectedCustomerIds} setSelectedCustomerIds={setSelectedCustomerIds} />
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
