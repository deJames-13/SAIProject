import React from "react";
import { Grid, Container } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "components/Cards/StatisticsCards/ComplexStatisticsCard";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "components/Footer";
import PieChartComponent from "components/Charts/PieChartComponent";
import BarChartComponent from "components/Charts/BarChartComponent";
import LineChartComponent from "components/Charts/LineChartComponent";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Projects from "layouts/dashboard/components/Projects";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        {/* Status Boxes */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than last week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        {/* Charts Overview */}
        <MDBox mt={4.5}>
          <Grid container spacing={50}>
            {/* Bar Chart */}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <BarChartComponent
                  color="info"
                  title="Website Views"
                  description="Last Campaign Performance"
                  date="Campaign sent 2 days ago"
                />
              </MDBox>
            </Grid>

            {/* Line Chart */}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <LineChartComponent
                  color="success"
                  title="Daily Sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today's sales.
                    </>
                  }
                  date="Updated 4 minutes ago"
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
  <Grid container spacing={3} justifyContent="center" alignItems="center">
    {/* Pie Chart */}
    <Grid item xs={12} md={6} lg={4}>
      <MDBox mb={3} display="flex" justifyContent="center">
        <PieChartComponent
          color="dark"
          title="VirusTotal Status"
          description="Distribution of VirusTotal statuses"
          date="Updated 1 hour ago"
        />
      </MDBox>
    </Grid>
  </Grid>
</MDBox>



        {/* Progress Overview */}
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
