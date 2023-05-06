import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteBtn from "../FavoriteBtn";
interface movieProps {
  data: Record<string, any>;
}

export default function MovieCard({ data }: movieProps) {
  return (
    <div className='group bg-zinc-900 col-span relative h-[12vw]'>
      <Image
        width={500}
        height={500}
        src={data?.thumbnailUrl}
        className='w-full h-full object-cover cursor-pointer transition shadow-xl rounded-md group-hover:opacity-0 delay-300'
        alt={data?.title}
      />
      <div className='opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100'>
        <Image
          width={500}
          height={500}
          src={data?.thumbnailUrl}
          className='object-cover cursor-pointer transition shadow-xl rounded-t-md h-[12vw]'
          alt={data?.title}
        />
        <div className='z-10 bg-zinc-800 p-2 lg:p-4 absolute transition shadow-md rounded-b-md'>
          <div className='flex flex-row items-center gap-3'>
            <div className='cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'>
              <BsFillPlayFill className='text-zinc-800' size={30} />
                      </div>
                      <FavoriteBtn movieId={data?._id} />
          </div>
          <p className='text-green-400 font-semibold mt-4'>
            Now <span className='text-white'>2023</span>
          </p>
          <div className='flex flex-row mt-4 gap-2 items-center'>
            <p className='text-white text-[10px] lg:text-sm'>
              {data?.duration}
            </p>
          </div>
          <div className='flex flex-row mt-4 gap-2 items-center'>
            <p className='text-white text-[10px] lg:text-sm'>{data?.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
