import React from "react";
import OverviewCards from "./overviewcCards";
import LiveMap from "./Livemap";
import FleetAnalytics from "./FleetAnalytics";
import EvtolListTable from "./EvtolListTable";
import Sidebar from "./Sidebar";
import './dashboard.css'

const AdminDashboard = () => {
  return (
    <>
        <div className="dash-view">
          {/* Overview Cards */}
          <OverviewCards/>
          {/* Live Map Tracking */}
          {/* <LiveMap/> */}
          {/* eVTOLs Table */}
          <EvtolListTable/>
          {/* Fleet Analytics Section */}
          <FleetAnalytics/>
        </div>
    </>
  );
};

export default AdminDashboard;
