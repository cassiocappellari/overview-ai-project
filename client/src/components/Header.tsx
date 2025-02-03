const Header: React.FC = () => {
    return (
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
    );
  };
  
export default Header;