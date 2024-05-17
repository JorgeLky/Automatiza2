import { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import axios, { AxiosError } from "axios";

import { Storage } from "@/infra";
import { AdminUser } from "@/domain";
import { RemoteAuthAdmin } from "@/data";
import { InfraTypes, adminTypes, container } from "@/container";

interface IAuthContextType {
  user: AdminUser | null;
  signOut(): void;
  signIn(params: { email: string; password: string; system: string }): void;
  setUser: React.Dispatch<React.SetStateAction<AdminUser>>
}

const AuthContext = createContext({} as IAuthContextType);

function AuthAdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);

  const router = useRouter();

  async function signIn(payload: {
    email: string;
    system: string;
    password: string;
  }) {
    const response = await container
      .get<RemoteAuthAdmin>(adminTypes.RemoteAuthAdmin)
      .auth(payload);

    setUser(response as AdminUser);

    if (!router.pathname.includes("/admin")) {
      router.push("/admin");
    }
  }

  function signOut() {
    setUser(null);

    container
      .get<Storage>(InfraTypes.storage)
      .set("adminUser", { value: null });
  }

  useEffect(() => {
    (async () => {
      const storageAdminUser = await container
        .get<Storage>(InfraTypes.storage)
        .get<"adminUser">("adminUser");

      if (storageAdminUser) {
        setUser(storageAdminUser.value as AdminUser);
      }

      axios.interceptors.response.use(
        (r) => r,
        (err) => {
          if (err instanceof AxiosError) {
            if (err.response.status === 401) {
              signOut();
            }
          }

          throw err;
        }
      );
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthAdmin() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthAdmin() must be used within a AuthProvider");
  }
  return context;
}

export { AuthAdminProvider, useAuthAdmin };
