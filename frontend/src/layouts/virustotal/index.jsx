
import Footer from "components/Footer";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTabs from "components/MDTabs";
import DashboardNavbar from "components/Navbars/DashboardNavbar";


import History from "./history";
import Reports from "./reports";
import Scan from "./scan";

const tabs = [
  {
    name: 'Scan',
    element: <Scan />,
  },
  {
    name: 'Reports',
    element: <Reports />,
  },
  {
    name: 'History',
    element: <History />,
  }
]

export default function VirusTotal() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTabs tabs={tabs}>

      </MDTabs>
      <Footer />
    </DashboardLayout>
  );
}

