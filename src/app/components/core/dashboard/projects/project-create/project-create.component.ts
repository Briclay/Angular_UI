import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProjectDatesComponent } from '../project-dates/project-dates.component';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { ProjectPhasesComponent } from '../project-phases/project-phases.component';
import { ProjectTeamsComponent } from '../project-teams/project-teams.component';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }
  //open date dailogs
  openDateDialog() {
    let dialogRef = this.dialog.open(ProjectDatesComponent, {
      width: '600px',
      data: {}
    }).afterClosed()
      .subscribe(response => {
        console.log('res', response);
      });
  }
  //open Phases dailogs
  openPhaseDialog() {
    let dialogRef = this.dialog.open(ProjectPhasesComponent, {
      width: '600px',
      data: {}
    }).afterClosed()
      .subscribe(response => {
        console.log('res', response);
      });
  }
  //open Team dailogs
  openTeamDialog() {
    let dialogRef = this.dialog.open(ProjectTeamsComponent, {
      width: '600px',
      data: {}
    }).afterClosed()
      .subscribe(response => {
        console.log('res', response);
      });
  }
  //open Details dailogs
  openDetailsDialog() {
    let dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '600px',
      data: {}
    }).afterClosed()
      .subscribe(response => {
        console.log('res', response);
      });
  }
}
