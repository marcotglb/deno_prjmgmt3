import { Router, Status } from "https://deno.land/x/oak/mod.ts";
console.info('UserRoutes')


import { UserController } from "../controllers/UserController.ts";

import { BadRequest } from "../helpers/BadRequest.ts";
import { NotFound } from "../helpers/NotFound.ts";



//import { IUser } from "../models/Database";

// instantiate our controller
const controller = new UserController();
const router = new Router();

function UserRoutes(path: string, father: Router) {
  router
  /*
    .use(
      async (ctx, next) => {
        await next();
        const rt = ctx.response.headers.get("X-Response-Time");
        console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);

      })
      */

    .get("/", async (ctx) => {
      const users = await controller.getAll();
      console.log('router /users');
      if (users) {
        ctx.response.status = Status.OK;
        ctx.response.body = users;

      } else {
        ctx.response.status = Status.NotFound;
        ctx.response.body = [];
      }

      return;
    })
    /*
    .post("/login", async (ctx) => {
      if (!ctx.request.hasBody) {
        return BadRequest(ctx);
      }
      const { value } = await ctx.request.body();

      // TODO generate JWT
      let jwt = '';

      ctx.response.status = Status.OK;
      ctx.response.body = { jwt };
    })
    */

    .post("/login", async (ctx) => {
      console.log('/login intercepted')
      if (!ctx.request.hasBody) {
        return BadRequest(ctx);
      }
      //const { value } = await ctx.request.body();
      let value = await ctx.request.body().value;
      console.log('value:', value)

      // generate jwt
      let creds = await controller.login(value.username, value.password);
      if (!creds.jwt) {
        return BadRequest(ctx);
      }

      ctx.response.status = Status.OK;
      // and return it

      ctx.response.body = creds;
    })



    .get("/:id", async (ctx) => {
      if (!ctx.params.id) {
        return BadRequest(ctx);
      }

      const user = await controller.getOne(ctx.params.id);
      if (user) {
        ctx.response.status = Status.OK;
        ctx.response.body = user;
        return;
      }

      return NotFound(ctx);
    })

    .post("/", async (ctx) => {
      if (!ctx.request.hasBody) {
        return BadRequest(ctx);
      }


      //let { value } = await ctx.request.body();
      let value = await ctx.request.body().value;
      console.log('UserRoutes.post /user value:', value);
      const user = await controller.create(value);

      if (user) {
        ctx.response.status = Status.OK;
        ctx.response.body = user;
        return;
      }

      return NotFound(ctx);
    })

    .patch("/", controller.patch)

    /*
    .patch("/:id", async (ctx) => {
      if (!ctx.request.hasBody || !ctx.params.id) {
        return BadRequest(ctx);
      }

      //const { value } = await ctx.request.body();
      let value = await ctx.request.body().value;
      const user = await controller.update(ctx.params.id, value);

      if (user) {
        ctx.response.status = Status.OK;
        ctx.response.body = user;
        return;
      }

      return NotFound(ctx);
    })
    */

    .delete("/:id", async (ctx) => {
      console.log('/delete')
      if (!ctx.params.id) {
        return BadRequest(ctx);
      }

      await controller.delete(ctx.params.id);

      ctx.response.status = Status.OK;
      ctx.response.body = { message: "Ok" };
    });

  father.use(path, router.routes(), router.allowedMethods());
}

export { UserRoutes }