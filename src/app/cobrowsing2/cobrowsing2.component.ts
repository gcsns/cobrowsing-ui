import { Component, OnInit, ElementRef, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import io from 'socket.io-client';
import { CobrowsingService } from '../cobrowsing.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CobrowsingformComponent } from '../cobrowsingform/cobrowsingform.component';
import { IAddPhotoReturn } from '../types/aws.interface';

import { formJSON } from './options';
import { NzUploadListComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-cobrowsing2',
  templateUrl: './cobrowsing2.component.html',
  styleUrls: ['./cobrowsing2.component.scss']
})
export class Cobrowsing2Component implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private cobrowsingService: CobrowsingService,
    private msg: NzMessageService,
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute
  ) { }


  static uniqueId: string;
  static mysequenceNumber: number;
  static prevSequenceNumberReceived: number;
  cbFormJSON = formJSON;
  validateForm: FormGroup;
  isVisible: boolean;
  uploadedImages: any;

  objectkeys = Object.keys;
  @ViewChild('previewImage') previewImage: ElementRef;
  username: string;
  userType: string;
  formCode: string;

  socket: SocketIOClient.Socket;


  counter = 0;
  imageName;

  documents = [];
  uploadedFilesTracker: any[] = [];

  loginForm!: FormGroup;
  showLoginForm = true;


  ngOnInit(): void {
    this.userType = '';
    CobrowsingformComponent.uniqueId = this.cobrowsingService.getUniqueId();
    // tslint:disable-next-line: radix
    CobrowsingformComponent.mysequenceNumber = parseInt(this.cobrowsingService.getSequenceNumber());

    this.initLoginForm();
    this.initializeForm();
    this.watchForChange();

    this.formCode = this.activatedRoute.snapshot.queryParams.formCode;
  }
  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (!this.validateForm.errors) {
      this.cobrowsingService.submitForm({
        code: this.formCode,
        formType: 'llc',
        uploadStatus: this.uploadedFilesTracker
      }).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
    }
  }


  handleCancel(): void {
    this.isVisible = false;
  }


  destroyModal(): void {
    this.modalService.ngOnDestroy();
  }
  subscribeToSocket() {
    this.socket = io(environment.socketUrl, {
      transports: ['polling', 'websocket']
    });


    this.socket.on('sync', (data) => {
      console.log('sync event fired, syncing numbers');
      if (data.uniqueId != CobrowsingformComponent.uniqueId) {
        CobrowsingformComponent.prevSequenceNumberReceived = data.nextSequenceNumber - 10;
      }
    });

    this.socket.on('sync', (data) => {
      CobrowsingformComponent.prevSequenceNumberReceived = data.nextSequenceNumber;
    });

    this.socket.emit('sync', { nextSequenceNumber: CobrowsingformComponent.mysequenceNumber, uniqueId: CobrowsingformComponent.uniqueId });

    this.socket.on('connect', (data) => {
      console.log('socket connected');
    });

    this.socket.on('message', (data) => {
      this.handleData(data);
    });

    this.socket.on('info', (message) => {
      console.log('some info received');
      this.msg.info(message);
    });

    this.socket.on('fileUpload', (data) => {
      const { image, name } = data;
      console.log('some file was uploaded by the client');
      this.uploadedImages[name] = image;
    });

    this.socket.on('disconnect', () => {
      console.log('socket disconnected');
    });

  }


  isUnchanged(changedValues) {
    console.log(this.validateForm.value, changedValues);
    let counter = 0;
    Object.keys(this.validateForm.value).forEach(key => {
      if (this.validateForm.value[key] !== changedValues[key]) {
        console.log(this.validateForm.value[key], changedValues[key]);
        counter++;
      }
    });

    if (counter > 0) {
      return false;
    }

    return true;
  }


  initializeForm() {
    const formObj = {};
    const includedFormTypes = ['input', 'textarea', 'radiogroup'];
    Object.keys(this.cbFormJSON.metadata).forEach(key => {
      const element = this.cbFormJSON.metadata[key];
      if (includedFormTypes.includes(element.type)) {
        const defaultValue = element.defaultValue || '';
        formObj[key] = [defaultValue, Validators.required];
      }

      if (element.type === 'upload') {
        this.documents.push(this.cbFormJSON.metadata[key]);
      }
    });

    this.validateForm = this.fb.group(formObj);
    this.populateHistory();
  }

  nationalityChange(event) {
    console.log(event);
  }

  showPreviewImage(doc) {
    this.isVisible = true;
    this.previewImage.nativeElement.src = doc.url;
  }


  watchForChange() {
    this.validateForm.valueChanges.subscribe(change => {
      CobrowsingformComponent.mysequenceNumber = CobrowsingformComponent.mysequenceNumber + 10;
      const msg = {
        nextsequenceNumber: CobrowsingformComponent.mysequenceNumber,
        uniqueId: CobrowsingformComponent.uniqueId,
        change
      };

      this.socket.emit('message', msg);
    });
  }


  handleData(data: any) {
    if (data.uniqueId === CobrowsingformComponent.uniqueId) {
      console.log('same id returning', CobrowsingformComponent.uniqueId, data.uniqueId);
      return;
    }

    if (CobrowsingformComponent.prevSequenceNumberReceived >= data.nextsequenceNumber) {
      return;
    }

    CobrowsingformComponent.prevSequenceNumberReceived = data.nextsequenceNumber;
    CobrowsingformComponent.mysequenceNumber -= 10;
    this.validateForm.patchValue(data.change);
  }
  handleChange(files: FileList) {
    this.cobrowsingService.addPhoto(this.formCode || 'default_album', files).subscribe((data: IAddPhotoReturn) => {
      this.socket.emit('fileUpload', { name: this.imageName, image: data.Location });
      this.msg.success(`file successfully uploaded`);
      console.log(data);
      this.uploadedFilesTracker.push({
        name: data.key.split('/')[1],
        documentLink: data.Location,
        status: 'pending'
      });
    }, error => {
      console.log('Something went wrong');
    });
  }
  assignName(name: string) {
    this.imageName = name;
    console.log('I was also called');
  }
  initLoginForm() {
    const userType = this.activatedRoute.snapshot.queryParams?.userType?.toLocaleLowerCase();
    console.log(userType);
    if (userType === 'agent') {
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
    // tslint:disable-next-line: forin
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if (this.loginForm.get('otp').value === '1234') {
      this.username = this.loginForm.get('username').value;
      this.subscribeToSocket();
      this.showLoginForm = false;
    }
  }


  uploading = false;
  fileList: NzUploadListComponent[] = [];
  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploading = true;
    // You can use any AJAX library you like
    this.cobrowsingService.addPhoto(this.formCode || 'default_album', this.fileList)
      .subscribe((response: any) => {
        console.log(response);
        this.documents = this.documents.map(doc => {
          if (doc.name === this.activeDoc.name) {
            doc.url = response.Location;
          }
          return doc;
        });

        this.uploading = false;
        this.fileList = [];
        this.msg.success('Attachments uploaded successfully.');
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }

  beforeUpload = (file: NzUploadListComponent): boolean => {
    this.fileList = this.fileList.concat(file);
    this.handleUpload();
    return false;
  }

  activeDoc: any;
  markActiveDocument(doc) {
    this.activeDoc = doc;
  }


  populateHistory() {
    const { documents, form } = this.cobrowsingService.getForm2Details();
    console.log('Retrieved histor', documents, form);

    this.validateForm.patchValue(form);
    this.documents = documents;
    // for (let past of documents) {
    //   for (let doc of documents) {
    //     if (doc.name === past.name) {
    //       doc = past;
    //     }
    //   }
    // }

    // this.documents = this.documents.filter(() => true);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
      this.cobrowsingService.saveForm2Details(this.validateForm.value, this.documents);
  }

  ngOnDestroy() {
    this.cobrowsingService.saveForm2Details(this.validateForm.value, this.documents);
  }
}
