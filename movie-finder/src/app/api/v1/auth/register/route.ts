import { NextResponse, NextRequest } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "../../../../../../lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();
        const userExists = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });
        // reject registration if user already exists
        if (userExists) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
            }
        });

        return NextResponse.json({
            user: { id: user.id, name: user.name, email: user.email },
        }, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Registration failed" },
            { status: 500 }
        )
    }
}
