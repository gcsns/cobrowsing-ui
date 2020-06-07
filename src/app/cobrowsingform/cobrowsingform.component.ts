import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import io from "socket.io-client";
import { CobrowsingService } from '../cobrowsing.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFile, UploadChangeParam } from 'ng-zorro-antd/upload';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cobrowsingform',
  templateUrl: './cobrowsingform.component.html',
  styleUrls: ['./cobrowsingform.component.scss']
})
export class CobrowsingformComponent implements OnInit {

  validateForm!: FormGroup;
  fileList: UploadFile[] = []
  previewMode = false;
  uploadedImages:string[] = [];
  isVisible = false;
  isConfirmLoading = false;

  @ViewChild('previewImage') previewImage: ElementRef;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if(!this.validateForm.errors) {
      this.cobrowsingService.submitForm({
        code: this.formCode,
        formType: "llc",
        uploadStatus : this.uploadedFilesTracker
      }).subscribe(response=>{
        console.log(response)
      }, error=>{
        console.log(error);
      });
    }
  }



  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(
    private fb: FormBuilder,
    private cobrowsingService: CobrowsingService,
    private msg: NzMessageService,
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute
  ) {}

  static uniqueId: string;
  static mysequenceNumber: number;
  static prevSequenceNumberReceived: number;
  username: string;
  userType: string;
  formCode: string;
  ngOnInit(): void {
    this.userType = "";
    CobrowsingformComponent.uniqueId = this.cobrowsingService.getUniqueId();
    CobrowsingformComponent.mysequenceNumber = parseInt(this.cobrowsingService.getSequenceNumber());

    this.initLoginForm();
    this.initializeForm();
    this.watchForChange();
    this.formCode = this.activatedRoute.snapshot.queryParams.formCode;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  destroyModal(): void {
    this.modalService.ngOnDestroy();
  }

  socket: SocketIOClient.Socket;
  subscribeToSocket() {
    this.socket = io(environment.socketUrl, {
      "transports": ["polling", "websocket"]
    });


    this.socket.on("sync", (data)=>{
      console.log("sync event fired, syncing numbers")
      if(data.uniqueId!=CobrowsingformComponent.uniqueId) {
        CobrowsingformComponent.prevSequenceNumberReceived = data.nextSequenceNumber-10;
      }
    });

    this.socket.on("sync", (data)=>{
      CobrowsingformComponent.prevSequenceNumberReceived = data.nextSequenceNumber;
    })

    this.socket.emit("sync", {nextSequenceNumber: CobrowsingformComponent.mysequenceNumber, uniqueId: CobrowsingformComponent.uniqueId})

    this.socket.on("connect", (data) => {
      console.log("socket connected");
    });

    this.socket.on("message", (data) => {
      this.handleData(data);
    });

    this.socket.on("info", (message)=> {
      console.log("some info received");
      this.msg.info(message)
    });

    this.socket.on("fileUpload", (data)=>{
      const { image, name } = data;
      console.log("some file was uploaded by the client");
      this.uploadedImages[name] = image;
    })

    this.socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

  }


  isUnchanged(changedValues) {
    console.log(this.validateForm.value, changedValues);
    let counter = 0;
    Object.keys(this.validateForm.value).forEach(key=>{
      if(this.validateForm.value[key]!==changedValues[key]) {
        console.log(this.validateForm.value[key], changedValues[key])
        counter++;
      }
    })

    if(counter > 0) {
      return false;
    }

    return true;
  }


  initializeForm() {
    this.validateForm = this.fb.group({
      accountNumber: [null, [ Validators.required]],
      firstName: [null, [Validators.required]],
      middleName: [null],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phoneNumberPrefix: ['+971'],
      phoneNumber: [null, [Validators.required]],

      dateOfBirth: [],
      placeOfBirth:[null],
      nationality: [null, [Validators.required]],
      countryOfBirth: [null],
      address: [null, Validators.required],
      agree: [false]
    });

  }

  nationalityChange(event) {
    console.log(event);
  }

  showPreviewImage(imagesrc) {
    this.isVisible = true;
    this.previewImage.nativeElement.src = imagesrc;
  }


  watchForChange() {
    this.validateForm.valueChanges.subscribe(change=>{
      CobrowsingformComponent.mysequenceNumber = CobrowsingformComponent.mysequenceNumber+10;
      const msg = {
        nextsequenceNumber: CobrowsingformComponent.mysequenceNumber,
        uniqueId: CobrowsingformComponent.uniqueId,
        change
      }

      this.socket.emit("message", msg);
    });
  }


  handleData(data: any) {
    if(data.uniqueId === CobrowsingformComponent.uniqueId) {
      console.log("same id returning", CobrowsingformComponent.uniqueId, data.uniqueId)
      return;
    }

    if(CobrowsingformComponent.prevSequenceNumberReceived >= data.nextsequenceNumber) {
      return;
    }

    CobrowsingformComponent.prevSequenceNumberReceived = data.nextsequenceNumber;
    CobrowsingformComponent.mysequenceNumber -= 10;
    this.validateForm.patchValue(data.change);
  }


  counter = 0;
  imageName;

  uploadedFilesTracker: any[] = [];
  handleChange(files: FileList) {
    console.log(this.imageName)
    if(this.counter === 0) {
      this.counter++;
      this.socket.emit("info", `file upload has been started `);
    }
    const fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.onload = (evt) => {
      this.socket.emit('fileUpload', {name: this.imageName, image:evt.target.result});
    };

    reader.onloadend = (data) => {
      this.counter = 0;
      this.cobrowsingService.addPhoto(this.formCode || "default_album", files).subscribe(data=>{
        this.msg.success(`file successfully uploaded`);
        console.log(data);
        this.uploadedFilesTracker.push({
          name: data.key.split("/")[1],
          documentLink: data.Location,
          status: "pending"
        });
      }, error=>{
        console.log("Something went wrong");
      })
    }
    reader.readAsDataURL(fileToUpload);
  }


  documents = ['Salary', 'National Id', 'Passport', 'Proof of Address']
  assignName(name: string){
    this.imageName = name;
    console.log("I was also called");
  }

  loginForm!: FormGroup;
  showLoginForm = true;
  initLoginForm() {
    const userType = this.activatedRoute.snapshot.queryParams?.userType?.toLocaleLowerCase();
    console.log(userType)
    if(userType === 'agent') {
      this.userType = userType;
      this.showLoginForm = false;
      this.subscribeToSocket();
    }


    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      otp: [null, [Validators.required]],
    });
  }

  submitLoginForm() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if(this.loginForm.get('otp').value === "1234") {
      this.username = this.loginForm.get("username").value;
      this.subscribeToSocket();
      this.showLoginForm = false;
    }
  }
}
