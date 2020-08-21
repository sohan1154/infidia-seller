import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { GlobalProvider } from "../../providers/globals/globals";

/*
  Generated class for the Apis Service Provider.

  See https://angular.io/guide/dependency-injection for more info on APIs service providers
  and Angular DI.
*/
@Injectable()
export class ApisService {

  // base url
  private baseUrl = 'http://localhost/infidia/api/';

  private headers: any;
  private timeout: number = (30 * 1000);

  constructor(
    public http: HttpClient,
    public global: GlobalProvider
  ) {
    console.log('APIs service provider is called');

    // set defaul headers
    this.headers = new HttpHeaders();
    this.headers.set('Access-Control-Allow-Origin' , '*');
    this.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.headers.set('Content-Type', 'application/json');
  }

  login(params: any) {
    return this.http.post(this.baseUrl + 'login', params, { headers: this.headers }).pipe(timeout(this.timeout));
  }

  changePassword(params: any) {
    return this.http.post(this.baseUrl + 'changePassword', params, { headers: this.headers }).pipe(timeout(this.timeout));
  }

  sendOTP(params: any) {
    return this.http.post(this.baseUrl + 'sendOtp', params, { headers: this.headers }).pipe(timeout(this.timeout));
  }

  resendOTP(params: any) {
    return this.http.post(this.baseUrl + 'resendOtp', params, { headers: this.headers }).pipe(timeout(this.timeout));
  }

  verifyOTP(params: any) {
    return this.http.post(this.baseUrl + 'verifyOtp', params, { headers: this.headers }).pipe(timeout(this.timeout));
  }

  getAllStaticAndDynamicLists() {
    return this.http.get(this.baseUrl + 'get-all-static-and-dynamic-lists', {params : {}, headers: this.headers }).pipe(timeout(this.timeout));
  }

  getCitiesStates() {
    return this.http.get(this.baseUrl + 'get-cities-states', {params : {}, headers: this.headers }).pipe(timeout(this.timeout));
  }

  updateProfile(params: any) {
    return this.http.post(this.baseUrl + 'updateUserDetails', params, { }).pipe(timeout(this.timeout));
  }

  uploadProfileImage(params: any) {
    return this.http.post(this.baseUrl + 'profiles/upload-profile-image', params, { }).pipe(timeout(this.timeout));
  }
  
  makePayment(params: any) {
    return this.http.post(this.baseUrl + 'make-payment', params, { headers: this.headers }).pipe(timeout(this.timeout));
  }
  
  shareFeedback(params: any) {
    return this.http.post(this.baseUrl + 'shareFeedback', params, { headers: this.headers }).pipe(timeout(this.timeout));
  }
  
  resetBadge(params: any) {
    return this.http.post(this.baseUrl + 'reset-badge', params, {headers: this.headers }).pipe(timeout(this.timeout));
  }
  
  staticPage(params: any) {
    return this.http.get(this.baseUrl + 'pages', { params: params, headers: this.headers }).pipe(timeout(this.timeout));
  }

  sellerProductList(params: any) {
    return this.http.post(this.baseUrl + 'sellerProductList', params, { }).pipe(timeout(this.timeout));
  }

  getNewOrders(params: any) {
    return this.http.post(this.baseUrl + 'newOrderDetails', params, { }).pipe(timeout(this.timeout));
  }

  getProcessingOrders(params: any) {
    return this.http.post(this.baseUrl + 'processOrderDetails', params, { }).pipe(timeout(this.timeout));
  }

  getDeliveredOrders(params: any) {
    return this.http.post(this.baseUrl + 'DelievredOrderDetails', params, { }).pipe(timeout(this.timeout));
  }

  deleteProduct(params: any) {
    return this.http.post(this.baseUrl + 'deleteProduct', params, { }).pipe(timeout(this.timeout));
  }

  getOrderDetail(params: any) {
    return this.http.post(this.baseUrl + 'OrderDetails', params, { }).pipe(timeout(this.timeout));
  }

  updateOrderStatus(params: any) {
    return this.http.post(this.baseUrl + 'updateOrderStatus', params, { }).pipe(timeout(this.timeout));
  }

}
