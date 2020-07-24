import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { from, Subscribable } from 'rxjs';
import { filter } from 'rxjs/operators';


declare let AWS: any;

@Injectable({
  providedIn: 'root'
})
export class CobrowsingService {

  constructor(private http: HttpClient) { }

  getUniqueId() {
    console.log('service called, sending unique id back');
    // tslint:disable-next-line: no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }


  getSequenceNumber() {
    return (Math.random() * 100000).toString();
  }

  storeToBitnudge(body) {
    const url = `${environment.backendUrl}/api/formCodeData?apiToken=${encodeURIComponent('*&@@*#SKD@*@W*@#E%*&B!(*#*#')}`;

    return this.http.post(url, body);
  }



  verifyOTP(customerId: string, otp: string) {
    let body = {
      _id: customerId,
      otp: parseInt(otp)
    };
    const url = `${environment.backendUrl}/api/customers/valCustomer?apiToken=${encodeURIComponent('*&@@*#SKD@*@W*@#E%*&B!(*#*#')}`;
    return this.http.post(url, body);
  }

  getOTP(customerId: string) {
    let url = `${environment.backendUrl}` + '/api/customers/generateOTP/' + customerId;
    url = url + '?apiToken=' + encodeURIComponent('*&@@*#SKD@*@W*@#E%*&B!(*#*#');
  }


  addPhoto(albumName, files): Subscribable<any> {
    AWS.config.update({
      region: 'us-west-2',
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-west-2:879e92ce-0424-4957-8fda-ad8b5779a062'
      })
    });

    const file = files[0];
    const fileName = file.name;
    const albumPhotosKey = encodeURIComponent(albumName) + '/';

    const photoKey = albumPhotosKey + fileName;

    // Use S3 ManagedUpload class as it supports multipart uploads
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'docs-bn',
        Key: photoKey,
        Body: file,
        ACL: 'public-read'
      }
    });

    const promise = upload.promise();

    return from(promise);
  }

  submitForm(data) {
    return this.http.post(
      environment.backendUrl,
      data
    );
  }

  saveForm2Details(form, documents) {
    localStorage.setItem('form', JSON.stringify(form));
    localStorage.setItem('documents', JSON.stringify(documents));
  }

  getForm2Details() {
    const documents = JSON.parse(localStorage.getItem('documents'));
    const form = JSON.parse(localStorage.getItem('form'));


    return { documents, form };
  }
}
