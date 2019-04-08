import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog,MatSnackBar } from '@angular/material';
import { OpportunityDetailsComponent } from '../ncm-details/opportunity-details/opportunity-details.component';
import { NcmService } from '../ncm.service';
// import { BPDService} from '../../../dashboard/bpd-list/bpd-list.service';

@Component({
  selector: 'app-ncm-details',
  templateUrl: './ncm-details.component.html',
  styleUrls: ['./ncm-details.component.scss']
})
export class NcmDetailsComponent implements OnInit {

  @Input() data: any;
  @Input() formType: string;
  @Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
  @Output() public updateRefresh: EventEmitter<any> = new EventEmitter<any>();

	ncmListForm : FormGroup;
	ncmListDataOptions :any;
	controlsCheck : boolean;
  myFilter = new Date();
  controls : boolean;
  buttonColor: string = '#B0B0B0';
  userName : any;
  user : any; 
  opportunityValues = {}
  bpdsList : any;
  isLaoding = false;
  statusAll = ['Open', 'In Progress', 'Completed', 'Cancelled', 'Approved']
  consequenceValue = ['Low','Moderate Risk','High Risk'];
  impact = [{ value: 1, name: "unlikely" }, { value: 2, name: "likely" }, { value: 3, name: "Most Likely" }]
  likelihoodValue = [{ value: 1, name: "Low" }, { value: 2, name: "Medium" }, { value: 3, name: "High" }];
  constructor( 
    private formBuilder:FormBuilder,
    private dialog: MatDialog,
    private snackBar : MatSnackBar,
     private ncmService: NcmService
  	) { }
  controlsValue (event){
    this.controlsCheck = event.checked;
  }
  
  ngOnInit() {
    this.user = JSON.parse(window.localStorage.authUser);

    this.ncmListForm = this.formBuilder.group({
      _organisationId: ['', Validators.required],
      _roleId: ['', Validators.required],
      _departmentId: ['', Validators.required],
      user: ['', Validators.required],
      requestNumber: ['', Validators.required],
      bpdNumber: ['', Validators.required],
      depName: ['', Validators.required],
      todayDate: [new Date(), Validators.required],
      riskStatement: this.formBuilder.group({ 
        statement: ['', Validators.required],
        cause: ['', Validators.required],
        effect: ['', Validators.required],
      }),
      opportunity: this.formBuilder.group({ 
        statement: ['', Validators.required],
        resource: ['', Validators.required],
        date: ['', Validators.required],
        budget: ['', Validators.required]
      }),
      parameters : this.formBuilder.group({ 
        likelihood : ['', Validators.required],
        impact : ['', Validators.required],
        mention_current_control : ['', Validators.required],
        consequence : ['', Validators.required],
        control_RPA_BPD : false
      }),
      mitigation: this.formBuilder.group({ 
        mitigationPlan: ['', Validators.required],
        budget: ['', Validators.required],
        resource:['', Validators.required],
        currentTime: [ new Date(), Validators.required],
      }),
      status : ['', Validators.required]
    });
    this.assignValuesToForm()
  }
  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.ncmListForm.patchValue(this.data)
    }
  }

  // getAllBpds (){
  //   this.bpdService.getAll().pipe().subscribe(res => {
  //     this.bpdsList = res;
  //   })
  // }

  reset(){
    this.ncmListForm.reset();
  }
  onFormSubmit() {
    this.isLaoding = true;
    this.ncmListForm.value._organisationId = this.user._organisationId._id;
    this.ncmListForm.value._departmentId = this.user._departmentId._id;
    this.ncmListForm.value._roleId = this.user._roleId._id;
    this.ncmListForm.value.opportunity = this.opportunityValues;
    this.ncmListForm.value._createdBy = this.user._id;
    console.log(this.ncmListForm.value, "ncmupddatedSubmittedValue");
    this.ncmService.updateNcm(this.ncmListForm.value, this.data._id).pipe().subscribe(res => { 
      console.log(res,'ncm-update-res')
      this.snackBar.open("Ncm upddated successfully", 'Ncm', {
        duration: 2000,
      });
      this.ncmListForm['_touched'] = false;
      this.updateRefresh.emit()   
      this.isLaoding = false;
    }, (error: any) => {
      console.error('error', error);
      this.isLaoding = false;
    });

  }

  openDetailsDialog() {
    let dialogRef = this.dialog.open(OpportunityDetailsComponent, {
      width: '500px',
      data: this.ncmListForm.value.opportunity
    }).afterClosed()
      .subscribe(response => {
        if (response) {
          console.log('opportunity-res', response);
          this.opportunityValues = response;
        }
      });
      this.buttonColor = '#0099cc';
  }
}
