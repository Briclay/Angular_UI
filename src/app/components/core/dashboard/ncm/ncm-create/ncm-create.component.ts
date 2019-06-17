  import { Component, OnInit,Input,ViewChild,Output,EventEmitter } from '@angular/core';
  import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
  import { MatDialog,MatSnackBar } from '@angular/material';
  import { NcmService } from '.././ncm.service';
  import { OpportunityDetailsComponent } from '.././ncm-details/opportunity-details/opportunity-details.component';
  import { BpdListService} from '../../../dashboard/bpd-list/bpd-list.service';


  @Component({
    selector: 'app-ncm-create',
    templateUrl: './ncm-create.component.html',
    styleUrls: ['./ncm-create.component.scss']
  })
  export class NcmCreateComponent implements OnInit {
    @Input() data: any;
    @Input() formType: string;
    @Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
    @Output() public updateRefresh: EventEmitter<any> = new EventEmitter<any>();
    ncmCreateForm : FormGroup;
    bpdId =['01','02' , '03'];
    myFilter = new Date();
    buttonColor: string = '#B0B0B0';
    isLaoding = false;
    user : any;
    selectBpd : any;
    controlsCheck : any;
    orgId : any;
    opportunityValues = {};
    bpdsList : any;
    consequenceValue = ['Low','Moderate Risk','High Risk'];
    impact = [{ value: 1, name: "unlikely" }, { value: 2, name: "likely" }, { value: 3, name: "Most Likely" }]
    likelihoodValue = [{ value: 1, name: "Low" }, { value: 2, name: "Medium" }, { value: 3, name: "High" }];
    constructor ( private formBuilder:FormBuilder,
      private dialog: MatDialog,
      private snackBar : MatSnackBar,
      private ncmService: NcmService,
      private bpdService : BpdListService) {
    }

    ngOnInit() {
      this.user = JSON.parse(window.localStorage.authUser);
      this.ncmCreateForm = this.formBuilder.group({
        _organisationId: ['', Validators.required],
        _roleId: ['', Validators.required],
        _departmentId: ['', Validators.required],
        requestNumber: ['', Validators.required],
        bpdId : ['', Validators.required],
        bpdNumber: ['', Validators.required],
        process : [''],
        depName: ['', Validators.required],
        todayDate: ['', Validators.required],
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
          currentTime: [ '', Validators.required],
        }),
        user : this.formBuilder.group({ 
          _id : [ '', Validators.required],
          name : [ '', Validators.required],
          email : [ ''],
        }),
        status : ['Open', Validators.required]
      });

      this.getAllBpds()
    }

    controlsValue (event){
      this.controlsCheck = event.checked;
    }
  /*method to get all BPD LIST*/
    getAllBpds (){
      this.bpdService.getAll().pipe().subscribe(res => {
        this.bpdsList = res;
      })
    }

    selectedBpd(event){
      this.bpdsList.forEach(v => {
        if(event._id === v._id){
          this.selectBpd = v
        }
      })
    }
  /*reset the form*/
    reset(){
      this.ncmCreateForm.reset();
    }
    onFormSubmit() {
      this.isLaoding = true;
      this.ncmCreateForm.value._organisationId = this.user._organisationId._id;
      this.ncmCreateForm.value._departmentId = this.user._departmentId._id;
      this.ncmCreateForm.value.depName = this.user._departmentId.name;
      this.ncmCreateForm.value._roleId = this.user._roleId._id;
      let userData = {
        "_id" : this.user._id,
        "name" : this.user.username,
        "email" : this.user.email
      }
      this.ncmCreateForm.value.user = userData;
      this.ncmCreateForm.value.opportunity = this.opportunityValues || {};
      
      if(this.selectBpd ){
        this.ncmCreateForm.value.bpdNumber = this.selectBpd.bpdNumber || "";
        this.ncmCreateForm.value.process = this.selectBpd.process || "";
        this.ncmCreateForm.value.bpdId = this.selectBpd._id || "";
      }
      this.ncmService.saveNcm(this.ncmCreateForm.value).pipe().subscribe(res => { 
        this.snackBar.open("Ncm created successfully", 'Ncm', {
          duration: 2000,
        });
        this.ncmCreateForm['_touched'] = false;
        let tabReq = {index: 0}
        this.tabSwitch.emit(tabReq);     
        this.isLaoding = false;
      }, (error: any) => {
        console.error('error', error);
        this.isLaoding = false;
      });

    }
  /*open dialog of opportunity*/
    openDetailsDialog() {
      let dialogRef = this.dialog.open(OpportunityDetailsComponent, {
        width: '500px',
        data: this.ncmCreateForm.value
      }).afterClosed()
        .subscribe(response => {
          if(response){
            this.opportunityValues = response;
          }
        });
        this.buttonColor = '#0099cc';
    }
  }
