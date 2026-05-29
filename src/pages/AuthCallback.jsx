import {
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

export default function AuthCallback() {

  const navigate = useNavigate();

  useEffect(() => {

    /**
     * AUTH SUCCESS
     * SEND USER TO DASHBOARD
     */
    navigate(
      "/member",
      {
        replace: true,
      }
    );

  }, [navigate]);

  return (
    <div className="loading-screen">
      Logging in...
    </div>
  );
}