import { Component, ViewChild, OnInit } from '@angular/core';
import { GlobalProvider } from "../../../providers/globals/globals";
import { ApisService } from "../../../providers/apis/apis";
import { Storage } from '@ionic/storage';
import { NgForm, Validators, FormBuilder, FormGroup, Form } from '@angular/forms';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  public currentUser: any = {};
  products: any;  

  constructor(
    public global: GlobalProvider,
    private storage: Storage,
    public navCtrl: NavController,
    public apis: ApisService
  ) {

    this.currentUser = this.global.currentUser;

  }

  ngOnInit() {

    this.sellerProductList();
  }

  sellerProductList() {

    this.global.showSortLoading();

    let params = {
      user_id: this.currentUser.id,
    };
    this.apis.sellerProductList(params)
      .subscribe((result: any) => {

        console.log('result:', result);
        this.global.hideloading();

        if(result.status == '1') {
          this.products = result.products;
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
  
  deleteProduct(productID) {

    this.global.presentAlertConfirm('Are you sure you want to delete this product!', (cancel, confirmed) => {

      if (cancel) {
        return false;
      } else {
        
      this.global.showloading();

      let params = {
        user_id: this.currentUser.id,
        product_id: productID,
      };
      this.apis.deleteProduct(params)
        .subscribe((result: any) => {

          console.log('result:', result);
          this.global.hideloading();

          if(result.status == '1') {
            this.products = this.products.filter(function(value) {
              if(value.id !== productID) {
                return value;
              }
            })
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
    })
  }

  productDetail(productID) {
    console.log('Detail page is comming soon...')
    //this.navCtrl.navigateForward('product-detail/'+productID);
  }

}

