import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {}

  gotoHome() {
    this.navCtrl.navigateForward('home');
  }

  gotoProducts() {
    this.navCtrl.navigateForward('products');
  }

  gotoMyProfile() {
    this.navCtrl.navigateForward('edit-profile');
  }

}

