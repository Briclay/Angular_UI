  import { Component, OnInit ,ViewChild} from '@angular/core';
  import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
  import { MatDialog,MatSnackBar } from '@angular/material';
  import { UserSelectionDialogComponent } from '../bpd-list/user-selection-dialog/user-selection-dialog.component';
  import { BpdListService } from './bpd-list.service';
  import * as _ from 'lodash';

  @Component({
    selector: 'app-bpd-list',
    templateUrl: './bpd-list.component.html',
    styleUrls: ['./bpd-list.component.scss']
  })
  export class BpdListComponent implements OnInit {
    @ViewChild('tabGroup') tabGroup;
    bpdListForm : FormGroup;
    addForm : FormGroup;
    bpdListDetailsOptions:any;
    listDetailsOptions:any;
    addData=[ ];
    bpdListArray = []
    orgId : any;
    tableFlag = false;
    bpdLists = []
    userId : any;
    bpdAllLists : any;
    loggedUser : any;
    bpdNo : any;
    userType : any;
    constructor( private formBuilder:FormBuilder,
      private dialog: MatDialog,
      private bpdListService: BpdListService,
      private snackBar : MatSnackBar
      ) { }
    
    ngOnInit() {
      let orgData = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
      this.orgId = orgData._id;
      this.loggedUser  = JSON.parse(window.localStorage.getItem('authUser'));
      this.userId = this.loggedUser._id;
      this.userType = this.loggedUser.userType.toLowerCase().replace(/\s+/g, '-');;
      this.bpdListForm = this.formBuilder.group({
        initiatedDate: [new Date(), Validators.required],
        _organisationId: [this.orgId, Validators.required],
        process: [''],
        bpdNumber: [''],
        processOwner: this.formBuilder.group({
          _id: [''],
          name: [''],
          email: [''],
        }),
        pointOfContact: this.formBuilder.group({ 
          _id: [''], 
          name: [''],
          email: [''],
        }),
        depNamePOContact : [''],
        depNameProcessOwner : [''],
      });
      this.getNcmListData()
    }
    //To get all NCM List Data
    getNcmListData() {
      this.bpdListService.getAll().pipe().subscribe(res => {
        this.bpdAllLists = res;
        if(this.userType === 'user'){
          if(this.bpdAllLists.length > 0){
            this.bpdAllLists.forEach(list => {
              if(list.processOwner._id === this.userId || list.pointOfContact._id === this.userId){
                this.bpdLists.push(list)
              }
            })
          }
        }
        else{
          this.bpdLists = this.bpdAllLists;
        }
      })
    }
    
    tabSwitch(tabReq) {
      this.tabGroup.selectedIndex = tabReq.index;
      this.getNcmListData()
    }

    openDetailsDialogPointOfContact(v,i) {
      let dialogRef = this.dialog.open(UserSelectionDialogComponent, {
        width: '450px',
        data: 'pointOfContact'
      }).afterClosed().subscribe(response =>{
      if (response) {
          this.bpdLists.forEach(value => {
            if(v._id == value._id){
              v.depNamePOContact = response.depName;
              v.pointOfContact = response.pointOfContact;
            }
          })
        }
      });  
    }
    openDetailsDialogProcessOwner(v,i) {
      let dialogRef = this.dialog.open(UserSelectionDialogComponent, {
        width: '450px',
        data: 'processOwner'
      }).afterClosed().subscribe(response =>{
        if (response) {
          this.bpdLists.forEach(value => {
            if(v._id == value._id){
              v.depNameProcessOwner = response.depName;
              v.processOwner = response.processOwner;
            }
          })
        }
      });
    }
    onSubmit(v) {
      delete this.bpdListForm.value.depNamePOContact;
      delete this.bpdListForm.value.depNameProcessOwner;
      if(this.bpdListForm.value.process !== v.process && v.process !== ""){
        if(this.bpdListForm.value.process === v.process){
          this.bpdListForm.value.process = v.process
        }
        else{
          this.bpdListForm.value.process = this.bpdListForm.value.process
        }
      }
      if(this.bpdListForm.value.bpdNumber !== v.bpdNumber && v.bpdNumber !== ""){
        this.bpdListForm.value.bpdNumber = v.bpdNumber
      }
      if(this.bpdListForm.value.processOwner !== v.processOwner && 
      !(_.isEmpty(v.processOwner))){
        this.bpdListForm.value.processOwner = v.processOwner
    }
    if(this.bpdListForm.value.pointOfContact !== v.pointOfContact && 
      !(_.isEmpty(v.pointOfContact))) {
      this.bpdListForm.value.pointOfContact = v.pointOfContact
  }
  this.bpdListService.update(v._id, this.bpdListForm.value).pipe().subscribe(response => {
    this.snackBar.open("BPD updated successfully", 'BPD', {
      duration: 2000,
    });
  }, (error: any) => {
    this.snackBar.open(error.message, 'BPD', {
      duration: 2000,
    });
    console.log(error.message)
  });
  }
    reset(){
      this.bpdListForm.reset();
    }
  }
