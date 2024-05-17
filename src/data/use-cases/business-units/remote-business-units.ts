import { inject, injectable } from "inversify";

import * as domain from "@/domain";

import { InfraTypes } from "@/container/infra";
import { makeApiURL } from "@/container/infra/make-api-url";

@injectable()
export class RemoteBusinessUnits implements domain.LoadAllBusinessUnits, domain.SwapUnit {
  constructor(
    @inject(InfraTypes.makeApiURL) private readonly makeApiURL: makeApiURL,
    @inject(InfraTypes.authorizeAdminHttp)
    private readonly httpClient: domain.HttpClient<domain.LoadAllBusinessUnits.Model>
  ) {}
  async loadAll() {
    const response = await this.httpClient.request({
      url: this.makeApiURL.make("business-units"),
      method: "get",
    });

    return response;
  }

  async swap(params: domain.SwapUnit.Params) {
    const response = await this.httpClient.request({
      url: this.makeApiURL.make("auth/swap-unit"),
      method: "post",
      body: params,
    });

    return response as domain.LoadAllBusinessUnits.Model;
  }
}
