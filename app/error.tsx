'use client';

import { useEffect } from "react";

import { FC } from 'react'
import EmptyState from "./components/EmptyState";

interface errorProps {
    error: Error
}

const ErrorState: FC<errorProps> = ({ error }) => {

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <EmptyState title="Uh oh" subtitle="Something went wrong" />
    )
}

export default ErrorState