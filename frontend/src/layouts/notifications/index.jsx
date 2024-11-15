// Notifications.jsx
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Footer from "components/Footer";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import useNotification from "hooks/notifications/useNotification";
import React from "react";

function Notifications() {
  const { showNotification, renderNotifications } = useNotification();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Notifications</MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  Notifications on this page use Toasts from Bootstrap. Read more details here.
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton
                      variant="gradient"
                      color="success"
                      onClick={() =>
                        showNotification(
                          "success",
                          "check",
                          "Material Dashboard",
                          "Hello, world! This is a success notification message",
                          "11 mins ago"
                        )
                      }
                      fullWidth
                    >
                      success notification
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      onClick={() =>
                        showNotification(
                          "info",
                          "notifications",
                          "Material Dashboard",
                          "Hello, world! This is an info notification message",
                          "11 mins ago"
                        )
                      }
                      fullWidth
                    >
                      info notification
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton
                      variant="gradient"
                      color="warning"
                      onClick={() =>
                        showNotification(
                          "warning",
                          "star",
                          "Material Dashboard",
                          "Hello, world! This is a warning notification message",
                          "11 mins ago"
                        )
                      }
                      fullWidth
                    >
                      warning notification
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton
                      variant="gradient"
                      color="error"
                      onClick={() =>
                        showNotification(
                          "error",
                          "warning",
                          "Material Dashboard",
                          "Hello, world! This is an error notification message",
                          "11 mins ago"
                        )
                      }
                      fullWidth
                    >
                      error notification
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {renderNotifications}
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;