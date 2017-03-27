import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private userService: UserService) {}
  user = {};

  loadUser() {
    this.userService.getUser().subscribe(data => this.user = data);
    
  }
}