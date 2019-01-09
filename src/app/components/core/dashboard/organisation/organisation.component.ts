import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../../services/organization/organization.service';
import { OrganizationData, TableOptions } from '../../../../interfaces/interfaces';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HistoryPopupComponent } from '../../../../components/shared/history-popup/history-popup.component'

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})

export class OrganisationComponent implements OnInit {

  organisations: OrganizationData;
  organisationDataOptions = [];
  historyData: any;

  constructor(
    private organisationService: OrganizationService,
    public dialog: MatDialog) { }
  ngOnInit() {
    this.organisationService.getData().pipe().subscribe(res => {
      this.organisations = res;
      this.organisationDataOptions = [
      {
        title: 'orgName', key: 'orgName', hideTitle: true, type: 'label'
      },
      {
        title: 'Plan', key: 'subsciption.plan',
      }, {
        title: 'Valid till', key: 'entities.validtill'
      }, {
        title: 'Entities', key: 'entities.count'
      }]
    });
  }

  openDialog(data) {
    this.organisationService.getHistory().pipe().subscribe(res => {
      this.historyData = {
        header: [
        { title: 'Username ' },
        { title: 'Changed By' },
        { title: 'Changed Date' }],
        keys: ['username', 'changedBy', 'changedDate'],
        content: res.data
      };

      const dialogRef = this.dialog.open(HistoryPopupComponent, {
        width: '450px',
        data: this.historyData
      });

      dialogRef.afterClosed().subscribe(result => {
        // TODO closed event
      });
    });
  }
}
