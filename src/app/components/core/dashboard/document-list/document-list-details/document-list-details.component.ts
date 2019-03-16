
import { Component, OnInit ,Input, Output, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {merge as observableMerge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog,MatSnackBar } from '@angular/material';
import { DocumentListService } from '../document-list.service';



@Component({
  selector: 'app-document-list-details',
  templateUrl: './document-list-details.component.html',
  styleUrls: ['./document-list-details.component.scss']
})
export class DocumentListDetailsComponent implements OnInit {
 @Input() data: any;
 overviewForm : FormGroup;
 documentListDetailsOptions:any;
 listDetailsOptions:any;
 revesionData =['R1','R2' , 'R3'];
 

 tableFlag = false;
 /*documentListDetails  = [
 {

  name : "AO.1 SITE",
  createdDate : "14/02/2019",
  createdBy : "Test"
}

]*/
list = [
{

  drawingNo: "AO.1.00",
  drawingName : "Drawing Name",
  revision : "R0",
  

  weightage : "60%",
  purpose : "Purpose",
  remarks : "Remarks"

},
{

  drawingNo: "AO.1.01",
  drawingName : "Drawing Name",
  revision : "R1",
  
  weightage : "20%",
  purpose : "Purpose",
  remarks : "Remarks"

} 

]
/*private unsubscribe: Subject<any> = new Subject();*/
constructor(  private route: ActivatedRoute,
  private router: Router,
  private formBuilder:FormBuilder,
  private dialog: MatDialog,
  private snackBar : MatSnackBar,
  private documentListService: DocumentListService,

  ) { 

}

ngOnInit() {


  this.overviewForm = this.formBuilder.group({

    drawingNo: ['', Validators.required],
    drawingName: ['', Validators.required],
    revision: [''],
    purpose: [''],
    remarks: [''],
    weightage: ['']
  });
  this.assignValuesToForm();
} 
assignValuesToForm() {  
  //if(this.formType !== 'create') {                  
    this.overviewForm.patchValue(this.data)
  //}
}
onSubmit() {
   /* this.overviewForm.value._projectId = this.selecetedProjectData._id;
   this.overviewForm.value.projectName = this.selecetedProjectData.name;*/
    // Do useful stuff with the gathered data
    this.documentListService.update(this.overviewForm.value, this.data.id)
    .pipe().subscribe(response => {
      console.log(response, 'response.message')
      this.snackBar.open("Document List created successfully", 'DocumentList', {
        duration: 2000,
      });
      this.overviewForm['_touched'] = false;
      
    }, (error: any) => {
      this.snackBar.open(error.message, 'DocumentList', {
        duration: 2000,
      });
      console.log(error , "error")
    });
  }


  
}



