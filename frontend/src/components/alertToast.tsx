import React from "react";
import { Alerts } from "../pages/Dashboard/dashboard";
import Alert from '@mui/material/Alert';


function alertToast(obj: Alerts) {
  return (
    <Alert variant="outlined" severity={obj.status === 'info' ? 'info' 
      : obj.status === 'success' ? 'success'
      : obj.status === 'error' ? 'error' 
      : 'warning'}>
      {obj.status} - {obj.message} - {obj.timestamp}
    </Alert>
  );
}

export default alertToast;
