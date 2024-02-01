import React, { useState } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AnnouncementsTab from "./announcements/AnnouncementsTab";
import { BreadCrumb, CreateDrawer, TabMenu } from "../../../components";
import MyAnnouncementsTab from "./announcements/MyAnnouncementsTab";
import ProAdmin from "../../../layouts/ProAdmin";
import { AddButtonBottom } from "../../../style";
import AnnouncementsForm from "./form/AnnouncementsForm";

const AdminBreadCrumb = [
  {
    name: "Dashboard",
    link: "/pro/admin/dashboard",
    active: false,
  },
  {
    name: "Announcements",
    link: "",
    active: true,
  },
];

const Announcements = ({
  pageDetailsAnnouncements,
  pageDetailsMyAnnouncements,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleAPI = (value) => {
    setActiveTab(value);
  };

  const AnnouncementsComponent = activeTab === 0 && (
    <AnnouncementsTab />
  );

  const MyAnnouncementsComponent = activeTab === 1 && (
    <MyAnnouncementsTab />
  );

  const componentList = [AnnouncementsComponent, MyAnnouncementsComponent];

  const tabMenu = [
    {
      label: ` Announcements(${
        pageDetailsAnnouncements?.totalElements !== undefined
          ? pageDetailsAnnouncements?.totalElements
          : 0
      })`,
    },
    {
      label: `MyAnnouncements${
        pageDetailsMyAnnouncements?.totalElements !== undefined &&
        pageDetailsMyAnnouncements?.totalElements > 0
          ? "(" + pageDetailsMyAnnouncements?.totalElements + ")"
          : ""
      }`,
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={10} xs={12}>
            <BreadCrumb item={AdminBreadCrumb} />
          </Grid>
        </Grid>
      </Box>
      <AddButtonBottom>
        <CreateDrawer title="Add Announcements" isShowAddIcon={true}>
          <AnnouncementsForm />
        </CreateDrawer>
      </AddButtonBottom>
      <TabMenu
        menuButton={tabMenu}
        components={componentList}
        handleAPI={handleAPI}
      />
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  pageDetailsAnnouncements: state?.announcements?.announcementsData?.page,
  pageDetailsMyAnnouncements: state?.announcements?.myAnnouncementsData?.page,
});

Announcements.layout = ProAdmin;

export default connect(mapStateToProps, null)(Announcements);
