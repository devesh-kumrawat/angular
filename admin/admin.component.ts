import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
 first_name:any;
 last_name:any;
 email:any;
 address:any;
 phone:any;
 item:any;
 admin:any;
  constructor(public firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.admin = this.firestore.collection('admin');
  }
  insertdata(){
    if(this.first_name && this.last_name){
    var item ={
           'first_name':this.first_name,
           'last_name':this.last_name,
           'email':this.email,
           'address':this.address,
           'phone':this.phone,

    }
    this.admin.add(item);
  }
  else{
    alert('first name is reqiured');
  }
  }
}
