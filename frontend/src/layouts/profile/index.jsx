import { Button, Divider, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef } from "react";

// React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// React example components
import Footer from "components/Footer";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";

// Overview page components
import Header from "layouts/profile/components/Header";

import useNotification from "hooks/notifications/useNotification";
import { useDispatch, useSelector } from "react-redux";
import * as auth from "states/auth/slice";


function Overview() {
  const { accessToken, userInfo } = useSelector(state => state.auth);
  const noti = useNotification();
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    const storedUserInfo = userInfo || {};
    if (usernameRef.current) usernameRef.current.value = storedUserInfo.username || "";
    if (emailRef.current) emailRef.current.value = storedUserInfo.email || "";
    if (firstNameRef.current) firstNameRef.current.value = storedUserInfo.first_name || "";
    if (lastNameRef.current) lastNameRef.current.value = storedUserInfo.last_name || "";
    if (passwordRef.current) passwordRef.current.value = storedUserInfo.password || "";
  }, []);

  const handleSave = async () => {
    const userData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      password: passwordRef.current.value,
    };

    console.log('User Data being sent:', userData);

    axios.put(
      `${import.meta.env.VITE_APP_API_URL}/user/update/`,
      userData,
      {
        headers: {
          Authorization: `Token ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    ).then(response => {
      dispatch(auth.setCredentials({ userInfo: response.data, token: accessToken }));
      noti.success('Profile updated successfully');
    }).catch(error => {
      noti.error('Failed to update profile');
      console.error('Failed to update profile:', error);
    });

  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mb={2} />

      <Header>


        <MDBox mt={5} mb={3} className="">
          <MDBox p={2} sx={{ position: "relative", zIndex: 2 }} className="border-t border-slate-300">
            <MDTypography variant="h6" mb={2}>
              Edit Profile
            </MDTypography>
            <form>
              <div>
                <TextField
                  label="Username"
                  variant="standard"
                  name="username"
                  inputRef={usernameRef}
                  defaultValue={userInfo.username}
                  fullWidth
                  sx={{ padding: "10px" }}
                />
              </div>
              <div>
                <TextField
                  label="Email"
                  variant="standard"
                  name="email"
                  inputRef={emailRef}
                  defaultValue={userInfo.email}
                  fullWidth
                  sx={{ padding: "10px" }}
                />
              </div>
              <div>
                <TextField
                  label="First Name"
                  variant="standard"
                  name="first_name"
                  inputRef={firstNameRef}
                  defaultValue={userInfo.first_name}
                  fullWidth
                  sx={{ padding: "10px" }}
                />
              </div>
              <div>
                <TextField
                  label="Last Name"
                  variant="standard"
                  name="last_name"
                  inputRef={lastNameRef}
                  defaultValue={userInfo.last_name}
                  fullWidth
                  sx={{ padding: "10px" }}
                />
              </div>
              <div>
                <TextField
                  label="Password"
                  variant="standard"
                  name="password"
                  type="password"
                  inputRef={passwordRef}
                  defaultValue={userInfo.password}
                  fullWidth
                  sx={{ padding: "10px" }}
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <Button variant="contained" onClick={handleSave} className="text-white">
                  Save
                </Button>
              </div>
            </form>
          </MDBox>
        </MDBox>


      </Header>

      <Footer />
      {noti.renderNotifications}
    </DashboardLayout>
  );
}

export default Overview;
