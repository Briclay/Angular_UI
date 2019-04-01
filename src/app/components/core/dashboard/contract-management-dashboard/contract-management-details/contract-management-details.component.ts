import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
import { merge as observableMerge, Subject } from 'rxjs';
import { FormControl, FormGroup,FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contract-management-details',
  templateUrl: './contract-management-details.component.html',
  styleUrls: ['./contract-management-details.component.scss']
})
export class ContractManagementDetailsComponent implements OnInit {
   @Input() data: any;
  @Output() public updateRefresh: EventEmitter<any> = new EventEmitter<any>();
  contract: FormGroup;

image:any;
location: any;
blocks:any;
  constructor(private formBuilder : FormBuilder,) { 


   }

  ngOnInit() {
    this.contract = this.formBuilder.group({
      status: ['' , Validators.required ],
      unitNumber: ['' , Validators.required ],
      budget: ['' , Validators.required ],
      displayLogo: ['' , Validators.required ],
      name: ['' , Validators.required ],
      location: ['' , Validators.required ],
    });
    // console.log(this.data,"sssssssssssd")

    this.assignValuesToForm();
  }

  assignValuesToForm() {
      this.image=this.data.displayLogo;
      this.location=this.data.projectDetails.location;
      this.blocks=this.data.projectDetails.blocks;
      console.log("location", this.data.projectDetails.location);

      this.contract.patchValue(this.data)
  }

  

}
