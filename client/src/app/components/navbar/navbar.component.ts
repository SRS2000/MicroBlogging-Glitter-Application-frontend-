import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as alertyfy from 'alertifyjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}
  userId: string;
  userName: string;
  ngOnInit(): void {}

  LoggedInId() {
    this.userId = localStorage.getItem('Id');
    return this.userId;
  }

  LoggedInUserName() {
    this.userName = localStorage.getItem('Email');
    return this.userName;
  }

  onLogout() {
    localStorage.removeItem('Id');
    localStorage.removeItem('Email');

    alertyfy.success('You are logged out !');
    this.router.navigate(['/']);
  }
}
