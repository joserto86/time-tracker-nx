export interface Columns {
  namespace: boolean;
  name: boolean;
  milestone: boolean;
  issue: boolean;
  label: boolean;
}

export interface Profile {
  defaultView: string;
  defaultColumns: Columns;
}

export interface SettingsState {
  profile: Profile;
}

export interface Filter {
  name: string;
  column: string;
  condition: string;
  searchTerm: string;
}
