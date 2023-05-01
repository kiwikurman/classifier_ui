import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { TransactionTable } from 'src/sections/overview/transaction-table';
import { Categories } from 'src/sections/overview/category-list';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useState, useEffect } from 'react';


const now = new Date();


const Page = () =>
{
const [data, setData] = useState([
                  {
                    id: 'ddc0a50f0c764e02a8d9a05a59ca1611',
                    amount: 30.5,
                    merchant: 'ארומה',
                    createdAt: 1555016400000,
                    full_text_classification: 'Coffee'
                  },
                  {
                    id: '22f4566ab8d24685a5466b1a3ec1fda7',
                    amount: 30.5,
                    merchant: 'לנדוור',
                    createdAt: 1555016400000,
                    full_text_classification: 'Coffee'
                  }
                ]);
useEffect(() => {
    fetch('https://v13wwxozn7.execute-api.eu-central-1.amazonaws.com/default/getTransactionList')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);
return (
  <>
    <Head>
      <title>
        SmartClassifier
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
              transactions={data}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <Categories
              categories={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  name: 'Restaurants',
                  updatedAt: subHours(now, 6).getTime()
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  name: 'Coffee',
                  updatedAt: subDays(subHours(now, 8), 2).getTime()
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  name: 'Groceries',
                  updatedAt: subDays(subHours(now, 1), 1).getTime()
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  name: 'Gas',
                  updatedAt: subDays(subHours(now, 3), 3).getTime()
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'hoog',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                },
                {
                  id: '3d4633a613d04b7389e365b905bf2f2f',
                  image: '/assets/products/product-7.png',
                  name: 'Gifts',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                },
                {
                  id: '00d2e9ed172c49b8a6aa6bf44b6d101b',
                  image: '/assets/products/product-7.png',
                  name: 'Clothing',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                },
                {
                  id: 'db6f4f8282d2472793b88d03e0ca12a1',
                  image: '/assets/products/product-7.png',
                  name: 'Home Improvement',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                },
                {
                  id: 'fe5c166e5d5a4a5d8646ac16c7b0785f',
                  image: '/assets/products/product-7.png',
                  name: 'Alternative Transport',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                },
                {
                  id: '9644c4aa3f3a4c539a1ad4b27e0d5a1f',
                  image: '/assets/products/product-7.png',
                  name: 'TV, internet and cellphone bills',
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
}


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


export default Page;
