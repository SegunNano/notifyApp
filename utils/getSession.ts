import { auth } from "@/auth";
import { cache } from "react";

const getSession = cache(async () => {
  const session = await auth();
  // console.log(session);

  return session;
});

export default getSession;
