
import { db } from './database.ts';
import { UserUpdate, User, NewUser } from './types.ts'


async function updateUser(id: number, updateWith: UserUpdate) {
  await db.updateTable('projects.users').set(updateWith).where('id', '=', id).execute()
}


export async function findUser(criteria: Partial<User>) {
  let query = db.selectFrom('projects.users')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
  }

  return await query.selectAll().execute()
}


async function demo() {

  await updateUser(11, { firstname: 'Jack' })
  let user = await findUser({ id: 11 })

  /*
  export async function updatePerson(id: number, updateWith: PersonUpdate) {
    await db.updateTable('person').set(updateWith).where('id', '=', id).execute()
  }

  const { id } = await db
    .insertInto('projects.users')
    .values({ username: 'Jennifer', firstname: 'Jennifer', lastname: 'Powell', email: "jpowell@gmal.com" })
    .returning('id')
    .executeTakeFirstOrThrow()

  
  const user = await db
    .selectFrom('projects.users')
    .where('users.id', '=', id)
    .selectAll('projects.users')
    .executeTakeFirst()
  */
  if (user) {
    console.info(user)
  }

}

demo();
