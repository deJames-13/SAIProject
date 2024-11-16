
import { useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// React components
import MDBox from "components/MDBox";

// React example components
import ComplexStatisticsCard from "components/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "components/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "components/Charts/LineCharts/ReportsLineChart";
import Footer from "components/Footer";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";

// Data
import reportsBarChartData from "layouts/rtl/data/reportsBarChartData";
import reportsLineChartData from "layouts/rtl/data/reportsLineChartData";

// RTL components
import OrdersOverview from "layouts/rtl/components/OrdersOverview";
import Projects from "layouts/rtl/components/Projects";

// React contexts
import { setDirection, useMaterialUIController } from "context";

function RTL() {
  const [, dispatch] = useMaterialUIController();
  const { sales, tasks } = reportsLineChartData;

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="أموال اليوم"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "من الأسبوع الماضي",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="مستخدمو اليوم"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "من الأسبوع الماضي",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="عملاء جدد"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "من الشهر الماضي",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="مبيعات"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "مقارنة بيوم أمس",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="مشاهدات الموقع"
                  description="آخر أداء للحملة"
                  date="الحملة أرسلت قبل يومين"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="المبيعات اليومية"
                  description={
                    <>
                      (<strong>+15%</strong>) زيادة في مبيعات اليوم..
                    </>
                  }
                  date="تم التحديث منذ 4 دقائق"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="المهام المكتملة"
                  description="آخر أداء للحملة"
                  date="تم تحديثه للتو"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default RTL;
