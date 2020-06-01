declare let AWS: any;

export class AwsHelper {

  private formCode: string;
  private fileToUpload: any;
  constructor(private fc: string) {
    this.formCode = fc;
  }
  uploadPhoto(index: number, file: any, isMisc: boolean, filename: string) {
    const randomNum = Math.floor(Math.random() * (9999 - 999) + 999);
    var filename = this.formCode + '/' + randomNum + '_compressed_' + filename;
    AWS.config.update({
      accessKeyId: '',
      secretAccessKey: ''
    });
    //amazon s3 region
    AWS.config.region = 'us-west-2';
    //amazon s3 bucket name
    var bucket = new AWS.S3({ params: { Bucket: 'docs-bn' }});
    var params = { Key: filename, ContentType: file.type, Body: file };
    var imgUrl = 'https://docs-bn.s3.us-west-2.amazonaws.com/' + filename;
    bucket.upload(params).on('httpUploadProgress', (event) => {
      console.log("uploaded the event")
    }).send((err,data: any)=>{
      if(err) {
        console.log("some error occured");
        return;
      }

      console.log(data);
    })
  }
}
