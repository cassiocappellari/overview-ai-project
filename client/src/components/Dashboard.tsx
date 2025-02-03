import VideoPlayer from "./VideoPlayer";
import ConfigPanel from "./ConfigPanel";
import FrameCanvas from "./FrameCanvas";
import ResultsTable from "./ResultsTable";

const Dashboard: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <header className="flex items-center justify-between bg-white p-4 shadow-md">
        <div className="flex items-center gap-2">
          <img src="/overview-ai-logo.png" alt="Company Logo" className="h-10" />
          <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold text-indigo-700">
            Dashboard
          </h1>
        </div>
        <div className="flex gap-4">
          <button className="bg-indigo-700 px-4 py-2 rounded-sm">Sign In</button>
          <button className="bg-red-700 px-4 py-2 rounded-sm">Sign Out</button>
        </div>
      </header>

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
