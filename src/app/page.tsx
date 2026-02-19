import { redirect } from "next/navigation";

export default function Home() {
  // Middleware will redirect correctly as well.
  redirect("/login");
}
