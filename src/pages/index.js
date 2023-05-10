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


const Page = () => {
  const [categories, setCategories] = useState([{category: "Coffee"}, {category: "Restaurants"}])
  const [transactions, setTransactions] = useState([
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
        ])

  useEffect(() => {/*
      fetch('https://g1y4r7q6t5.execute-api.eu-central-1.amazonaws.com/classifier')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    */}, []);

  function getTransactionList() {
    fetch('https://g1y4r7q6t5.execute-api.eu-central-1.amazonaws.com/classifier/transactions')
      .then(response => response.json())
      .then(data => {
                      setTransactions(data);
                      console.log(data);
                    }
           )
      .catch(error => console.error(error));
  }

  function getCategoryList() {
    fetch('https://g1y4r7q6t5.execute-api.eu-central-1.amazonaws.com/classifier/bows')
      .then(response => response.json())
      .then(data => {
                      setCategories(data);
                      console.log(data);
                    }
           )
      .catch(error => console.error(error));
  }

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
                transactions={transactions}
                sx={{ height: '100%' }}
                getDataClick={getTransactionList}
                setRows={setTransactions}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <Categories
                categories={categories}
                sx={{ height: '100%' }}
                getDataClick={getCategoryList}
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
