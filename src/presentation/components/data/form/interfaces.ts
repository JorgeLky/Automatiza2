interface Props {
  name: string;
  label?: string;
  loading?: boolean;
  basePath?: string;
  listposition?: number;
}

export type InputProps = JSX.IntrinsicElements["input"] & Props;

export interface CustomSelectProps extends InputProps {
  onChangeSelect?: (value: string) => void;
}

export type ISelectProps = { isColor?: boolean; } & JSX.IntrinsicElements["select"] & CustomSelectProps;
