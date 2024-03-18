import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder2',
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class Loader implements OnInit {
  public folder2!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.folder2 = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
