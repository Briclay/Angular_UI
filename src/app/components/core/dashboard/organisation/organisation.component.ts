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
    this.organisationService.getAll()
      .pipe().subscribe(res => {
      this.organisations = res;
      this.organisationDataOptions = [
      {
        title: 'name', key: 'name', hideTitle: true, type: 'label'
      },
      {
        title: 'Plan', key: 'subscription.plan',
      }, {
        title: 'Valid till', key: 'subscription.validTill'
      }, {
        title: 'Entities', key: '0'
      }]
    });
  }



  openDialog(data) {
    this.organisationService.getHistory().pipe().subscribe(res => {
      this.historyData = {
        header: [
        { title: 'Name' },
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
