export const Headerr = (props: { selectState: (arg0: string) => void; }) => {
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-1 pt-16 pl-44 pr-20 items-center">
        <h1 className="text-left" onClick={()=>{props.selectState('main')}}>GlobalTalk</h1>
        <p className="text-right">Main</p>
        <p className="text-right">Guide</p>
        <p className="text-right">Statistics</p>
        <p className="text-right">Games</p>
        <div className="col-span-4"></div>
        <div className="col-span-2">
          <span className="p-5">
            <button onClick={()=>{props.selectState('login')}}>
        
              <p>Login</p>
            </button>
          </span>
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={()=>{props.selectState('signup')}}>
            <p>Sign Up</p>
          </button>
        </div>
      </div>
    </>
  );
};
