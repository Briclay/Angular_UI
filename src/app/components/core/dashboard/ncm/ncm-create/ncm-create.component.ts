import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog,MatSnackBar } from '@angular/material';
import { NcmService } from '.././ncm.service';
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
}
