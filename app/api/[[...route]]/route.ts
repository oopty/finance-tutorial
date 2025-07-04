import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import { HTTPException } from "hono/http-exception";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// app.route("/accounts", accounts);
// app.onError((err, c) => {
//     if(err instanceof HTTPException) {
//         return err.getResponse();
//     }

//     return c.json({ error: "internal server error" }, 500);
// })
const routes = app.route("/accounts", accounts);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);

export type AppType = typeof routes;