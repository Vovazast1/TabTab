import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Loader } from '../loader/loader';
import { FirstPage } from '../first-page/first-page';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.html',
  styleUrls: ['./pages.scss'],
  standalone: true,
  imports: [Loader, FirstPage, IonicModule],
})
export class Pages {
  LoaderRoot: any = Loader;
  FirstPageRoot: any = FirstPage;

  constructor() {}

}
