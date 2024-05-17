import "reflect-metadata";

import { Container } from "inversify";
import { infraContainer } from "./infra";
import { adminContainer } from "./admin";
import { crmContainer, patientContainer } from "./dashboard";

const container = Container.merge(infraContainer, adminContainer, patientContainer, crmContainer)

export { container };
