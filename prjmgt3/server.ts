
import { Application, oakCors, Router } from "./deps.ts";
//import router from "./router.ts";
//import onyx from 'https://deno.land/x/onyx/mod.ts'
//import authRouter from './controllers/authRouter.ts'

import { UserRoutes } from "./routers/UserRoutes.ts";
import { PrivateRoutes } from "./routers/PrivateRoutes.ts";
import { deliverableRouter } from "./routers/DeliverableRouter.ts";


//import secureKey from "./controllers/SecureKey.ts";

console.info('ciao')

const app = new Application();

const router = new Router();

app.use(
    oakCors({
      origin: /^.+localhost:(8000|8080)$/,
    }),
  );

//app.use(oakCors({ origin: "*" }));

router.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
})


PrivateRoutes('/deliverables', router);
deliverableRouter('/deliverables', router);


//app.use(privateRoutes.routes());
//app.use(privateRoutes.allowedMethods());

//PrivateRoutes('/users', router);
UserRoutes('/users', router);

//const userRoutes = UserRoutes(router);
//app.use(userRoutes.routes());
//app.use(userRoutes.allowedMethods());


//app.use('/auth', authRouter.routes())
//app.use(authRouter.allowedMethods());



app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(`hostame: ${hostname}`)
  console.log(
    `Listening on ${secure ? "https://" : "http://"}${hostname ||
      "localhost"}:${port}`,
  );
});

await app.listen({hostname: "localhost", port: 8000 });
