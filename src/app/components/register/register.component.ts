import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(): void {
    if (this.password === this.confirmPassword) {
      this.authService.register(this.email, this.password)
        .then(() => {
          this.router.navigate(['/']);
        }).catch(err => {
          this.flashMessage.show(err.message, { cssClass: 'alert-danger' });
        });
    } else {
      this.flashMessage.show('Passwords do not match, try again.', { cssClass: 'alert-danger' });
    }
  }

}
