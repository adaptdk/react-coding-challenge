import React from "react";
import LoadingOverlay from "react-loading-overlay";

export const Spinner = ({ loading, message = "Loading...", children }) => (
  <div style={{ height: "100%", width: "100%", position: "fixed !important" }}>
    <LoadingOverlay
      styles={{
        overlay: (base) => ({
          ...base,
          position: "fixed",
          height: "100%",
          width: "100%",
        }),
      }}
      active={loading}
      spinner
      text={message}
    >
      {children}
    </LoadingOverlay>
  </div>
);

export default Spinner;
