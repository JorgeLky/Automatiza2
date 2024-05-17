import { useRouter } from "next/router";

import { Icon } from "semantic-ui-react";

import { Event } from "@/domain";
import { Error, PermissionItem } from "@/presentation";

import * as S from "./styles";
import { ContactForm } from "./contact-form";
import { useState } from "react";

export function UserInfos({ event, setOpen }: { event: Event; setOpen }) {
  const [showContact, setShowContact] = useState(false);
  const router = useRouter();

  const liftOneInfo = {
    user: {
      text:
        process.env.client === "liftone"
          ? `${event?.event?.patient?.name}`
          : event?.event?.holder?.name,
      icon: <Icon name="user" />,
    },
    phone: {
      text: event?.event?.patient?.cellphone || "Telefone não informado",
      icon: <Icon name="phone" />,
    },
  };

  const sanclaInfo = {
    user: {
      text:
        process.env.client === "liftone"
          ? `${event?.event?.patient?.name} - RG: ${event?.event?.patient?.tag}`
          : event?.event?.holder?.name,
      icon: <Icon name="user" />,
    },
    github: {
      text:
        process.env.client === "liftone"
          ? ""
          : `${event?.event?.patient?.name} - RG: ${event?.event?.patient?.tag}`,
      icon: <Icon name="github" />,
    },
    phone: {
      text: event?.event?.holder?.tutor?.cellphone || "Telefone não informado",
      icon: <Icon name="phone" />,
    },
  };

  const actions = {
    fichaPaciente: {
      className: "ficha",
      text: "Ficha paciente",
      onClick: () =>
        router.push(`/dashboard/atendimento/${event?.event?.patient?.id}`),
    },
    contato: {
      className: "contact",
      text: "Contato",
      hash: "AGE09",
      onClick: () => setShowContact(!showContact),
    },
  };

  const contactInfo = process?.env?.client === "liftone" ? liftOneInfo : sanclaInfo;

  return (
    <Error name="UserInfos">
      <S.UserInfos>
        <div className="top">
          <div className="contacts">
            {Object.keys(contactInfo).map((key) => {
              const item = contactInfo[key];

              if (!item.text) {
                return;
              }

              return (
                <div key={key}>
                  <span>
                    {item.icon} {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bottom">
          {Object.keys(actions).map((key) => {
            const item = actions[key];

            if (item.hash) {
              return (
                <PermissionItem hash={item.hash}>
                  <button
                    key={key}
                    type="button"
                    onClick={item?.onClick}
                    className={`reset-button ${
                      item.className ? item.className : ""
                    }`}
                  >
                    {item?.text} {item?.icon}
                  </button>
                </PermissionItem>
              );
            }

            return (
              <button
                key={key}
                type="button"
                onClick={item?.onClick}
                className={`reset-button ${
                  item.className ? item.className : ""
                }`}
              >
                {item?.text} {item?.icon}
              </button>
            );
          })}
        </div>

        {showContact && <ContactForm event={event} setOpen={setOpen} />}
      </S.UserInfos>
    </Error>
  );
}
