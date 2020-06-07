import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { from, Subscribable } from 'rxjs';

declare let AWS: any;

@Injectable({
  providedIn: 'root'
})
export class CobrowsingService {

  constructor(private http: HttpClient) { }

  getUniqueId() {
    console.log("service called, sending unique id back")
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }


  getSequenceNumber() {
    return (Math.random() * 100000).toString()
  }

  storeToBitnudge(body) {
    const url = `${environment.backendUrl}/api/formCodeData?apiToken=${encodeURIComponent('*&@@*#SKD@*@W*@#E%*&B!(*#*#')}`

    return this.http.post(url, body);
  }



  verifyOTP(customerId: string, otp: string) {
    var body = {
      _id: customerId,
      otp: parseInt(otp)
    }
    const url = `${environment.backendUrl}/api/customers/valCustomer?apiToken=${encodeURIComponent('*&@@*#SKD@*@W*@#E%*&B!(*#*#')}`;
    return this.http.post(url, body)
  }

  getOTP(customerId: string) {
    var url = `${environment.backendUrl}` + '/api/customers/generateOTP/' + customerId;
    url = url + '?apiToken=' + encodeURIComponent('*&@@*#SKD@*@W*@#E%*&B!(*#*#');
  }


  addPhoto(albumName, files): Subscribable<any> {
    AWS.config.update({
      region: "us-west-2",
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "us-west-2:879e92ce-0424-4957-8fda-ad8b5779a062"
      })
    });

    var file = files[0];
    var fileName = file.name;
    var albumPhotosKey = encodeURIComponent(albumName) + "/";

    var photoKey = albumPhotosKey + fileName;

    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "docs-bn",
        Key: photoKey,
        Body: file,
        ACL: "public-read"
      }
    });

    var promise = upload.promise();

    return from(promise);
  }


  submitForm(data) {
    return this.http.post(
      environment.backendUrl,
      data
    )
  }
}
