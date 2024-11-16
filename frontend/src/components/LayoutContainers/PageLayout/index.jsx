
import { useEffect } from "react";

// react-router-dom components
import { useLocation, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// React components
import MDBox from "components/MDBox";

// React context
import { setLayout, useMaterialUIController } from "context";
import { useSelector } from "react-redux";

function PageLayout({ background, children }) {
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  const [, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (userInfo?.id) {
      nav("/dashboard");
    } else {
      setLayout(dispatch, "page");
    }
  }, [pathname]);

  return userInfo?.id ? '' : (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden" }}
    >
      {children}
    </MDBox>
  );
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
  background: "default",
};

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired,
};

export default PageLayout;
