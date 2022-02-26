import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WEB-Projekt-Techrader';

  constructor(public tokenService: TokenService, private router: Router) { }

  logout() {
    this.tokenService.logout();
    this.router.navigate(['login']);
  }

}
