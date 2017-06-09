import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Sim } from '@ionic-native/sim';
import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CallNumber, Sim, Geolocation, HTTP]
})
export class HomePage {
  phoneNumber: string;
  private apiAddress: string = "http://172.16.102.58/api/localization/saveUserLocation";
  constructor(public navCtrl: NavController, private callNumber: CallNumber, private sim: Sim,
              private geolocation: Geolocation, private http: HTTP) {
    this.phoneNumber = "691608245";
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    if(data.coords.latitude != undefined && data.coords.longitude != undefined) {
      this.postCoords(data.coords.latitude, data.coords.longitude);  
    }});
  }

  public updateCoordinates(): void {
    
  }

  private postCoords(lat: number, long:number): void {
    let header: Headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post(this.apiAddress, this.formMessage(lat, long), header).then(()=> {
      console.log("Post poszedl");
    }).catch((error)=> {
      console.log("Blad podczas posta", error);
    });
  }

  public makeCall(): void {
    this.callNumber.callNumber("737997713", true)
    .then(()=> {console.log("Sukces makeCall")})
    .catch(()=> {console.log("Blad makeCall")});
  }

  public emergencyCall(): void {

  }

  public userLostHandler(): void {

  }

  private formMessage(latitude: number, longitude: number): {phone:string,lat:number,lng:number} {
    let message: {phone:string, lat:number, lng:number};
    message = {"phone":"", "lat":0, "lng":0};
    message.phone = this.phoneNumber;
    message.lat = latitude;
    message.lng = longitude;
    console.log("Message: ", message);

    return message;
  }

  private getUserPhoneNumber(): void {
    this.sim.hasReadPermission().then((info)=> {
        this.sim.getSimInfo().then((data)=> {
          console.log("Sim info: ", data);
          this.phoneNumber = data;
        });
    });
  }

}
