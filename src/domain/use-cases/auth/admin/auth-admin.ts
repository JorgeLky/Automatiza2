import { BadRequestErrorModel, ValidationErrorModel } from "@/domain/protocols";

export type AuthAdmin = {
  auth: (params: AuthAdmin.Params) => Promise<AuthAdmin.Model>;
};

export type AdminUser = {
  token: {
    type: "bearer";
    token: string;
  };
  isThirdParty?: boolean,
  userID: string;
  units: [];
  userType: "controller";
};

export namespace AuthAdmin {
  export type Params = {
    email: string;
    system: string;
    password: string;
  };

  export type Model = AdminUser | ValidationErrorModel | BadRequestErrorModel;
}
