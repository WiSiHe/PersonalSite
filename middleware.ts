import { authMiddleware } from "@clerk/nextjs"
export default authMiddleware({
    // Public routes that don't require authentication
    publicRoutes: [
        "/",
        "/paintings",
        "/paintings/(.*)",
        "/projects",
        "/projects/(.*)",
        "/videos",
        "/contact",
        "/test/sign-in",
        "/test/sign-up",
    ],
})

export const config = {
    wmatcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
