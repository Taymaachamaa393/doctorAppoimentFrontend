import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  // title = 'project';
  isLoggedIn = false;
  userRole: string | null = null;
       
  constructor(private authService: AuthService,private router: Router) {
  }
  
  ngOnInit(): void {
    this.authService.getisLoggedIn().subscribe(isLogged => {
      this.isLoggedIn = isLogged;
    });

    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
    });
  }  
}

   
   