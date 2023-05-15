import Head from 'next/head';
import { Box, Container } from '@mui/material';

import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';

import { useEffect, useState } from 'react';
import { MemberListResults } from '../../components/customer/member-list-results';
import { useRouter } from 'next/router';

const Page = () => {
  const [rows, setRows] = useState([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [organization, setOrganization] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const handleDelete = async () => {
    console.log('Deleting selected users');
    console.log(rows);
    console.log(selectedCustomerIds);
    for (const user of rows.filter(row => {console.log(row); return selectedCustomerIds.indexOf(row.user_id) >= 0;}) ) {
      const result = await fetch(`/api/organizations/${encodeURIComponent(id)}/members/${encodeURIComponent(user.user_id)}`, {method: 'DELETE'});
      if (result.ok) {

      } else {
        alert('Remove failed');
      }
    }
  }
  useEffect(() => {
    
    fetch(`/api/organizations/${id}/members`, { method: 'GET' }).then(raw => raw.json()).then(rows => {
        console.log(rows)
        setRows(rows);
    });
  }, []);

  useEffect(() => { fetch(`/api/organizations/${id}`).then(async raw => setOrganization(await raw.json())) }, []);
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
        <Container maxWidth={false} >
          <CustomerListToolbar onDelete={handleDelete} pageTitle={organization ? `${organization.display_name} members administrator` : "Organization members"} />
          <Box sx={{ mt: 3 }}>
            <MemberListResults customers={rows.map(x => ({...x, id: x.user_id, }))} selectedCustomerIds={selectedCustomerIds} setSelectedCustomerIds={setSelectedCustomerIds} />
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