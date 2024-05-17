import { inject, injectable } from "inversify";

import * as infra from "@/infra";
import * as domain from "@/domain";
import { InfraTypes } from "@/container/infra/types";
import { makeApiURL } from "@/container/infra/make-api-url";

@injectable()
export class RemoteAuthAdmin implements domain.AuthAdmin {
  constructor(
    @inject(InfraTypes.makeApiURL) private readonly makeApiURL: makeApiURL,
    @inject(InfraTypes.storage) private readonly storage: infra.Storage,
    @inject(InfraTypes.authorizeAdminHttp) private readonly httpClient: domain.HttpClient<any>
  ) {}
  async auth(params: domain.AuthAdmin.Params) {
    const response = await this.httpClient.request({
      url: this.makeApiURL.make("auth/admin-login"),
      method: "post",
      body: params,
    });

    this.storage.set("adminUser", { value: response as domain.AdminUser });

    return response as domain.AuthAdmin.Model;
  }
}
