import { useAuthAdmin} from "../context";

export function UnauthenticatedTemplate({ children }) {
  const { user } = useAuthAdmin();

  if (user) {
    return <></>;
  }

  return children
}
