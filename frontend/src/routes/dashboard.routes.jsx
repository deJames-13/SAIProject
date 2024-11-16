/** 
  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  11. The `component` key is used to store the component of its route.
*/

// React layouts
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Dashboard from "layouts/dashboard";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import Tables from "layouts/tables";
import VirusTotal from "layouts/virustotal";


// @mui icons
import Icon from "@mui/material/Icon";

// Import chart components
import BarChartComponent from "components/Charts/BarChartComponent";
import LineChartComponent from "components/Charts/LineChartComponent";
import PieChartComponent from "components/Charts/PieChartComponent";

export const dashboardRoutes = [
  {
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Scan Url",
    key: "scan-url",
    icon: <Icon fontSize="small">code</Icon>,
    route: "/threats/scan-url",
    component: <VirusTotal type="url" active='scan-url' />,
  },
  {
    name: "Scan File",
    key: "scan-url-report",
    route: "/threats/scan-url/report",
    component: <VirusTotal type="url-report" active='scan-url-report' />,
  },
  {
    type: "collapse",
    name: "Scan File",
    key: "scan-file",
    icon: <Icon fontSize="small">folder</Icon>,
    route: "/threats/scan-file",
    component: <VirusTotal type="file" active='scan-file' />,
  },
  {
    name: "Scan File",
    key: "scan-file-report",
    route: "/threats/scan-file/report",
    component: <VirusTotal type="file-report" active='scan-file-report' />,
  },
  {
    type: "collapse",
    name: "View History",
    key: "history",
    icon: <Icon fontSize="small">history</Icon>,
    route: "/threats/view-history",
    component: <VirusTotal type="history" active='view-history' />,
  },
  {
    type: "collapse",
    name: "Pie Chart",
    key: "pie-chart",
    icon: <Icon>pie_chart</Icon>,
    route: "/charts/pie",
    component: <PieChartComponent />,
  },
  {
    type: "collapse",
    name: "Bar Chart",
    key: "bar-chart",
    icon: <Icon>bar_chart</Icon>,
    route: "/charts/bar",
    component: <BarChartComponent />,
  },
  {
    type: "collapse",
    name: "Line Chart",
    key: "line-chart",
    icon: <Icon>show_chart</Icon>,
    route: "/charts/line",
    component: <LineChartComponent />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];
