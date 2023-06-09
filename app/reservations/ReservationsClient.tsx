'use client'
import { FC } from 'react'

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";


import { SafeReservation, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";


interface ReservationsClientProps {
    reservations: SafeReservation[];
    currentUser: SafeUser;
}

const ReservationsClient: FC<ReservationsClientProps> = ({ reservations, currentUser }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id);


        try {
            await axios.delete(`/api/reservations/${id}`);
            toast.success('Reservation cancelled');
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setDeletingId('');
        }
    }, [router]);

    return (
        <Container>
            <Heading title='Reservations' subtitle='Bookings on your properties' />
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {reservations.map((reservation) => {
                    return (
                        <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} actionId={reservation.id} onAction={onCancel}
                            disabled={deletingId === reservation.id} actionlabel='Cancel guest reservation' currentUser={currentUser} />
                    )
                })}
            </div>
        </Container>
    )
}

export default ReservationsClient