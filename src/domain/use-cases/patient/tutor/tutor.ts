export type Tutor = {
  address: {};
  isMain: boolean;
  cellphone: string;
  civilStatus: string;
  clientOrigin: {
    id: string;
    description: string;
  };
  dependents: [];
  diabetes: boolean;
  document: string;
  email: string;
  hypertension: boolean;
  id: string;
  inscription: string;
  name: string;
  nationality: string;
  profession: {
    id: number;
    description: string;
    created_at: string;
  };
  tag: string;
};
