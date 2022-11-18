import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiFilter, Filter } from '@time-tracker/shared';
import { FilterService } from '../../shared/services/filter.sevice';
import { FilterActions } from '../../settings/state/actions';

@Component({
  selector: 'time-tracker-nx-advanced-filter-box',
  template: `
    <mat-card>
      <mat-card-content>
        {{ filter.field }} {{ filter.method }}
        {{ filter.value }}</mat-card-content
      >
      <mat-icon *ngIf="!filter.id && !saved" (menuOpened)="keeper()" [matMenuTriggerFor]="menu" inline="true"
        >bookmark</mat-icon
      >
      <mat-icon (click)="remove()" inline="true">cancel</mat-icon>
      <mat-menu #menu="matMenu">
        <mat-dialog-content [formGroup]="form" class="keeper">
          <mat-card-title>Keep filter</mat-card-title>
          <mat-form-field>
            <mat-label>Filter name</mat-label>
            <input
              formControlName="filterName"
              placeholder="Give your filter a name and it'll be stored in My filters"
              #input
              matInput
              (click)="$event.stopPropagation()"
            />
          </mat-form-field>

          <mat-dialog-actions>
            <button mat-raised-button (click)="close()">Close</button>
            <button
              mat-raised-button
              color="primary"
              (click)="save()"
              [disabled]="form.invalid"
            >
              Save
            </button>
          </mat-dialog-actions>
        </mat-dialog-content>
      </mat-menu>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        padding: 5px;
        color: #3f51b5;
        background: #e3f2fd;
        margin-right: 5px;
        font-size: 13px;
        border: 1px solid #3f51b5;
        display: flex;
        align-items: center;

        mat-card-field {
          margin-top:10px;
        }

        mat-card-content {
          padding-right: 2rem;
          margin: 0;
        }

        mat-icon {
          background: #e3f2fd;
          color: #3f51b5;
          font-size: 1rem;
          padding: 3px;
        }
      }

      mat-dialog-actions {
        display: flex;
      }

      .keeper {
        padding: 15px;
        display: flex;
        align-items: stretch;
        flex-direction: column
      }

      ::ng-deep .mat-menu-panel {
        width: 320px;
        max-width: 320px;
        height: 200px;
      }

      mat-dialog-actions {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedFilterBoxComponent implements OnInit {
  @Input() filter!: ApiFilter;
  @Input() index!: number;

  @ViewChild('input') input!: ElementRef;
  @Output() deleteFilter = new EventEmitter<number>();

  saved:boolean = false;
  form!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder, private filterService: FilterService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      filterName: ['', [Validators.required]],
    });
  }

  remove() {
    this.deleteFilter.emit(this.index);
  }

  keeper() {
    setTimeout(() => {
      this.input.nativeElement.focus();
    });
  }

  close() {
    // this.input.nativeElement.lo
  }

  save() {
    if (this.form.valid) {
      let f:Filter = this.filterService.transformApiFilterToFilter(this.filter, this.form.get('filterName')?.value);
      this.store.dispatch(FilterActions.createFilter({filter: f}));
      this.form.reset();
      this.saved = true;
    }
  }
}
