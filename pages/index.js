import React from "react";
import Router from "next/router";

export default function Home() {
  React.useEffect(() => {
    Router.push("/auth/login");
  });
  return <div />;
}
