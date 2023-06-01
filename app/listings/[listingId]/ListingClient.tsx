'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeUser } from "@/app/types";
import { FC } from 'react'
import { Reservation } from "@prisma/client";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;

}

const ListingClient: FC<ListingClientProps> = ({ reservations = [], listing, currentUser }) => {

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue}
                        id={listing.id} currentUser={currentUser} />
                    <div className="grid grid-col-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo user={listing.user} category={category} description={listing.description} roomCount={listing.roomCount} guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount} locationValue={listing.locationValue} />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient