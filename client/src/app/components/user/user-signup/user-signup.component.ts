import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserSignup } from '../../../interfaces/User';
import * as alertyfy from 'alertifyjs';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent implements OnInit {
  registrationForm!: FormGroup;
  user: UserSignup = {
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
    Image: '',
    Country: '',
  };

  userSubmitted: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedIn()) {
      this.router.navigate(['playground']);
    }
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, [Validators.required]],
        contactNumber: [null, [Validators.required, Validators.maxLength(10)]],
        countryOfResidency: [null, [Validators.required]],
      },
      {
        validators: [this.passwordMatchingValidator, this.passwordValidator],
      }
    );
  }
  passwordValidator(fg: FormGroup): Validators {
    const password = fg.get('password').value;
    const lowerLetters = /[a-z]+/.test(password);
    const upperLetters = /[A-Z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = /[$-/:-?{-~!"^_@`\[\]]/.test(password);

    if (lowerLetters && upperLetters && numbers && symbols) return null;

    return {
      inValid: true,
    };
  }
  passwordMatchingValidator(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value
      ? null
      : {
          notmatched: true,
        };
  }

  onSubmit() {
    //console.log(this.registrationForm);
    this.userSubmitted = true;
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.user.FirstName = formData.firstName;
      this.user.LastName = formData.lastName;
      this.user.Email = formData.email;
      this.user.PhoneNumber = formData.contactNumber;
      this.user.Country = formData.countryOfResidency;
      this.user.Password = formData.password;
      this.user.Image = 'Image';
      //console.log(this.user);

      this.userService.signUpUser(this.user).subscribe(
        (result) => {
          console.log(result);
          alertyfy.success('Congrats , you are sucessfully registered');
          this.router.navigate(['/']);
        },
        (errorResponse) => {
          if ((errorResponse.error.StatusCode = 'EX101')) {
            alertyfy.error(errorResponse.error.Message);
          } else {
            alertyfy.error('Something Went Wrong');
          }
        }
      );
    } else {
      alertyfy.error('Kindly Provide the required fields');
    }
  }

  // getters method for all form control
  get firstName() {
    return this.registrationForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.registrationForm.get('lastName') as FormControl;
  }
  get email() {
    return this.registrationForm.get('email') as FormControl;
  }
  get contactNumber() {
    return this.registrationForm.get('contactNumber') as FormControl;
  }
  get residency() {
    return this.registrationForm.get('countryOfResidency') as FormControl;
  }
  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
}
