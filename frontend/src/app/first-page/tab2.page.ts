import { Component, OnInit } from '@angular/core';
import { Tab2Service } from '../providers/tab2-service';

@Component({
  selector: 'app-tab2',
  providers: [Tab2Service],
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tab2: any;

  constructor(public Tab2Service: Tab2Service) {
  }
  
  ngOnInit() {
      this.Tab2Service.getGoodBeers().subscribe(tab2 => {
          this.tab2 = tab2;
      }, error => {
          console.error('Failed to load page: ' + error)
      })
  }
}
