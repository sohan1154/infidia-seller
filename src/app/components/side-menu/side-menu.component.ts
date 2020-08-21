import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { GlobalProvider } from "../../../providers/globals/globals";
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  public currentUser: any = {};

  public pagesLink = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      type: 'root',
    },
    {
      title: 'Products',
      url: '/products',
      icon: 'pricetags',
      type: 'forward',
    },
    {
      title: 'My Account',
      url: '/edit-profile',
      icon: 'person',
      type: 'forward',
    },
    {
      title: 'Feedback',
      url: '/feedback',
      icon: 'mail-open',
      type: 'forward',
    },
    {
      title: 'Seller Support',
      url: '/static-page/seller-support',
      icon: 'help',
      type: 'forward',
    },
    {
      title: 'Terms & Conditions',
      url: '/static-page/seller-terms-and-conditions',
      icon: 'help',
      type: 'forward',
    },
    {
      title: 'Change Passwrod',
      url: '/change-password',
      icon: 'key',
      type: 'forward',
    },
  ];

  constructor(
    private storage: Storage,
    public global: GlobalProvider,
    public navCtrl: NavController,
    private socialSharing: SocialSharing,
    private appRate: AppRate,
  ) {

      // get Observable information
      this.global.getObservable().subscribe((data) => {
        // console.log('Data received', data);
        console.log('currentUser:::::', this.global.currentUser)
        this.currentUser = this.global.currentUser;
      });

      // get user information 
      this.storage.get('user').then((user) => {

      if (user) {
        this.currentUser = user;
      }
    })
  }

  ngOnInit() { }

  ionViewWillEnter() {
  
  }

  logout() {

    this.global.presentAlertConfirm('Are you sure you want to logout!', (cancel, confirmed) => {

      if (cancel) {
        return false;
      } else {
        this.storage.clear().then(() => {

          // this.events.publish('currentUser');
          
          this.navCtrl.navigateForward('/mobile-login');
        })
      }
    })
  }

  socialShare() {

    console.log('Social share')

    let message = 'Welcome to ' + this.global.appName;
    let subject = this.global.appName;
    let file = '';
    let url = this.global.appUrl;

    this.socialSharing.share(message, subject, file, url);
  }

  rateUs() {

    // set certain preferences
    this.appRate.preferences.storeAppURL = {
      ios: '<app_id>',
      android: 'market://details?id=com.ionic.viewapp',
      windows: 'ms-windows-store://review/?ProductId=<store_id>'
    }

    this.appRate.promptForRating(true);

    // // or, override the whole preferences object
    // this.appRate.preferences = {
    //   usesUntilPrompt: 3,
    //   storeAppURL: {
    //     ios: '<app_id>',
    //     android: 'market://details?id=jsit.in.seller',
    //     windows: 'ms-windows-store://review/?ProductId=<store_id>'
    //   }
    // }

    // this.appRate.promptForRating(false);
  }

}
