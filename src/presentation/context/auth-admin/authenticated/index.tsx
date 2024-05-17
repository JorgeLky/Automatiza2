import { useAuthAdmin } from "../context";

export function AuthenticatedTemplate({ children }) {
  const { user } = useAuthAdmin();
  if (!user) {
    return <></>;
  }

  return <>{children}</>;
}
