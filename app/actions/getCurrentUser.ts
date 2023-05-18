'use server';

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/app/libs/prismadb';




export async function getUserSession() {

    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session = await getUserSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            }
        });


        if (!currentUser) {
            return null;
        }
        

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified:
                currentUser.emailVerified?.toISOString() || null,
        };

    } catch (error: any) {
        console.log(error);
        return null;
    }
}

