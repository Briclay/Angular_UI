import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog,MatSnackBar } from '@angular/material';
import { OpportunityDetailsComponent } from '../ncm-details/opportunity-details/opportunity-details.component';
import { NcmService } from '../ncm.service';

@Component({
  selector: 'app-ncm-details',
  templateUrl: './ncm-details.component.html',
  styleUrls: ['./ncm-details.component.scss']
})
export class NcmDetailsComponent implements OnInit {

  @Input() data: any;
	ncmListForm : FormGroup;
	ncmListDataOptions :any;
	controlsCheck : boolean;
  myFilter = new Date();
  controls : boolean;


list = [
{

  statement: "statement1",
  revision : "R0001",
  date : "02/03/2019",
  

  purchase : "Purchase",
  name : "Vinay Kerur",
  bpd : "BPD/01",

  cause: "Cause1",
  effect : "Efect1",
  likelihood : "L1",
  

  impact : "Impact",
  mentionCurrentControl : "Current Control",
  controls : "Remarks",

  consequence: "Cons",
  mitigationPlan : "Mitigation Plan",
  budget : "Budget 1",
  

  resource : "res",
  validTill : "09/02/2019",
  status : "Approved"

} 
]
  constructor( 
    private formBuilder:FormBuilder,
    private dialog: MatDialog,
    private snackBar : MatSnackBar,
     private ncmService: NcmService,
  	) { }
  controlsValue (event){
    this.controlsCheck = event.checked;
  }
  
  ngOnInit() {
    this.ncmListForm = this.formBuilder.group({
      statement: ['', Validators.required],
      revision: ['', Validators.required],
      date: ['', Validators.required],
      purchase: ['', Validators.required],
      name: ['', Validators.required],
      bpd: ['', Validators.required],
      cause: ['', Validators.required],
      effect: ['', Validators.required],
      likelihood: ['', Validators.required],
      impact: ['', Validators.required],
      mentionCurrentControl: ['', Validators.required],
      controls: ['', Validators.required],
     consequence: ['', Validators.required],
     mitigationPlan: ['', Validators.required],
     budget: ['', Validators.required],
     resource: ['', Validators.required],
     validTill : ['', Validators.required],
     status : ['', Validators.required]
    });
    this.assignValuesToForm()
  }
  assignValuesToForm() {
      this.ncmListForm.patchValue(this.data)
  }
  /* getAllFeatures(){
    this.featureService.getFeatures()
      .pipe().subscribe(response => {
        this._features = response;
    }, (error: any) => {
      this.snackBar.open(error.message, 'Features', {
        duration: 3000,
      });
    });
  }*/
  /* getDetails() {
    this.openDetailsDialog();
  }*/

  openDetailsDialog() {
    let dialogRef = this.dialog.open(OpportunityDetailsComponent, {
      width: '500px',
      data: this.ncmListForm.value
    }).afterClosed()
      .subscribe(response => {
       /* if (response) {
          console.log('res', response);
          this.projectForm.controls['units'].setValue(response.units);
          this.projectForm.controls['carParkingArea'].setValue(response.carParkingArea);
          this.projectForm.controls['type'].setValue(response.type);
          //this.projectForm.controls['units'].setValue(response.landArea);

          /* this.projectForm.value.units = response.units;
           this.projectForm.value.carParkingArea = response.carParkingArea
           this.projectForm.value.type = response.type
           this.projectForm.value.projectDetails.landArea = response.landArea*/
          //console.log(' this.projectForm.value' + JSON.stringify(this.projectForm.value));
        //}*/
      });
  }
}
