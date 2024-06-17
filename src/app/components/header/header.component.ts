import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isConnected: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isConnected$.subscribe(isConnected => {
      this.isConnected = isConnected;
    });
  }

  logout() {
    this.authService.logout();
  }
}
