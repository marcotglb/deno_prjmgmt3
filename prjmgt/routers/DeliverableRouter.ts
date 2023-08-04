import { Context, Router, RouterContext } from "../deps.ts";
//import authController from "./controllers/AuthController.ts";
import deliverableCtrl from "../controllers/Deliverable.ts";
//import syncTableCtrl from "../controllers/SyncTable.ts";
//import userCtrl from "./controllers/User.ts";
import * as log from "https://deno.land/std@0.75.0/log/mod.ts";
import { jwtAuth } from "../controllers/Jwt.ts";

//import onyx from 'https://deno.land/x/onyx/mod.ts'

const router = new Router();

function deliverableRouter(path: string, father: Router) {
  router
    /*
    .use (jwtAuth, async (ctx: Context, next) => {
      log.info('token is valid.')
      const rt = ctx.response.headers.get("X-Response-Time");
      console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
      await next();
    })
    */
    
    .use(
      async (ctx, next) => {
      await next();
      const rt = ctx.response.headers.get("X-Response-Time");
      console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
      
    })
    
    .get("/", deliverableCtrl.get)
    .patch("/", deliverableCtrl.patch)
    .post("/", deliverableCtrl.post)
    .delete("/", deliverableCtrl.delete);

    father.use(path, router.routes(), router.allowedMethods());
}

export { deliverableRouter };
