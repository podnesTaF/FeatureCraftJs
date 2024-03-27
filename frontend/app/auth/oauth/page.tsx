"use client";

import { useEffect } from "react";

const OauthPage = () => {
  useEffect(() => {
    window.location.href = "/";
  }, []);

  return <div className="my-20">loading</div>;
};

export default OauthPage;
