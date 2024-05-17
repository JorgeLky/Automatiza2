import { inject, injectable } from "inversify";

import { InfraTypes } from "@/container/infra/types";
import { makeApiURL } from "@/container/infra/make-api-url";

import * as domain from "@/domain";

@injectable()
export class RemoteSchedule
  implements
    domain.CloseSchedule,
    domain.ConfirmSchedule,
    domain.LoadSchedule,
    domain.CreateSchedule,
    domain.Reschedule
{
  constructor(
    @inject(InfraTypes.makeApiURL) private readonly makeApiURL: makeApiURL,
    @inject(InfraTypes.authorizeDashboardHttp)
    private readonly httpClient: domain.HttpClient<any>
  ) {}

  async load(params: domain.LoadSchedule.Params) {
    const response = await this.httpClient.request({
      url: this.makeApiURL.make(`schedules/${params.scheduleId}`),
      method: "get",
    });

    return response as domain.LoadSchedule.Model;
  }

  async create(params: domain.CreateSchedule.Params) {
    const response = await this.httpClient.request({
      url: this.makeApiURL.make("schedules"),
      method: "post",
      body: params,
    });

    return response as domain.CreateSchedule.Model;
  }

  async update(params: { id: string } & domain.CreateSchedule.Params) {
    const response = await this.httpClient.request({
      url: this.makeApiURL.make("schedules/" + params.id),
      method: "put",
      body: params,
    });

    return response as domain.CreateSchedule.Model;
  }

  async confirm(params: domain.ConfirmSchedule.Params) {
    const response = await this.httpClient.request({
      url: this.makeApiURL.make("schedules/create-contact"),
      method: "post",
      body: params,
    });

    return response as domain.ConfirmSchedule.Model;
  }

  async close(params: domain.CloseSchedule.Params) {
    const response = await this.httpClient.request({
      url: this.makeApiURL.make(`attendances/close/${params.idAtendimento}`),
      method: "put",
    });

    return response;
  }

  async reschedule(params: domain.Reschedule.Params) {
    const response = await this.httpClient.request({
      url: this.makeApiURL.make(`schedules/reschedule/${params.id}`),
      method: "put",
      body: params,
    });

    return response;
  }
}
