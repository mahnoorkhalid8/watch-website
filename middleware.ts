export {default} from "next-auth/middleware";

export const config = {
    matcher: ["/category/:path*", "/cart/:path"],
};