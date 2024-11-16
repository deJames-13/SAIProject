
import { useState } from 'react';


// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


import Footer from "components/Footer";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTabs from "components/MDTabs";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "components/Navbars/DashboardNavbar";


import { useEffect } from 'react';
import History from "./history";
import Reports from "./reports";
import Scan from "./scan";


export default function VirusTotal({ type = "url", active = "scan-url" }) {
  const [menu, setMenu] = useState(null);
  const [activeTab, setActiveTab] = useState(active);


  const tabs = {
    'scan-url': {
      label: 'Scan URL',
      sublabel: 'Scan a URL for malware using VirusTotal API',
      element: <Scan type="url" />,
    },
    'view-reports': {
      label: 'View Reports',
      sublabel: 'View reports of scanned URLs and files',
      element: <Reports type="type" />,
    },
    'scan-file': {
      label: 'Scan File',
      sublabel: 'Scan a file for malware using VirusTotal API',
      element: <Scan type="file" />,
    },
    'view-history': {
      label: 'View History',
      sublabel: 'View history of scanned URLs and files',
      element: <History />,
    },
  }

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = (tab) => () => {
    setMenu(null);
    setActiveTab(tab);
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      {Object.keys(tabs).map((tab) => {
        return (
          <MenuItem key={tab} onClick={closeMenu(tab)}>
            {tabs[tab].label}
          </MenuItem>
        );
      })}
    </Menu>
  );

  useEffect(() => {
    setActiveTab(active);
  }, [active]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="flex flex-col min-h-svh gap-4 pb-4">
        <Card className='min-h-svh'>
          <MDBox display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <MDBox>
              <MDTypography variant="h2" gutterBottom>
                {
                  tabs[activeTab].label
                }
              </MDTypography>
              <MDBox display="flex" alignItems="center" lineHeight={0}>
                <MDTypography variant="button" fontWeight="regular" color="text">
                  {tabs[activeTab]?.sublabel}
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox color="text" px={2}>
              <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
                more_vert
              </Icon>
            </MDBox>
            {renderMenu}
          </MDBox>

          <MDBox style={{
            fontSize: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem',
          }}>
            {tabs[activeTab].element}
          </MDBox>

        </Card>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </DashboardLayout>
  );
}

