export interface Columns {
  namespace: boolean;
  project: boolean;
  milestone: boolean;
  issue: boolean;
  labels: boolean;
}

export type DefaultView = 'monthly' | 'weekly';
export interface Profile {
  defaultView: DefaultView;
  defaultColumns: Columns;
}

export const filterColumns = [
  'namespace',
  'project',
  'milestone',
  'issue',
  'labels',
] as const;
export type FilterColumns = typeof filterColumns[number];

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

export interface Instance {
  id: number;
  url: string;
  added: boolean;
  username: string;
}

export interface InstanceToken {
  id: number;
  token: string;
}
