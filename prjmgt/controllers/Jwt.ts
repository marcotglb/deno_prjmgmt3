import { Context, Status } from "https://deno.land/x/oak/mod.ts";
//import { validateJwt } from "https://deno.land/x/djwt/validate.ts";

//import { verify } from "https://deno.land/x/djwt/mod.ts";

import {
  verify,
  create,
  getNumericDate,
  Header, 
  Payload,
}  from "https://deno.land/x/djwt/mod.ts";

// import secureKey from "./SecureKey.ts"

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

//const key = secureKey.getInstance();

/**
 * Create a default configuration
 */
const JwtConfig = {
  header: "Authorization",
  schema: "Bearer",
  // use Env variable
  secretKey: "GoldenGate", //Deno.env.get("SECRET") || "",
  expirationTime: 60000,
  type: "JWT",
  alg: "HS256",
};




async function jwtAuth(
  ctx: Context<Record<string, any>>,
  next: any, /*() => Promise<void>*/
) {
  // Get the token from the request
  console.log("jwtAuth().");
  const token = ctx.request.headers
    .get(JwtConfig.header)
    ?.replace(`${JwtConfig.schema} `, "");

  console.log("token=", token);
  // reject request if token was not provided
  if (!token) {
    console.log("No token.");
    ctx.response.status = Status.Unauthorized;
    ctx.response.body = { message: "Unauthorized" };
    return;
  }
  console.log("Token is there.");
  // check the validity of the token
  let payload;
  //const key = await secureKey; //.getInstance();
  console.log ('jwtAuth. key:', key)
  try {
    payload = await verify(token, key) //JwtConfig.secretKey, "HS256");
    if (!payload) { //!(await validate(token, JwtConfig.secretKey, { isThrowing: false }))
      //!(await verify(token, JwtConfig.secretKey, "HS256"))

      console.log("Wrong token");
      ctx.response.status = Status.Unauthorized;
      ctx.response.body = { message: "Wrong Token" };
      return;
    }
  } catch (err) {
    console.log("Token verification failed.");
    ctx.response.status = Status.Unauthorized;
    ctx.response.body = { message: "Wrong Token" };
    return;
  }
  console.log("Token verified.");
  // JWT is correct, so continue and call the private route
  console.log(payload);
  await next();
}

async function generateJwt(id: string) {
  // Create the payload with the expiration date (token have an expiry date) and the id of current user (you can add that you want)
  const payload: Payload = {
    id,
    exp: getNumericDate(JwtConfig.expirationTime), //setExpiration(new Date().getTime() + JwtConfig.expirationTime),
  };
  const header: Header = {
    alg: "HS512", //wtConfig.alg as Algorithm,
    typ: JwtConfig.type,
  };

  //const key = await secureKey; //.getInstance();
  console.log ('generateJwt. key:', key)

  // return the generated token
  return create(header, payload, key); // JwtConfig.secretKey );
}

export { jwtAuth, JwtConfig, generateJwt };
