'use client';

import React, { useCallback, useState } from "react";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesProps {
    listings: SafeListing[],
    currentUser?: SafeUser | null,
}

const PropertiesClient: React.FC<PropertiesProps> = ({ listings, currentUser }) => {
    const router = useRouter();

    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id);

        try {
            await axios.delete(`/api/listings/${id}`)
            toast.success('Listing Deleted');
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
            <Heading title="Properties" subtitle="List of your properties" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing: any) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionlabel="Delete property"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    </div>);
}

export default PropertiesClient;