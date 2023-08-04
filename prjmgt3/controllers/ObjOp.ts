import { RouterContext } from "../deps.ts";
import * as log from "https://deno.land/std@0.74.0/log/mod.ts";
import { Deliverable } from "../models/Database.ts";


const busObjs = {
  deliverable: Deliverable
}


class ObjOpCtrl
 {
 async post (ctx: RouterContext) {
     log.info('ObjOpCtrl.post(...)')
     let body = await ctx.request.body().value;
     if (busObjs[body.entity])
       await busObjs[body.entity][body.entity](body[body.entity], body.filter)

  }


}

const objOpCtrl = new ObjOpCtrl();

export default objOpCtrl;
