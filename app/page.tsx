import UserHomePage from "@/components/UserHomePage";
import getSession from "@/utils/getSession";
// import { insertManyNotes } from "@/lib/testDb";


export default async function Home() {

  const session = await getSession()
  const userInfo = session?.user;
  // await insertManyNotes()

  return session ? (
    <UserHomePage userInfo={userInfo} />
  ) : (
    <div>Home</div>
  )
}
