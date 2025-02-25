import { getGrpApiHttpClient } from "@/lib/grp-api-http-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const client = getGrpApiHttpClient();

        const newGuestsPayload = { ...body }

        await client.createNewGuests(newGuestsPayload);

        return NextResponse.json({ message: "Success" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (e: any) {
        return NextResponse.json(
            { message: "Error createing new guests." },
            { status: 500 },
        );
    };
};