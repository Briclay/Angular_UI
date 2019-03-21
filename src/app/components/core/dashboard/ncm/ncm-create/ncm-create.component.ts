import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog,MatSnackBar } from '@angular/material';
import { NcmService } from '.././ncm.service';
import { OpportunityDetailsComponent } from '.././ncm-details/opportunity-details/opportunity-details.component';
@Component({
  selector: 'app-ncm-create',
  templateUrl: './ncm-create.component.html',
  styleUrls: ['./ncm-create.component.scss']
})
export class NcmCreateComponent implements OnInit {
	 @Input() data: any;
	 @ViewChild('tabGroup') tabGroup;
	ncmCreateForm : FormGroup;
	bpdId =['01','02' , '03'];
	 myFilter = new Date();
   buttonColor: string = '#B0B0B0';

  constructor ( private formBuilder:FormBuilder,
    private dialog: MatDialog,
    private snackBar : MatSnackBar,
    private ncmService: NcmService,) { }

  ngOnInit() {
    this.ncmCreateForm = this.formBuilder.group({
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
     status : ['', Validators.required],
     time: ['', Validators.required]
    });
    //this.assignValuesToForm()
  }
 /* assignValuesToForm() {
      this.ncmCreateForm.patchValue(this.data)
  }
*/
 reset(){

   this.ncmCreateForm.reset();

  }
  onFormSubmit() {
    console.log(this.ncmCreateForm.value, "ncmCreateSubmittedValue");
  }

   openDetailsDialog() {
    let dialogRef = this.dialog.open(OpportunityDetailsComponent, {
      width: '500px',
      data: this.ncmCreateForm.value
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
      this.buttonColor = '#0099cc';
  }
}
