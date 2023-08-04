import { Context, Router, Status, /*composeMiddleware*/ } from "https://deno.land/x/oak/mod.ts";
import { jwtAuth } from "../controllers/Jwt.ts";
import * as log from "https://deno.land/std/log/mod.ts";

/*
const onevar = composeMiddleware([
  jwtAuth
])
*/

function PrivateRoutes(path: string, router: Router) {
  // call our middleware before our private route
  return router.use(path, jwtAuth, async (ctx: Context, next) => {
    log.info('token is valid.')
    await next();
    //ctx.response.status = Status.OK;
    //ctx.response.body = { message: "Conntected !" };
  });
}

export { PrivateRoutes };
