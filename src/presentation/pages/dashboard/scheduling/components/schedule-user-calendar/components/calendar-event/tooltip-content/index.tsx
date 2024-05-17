import PetsIcon from "@mui/icons-material/Pets";
import Person2Icon from "@mui/icons-material/Person2";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

import { Event, ScheduleUser } from "@/domain";
import { DateToDDMMYYYY, Error } from "@/presentation";

import * as S from "./styles";

export function ToolTipContent({
  event,
  timeText,
  scheduleUser,
}: {
  event: Event;
  timeText: string;
  scheduleUser: ScheduleUser;
}) {

  const infos = {
    tutor: {
      icon: <Person2Icon />,
      text: process.env.client === "liftone" ? event.event.patient?.name + " -- RG: " + event.event.patient?.tag : event.event?.holder?.name + " - " + event.event?.holder?.tutor?.cellphone,
    },
    paciente: {
      icon: <PetsIcon />,
      text: process.env.client === "liftone" ? "" : event.event.patient?.name + " -- RG: " + event.event.patient?.tag,
    },
    reavaliacao: {
      icon: <ListAltIcon />,
      text: event.event?.serviceType?.description,
    },
    vetResponsavel: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="800px"
          height="800px"
          viewBox="0 0 16 16"
          version="1.1"
        >
          <path
            fill="#444"
            d="M14 11.3c-1-1.9-2-1.6-3.1-1.7 0.1 0.3 0.1 0.6 0.1 1 1.6 0.4 2 2.3 2 3.4v1h-2v-1h1c0 0 0-2.5-1.5-2.5s-1.5 2.4-1.5 2.5h1v1h-2v-1c0-1.1 0.4-3.1 2-3.4 0-0.6-0.1-1.1-0.2-1.3-0.2-0.1-0.4-0.3-0.4-0.6 0-0.6 0.8-0.4 1.4-1.5 0 0 0.9-2.3 0.6-4.3h-1c0-0.2 0.1-0.3 0.1-0.5s0-0.3-0.1-0.5h0.8c-0.3-1-1.3-1.9-3.2-1.9 0 0 0 0 0 0s0 0 0 0 0 0 0 0c-1.9 0-2.9 0.9-3.3 2h0.8c0 0.2-0.1 0.3-0.1 0.5s0 0.3 0.1 0.5h-1c-0.2 2 0.6 4.3 0.6 4.3 0.6 1 1.4 0.8 1.4 1.5 0 0.5-0.5 0.7-1.1 0.8-0.2 0.2-0.4 0.6-0.4 1.4 0 0.4 0 0.8 0 1.2 0.6 0.2 1 0.8 1 1.4 0 0.7-0.7 1.4-1.5 1.4s-1.5-0.7-1.5-1.5c0-0.7 0.4-1.2 1-1.4 0-0.3 0-0.7 0-1.2s0.1-0.9 0.2-1.3c-0.7 0.1-1.5 0.4-2.2 1.7-0.6 1.1-0.9 4.7-0.9 4.7h13.7c0.1 0-0.2-3.6-0.8-4.7zM6.5 2.5c0-0.8 0.7-1.5 1.5-1.5s1.5 0.7 1.5 1.5-0.7 1.5-1.5 1.5-1.5-0.7-1.5-1.5z"
          />
          <path
            fill="#444"
            d="M5 13.5c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5z"
          />
        </svg>
      ),
      text: scheduleUser?.name,
    },
    data: {
      icon: <CalendarMonthIcon />,
      text:
      event.event?.serviceStatus?.description +
        " " +
        DateToDDMMYYYY(event.event?.endHour),
    },
    horario: {
      icon: <AccessTimeFilledIcon />,
      text: timeText,
    },
  };

  return (
    <Error name="ToolTipContent">
      <S.ToolTipContent>
        {event.event.title ? (
          <div className="content">
            <span>{event.event.title}</span>
          </div>
        ) : (
          Object.keys(infos).map((info) => {
            const currentInfo = infos[info];

            if(!currentInfo.text) {
              return;
            }

            return (
              <div className="content" key={info}>
                <div className="icon">{currentInfo.icon}</div>

                {currentInfo?.text && <span>{currentInfo.text}</span>}
              </div>
            );
          })
        )}
      </S.ToolTipContent>
    </Error>
  );
}
