import { 
  Component } from '@angular/core';
import {MenuController ,AlertController,NavController,NavParams } from 'ionic-angular';
import {MainPage} from '../main/main';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  esUsuario:boolean;
  usuario:string;
  pass: string;
  usuarios: FirebaseListObservable<any>;
  constructor(public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public menucrtl:MenuController) {
    this.usuarios = db.list('/usuarios');
  }

  public Login()
  {
    this.usuarios.forEach(element => {
      for (let i in element) {
        if (this.usuario == element[i].nombre && this.pass == element[i].clave) {
          this.navCtrl.push(MainPage,{"usuario":element[i]});
          this.esUsuario=true;
          break;
        }
      }

    });
    if (this.esUsuario == false) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Usuario y/o Contraseña incorrectos',
        buttons: ['OK']
      });
      alert.present();
    }
  
  }
  public CargarUsuario(user:string, pass:string)
  {
    this.usuario=user;
    this.pass=pass;
    this.menucrtl.close();
    
  }
}
