import { NextPage } from "next";
import { useSession } from "next-auth/react";
const Index: NextPage = (Props): JSX.Element => {
  const session = useSession()
  if (session.status === "authenticated" && session?.data?.user?.roles === "admin") {
    return (
      <div>
        <h1>Admin</h1>
        <p>Welcome to the Admin Portal!</p>
      </div>
    )
  } else if (session.status === "authenticated" && session?.data?.user?.roles === "user") {
    return (
      <div>
        <h1>welcome {session.data.user?.name}!</h1>
      </div>
    )
  } else return (
    <div>
      <h1>You are not authorized to view this page!</h1>
    </div>
  )
};
export default Index;
