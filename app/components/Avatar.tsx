'use client';
import Image from 'next/image';
import React from 'react'

interface AvatarProps {
  src?: string | null | undefined;
}

export default function Avatar({src}: AvatarProps) {
  return (
    <Image className='rounded-full' height={30} width={30} alt='avatar' src={src || '/images/placeholder.jpg'} />
  );
}
