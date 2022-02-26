import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { TokenService } from 'src/app/services/token.service';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authServiceService: AuthService, private router: Router, private tokenService: TokenService, private _snackBar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.tokenService.isLoggedIn) {
      this.router.navigateByUrl('/rader-viewer');
    }
  }

  get loginControls() {
    return this.loginForm.controls;
  }

  onSubmit(userLogin: User) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authServiceService.login(userLogin)
      .subscribe({
        next: (res) => {
          this._snackBar.dismiss();
          this.tokenService.saveToken(res.token),
          this.router.navigateByUrl('/rader-viewer')
        },
        error: () => {
          this._snackBar.open('Error: login nicht korrekt eingegeben', 'X');
        }
      });
  }
}
