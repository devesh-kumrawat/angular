import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category_name:any;
  comment:any;
  image:any;
  vedio:any;
  category:any;
  categorylist:any;
  uploadPercent: any;
  downloadURL: any;
  constructor(public firestore: AngularFirestore , private http: HttpClientModule, public storage: AngularFireStorage ) { }

  ngOnInit(): void {
    this.category = this.firestore.collection('category');
  }
  insertdata(){
    //alert(this.comment);
    if(this.category_name && this.comment){
      var categorylist ={
        'category_name': this.category_name,
        'comment': this.comment,
        'image'  : this.image,
      }
      this.category.add(categorylist);
    }else{
      alert('category field is required');
    }

  }
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'devesh-bro'+'/'+file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
        finalize(() => { fileRef.getDownloadURL().subscribe(downloadURL => {
          this.image = downloadURL;
          console.log('File available at', downloadURL);
          //fileUpload.name = fileUpload.file.name;
          //this.saveFileData(fileUpload);
        }); })
    )
    .subscribe()
  }

}
