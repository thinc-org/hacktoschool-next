import Image from 'next/image'
export const Bodyy = () => {
  return (
    <div className=" pl-44 pr-20 grid grid-cols-2 grid-rows-1">
      <div>
        <p className="text-customtext1 pt-14">E-course platform</p>
        <h1 className="text-5xl py-6">Learning and teaching online, made easy.</h1>
        <p className="py-3">
          Gain subject certificate earn money while teaching online with
          GlobalTalk.{" "}
        </p>
        <div className="pt-5">
        <button className="pr-8">
          <p>Sign in</p>
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          <p>Learn more</p>
        </button>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 gaps-2 pt-8">
        <div>
          <h1 className="text-3xl">700++</h1>
          <p>Hours of context</p>
        </div>
        <div>
          <h1 className="text-3xl">575k+</h1>
          <p>Active Users</p>
        </div>
        </div>
      </div>
      <div className='pt-8 pl-16'>
        <div className='absolute top-[30%] left-[55%]'>
        <img className='max-w-[10rem]' src='/gatakblur.png'/>
        </div>
        <div className='absolute top-[20%] left-[55%]'>
        <img className='max-w-lg'  src='/boysitbook.png'/>
        </div><div className='absolute top-[20%] left-[72%]'>
        <img  className='max-w-[24rem]' src='/gatakblur2.png'/>
        </div>
      </div>
    </div>
  );
};
