import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtCredentials } from '@time-tracker/shared';

@Component({
  selector: 'time-tracker-nx-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {

  hidePass = true;
  hideCode = true;

  @Output() submitted = new EventEmitter<JwtCredentials>();
  @Input() errorMessage!: string | null;
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }

  loginForm: FormGroup =  new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password:  new FormControl(null, [Validators.required]),
    code: new FormControl(null, [Validators.required]),
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitted.emit(this.loginForm.value)
    }
  }

  onClear(): void {
    this.loginForm.reset();
  }

  onEmailBlur(event: any): void {
    const emailControl = this.loginForm.get('username');

    if (emailControl?.dirty) {
      // console.log('hola');
      // this.loginForm.markAsUntouched();
    }
  }

}
