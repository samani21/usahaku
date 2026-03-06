import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const host = req.headers.get("host") || "";

    // contoh: toko1.localhost:3000
    const subdomain = host.split(".")[0];

    if (host.includes("localhost") && subdomain !== "localhost") {
        const url = req.nextUrl.clone();
        url.pathname = `/${subdomain}${req.nextUrl.pathname}`;

        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};