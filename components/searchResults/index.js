import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SearchResults = ({ results }) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-6 p-8 absolute top-30  bg-darkColor w-auto z-50'>
      {results.map(({ id, image, slug, title }) => (
        <Link key={id} href={`/blog/${slug}`} className='w-1/2'>
          {image ? (
            <Image
              className='aspect-square object-cover border-1 border-dark-900'
              src={image}
              alt=''
              width={664}
              height={664}
            />
          ) : (
            <div className='aspect-square w-full border-1 border-dark-900 bg-accent'></div>
          )}
          <h2 className='text-xl mt-2'>{title}</h2>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
