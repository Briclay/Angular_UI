import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectPhasesComponent } from './project-phases/project-phases.component';
import { ProjectTeamsComponent } from './project-teams/project-teams.component';
import { ProjectDatesComponent } from './project-dates/project-dates.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {ProjectService} from './project.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule
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
export class ProjectModule {}