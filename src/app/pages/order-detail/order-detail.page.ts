import { Component, ViewChild, OnInit } from '@angular/core';
import { GlobalProvider } from "../../../providers/globals/globals";
import { ApisService } from "../../../providers/apis/apis";
import { Storage } from '@ionic/storage';
import { NgForm, Validators, FormBuilder, FormGroup, Form } from '@angular/forms';
import { Platform, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  public currentUser: any = {};
  orderID: any;
  orderDetail: any;
  orderProducts: any;

  constructor(
    public global: GlobalProvider,
    private storage: Storage,
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public apis: ApisService
  ) {
    this.orderID = this.activatedRoute.snapshot.paramMap.get('order_id');
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.currentUser = this.global.currentUser;

    this.getOrderDetail();
  }

  getOrderDetail() {

    this.global.showSortLoading();

    let params = {
      user_id: this.currentUser.id,
      id: this.orderID
    };

    this.apis.getOrderDetail(params)
      .subscribe((result: any) => {

        console.log('result:', result);
        this.global.hideloading();

        if (result.status == '1') {
          this.orderDetail = result.orderDetails;
          this.orderProducts = result.orderDetails.product_details;
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

  approveOrder() {

    console.log('approve')

    this.global.presentAlertConfirm('Do you really want to process this order?', (cancel, confirmed) => {

      if (cancel) {
        return false;
      } else {

        this.global.showSortLoading();

        let params = {
          user_id: this.currentUser.id,
          id: this.orderID,
          order_status: 'Confirmed'
        };

        this.apis.updateOrderStatus(params)
          .subscribe((result: any) => {

            console.log('result:', result);
            this.global.hideloading();

            this.global.showMsg(result.msg);

            if (result.status == '1') {
              setTimeout(() => {
                this.navCtrl.navigateRoot('home');
              }, 1000);
            }
          },
            error => {
              console.error(error.msg);
              this.global.hideloading();
              this.global.showMsg(error);
            });
      }
    });
  }

  cancelOrder() {

    console.log('cancel')

    this.global.presentAlertConfirm('Do you really want to cancel this order?', (cancel, confirmed) => {

      if (cancel) {
        return false;
      } else {

        this.global.showSortLoading();

        let params = {
          user_id: this.currentUser.id,
          id: this.orderID,
          order_status: 'Cancelled'
        };

        this.apis.updateOrderStatus(params)
          .subscribe((result: any) => {

            console.log('result:', result);
            this.global.hideloading();

            this.global.showMsg(result.msg);

            if (result.status == '1') {
              setTimeout(() => {
                this.navCtrl.navigateRoot('home');
              }, 1000);
            }
          },
            error => {
              console.error(error.msg);
              this.global.hideloading();
              this.global.showMsg(error);
            });
      }
    });
  }

  deliveredOrder() {

    console.log('delivered')

    this.global.presentAlertConfirm('Are you sure?', (cancel, confirmed) => {

      if (cancel) {
        return false;
      } else {

        this.global.showSortLoading();

        let params = {
          user_id: this.currentUser.id,
          id: this.orderID,
          // order_status: 'Shipped',
          order_status: 'Delivered',
        };

        this.apis.updateOrderStatus(params)
          .subscribe((result: any) => {

            console.log('result:', result);
            this.global.hideloading();

            this.global.showMsg(result.msg);

            if (result.status == '1') {
              setTimeout(() => {
                this.navCtrl.navigateRoot('home');
              }, 1000);
            }
          },
            error => {
              console.error(error.msg);
              this.global.hideloading();
              this.global.showMsg(error);
            });
      }
    });
  }

}

