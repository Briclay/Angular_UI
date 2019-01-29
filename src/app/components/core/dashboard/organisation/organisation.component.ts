import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationService } from '../../../../services/organization/organization.service';
import { OrganizationData, TableOptions } from '../../../../interfaces/interfaces';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HistoryPopupComponent } from '../../../../components/shared/history-popup/history-popup.component'
import {merge as observableMerge, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})

export class OrganisationComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup;
  organisations: any;
  organisationDataOptions = [];
  historyData: any;
  selectedOrgId: string;
  orgListSpinner: boolean;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private organisationService: OrganizationService,
    public dialog: MatDialog) { }
  ngOnInit() {
  }

  organizationChanged(org) {
    this.selectedOrgId = org._id;
    this.orgListSpinner = true;
    this.organisationService.getAll(org._id).pipe().subscribe(res => {
      this.organisations = res;
      this.orgListSpinner = false;
      this.organisations.forEach((list) => list._features = (list._features && list._features.length));
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
    }, (error: any) => {
      console.error('error', error);
      this.orgListSpinner = false;
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

  tabSwitch(tabReq) {
    this.tabGroup.selectedIndex = tabReq.index;
  }
}
