import { NextResponse } from "next/server";
import client from "@/lib/sanity";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const query = searchParams.get("query") || "";

    const data = await client.fetch(
        `*[type == "product && name match "${query}*"]{
            _id, name, price, slug, image, discountedPrice
        }`
    );
    return NextResponse.json(data);
}