import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Instance } from '@time-tracker/shared';
import { saveInstanceToken } from '../../state/actions/instances.actions';
import { atLeastOne } from '../../validators/inputs.validator';

@Component({
  selector: 'time-tracker-nx-update-token-dialog',
  templateUrl: './update-token-dialog.component.html',
  styleUrls: ['./update-token-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTokenDialogComponent implements OnInit {
  form!: FormGroup;
  instance!: Instance;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateTokenDialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) data: { instance: Instance }
  ) {
    this.instance = data.instance;
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        token: [''],
        username: [''],
      },
      {
        validators: atLeastOne(Validators.required, ['token', 'username']),
      }
    );
  }

  save() {
    const id = this.instance.id;
    const token = this.form.get('token')?.value;
    const username = this.form.get('username')?.value;

    this.store.dispatch(saveInstanceToken({ token: { id, token, username } }));

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
