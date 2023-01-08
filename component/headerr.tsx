export const Headerr = () => {
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-1 pt-20 pl-48 pr-20 items-center">
        <h1 className="text-left ">GlobalTalk</h1>
        <p className="text-right">Main</p>
        <p className="text-right">Guide</p>
        <p className="text-right">Statistics</p>
        <p className="text-right">Games</p>
        <div className="col-span-4"></div>
        <div className="col-span-2">
          <span className="p-5">
            <button>
        
              <p>Login</p>
            </button>
          </span>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            <p>Sign Up</p>
          </button>
        </div>
      </div>
    </>
  );
};
