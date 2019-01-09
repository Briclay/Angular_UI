import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogRef, MAT_DIALOG_DATA, MAT_SELECT_SCROLL_STRATEGY, MatSelect } from '@angular/material';
import * as _ from 'lodash';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-project-phases',
  templateUrl: './project-phases.component.html',
  styleUrls: ['./project-phases.component.scss']
})
export class ProjectPhasesComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  phaseForm: FormGroup;
  createPhaseForm: FormGroup;
  createPhaseFormError: any;
  pos: any;
  PhaseList: any;
  @Output() phasesFormData = new EventEmitter<string>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.createPhaseFormError = {
      phases: {}
    }
  }

  ngOnInit() {
    /*initlize empty array*/
    this.PhaseList = [];
    this.phaseForm = this.formBuilder.group({
      name: [''],
      blocks: this.formBuilder.array([this.createBlocks()])
    })
    /*check if it is in edit mode or not*/
    if (!_.isUndefined(this.data) && !_.isEmpty(this.data)) {
      if (this.data.project.phases.length > 0) {
        this.PhaseList = this.data.project.phases;
      }
    }
  }
  /*new block*/
  createBlocks(): FormGroup {
    return this.formBuilder.group({
      name: ['']
    });
  }
  addBlocks() {
    const blocks = this.createBlocks();
    if (this.blocks.valid) {
      this.blocks.push(blocks);
    }
  }
  get blocks(): FormArray {
    return this.phaseForm.get('blocks') as FormArray;
  }
  deleteBlocks(index) {
    if (index > 0) {
      const control = this.phaseForm.get('blocks') as FormArray;
      control.removeAt(index);
    }
  }
  /*clinking addd button added into an array as phaseForm*/
  createPhaseArray() {
    if (this.phaseForm.valid) {
      this.PhaseList.push(this.phaseForm.value);
      this.phaseForm.reset();
      this.phaseForm.controls.blocks.reset();
      let control = this.phaseForm.controls.blocks as FormArray;
      for (let i = 0; i <= control.length; i++) {
        control.removeAt(i);
      }
      this.onNextClick();
    }
  }
  /*delete blocks acording to index*/
  deleteCreatedBlocks(indexi, indexj) {
    if (this.PhaseList[indexi].blocks.length > 0) {
      if (this.PhaseList[indexi].blocks.length == 1) {
        this.PhaseList[indexi].blocks.splice(indexj, 1);
        this.PhaseList.splice(indexi, 1);
        if (this.PhaseList.length <= 0) {
          this.PhaseList = [];
        }
      } else {
        this.PhaseList[indexi].blocks.splice(indexj, 1);
      }
      this.onNextClick();
    }
  }
  /*end new blocks*/
  onNextClick() {
    this.phasesFormData.emit(this.PhaseList);
  }

}
