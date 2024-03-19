import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Loader } from '../loader/loader';
import { LoginPage } from '../login-page/login-page';
import { RegisterPage } from '../register-page/register-page';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.html',
  styleUrls: ['./pages.scss'],
  standalone: true,
  imports: [Loader, LoginPage, RegisterPage, IonicModule],
})
export class Pages {
  LoaderRoot: any = Loader;
  LoginPageRoot: any = LoginPage;
  RegisterPageRoot: any = RegisterPage;

  constructor() {}

}
