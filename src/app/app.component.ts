import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SZOSZTAR';

  constructor(
    private titleService: Title,
    private authService: AuthService
    ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    this.authService.autoLogin();
  }
}
