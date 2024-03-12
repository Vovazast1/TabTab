import { Component, OnInit } from '@angular/core';
import { Tab2Service } from '../providers/tab2-service';

@Component({
  selector: 'app-tab2',
  providers: [Tab2Service],
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public beers: Array<any> = [];

  constructor(public beerService: Tab2Service) {
  }
  
  ngOnInit() {
      this.beerService.getGoodBeers().subscribe(beers => {
          this.beers = beers;
      }, error => {
          console.error('Failed to load beers: ' + error)
      })
  }
}
