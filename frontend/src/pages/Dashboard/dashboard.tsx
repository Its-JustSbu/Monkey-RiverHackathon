import { useEffect, useState } from "react";
import AlertToast from "../../components/alertToast";
import DashboardNav from "../../components/dashboardNav";
import style from "./dashboard.module.css";
import { getAlerts } from "../../lib/interceptor";
import TileCard from "../../components/tileCard";
import DashboardSideNav from "../../components/dashboardSideNav";
import { Outlet } from "react-router";

// Define the Alert type based on your API response structure
export interface Alerts {
  id: string;
  message: string;
  status: string;
  timestamp: string;
}

function Dashboard() {
  const [alerts, setAlerts] = useState<Alerts[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await getAlerts();
        if (response) {
          setAlerts(response);
        } else {
          setAlerts([]);
        }
      } catch (error) {
        setAlerts([]);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <>
      <DashboardNav />
      <div className={`${style.container}`}>
        <aside className={`${style.sidenav}`}>
          <DashboardSideNav />
        </aside>
        <div className={`${style.section}`}>
          <Outlet />
        </div>
      </div>
      {/* <div className={`${style.alert} ${style.show}`}>
        {alerts.map((alert) => (
          <AlertToast
            key={alert.id}
            id={alert.id}
            message={alert.message}
            status={alert.status}
            timestamp={alert.timestamp}
          />
        ))}
      </div> */}
    </>
  );
}

export default Dashboard;
