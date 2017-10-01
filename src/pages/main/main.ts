import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  qrs: FirebaseListObservable<any>;
  usuario: any;
  usuarios: FirebaseListObservable<any>;
  qrData = null;
  createdCode = null;
  scannedCode = null;
  constructor(public alertCtrl:AlertController,public db: AngularFireDatabase, private barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams) {
    this.usuario = this.navParams.get("usuario");
    this.qrs = db.list("/Codigos");
    this.usuarios = db.list("/usuarios");
  }
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.verificarQR(this.scannedCode);
    })
  }
  verificarQR(code) {
    var cargo=false;
    this.qrs.forEach(element => {
      for (let i in element) {
        if (element[i].$key == code) {
          if(element[i].$value==10 && this.usuario.codigo10==0)
          {
            cargo=true
            parseInt(this.usuario.credito += element[i].$value);
            this.usuarios.update(this.usuario.nombre, { credito: this.usuario.credito, codigo10:1});
            return;
          }else if(element[i].$value==50 && this.usuario.codigo50==0)
          {
            cargo=true
            parseInt(this.usuario.credito += element[i].$value);
            this.usuarios.update(this.usuario.nombre, { credito: this.usuario.credito, codigo50:1});
            return;
          }
          else if(element[i].$value==100 &&this.usuario.codigo100==0){
            cargo=true
            parseInt(this.usuario.credito += element[i].$value);
            this.usuarios.update(this.usuario.nombre, { credito: this.usuario.credito, codigo100:1});
            return;
          }
        }
        console.log(cargo);
      }
      if (cargo==false){
        let alert = this.alertCtrl.create({
          title: 'Carga Fallida',
          subTitle: 'Usted ya cargo este codigo, intente con otro.',
          buttons: ['OK']
        
        });
        alert.present();
      }
    });

  }
  ionViewDidLoad() {

  }

}
