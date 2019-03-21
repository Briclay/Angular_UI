
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
 projectSelection:any;
 documents:any;
  orgDetails: any;
 orgID: string;
 projectId: string;

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
this.orgDetails =  JSON.parse(window.localStorage.authUserOrganisation);
   this.orgID = this.orgDetails._id;
   console.log('this.orgId' + JSON.stringify(this.orgDetails));
   this.getAll();
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

/*projectChanged(id){
      this.contractSpinner = true;
      this.documentListService.getOne(id).pipe().subscribe(res => {
        console.log(res, 'list')
        this.projectSelection = res.configValues;
        console.log(this.configValues,'aaaaaaaaaaa')
        this.contractSpinner = false;
      },
      (error: any) => {
        console.error('error', error);
      });
    }
*/
    getAll(){

    this.documentListService.getAll(this.orgID,this.projectId).pipe().subscribe(res => {
      debugger;
      this.documents = res;
    }, (error: any) => {
      console.error('error', error);
    });
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



