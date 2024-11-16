import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Divider, TextField, Button } from "@mui/material";

// React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// React example components
import ProfileInfoCard from "components/Cards/InfoCards/ProfileInfoCard";
import DefaultProjectCard from "components/Cards/ProjectCards/DefaultProjectCard";
import Footer from "components/Footer";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import ProfilesList from "components/Lists/ProfilesList";
import DashboardNavbar from "components/Navbars/DashboardNavbar";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Overview() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  useEffect(() => {
    // Fetch user data from localStorage or an API
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    setUserData(storedUserInfo);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log('User Data being sent:', userData);
    
    try {
      const response = await axios.put(
        "http://localhost:8000/user/update/", // Backend endpoint for updating user
        {
          username: userData.username, 
          email: userData.email, 
          first_name: userData.first_name, 
          last_name: userData.last_name,   
          password: userData.password      
        },
        {
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      // Update the localStorage with the updated user data
      localStorage.setItem('userInfo', JSON.stringify(response.data)); // Save updated user data to localStorage
      
      // Handle success
      alert("Profile updated successfully!");
      // Update state with the latest user data (optional, if needed for immediate UI updates)
      setUserData(response.data);

    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert("Error updating profile!");
    }
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <MDBox p={2} sx={{ position: "relative", zIndex: 2, mt: -55  }}>
                <MDTypography variant="h6" mb={2}>
                  Edit Profile
                </MDTypography>
                <form>
                  <div>
                    <TextField
                      label="Username"
                      variant="outlined"
                      name="username"
                      value={userData.username}
                      onChange={handleInputChange}
                      fullWidth
                      sx={{ padding: "10px" }}
                    />
                  </div>
                  <div>
                    <TextField
                      label="Email"
                      variant="outlined"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      fullWidth
                      sx={{ padding: "10px" }}
                    />
                  </div>
                  <div>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      name="first_name"
                      value={userData.first_name}
                      onChange={handleInputChange}
                      fullWidth
                      sx={{ padding: "10px" }}
                    />
                  </div>
                  <div>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      name="last_name"
                      value={userData.last_name}
                      onChange={handleInputChange}
                      fullWidth
                      sx={{ padding: "10px" }}
                    />
                  </div>
                  <div>
                    <TextField
                      label="Password"
                      variant="outlined"
                      name="password"
                      type="password"
                      value={userData.password}
                      onChange={handleInputChange}
                      fullWidth
                      sx={{ padding: "10px" }}
                    />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                      Save
                    </Button>
                  </div>
                </form>
              </MDBox>
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList title="Conversations" profiles={profilesListData} shadow={false} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2} sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
