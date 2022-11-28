import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { atLeastOneCheckboxCheckedValidator } from '../../validators/profile.validator';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Profile } from '@time-tracker/shared';
import { ProfileActions } from '../../state/actions';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'time-tracker-nx-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormComponent implements OnInit {
  @Input() profile!: Profile;

  profileForm!: FormGroup;

  defaultColumnsGroup!: FormGroup;

  viewList = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'weekly', label: 'Weekly' },
  ];

  checkboxList: { name: string; label: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.profileForm = this.fb.group({
      defaultView: [this.profile.defaultView, Validators.required],
      defaultColumns: this.getDefaultColumns(),
    });

    this.profileForm
      .get(['defaultColumns'])
      ?.setValidators(atLeastOneCheckboxCheckedValidator());

    Object.keys(this.profile.defaultColumns).forEach((key) => {
      this.checkboxList.push({ name: key, label: key });
    });
  }

  getDefaultColumns() {
    const columns = this.profile.defaultColumns;
    return this.fb.group(columns);
  }

  onSubmit(): void {
    this.store.dispatch(
      ProfileActions.saveProfile({ profile: this.profileForm.value })
    );
  }
}
