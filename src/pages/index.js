import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { TransactionTable } from 'src/sections/overview/transaction-table';
import { Categories } from 'src/sections/overview/category-list';
import { ChartCategorySpending } from 'src/sections/overview/chart-category-spending';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useState, useEffect } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import { Auth } from 'aws-amplify';

const now = new Date();


const Page = () => {
  const [categories, setCategories] = useState([{"category": "groceries", "words": ["סופר פארם", "רמי לוי", "אפייה", "אפיה", "אייזיקס"]}])

  const [transactions, setTransactions] = useState(
      {
        "transactions": [
          {
            id: 'ddc0a50f0c764e02a8d9a05a59ca1611',
            amount: 0,
            merchant: 'חיובים יופיעו כאן',
            createdAt: 1555016400000,
            full_text_classification: 'הקסם קורה אחרי שמגדירים קטגוריה'
          },
          {
            id: '22f4566ab8d24685a5466b1a3ec1fda7',
            amount: 0,
            merchant: 'העלה קובץ חיובים כדי להתחיל',
            createdAt: 1555016400000,
            full_text_classification: 'הגדר קטגויות כדי להתחיל'
          }
        ],
        "summary": [],
        "bows": [
          {"category": "groceries", "words": ["סופר פארם", "רמי לוי", "אפייה", "אפיה", "אייזיקס"]},
          {"category": "restaurants", "words": ["פלאפל", "שווארמה", "מיסעדה", "סושי", "מסעדה"]},
        ]
      })

  const auth = useAuth();


  function getTransactionList() {
    const jwtToken = auth.user.session_token.accessToken.jwtToken;
    const idToken = auth.user.session_token.idToken.jwtToken;

    console.log(auth.user);
    fetch('https://g1y4r7q6t5.execute-api.eu-central-1.amazonaws.com/classifier/transactions',
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        idToken: `Bearer ${idToken}`,
      },
    }).then(response => response.json())
      .then(data => {
                      if ("transactions" in data) {
                        setTransactions(data);
                        console.log("setting transactions from server");
                      }
                      console.log("didn't get transactions from server");
                      console.log(data);
                    }
           )
      .catch(error => console.error(error));
  }

  function getCategoryList() {
    const jwtToken = auth.user.session_token.accessToken.jwtToken;
    const idToken = auth.user.session_token.idToken.jwtToken;

    fetch('https://g1y4r7q6t5.execute-api.eu-central-1.amazonaws.com/classifier/bows',{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        idToken: `Bearer ${idToken}`,
      },
    }).then(response => response.json())
      .then(data => {
                      if (Array.isArray(data)) {
                        setCategories(data);
                        console.log("setting categories i got from server");
                      }
                      console.log("didn't get categories from server. got this instead: ");
                      console.log(data);
                    }
           )
      .catch(error => console.error(error));
  }

  useEffect(() => {
    getTransactionList();
    getCategoryList();
      // Cleanup function (optional)
    return () => {
      // Perform any necessary cleanup here
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          SmartCard
        </title>
      </Head>
      <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            lg={8}
          >
            <ChartCategorySpending
              transactions={transactions}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >

          </Grid>
          <Grid
              xs={12}
              md={12}
              lg={8}
            >
              <TransactionTable
                transactions={transactions}
                sx={{ height: '100%' }}
                getDataClick={getTransactionList}
                setTransactions={setTransactions}
                getCategories={getCategoryList}
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
