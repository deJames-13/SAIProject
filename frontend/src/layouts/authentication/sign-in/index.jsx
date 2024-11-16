import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Switch from "@mui/material/Switch";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "axios";
import BasicLayout from "layouts/authentication/components/BasicLayout";


import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "states/auth/slice";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // Get the CSRF token from the cookie
  const getCsrfToken = () => {
    const name = "csrftoken";
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name))
      ?.split('=')[1];
    return cookieValue || '';
  };


  const handleSignin = async (event) => {
    event.preventDefault();

    axios.post(
      "http://localhost:8000/user/login/",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      dispatch(auth.setCredentials({
        userInfo: response.data.user,
        token: response.data.token
      }));
      setSuccessMessage("Login successful!");
      setErrorMessage("");
      navigate("/dashboard");
    }).catch((error) => {
      setErrorMessage(error.response?.data?.error || "An error occurred during login");
      setSuccessMessage("");
    });



  };


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            {/* <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid> */}
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSignin}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1} className="hidden">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>

            {errorMessage && (
              <MDBox mt={2}>
                <MDTypography color="error">{errorMessage}</MDTypography>
              </MDBox>
            )}
            {successMessage && (
              <MDBox mt={2}>
                <MDTypography color="success">{successMessage}</MDTypography>
              </MDBox>
            )}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Sign In
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
