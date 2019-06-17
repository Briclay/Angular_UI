  import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
  import { MatDialog,MatSnackBar } from '@angular/material';
  import * as _ from 'lodash';
  import { WorkRequestService } from '../../work-request/work-request.service';

  @Component({
    selector: 'app-contract-configuration-create',
    templateUrl: './contract-configuration-create.component.html',
    styleUrls: ['./contract-configuration-create.component.scss']
  })
  export class ContractConfigurationCreateComponent implements OnInit {
    @Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
    @Input() data: any;
    @Input() formType: string;
    contractCreateForm : FormGroup;
    workCategory:any;
    orgDetails: any;
    orgID: string;
    array = [];
    steps=[];
    contractCreateFormErrors: any;
    workSelection:any;
    contractSpinner = false;
    isLoading = false;
    
    constructor(private formBuilder:FormBuilder,private route: 
      ActivatedRoute,
      private router: Router,private snackBar: MatSnackBar,
      private workRequestService: WorkRequestService) {
      this.orgDetails =  JSON.parse(window.localStorage.authUserOrganisation);
      this.orgID = this.orgDetails._id;
      console.log('this.orgId' + JSON.stringify(this.orgDetails));
      this.getWorkRequest();
      this.contractCreateFormErrors = {
        name: {},
        noOfDays: {},   
        categoryReason: {},
        steps: []
      };
    }

    ngOnInit() { 
      this.contractCreateForm = this.formBuilder.group({
        name: ['', Validators.required],
        noOfDays: ['', Validators.required],
        categoryReason: [''],
        steps:['']
      });
      this.assignValuesToForm();
    }
    //assigning values of forms to data
    assignValuesToForm() {
      if(this.formType !=='create') {
        this.contractCreateForm.patchValue(this.data)
      }
    }
    
    //add new data to main Form
    add(){
      this.array.push(this.contractCreateForm.value)
    }
    getWorkRequest(){
      this.workRequestService.getWorkConfig(this.orgID).pipe().subscribe(res => {
        this.workCategory = res;
      }, (error: any) => {
        console.error('error', error);
      });
    }

    categoryChanged(id){
      this.contractSpinner = true;
      this.workRequestService.getSingleWork(id).pipe().subscribe(res => {
        this.workSelection = res.configKey;
        this.contractSpinner = false;
      }, (error: any) => {
        console.error('error', error);
      });
    }
    onSubmit() {
      let obj ={
        _organisationId: this.orgID, 
        configKey:this.workSelection,
        configValues : this.array
      }
      this.workRequestService.saveWorkConfig( obj)
      .pipe().subscribe(res => {
        this.isLoading = false;
        this.snackBar.open("Contract Config Updated Succesfully", 'Contract', {
          duration: 5000,
        });
        let tabReq = {index: 0}
        this.tabSwitch.emit(tabReq);
      }, (error: any) => {
        this.snackBar.open(error.message, 'Contract', {
          duration: 5000,
        });
      });
    }
    reset()
    {
    this.contractCreateForm.reset();
  }
  }