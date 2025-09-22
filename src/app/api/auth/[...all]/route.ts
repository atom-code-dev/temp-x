import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/better-auth";

const handler = toNextJsHandler(auth);

export const GET = handler.GET;
export const POST = handler.POST;