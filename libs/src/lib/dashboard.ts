export interface DashboardState {
  calendar: {
    year: number;
    month: number;
  };
  timeNotes: TimeNote[];
  daysRange: string[];
  loading: boolean;
  advancedSearch: boolean;
  dateFilters: ApiFilter[];
  searchFilters: ApiFilter[];
  showPaginator: boolean;
}

export interface ApiFilter {
  field: string;
  value: string;
  method: string; // '=' , 'like'
  condition?: CONDITIONS;
  id?: string;
}

export enum CONDITIONS {
  AND = 'AND',
  OR = 'OR',
}

export interface TimeNote {
  id: number;
  glInstance: string;
  glId: number;
  glProjectId: number;
  project: string;
  namespace: string;
  issueId: number;
  glIssueId: number;
  issue: string;
  issueUrl: string;
  milestone: string | null;
  body: string;
  author: string;
  secondsAdded: number;
  secondsSubtracted: number;
  secondsRemoved: boolean;
  createdAt: string;
  updatedAt: string;
  spentAt: string;
  glIssueIid: number;
  computed: number;
  labels: string;
}

export interface LocalTimeNote {
  id: number;
  body: string;
  secondsAdded: number;
  secondsSubstracted: number;
  secondsRemoved: boolean;
  createdAt: string;
  updatedAt: string;
  spentAt: string;
  computed: number;
  author: string;
  glId: number;
}

export interface LocalIssue {
  id: number;
  glIssueId: number;
  glInstance: string;
  glProjectId: number;
  glProject: string;
  glNamespace: string;
  milestone: string | null;
  title: string;
  glIssueIid: number;
  timeNotes: LocalTimeNote[];
  issueUrl: string;
  labels: string;
}
