
import onyx from 'https://deno.land/x/onyx/mod.ts'
import LocalStrategy from 'https://deno.land/x/onyx/src/strategies/local-strategy/local-strategy.ts'



onyx.use(
    new LocalStrategy(
      async (username: string, password: string, done: Function) => {
        // const { username, password } = context.state.onyx.user;
        console.log(
          `verify function invoked with username ${username} and password ${password}`
        );
        try {
          const user = await User.findOne({ username });
          if (user && password === user.password) await done(null, user);
          else await done(null);
        } catch (error) {
          await done(error);
        }
      }
    )
  );


  export default onyx;