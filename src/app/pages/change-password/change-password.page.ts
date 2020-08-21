import { Component, ViewChild, OnInit } from '@angular/core';
import { GlobalProvider } from "../../../providers/globals/globals";
import { ApisService } from "../../../providers/apis/apis";
import { Storage } from '@ionic/storage';
import { NgForm, Validators, FormBuilder, FormGroup, Form } from '@angular/forms';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  changepassForm: FormGroup;

  constructor(
    public global: GlobalProvider,
    private storage: Storage,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public apis: ApisService
  ) {

    this.changepassForm = formBuilder.group({
      currentPassword: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      confirmPassword: ['', Validators.required],
    }, { validators: this.matchingPasswords('password', 'confirmPassword') });

  }

  ngOnInit() {

  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value && confirmPassword.value != '') {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  updatepassword() {

    this.global.showloading();

    let params = {
      id: this.global.currentUser.id,
      old_password: this.changepassForm.value.currentPassword,
      password: this.changepassForm.value.password,
    };
    this.apis.changePassword(params)
      .subscribe((result: any) => {

        console.log('result:', result);
        this.global.hideloading();

        this.global.showMsg(result.msg);

        if (result.status) {
          this.changepassForm.reset()
        }
      },
        error => {
          console.error(error.msg);
          this.global.hideloading();
          this.global.showMsg(error);
        });
  }

}
