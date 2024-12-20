import { Outlet } from "react-router-dom";
import MainTabs from "../MainTabs";

const MainLayout = () => {
  return (
    <>
      <MainTabs />
      <Outlet />
    </>
  );
};

export default MainLayout;
