import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet,],
    providers: []
})
export class AppComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
      
    }
}