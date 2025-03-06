import UserHomePage from "@/components/UserHomePage";
import getSession from "@/utils/getSession";


export default async function Home() {

  const session = await getSession()

  return session ? (
    <UserHomePage />
  ) : (
    <div>Home</div>
  )
}
