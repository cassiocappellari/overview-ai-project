import React from "react";
import VideoPlayer from "./VideoPlayer";
import ConfigPanel from "./ConfigPanel";

const Layout: React.FC = () => {
  return (
    <div className="grid grid-rows-layout grid-cols-layout gap-4 p-4">
      <div className="row-span-1 col-span-2 bg-white rounded-lg shadow p-4">
        <VideoPlayer />
      </div>

      <div className="row-span-2 col-span-1 bg-white rounded-lg shadow p-4">
        <ConfigPanel />
      </div>
    </div>
  );
};

export default Layout;
