export type Event = {
    end: string;
    start: string;
    type: "working" | "unavailable" | "schedule";
    event: {
      title?: string;
      id: string;
      week_day: string;
      end_hour: string;
      start_hour: string;
      age: null;
      endHour: string;
      on_duty: boolean;
      opportunity_id: null;
      major_complaint?: string;
      patient: {
        id: string;
        tag: string;
        name: string;
        cellphone: string;
      };
      serviceStatus: {
        id: string;
        color: string;
        description: "Atendimento cancelado" | "Em atendimento" | "Agendado (Não confirmado)" | "Na recepção" | "Atendimento finalizado" | "Agendado (Confirmado)";
      };
      holder: {
        id: string;
        name: string;
        tutor: {
          id: string;
          cellphone: string;
          telephone: string | null;
          patient_id: string;
        };
      };
      serviceType: {
        description: string;
        id: string;
      };
  
      startHour: string;
      started_at: null;
      user_id: string;
      start: string;
      type: "schedule";
    };
  };