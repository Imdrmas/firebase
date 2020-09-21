import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email = '';


  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder, private router: Router, private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }


  goToRegisterPage() {
    this.navCtrl.navigateBack('');
  }

   resetPassword(): void {
     console.log(this.email);
     this.authService.resetPassword(this.email).then(async () => {
       const alert = await this.alertCtrl.create({
         message: 'Check your email for a password reset link',
         buttons: [
           {
             text: 'Ok',
             role: 'Cancel',
             handler: () => {
               this.router.navigateByUrl('login');
             }
           }
         ]
       });
       await alert.present();
     }, async error => {
       const errorAlert = await this.alertCtrl.create({
         message: error.message,
         buttons: [{
           text: 'Ok', role: 'Cancel'
         }]
       });
       await errorAlert.present();
     });
   }

}
