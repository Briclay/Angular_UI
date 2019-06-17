  import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';

  import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
  import { MatDialog,MatSnackBar } from '@angular/material';
  import { FileManagerService} from '../.././file-manager/file-manager.service';
  import { DocumentListService } from '.././document-list.service';
  @Component({
    selector: 'app-document-list-create',
    templateUrl: './document-list-create.component.html',
    styleUrls: ['./document-list-create.component.scss']
  })
  export class DocumentListCreateComponent implements OnInit {
    @Input() formType: string;
    @Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
    @Input() data: any;
    documentListForm : FormGroup;
    documentCreateForm : FormGroup;
    documentLists = [];
    selectedDocumentData : any;
    orgID : string;
    addForm : FormGroup;
    addData=[ ];
    revesionData =['R1','R2' , 'R3'];
    documentListFormErrors: any;
    list:[];
    id: string;
    orgDetails: any;
    workSelection:any;
    projID: string;
    array = [];
    isLoading = false;
    myFilter = new Date();

    constructor(
    private formBuilder:FormBuilder,
    private dialog: MatDialog,
    private snackBar : MatSnackBar,
    private fileManagerService: FileManagerService,
    private documentListService: DocumentListService,
    ) {
      this.documentListFormErrors = {
        documentType: {}
      }
      this.orgDetails =  JSON.parse(window.localStorage.authUserOrganisation);
      this.orgID = this.orgDetails._id;
    }

    ngOnInit() {
      //Document List Form
      this.documentListForm = this.formBuilder.group({
      documentType: ['', Validators.required],
      list: ['', Validators.required],
      validTill : ['', Validators.required],
    });
      //Create Document Form
      this.documentCreateForm = this.formBuilder.group({
        drawingNo: ['', Validators.required],
        drawingName: ['', Validators.required],
        revision: [''],
        purpose: [''],
        remarks: [''],
        weightage: [''],
      });
      //Add Form
      this.addForm = this.formBuilder.group({
        drawingNo: ['', Validators.required],
        drawingName: ['', Validators.required],
        revision: [''],
        purpose: [''],
        remarks: [''],
        weightage: [''],
      });
      this.getAllDocumentType() 
    }
    

    //To get All Document Type
    getAllDocumentType(){
    let filter=`filter[configKey]=design_icon_sort`
    this.fileManagerService.getConfig(filter).pipe().subscribe(res => {
      this.documentLists = res[0].configValues;
    }, (error: any) => {
      console.error('error', error);
    });
  }
  
  //assigning values of form to data
  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.documentListForm.patchValue(this.data)
    }
  }
  onSubmit() {
      // Do useful stuff with the gathered data
      let obj ={
        _organisationId: this.orgID, 
        _projectId: this.projID,
        documents : this.array  
      }
      this.documentListService.save( obj)
      .pipe().subscribe(res => {
        this.isLoading = false;
        this.snackBar.open("Document List Updated Succesfully", 'Document List', {
          duration: 5000,
        });
        let tabReq = {index: 0}
        this.tabSwitch.emit(tabReq);
        this.documentListForm.reset()
      }, (error: any) => {
        this.snackBar.open(error.message, 'Document List', {
          duration: 5000,
        });
      });
    }
    //Add a new row to add form
    onAdd(){
      this.array.push(this.addForm.value);
    }
    reset(){
    this.documentCreateForm.reset();
    this.addForm.reset();
  }
  }
