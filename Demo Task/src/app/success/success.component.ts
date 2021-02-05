import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  user: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('User')
    if (!this.user) {
      this.router.navigate(['/login'])
    }
  }

}
