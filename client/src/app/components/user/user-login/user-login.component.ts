import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../../../interfaces/User';
import { UserService } from '../../../services/user.service';
import * as alertyfy from 'alertifyjs';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  onLogin: boolean;
  user: UserLogin = {
    Email: '',
    Password: '',
    Id: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedIn()) this.router.navigate(['playground']);
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  onLoginSubmit() {
    //console.log(this.loginForm.value);
    this.onLogin = true;
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.user.Email = formData.email;
      this.user.Password = formData.password;
      this.userService.loginUser(this.user).subscribe(
        (response: UserLogin) => {
          console.log(response);
          const user = response;
          if (user) {
            localStorage.setItem('Id', user.Id);
            localStorage.setItem('Email', user.Email);
            alertyfy.success('Login Sucessfull');
            this.router.navigate(['/playground']);
          }
        },
        (errorResponse) => {
          console.log(errorResponse);
          if (errorResponse.error.StatusCode == 'EX102') {
            alertyfy.error(errorResponse.error.Message);
          } else {
            alertyfy.error('Something Went Wrong');
          }
        }
      );
    } else {
      alertyfy.error('Invalid Details');
    }
  }

  // get methods for formcontrol
  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}
