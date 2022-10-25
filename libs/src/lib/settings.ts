export interface DefaultView {
  value: string;
  label: string;
}

export interface Columns {
  namespace: boolean;
  name: boolean;
  milestone: boolean;
  issue: boolean;
  label: boolean;
}

export interface Profile {
  defaultView: DefaultView;
  defaultColumns: Columns;
}

export interface SettingsState {
  defaultView: DefaultView;
  profile: Profile;
}
