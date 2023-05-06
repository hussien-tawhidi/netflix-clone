import useBillboard from "@/hooks/useBillBoard";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function Billboard() {
  const { data: movie } = useBillboard();
  console.log(movie);
  return (
    <div className='relative h-[56.25vw]'>
      {movie?.map((mov: any) => (
        <div className='' key={mov?._id}>
          <video
            className='w-full h-full object-cover brightness-[60%] relative'
            autoPlay
            muted
            loop
            poster={mov?.thumbnailUrl}
            src={mov?.videoUrl}></video>
          <div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
            <p className='text-white text-1xl md:text-5xl h-full  lg:text-6xl font-bold drop-shadow-xl'>
              {mov?.title}
            </p>
            <p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
              {mov?.description}
            </p>
            <div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
              <button className='bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 duration-200'>
                <AiOutlineInfoCircle className="mr-1"/>
                More Info
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
