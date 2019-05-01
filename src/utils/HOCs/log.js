import React from "react";

export default (message: string, logProps: boolean) => Component => props => {
  console.log(message);
  console.log("\n");
  if (logProps) {
    console.log("props:", JSON.stringify(props, null, 2));
    console.log("\n");
  }
  return <Component {...props} />;
};
