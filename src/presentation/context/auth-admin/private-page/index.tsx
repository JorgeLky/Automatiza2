import { Error } from "@/presentation";
import { useAuthAdmin } from "../context";
import { Login } from "../login";

export function PrivatePageAdmin({ children }: { children: React.ReactNode }) {
  const { user } = useAuthAdmin();

  if (user) {
    return <Error name="private-page">{children}</Error>;
  }

  return (
    <Error name="private-page">
      <Login />
    </Error>
  );
}
