import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/better-auth";

// Simple handler to avoid module resolution issues
const handler = toNextJsHandler(auth);

export const GET = handler.GET;
export const POST = handler.POST;