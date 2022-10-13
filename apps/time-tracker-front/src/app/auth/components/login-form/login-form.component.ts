import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'time-tracker-nx-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;

  hide = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

  onClear(): void {
    this.loginForm.reset();
  }

  onEmailBlur(event: any): void {
    const emailControl = this.loginForm.get('email');

    if (emailControl?.dirty) {
      // console.log('hola');
      // this.loginForm.markAsUntouched();
    }
  }

}
