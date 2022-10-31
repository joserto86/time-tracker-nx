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
  filters: Filter[]
}


export const filterColumns = [
  'namespace',
  'name',
  'milestone',
  'issue',
  'label',
] as const;
export type FilterColumns = typeof filterColumns[number]

export const filterConditions = [
  'is',
  'is not',
  'is null',
  'is not null',
  'contains',
] as const;
export type FilterConditions = typeof filterConditions[number];
export interface Filter {
  id: string;
  name: string;
  column: FilterColumns;
  condition: FilterConditions;
  searchTerm: string;
}
