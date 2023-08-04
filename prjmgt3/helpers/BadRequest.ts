import { Status } from "https://deno.land/std/http/http_status.ts";


export function BadRequest(ctx: any) {
    ctx.status = Status.BadRequest;
  return;
}
