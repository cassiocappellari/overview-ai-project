import VideoPlayer from "./VideoPlayer";
import ConfigPanel from "./ConfigPanel";
import FrameCanvas from "./FrameCanvas";
import ResultsTable from "./ResultsTable";
import Header from "./Header";

const Dashboard: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <div className="grid grid-cols-2 grid-rows-[2fr_1fr] gap-4 p-4 flex-grow">
        <div className="bg-indigo-950 rounded-lg shadow p-4">
          <VideoPlayer />
        </div>

        <div className="bg-indigo-950 rounded-lg shadow p-4">
          <FrameCanvas />
        </div>

        <div className="bg-indigo-950 rounded-lg shadow p-4">
          <ConfigPanel />
        </div>

        <div className="bg-indigo-950 rounded-lg shadow p-4">
          <ResultsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
