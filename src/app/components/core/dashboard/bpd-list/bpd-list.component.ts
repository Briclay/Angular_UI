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
  bpdLists = []
  constructor( private formBuilder:FormBuilder,
 	private dialog: MatDialog,
  private bpdListService: BpdListService,
  ) { }

  ngOnInit() {
   	this.bpdListForm = this.formBuilder.group({
      initiatedDate: ['', Validators.required],
      status: ['', Validators.required],
      _organisationId: ['', Validators.required],
      process: ['', Validators.required],
      bpdNumber: ['', Validators.required],
      processOwner: this.formBuilder.group({ 
        name: ['', Validators.required],
        email: ['', Validators.required],
      }),
      pointOfContact: this.formBuilder.group({ 
        name: ['', Validators.required],
        email: ['', Validators.required],
      })
    });
    this.addForm = this.formBuilder.group({
      initiatedDate: [ new Date(), Validators.required],
      status: ['Pending', Validators.required],
      process: ['', Validators.required],
      bpdNumber: ['', Validators.required],
      processOwner: this.formBuilder.group({ 
        name: ['', Validators.required],
        email: ['', Validators.required],
      }),
      pointOfContact: this.formBuilder.group({ 
        name: ['', Validators.required],
        email: ['', Validators.required],
      })
    });
    this.getNcmListData()
  }

  getNcmListData() {
    this.bpdListService.getAll().pipe().subscribe(res => {
      this.bpdLists = res;
    })
  }

  openDetailsDialog() {
    let dialogRef = this.dialog.open(UserSelectionDialogComponent, {
     width: '450px',
     data: {}
   }).afterClosed()
    .subscribe(response =>{
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
