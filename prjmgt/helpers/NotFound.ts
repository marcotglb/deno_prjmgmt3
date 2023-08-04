import { Status } from "https://deno.land/std/http/http_status.ts";


export function NotFound(ctx: any) {
    ctx.status = Status.NotFound;
  return;
}