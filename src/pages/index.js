import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { TransactionTable } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        Overview | Devias Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
        <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <TransactionTable
              transactions={[
                {
                  id: 'ddc0a50f0c764e02a8d9a05a59ca1611',
                  amount: 30.5,
                  merchant: 'ארומה',
                  createdAt: 1555016400000,
                  classification: 'Coffee'
                },
                {
                  id: '22f4566ab8d24685a5466b1a3ec1fda7',
                  amount: 30.5,
                  merchant: 'לנדוור',
                  createdAt: 1555016400000,
                  classification: 'Coffee'
                },
                {
                  id: 'd9c9e6e10bf74c3595e748d5f5c5b7e5',
                  amount: 30.5,
                  merchant: 'ארומה',
                  createdAt: 1555016400000,
                  classification: 'Coffee'
                },
                {
                  id: 'e33a6d1e9b554f09b204df24c433558e',
                  amount: 30.5,
                  merchant: 'מון סושי בר',
                  createdAt: 1555016400000,
                  classification: 'Restaurant'
                },
                {
                  id: '1f28a2cb394d4eb6a80f768c3e3c3b9c',
                  amount: 30.5,
                  merchant: 'רמי לוי',
                  createdAt: 1555016400000,
                  classification: 'Groceries'
                },
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestProducts
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-1.png',
                  name: 'Healthcare Erbology',
                  updatedAt: subHours(now, 6).getTime()
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-2.png',
                  name: 'Makeup Lancome Rouge',
                  updatedAt: subDays(subHours(now, 8), 2).getTime()
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-5.png',
                  name: 'Skincare Soja CO',
                  updatedAt: subDays(subHours(now, 1), 1).getTime()
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-6.png',
                  name: 'Makeup Lipstick',
                  updatedAt: subDays(subHours(now, 3), 3).getTime()
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'Healthcare Ritual',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
