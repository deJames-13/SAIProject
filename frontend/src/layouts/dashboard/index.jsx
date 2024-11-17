import { Container, Grid } from "@mui/material";
import ComplexStatisticsCard from "components/Cards/StatisticsCards/ComplexStatisticsCard";
import BarChartComponent from "components/Charts/BarChartComponent";
import LineChartComponent from "components/Charts/LineChartComponent";
import Footer from "components/Footer";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Projects from "layouts/dashboard/components/Projects";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import React from "react";
import StatusBoxes from "./components/StatusBoxes";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        {/* Status Boxes */}
        <StatusBoxes />


        <MDBox mt={4.5}>
          <Grid container spacing={3}> {/* Adjusts overall spacing */}
            <Grid item xs={12} md={12} lg={12}> {/* Set to full width */}
              <MDBox
                mb={3}
                display="flex"
                justifyContent="flex-start" // Align chart closer to the start (left)
                alignItems="center"
                width="100%"
                height="100%"
                sx={{
                  maxWidth: "100%",
                  minHeight: 400,
                }}
              >
                <BarChartComponent
                  color="dark"
                  title="VirusTotal Status"
                  description="Distribution of VirusTotal statuses"
                  date="Updated 1 hour ago"
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}> {/* Adjusts overall spacing */}
            <Grid item xs={12} md={12} lg={12}> {/* Set to full width */}
              <MDBox
                mb={3}
                display="flex"
                justifyContent="flex-start" // Align chart closer to the start (left)
                alignItems="center"
                width="100%"
                height="100%"
                sx={{
                  maxWidth: "100%",
                  minHeight: 400,
                }}
              >
                <LineChartComponent
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
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
