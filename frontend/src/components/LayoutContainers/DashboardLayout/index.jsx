
import MDBox from "components/MDBox";
import { setLayout, useMaterialUIController } from "context";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";




function DashboardLayout({ children }) {
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (!userInfo?.id || !accessToken) {
      nav("/authentication/sign-in");
    }
  }, [userInfo])

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);
  ;

  return (!userInfo?.id || !accessToken) ? '' : (
    <MDBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </MDBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
