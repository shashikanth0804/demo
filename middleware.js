import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { checkUser } from "@/lib/checkUser";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/events(.*)",
  "/meetings(.*)",
  "/availability(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = auth();
  
  if (!userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting
    return auth().redirectToSignIn();
  }
  
  // Call checkUser when user is authenticated and accessing protected routes
  if (userId && isProtectedRoute(req)) {
    await checkUser(userId);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
  runtime: 'nodejs',
};