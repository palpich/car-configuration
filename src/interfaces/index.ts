export interface TextField {
  type: "text";
  label: string;
  value: string;
}

export interface CheckboxField {
  type: "checkbox";
  label: string;
  value: boolean;
}

export interface SelectField {
  type: "select";
  label: string;
  value: string;
  options: { label: string; value: string }[];
}

export type ConfigurationEntry = TextField | CheckboxField | SelectField;

export interface CarConfiguration {
  name: string;
  selected: boolean;
  options: ConfigurationEntry[];
}
