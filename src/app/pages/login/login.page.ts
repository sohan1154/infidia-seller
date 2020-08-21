import { Component, ViewChild, OnInit } from '@angular/core';
import { GlobalProvider } from "../../../providers/globals/globals";
import { ApisService } from "../../../providers/apis/apis";
import { Storage } from '@ionic/storage';
import { NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform: FormGroup;

  constructor(
    public global: GlobalProvider,
    private storage: Storage,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public apis: ApisService,
    // public events: Events
  ) {

    this.loginform = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });

  }

  ngOnInit() {

  }

  login() {

    this.global.showloading();

    let params = {
      email: this.loginform.value.email,
      password: this.loginform.value.password,
      role: this.global.role
    };

    this.apis.login(params)
      .subscribe((result: any) => {

        console.log('result:', result);
        this.global.hideloading();

        if (result.status=='1') {

          // set user information
          this.storage.set('token', result.token);
          this.storage.set('user', result.user);

          // set user information 
          this.global.setCurrentUser(result.user);
          
          // this.events.publish('currentUser'); 
          // Events from @ionic/angular package got removed from Ionic 5. You should use Observables.
          // https://stackoverflow.com/questions/60197785/how-to-fix-member-event-from-ionic-angular-error-in-ionic-5

          this.storage.remove('mobile');

          // this.navCtrl.navigateForward('/');
          this.navCtrl.navigateRoot('/');
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

  staticPages(pageKey) {
    this.navCtrl.navigateForward('/static-page/'+pageKey);
  }

}
