import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import React from "react";
const NothingToShow = () => {
  return (
    <div className="nothing-to-show" style={{ marginTop: 30 }}>
      <FolderOutlinedIcon className="default-icon" />
      <h3>Nothing to show</h3>
    </div>
  );
};

export default NothingToShow;
