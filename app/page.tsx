import getSession from "@/utils/getSession";

export default async function Home() {
  const session = await getSession()


  return session ? (
    <div></div>
  ) : (
    <div>Home</div>
  )

}
