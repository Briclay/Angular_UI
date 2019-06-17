  import { Component, OnInit, Inject, Input, Output } from '@angular/core';
  import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
  import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
  import * as _ from 'lodash';
  import { merge as observableMerge, Subject } from 'rxjs';
  import { Router, ActivatedRoute } from '@angular/router';
  import { takeUntil } from 'rxjs/operators';

  @Component({
    selector: 'app-opportunity-details',
    templateUrl: './opportunity-details.component.html',
    styleUrls: ['./opportunity-details.component.scss']
  })
  export class OpportunityDetailsComponent implements OnInit {
    form: FormGroup;
    formErrors: any;
    opportunityDetailsForm: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<OpportunityDetailsComponent>,
      private formBuilder : FormBuilder
      ) {
      this.opportunityDetailsForm = this.formBuilder.group({
        statement: ['', Validators.required],
        resource: ['', Validators.required],
        budget: ['', Validators.required],
        date : ['', Validators.required],
      });
    }
    ngOnInit(){
      this.opportunityDetailsForm.patchValue(this.data)
    }

    onCancel()
    {
      this.dialogRef.close();
    }

    onSubmit()
    {
      this.dialogRef.close(this.opportunityDetailsForm.value);
    }
  }