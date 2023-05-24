'use client'
import { FC } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';
import { useCallback } from 'react';

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string
}

const ImageUpload: FC<ImageUploadProps> = ({ value, onChange }) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);


    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="nbu0wr19"
            options={{ maxFiles: 1 }}>
            {
                ({ open }) => {
                    return (
                        <div onClick={() => open?.()} className='relative 
                        cursor-pointer 
                        transition 
                        border-dashed 
                        border-2 
                        p-20 
                        border-neutral-300 
                        flex 
                        flex-col 
                        justify-center 
                        items-center 
                        gap-4 
                        text-neutral-600 '>
                            <TbPhotoPlus size={50}/>
                            <div className='font-semibold text-lg'>
                                Click to upload
                            </div>
                            {
                                value && (
                                    <div className='absolute  inset-0 w-full h-full'>
                                        <Image fill style={{objectFit: 'cover'}} alt='upload' src={value}/>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            }
        </CldUploadWidget>

    )
}

export default ImageUpload