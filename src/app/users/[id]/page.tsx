import { redirect } from "next/navigation";

const Page = () => {
  redirect("/users");
  return null;
};

export default Page;
