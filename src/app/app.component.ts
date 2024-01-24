import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.userService.curUser.completed && this.userService.curUser.verified) {
      this.router.navigate(['dashboards'])
    }
    else {

    }
  }

}
