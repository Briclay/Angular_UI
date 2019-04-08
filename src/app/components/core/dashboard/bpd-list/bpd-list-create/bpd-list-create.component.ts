import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog,MatSnackBar } from '@angular/material';
import { UserSelectionDialogComponent } from '../../bpd-list/user-selection-dialog/user-selection-dialog.component';
import { BpdListService } from '../bpd-list.service';
import { Router , ActivatedRoute} from '@angular/router';

@Component({
	selector: 'app-bpd-list-create',
	templateUrl: './bpd-list-create.component.html',
	styleUrls: ['./bpd-list-create.component.scss']
})
export class BpdListCreateComponent implements OnInit {
  @Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
  @Input() formType: string;

	// @Input() data: any;
	bpdCreateForm : FormGroup;
	addForm : FormGroup;
	bpdListDetailsOptions:any;
	listDetailsOptions:any;
	addData=[ ];
	bpdListArray = []
  orgId : any;
  tableFlag = false;
  bpdLists = []
  constructor( private formBuilder:FormBuilder,
 	  private dialog: MatDialog,
    private route: ActivatedRoute, 
    private router: Router,
    private snackBar : MatSnackBar,
 	  private bpdListService: BpdListService,
 	) { 
     let orgData = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
     this.orgId = orgData._id;
  }

 ngOnInit() {

 	this.bpdCreateForm = this.formBuilder.group({
    _organisationId : [this.orgId, Validators.required],
 		initiatedDate: [new Date(), Validators.required],
 		process: ['', Validators.required],
 		bpdNumber: ['', Validators.required],
 		processOwner: this.formBuilder.group({
      _id: [''], 
 			name: ['', Validators.required],
 			email: ['', Validators.required],
 		}),
 		pointOfContact: this.formBuilder.group({
      _id: [''], 
 			name: ['', Validators.required],
 			email: ['', Validators.required],
 		}),
 		depNamePOContact : [''],
 		depNameProcessOwner : [''],
 	});
 }

 openDetailsDialogPointOfContact() {
 	let dialogRef = this.dialog.open(UserSelectionDialogComponent, {
 		width: '450px',
 		data: 'pointOfContact'
 	}).afterClosed().subscribe(response =>{
     if (response) {
        console.log('res', response);
        this.bpdCreateForm.controls['depNamePOContact'].setValue(response.depName);
        this.bpdCreateForm.controls['pointOfContact'].setValue(response.pointOfContact);
  		}
     });  
 	}
   openDetailsDialogProcessOwner() {
    let dialogRef = this.dialog.open(UserSelectionDialogComponent, {
      width: '450px',
      data: 'processOwner'
    }).afterClosed().subscribe(response =>{
      if (response) {
        console.log('res', response);
        this.bpdCreateForm.controls['depNameProcessOwner'].setValue(response.depName);
        this.bpdCreateForm.controls['processOwner'].setValue(response.processOwner);
      }
    });
  }
 	onSubmit() {
    delete this.bpdCreateForm.value.depNamePOContact;
    delete this.bpdCreateForm.value.depNameProcessOwner;

    console.log(this.bpdCreateForm.value )
    this.bpdListService.save(this.bpdCreateForm.value).pipe().subscribe(response => {
      console.log(response, 'response');
      this.snackBar.open("BPD created successfully", 'BPD', {
        duration: 2000,
      });
      let tabReq = {index: 0}
      this.tabSwitch.emit(tabReq);  
    }, (error: any) => {
      this.snackBar.open(error.message, 'BPD', {
        duration: 2000,
      });
      console.log(error.message)
    });
	}

	reset(){
		this.bpdCreateForm.reset();
	}
}
