import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { atLeastOneCheckboxCheckedValidator } from '../../validators/profile.validator';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

interface View {
  value: string;
  label: string;
}

interface Checkbox {
  name: string;
  label: string;
}

@Component({
  selector: 'time-tracker-nx-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormComponent implements OnInit {
  profileForm!: FormGroup;

  defaultColumnsGroup!: FormGroup;

  viewList: View[] = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'weekly', label: 'Weekly' },
  ];

  checkboxList: Checkbox[] = [
    { name: 'namespace', label: 'namespace' },
    { name: 'name', label: 'name' },
    { name: 'milestone', label: 'milestone' },
    { name: 'issue', label: 'issue' },
    { name: 'label', label: 'label' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      defaultView: [null, Validators.required],
      defaultColumns: this.fb.group(
        {
          namespace: [true],
          name: [true],
          milestone: [true],
          issue: [true],
          label: [true],
        },
      ),
    });

    this.profileForm.get(['defaultColumns'])?.setValidators(atLeastOneCheckboxCheckedValidator());
  }

  onSubmit(): void {
    //TODO DISPATCH ACTION to save on store and localstorage
    console.log('save profile settings ', this.profileForm.value);
  }
}
