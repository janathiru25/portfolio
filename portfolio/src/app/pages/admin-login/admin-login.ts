import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css'
})
export class AdminLoginComponent {

  username = '';
  password = '';

  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    const data = {
      username: this.username,
      password: this.password
    };

    this.loading = true;

    this.authService.login(data).subscribe({

      next: (res: any) => {

        this.loading = false;

        this.authService.saveToken(res.token);

        alert("Login Successful");

        this.router.navigate(['/admin']);

      },

      error: (err: any) => {

        this.loading = false;

        console.log(err);

        alert("Invalid Username or Password");

      }

    });

  }

}