import { inject, injectable } from "inversify";

import * as infra from "@/infra";
import * as domain from "@/domain";
import { InfraTypes } from "../infra";

@injectable()
export class AuthorizeHttpClientDecorator implements domain.HttpClient {
  constructor(
    @inject(InfraTypes.storage) private readonly storage: infra.Storage,
    @inject(InfraTypes.http) private readonly httpClient: domain.HttpClient
  ) {}

  async request(data: domain.HttpRequest) {
    const storageToken = await this.storage.get<"adminUser">("adminUser");

    const token = storageToken?.value?.token?.token;

    if (token) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          Authorization: `Bearer ${token}`,
        }),
      });
    }

    const httpResponse = await this.httpClient.request(data);
 
    return httpResponse;
  }
}
