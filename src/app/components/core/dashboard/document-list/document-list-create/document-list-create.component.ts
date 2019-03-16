import { Component, OnInit } from '@angular/core';

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

  documentListForm : FormGroup;
  documentCreateForm : FormGroup;
  documentLists = [];
  selectedDocumentData : any;
  orgID : any;
  addForm : FormGroup;
  addData=[ ];
  revesionData =['R1','R2' , 'R3'];
  documentListFormErrors: any;
  
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
  }

  ngOnInit() {
    this.documentListForm = this.formBuilder.group({
     documentType: ['', Validators.required],

     list: ['', Validators.required],
     
     
     validTill : ['', Validators.required],
   });
    this.documentCreateForm = this.formBuilder.group({


      drawingNo: ['', Validators.required],
      drawingName: ['', Validators.required],
      revision: [''],

      purpose: [''],
      remarks: [''],
      weightage: [''],
      
    });
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




 
  getAllDocumentType(){
         let filter=`filter[configKey]=design_icon_sort`
        this.fileManagerService.getConfig(filter).pipe().subscribe(res => {
          this.documentLists = res[0].configValues;
          console.log(this.documentLists)
            }, (error: any) => {
              console.error('error', error);
            });
  }

/*
       selectDocument(event){
            this.selectedDocumentData = event;
            if(event && event._id)
             {

            }
             
       }*/





assignValuesToForm() {
   /* if(this.formType !== 'create') {
      this.documentListForm.patchValue(this.data)
    }*/
  }
  onSubmit() {
    // Do useful stuff with the gathered data
    
    console.log(   this.documentListForm.value ),
    console.log(   this.documentCreateForm.value ),
    console.log(   this.addForm.value )

    this.documentListService.save(this.documentListForm.value)
    .pipe().subscribe(response => {
      console.log(response, 'response.message')
      this.snackBar.open("Document List created successfully", 'DocumentList', {
        duration: 2000,
      });
      this.documentListForm['_touched'] = false;
      
    }, (error: any) => {
      this.snackBar.open(error.message, 'DocumentList', {
        duration: 2000,
      });
      console.log(error , "error")
    });
  }
  onAdd(){

    this.addData.push(this.addForm.value);
    console.log(this.addData)

  }
  reset(){

   this.documentCreateForm.reset();

  }
}
