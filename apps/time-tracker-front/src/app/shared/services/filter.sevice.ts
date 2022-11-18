import { Injectable } from '@angular/core';
import {
  ApiFilter,
  Filter,
  filterColumns,
  FilterColumns,
  FilterConditions,
  filterConditions,
} from '@time-tracker/shared';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  transformApiFilterToFilter(apiFilter: ApiFilter, filterName: string): Filter {
    return {
      id: window.crypto.randomUUID(),
      name: filterName,
      column: this.transformColumn(apiFilter.field),
      condition: this.transformCondition(apiFilter.method),
      searchTerm: apiFilter.value,
    };
  }

  transformFilters(filters: ApiFilter[]): ApiFilter[] {
    let result: ApiFilter[] = [];

    filters.forEach((f) => {
      result.push({
        ...f,
        method: this.transformCondition(f.method),
        value: this.transformSerchTerm(f.value, f.method),
      });
    });

    return result;
  }

  private transformConditionToMethod(condition: string) {
    switch (condition) {
      case 'is':
        return '=';
      case 'is not':
        return '!=';
      case 'contains':
        return 'like';
      default:
        return condition;
    }
  }

  private transformCondition(condition: string): FilterConditions {
    switch (condition) {
      case 'is':
        return filterConditions[0];
      case 'is not':
        return filterConditions[1];
      case 'is null':
        return filterConditions[2];
      case 'is not null':
        return filterConditions[3];
      case 'contains':
        return filterConditions[4];
      default:
        return filterConditions[0];
    }
  }

  private transformColumn(column: string): FilterColumns {
    switch (column) {
        case 'namespace':
          return filterColumns[0];
        case 'project':
          return filterColumns[1];
        case 'milestone':
          return filterColumns[2];
        case 'issue':
          return filterColumns[3];
        case 'labels':
          return filterColumns[4];
        default:
          return filterColumns[0];
      }
  }

  private transformSerchTerm(searchTerm: string, condition: string) {
    if (condition === 'contains') {
      return `%${searchTerm}%`;
    }

    return searchTerm;
  }
}
