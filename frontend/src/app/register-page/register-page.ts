import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register-page.html',
  styleUrls: ['./register-page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class RegisterPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
