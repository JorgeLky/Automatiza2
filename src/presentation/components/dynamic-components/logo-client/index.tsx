import { NextImage } from "../../data/next-image";
import { systemConfiguration } from "@/system-clients-configuration";

export function LogoClient() {
    return <NextImage src={systemConfiguration.logo} />
}