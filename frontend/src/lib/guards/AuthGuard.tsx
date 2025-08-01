import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ component }: any) => {
    const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, [component]);

  const checkToken = async () => {
    try {
      let user = localStorage.getItem("auth");
      if (!user) {
        navigate(`/`);
      }
      setStatus(true);
      return;
    } catch (error) {
      navigate(`/`);
    }
  }

  return status ? <>{component}</> : <></>;
};

export default AuthGuard;