/*
const secureKey = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
*/

/*
module.exports  (function () {
  var secureKey = null;
  return {
    get: function () {
      console.log("Getting key");
      return secureKey;
    },
    create: async function () {
      console.log("Creating key: ");
      secureKey = await crypto.subtle.generateKey(
        { name: "HMAC", hash: "SHA-512" },
        true,
        ["sign", "verify"],
      );
      return secureKey;
    }
  };
}());
*/

import singleton  from "https://deno.land/x/singleton/mod.ts";

/*
const secureKey = singleton (async () => await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
));

*/

const secureKey = crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

export { secureKey as default };

