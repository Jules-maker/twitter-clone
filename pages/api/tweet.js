import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react'
export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(501).end();
    }
    const session = await getSession({ req })
console.log("SESSION : ", session);
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    })


    if (!session) return res.status(401).json({ message: 'Not logged in' })

    if (!user) return res.status(401).json({ message: 'User not found' })

    if (req.method === 'POST') {
        console.log("POST : ", req.body);
        await prisma.tweet.create({
            data: {
                content: req.body.content,
                author: {
                    connect: {
                        email: session.user.email,
                    },
                },
            },
        })
        res.status(200).json({ message: 'Tweet created' })
        console.log("POSTED : ", req.body);
        return
        
    }
}