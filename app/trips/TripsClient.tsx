'use client';

import React, { useCallback, useState } from "react";
import { SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
    reservations: SafeReservation[],
    currentUser?: SafeUser | null,
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations, currentUser }) => {
    const router = useRouter();

    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id);

        try {
            await axios.delete(`/api/reservations/${id}`)
            toast.success('Reservation Cancelled');
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        } finally {
            setDeletingId('');
        }

    }, [router])

    return (<div>
        <Container>
            <Heading title="Trips" subtitle="Where you've been and where you're going" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation: any) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionlabel="Cancel reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    </div>);
}

export default TripsClient;