import { Component, ViewChild, OnInit } from '@angular/core';
import { GlobalProvider } from "../../../providers/globals/globals";
import { ApisService } from "../../../providers/apis/apis";
import { Storage } from '@ionic/storage';
import { NgForm, Validators, FormBuilder, FormGroup, Form } from '@angular/forms';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  orders: any;
  orderBatchs: any = {new:0, processing:0, delivered:0};

  constructor(
    public global: GlobalProvider,
    private storage: Storage,
    public navCtrl: NavController,
    public apis: ApisService
  ) {

  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    // get user information 
    this.storage.get('user').then((user) => {

      //console.log('##################### user:', user);

      if (user) {
        this.getNewOrders();
      }
    })
  }

  getNewOrders() {

    this.global.showSortLoading();

    let params = {
      user_id: this.global.currentUser.id,
    };

    this.apis.getNewOrders(params)
      .subscribe((result: any) => {

        console.log('result:', result);
        this.global.hideloading();

        if (result.status == '1') {
          this.orders = result.orderDetails;
          this.orderBatchs.new = this.orders.length;
        } else {
          this.global.showMsg(result.msg);
        }
      },
        error => {
          console.error(error.msg);
          this.global.hideloading();
          this.global.showMsg(error);
        });
  }

  getProcessingOrders() {

    this.global.showSortLoading();

    let params = {
      user_id: this.global.currentUser.id,
    };
    this.apis.getProcessingOrders(params)
      .subscribe((result: any) => {

        console.log('result:', result);
        this.global.hideloading();

        if (result.status == '1') {
          this.orders = result.orderDetails;
          this.orderBatchs.processing = this.orders.length;
        } else {
          this.global.showMsg(result.msg);
        }
      },
        error => {
          console.error(error.msg);
          this.global.hideloading();
          this.global.showMsg(error);
        });
  }

  getDeliveredOrders() {

    this.global.showSortLoading();

    let params = {
      user_id: this.global.currentUser.id,
    };
    this.apis.getDeliveredOrders(params)
      .subscribe((result: any) => {

        console.log('result:', result);
        this.global.hideloading();

        if (result.status == '1') {
          this.orders = result.orderDetails;
          this.orderBatchs.delivered = this.orders.length;
        } else {
          this.global.showMsg(result.msg);
        }
      },
        error => {
          console.error(error.msg);
          this.global.hideloading();
          this.global.showMsg(error);
        });
  }


  orderDetail(orderID) {
    console.log('Detail page is comming soon...')
    this.navCtrl.navigateForward('order-detail/'+orderID);
  }

}

