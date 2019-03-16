import { Component, OnInit ,Input, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {merge as observableMerge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { WorkRequestService } from '../../work-request/work-request.service';

@Component({
  selector: 'app-contract-configuration-detail',
  templateUrl: './contract-configuration-detail.component.html',
  styleUrls: ['./contract-configuration-detail.component.scss']
})
export class ContractConfigurationDetailComponent implements OnInit {
  /*contractForm:formArrayName;*/
  contractDetailForm : FormGroup;
  workCategory:any;
  workSelection:any;
  orgDetails: any;
  orgID: string;
  contractSpinner = false;
  configValues:any;


 /* contractList = [
  { 
   name:"meghana",
   days:"01",
   categoryReason:"R1",
   steps:"2"
 }
 ]*/
 constructor(private formBuilder:FormBuilder,private route: ActivatedRoute,
  private router: Router,
  private workRequestService: WorkRequestService,) { 
   this.contractDetailForm = this.formBuilder.group({


    name: ['', Validators.required],
    noOfDays: ['', Validators.required],
    categoryReason: [''],

    steps: this.formBuilder.array([])
    

  });



   this.orgDetails =  JSON.parse(window.localStorage.authUserOrganisation);
   this.orgID = this.orgDetails._id;
   console.log('this.orgId' + JSON.stringify(this.orgDetails));
   this.getWorkRequest();}

   ngOnInit() {
  }

  categoryChanged(id){
      this.contractSpinner = true;
      this.workRequestService.getSingleWork(id).pipe().subscribe(res => {
      console.log(res, 'work-config')
      this.workSelection = res.configValues;
      console.log(this.configValues,'aaaaaaaaaaa')
      this.contractSpinner = false;
    },
     (error: any) => {
      console.error('error', error);
    });

  }




  getWorkRequest(){

    this.workRequestService.getWorkConfig(this.orgID).pipe().subscribe(res => {
      debugger;
      this.workCategory = res;
    }, (error: any) => {
      console.error('error', error);
    });
  }
}
