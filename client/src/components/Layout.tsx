import VideoPlayer from "./VideoPlayer";
import ConfigPanel from "./ConfigPanel";
import FrameCanvas from "./FrameCanvas";
import ResultsTable from "./ResultsTable";

const Layout: React.FC = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-[2fr_1fr] gap-4 p-4 h-screen">
      <div className="bg-white rounded-lg shadow p-4">
        <VideoPlayer />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <FrameCanvas />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <ConfigPanel />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <ResultsTable />
      </div>
    </div>
  );
};

export default Layout;
