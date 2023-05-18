'use client';

import React from 'react'
import { signIn} from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';

export default function LoginModal() {

    const router = useRouter();
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);


    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            const callback = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            setIsLoading(false);

            if(callback?.ok) {
                toast.success('Logged In');
                router.refresh();
                LoginModal.onClose();
            }

            if(callback?.error) {
                toast.error(callback.error);
            }

            
        } catch (error) {
           console.log(error);
           setIsLoading(false);
           toast.error('An Error Ocurred');
        }
      
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back'
                subtitle='Log in to your account!' />
            <Input id='email' label='Email' type='email' register={register} disabled={isLoading} errors={errors} required />
            <Input id='password' type='password' label='Password' register={register} disabled={isLoading} errors={errors} required />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => { }} />
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => { }} />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Already have an Account?
                    </div>
                    <div className='text-neutral-800 cursor-pointer hover:underline' onClick={registerModal.onClose}>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal disabled={isLoading}
            isOpen={LoginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={LoginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}
