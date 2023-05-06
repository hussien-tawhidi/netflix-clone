import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";

interface movieProps {
  data: Record<string, any>[];
  title: string;
}

export default function MoviesList({ data, title }: movieProps) {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className='px-4 md:px-12 mt-5 space-y-8'>
      <div className=''>
        <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-3'>
          {title}
        </p>
        <div className='grid grid-cols-4 gap-2'>
          {data?.map((movie) => (
            <MovieCard key={movie?._id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
