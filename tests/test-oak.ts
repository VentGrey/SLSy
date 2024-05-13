import { Application, Context, Next } from "@oak/oak";
import { Slsy } from "../src/index.ts";

const app: Application = new Application();
const slsy: Slsy = new Slsy({
    hidePoweredBy: {
        setTo: "Deno with Typoscript"
    },
    ienoopen: true
});

app.use((ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);

    next();
});

app.use((ctx: Context) => {
    ctx.response.body = { message: "Hello from Dino-Saurio" } 
});

await app.listen({ port: 9555 });