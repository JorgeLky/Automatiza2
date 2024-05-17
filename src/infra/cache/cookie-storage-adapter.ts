import { injectable } from "inversify";

import { Storage } from "@/infra";
import { CacheKeys, CacheValues } from "@/domain";

import Cookies from "js-cookie";

@injectable()
export class CookieStorageAdapter implements Storage {
  async set<T extends CacheKeys>(key: T, value: CacheValues[T]): Promise<any> {
    if (value) {
      let expires = "";
      let date = new Date();
      date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000); //30dias
      expires = "; expires=" + date.toUTCString();
      document.cookie =
        key + "=" + JSON.stringify(value || "") + expires + "; path=/";
    } else {
      document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
  }

  async get<T extends CacheKeys>(key: CacheKeys): Promise<CacheValues[T]> {
    try {
      const cookieStorage = document.cookie;

      let nameEQ = key + "=";
      let ca = cookieStorage.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          const valueToParse = c.substring(nameEQ.length, c.length);

          if (valueToParse === "undefined" || valueToParse === "null") {
            return null;
          }

          return JSON.parse(
            c.substring(nameEQ.length, c.length)
          ) as CacheValues[T];
        }
      }

      return null;
    } catch {
      return (await Cookies.get(key)) as CacheValues[T];
    }
  }
}
