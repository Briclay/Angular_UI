import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog,MatSnackBar } from '@angular/material';
import { UserSelectionDialogComponent } from '../bpd-list/user-selection-dialog/user-selection-dialog.component';
import { BpdListService } from './bpd-list.service';


@Component({
	selector: 'app-bpd-list',
	templateUrl: './bpd-list.component.html',
	styleUrls: ['./bpd-list.component.scss']
})
export class BpdListComponent implements OnInit {
	// @Input() data: any;
  bpdListForm : FormGroup;
  addForm : FormGroup;
  bpdListDetailsOptions:any;
  listDetailsOptions:any;
  addData=[ ];
  bpdListArray = []
 //revesionData =['R1','R2' , 'R3'];
 

 tableFlag = false;
 
 
 bpdList = [
 { 
 	management: "management Review",
 	bpd : "BPD/01",

   name:"meghana",
   email:"meghana.p@puravankara.com",


   nameOfOwner:"Minol Ajekar",
   emailOfOwner:"minol@puravankara.com"

 }
 

 ]
 

 
 constructor( private formBuilder:FormBuilder,
 	private dialog: MatDialog,
  private bpdListService: BpdListService,


  ) { }

 ngOnInit() 
 {
 	this.bpdListForm = this.formBuilder.group({

 		management: ['', Validators.required],
 		bpd: ['', Validators.required],


    name: ['', Validators.required],
    email : ['', Validators.required],


    nameOfOwner: ['', Validators.required],
    emailOfOwner : ['', Validators.required],

  });

  this.addForm = this.formBuilder.group({


    management: ['', Validators.required],
    bpd: ['', Validators.required],
    

    name: ['', Validators.required],
    email : ['', Validators.required],


    nameOfOwner: ['', Validators.required],
    emailOfOwner : ['', Validators.required],

  });
}


openDetailsDialog() 
{
  let dialogRef = this.dialog.open(UserSelectionDialogComponent, {
   width: '450px',
   data: {}
 }).afterClosed()
  .subscribe(response =>
  {
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
  onSubmit() {
    // Do useful stuff with the gathered data
    
    console.log(   this.bpdListForm.value ),

    console.log(   this.addForm.value )
  }

  onAdd(){
    this.bpdListArray.push(this.addForm);
    console.log(this.bpdListArray)

  }
  reset(){

   this.bpdListForm.reset();
   this.addForm.reset();

  }
}
