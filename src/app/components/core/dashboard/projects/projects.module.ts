import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectPhasesComponent } from './project-phases/project-phases.component';
import { ProjectTeamsComponent } from './project-teams/project-teams.component';
import { ProjectDatesComponent } from './project-dates/project-dates.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProjectService } from './project.service';
import { MaterialModule } from '../../../../modules/material.module';
//import { ProjectEditComponent } from './project-edit/project-edit.component';
//import { ProjectCreateComponent } from './project-create/project-create.component'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ProjectDetailsComponent,
    ProjectPhasesComponent,
    ProjectTeamsComponent,
    ProjectDatesComponent

  ],
  exports: [
    ProjectDetailsComponent,
    ProjectPhasesComponent,
    ProjectTeamsComponent,
    ProjectDatesComponent
  ],
  providers: [ProjectService]
})
export class ProjectModule { }