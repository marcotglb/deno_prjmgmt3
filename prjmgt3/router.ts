import { Router, RouterContext } from "./deps.ts";
//import authController from "./controllers/AuthController.ts";
import deliverableCtrl from "./controllers/Deliverable.ts";
//import syncTableCtrl from "./controllers/SyncTable.ts";
//import userCtrl from "./controllers/User.ts";
import * as log from "https://deno.land/std@0.75.0/log/mod.ts";


//import onyx from 'https://deno.land/x/onyx/mod.ts'

const router = new Router();




router
//.use(onyx.initialize())
.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
})
.get("/", (ctx: RouterContext) => {
    ctx.response.body = "Hello World!";
  })
  /*
  .get("/sync_tables", syncTableCtrl.get)
  .post("/sync_tables", syncTableCtrl.post)
  */
  .get("/deliverables", deliverableCtrl.get)
  .patch("/deliverables", deliverableCtrl.patch)
  .post("/deliverables", deliverableCtrl.post)
  .delete("/deliverables", deliverableCtrl.delete)

  //.get("/users", userCtrl.get)
  //.patch("/users", userCtrl.patch)
  //.post("/users", userCtrl.post)

  /*
  .post("/auth/login", async (ctx: RouterContext) => {
    let reqBody = ctx.request.body();
    log.info (await reqBody.value);
    ctx.response.body = "Hello Login";
  })
  .post("/auth", authController.post);
  */

export default router;
