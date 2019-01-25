import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;
  @Input() orgID: string;

  userAuth: any;
  roleDetailsForm: FormGroup;
  _roleId = ['Manager', 'Admin', 'User', 'Design', 'Super Admin'];
  departments =  [
    {
      "_id": "d1",
      "name": "Finance"
    },
    {
      "_id": "d2",
      "name": "Construction"
    }
  ];
  allApprovals = [
    {
    "_featureId": "f1",
      "resources": "projects",
      "level": "1",
      "permissions": [
        {
          "userKey": "List",
          "reqKey": "GET",
          "accessFlag": true
        },
        {
          "userKey": "Save",
          "reqKey": "POST",
          "accessFlag": false
        },
        {
          "userKey": "Update",
          "reqKey": "PUT",
          "accessFlag": true
        },
        {
          "userKey": "Delete",
          "reqKey": "DELETE",
          "accessFlag": false
        }
      ]
    },
    {
    "_featureId": "f2",
      "resources": "snagmaster",
      "level": "1",
      "permissions": [
        {
          "userKey": "List",
          "reqKey": "GET",
          "accessFlag": true
        },
        {
          "userKey": "Save",
          "reqKey": "POST",
          "accessFlag": false
        },
        {
          "userKey": "Update",
          "reqKey": "PUT",
          "accessFlag": true
        },
        {
          "userKey": "Delete",
          "reqKey": "DELETE",
          "accessFlag": false
        }
      ]
    },
    {
    "_featureId": "f3",
      "resources": "services",
      "level": "1",
      "permissions": [
        {
          "userKey": "List",
          "reqKey": "GET",
          "accessFlag": true
        },
        {
          "userKey": "Save",
          "reqKey": "POST",
          "accessFlag": false
        },
        {
          "userKey": "Update",
          "reqKey": "PUT",
          "accessFlag": true
        },
        {
          "userKey": "Delete",
          "reqKey": "DELETE",
          "accessFlag": false
        }
      ]
    }
  ]
  /*  allFeatures = ['Project' ,'Invoice' ,'Billing', 'Dashbaord']*/  
  selectFeatureValue = [];
  selectApprovalValue = [];
  allFeatures = [
    {
    "_featureId": "f1",
      "resources": "projects",
      "permissions": [
        {
          "userKey": "List",
          "reqKey": "GET",
          "accessFlag": true
        },
        {
          "userKey": "Save",
          "reqKey": "POST",
          "accessFlag": false
        },
        {
          "userKey": "Update",
          "reqKey": "PUT",
          "accessFlag": true
        },
        {
          "userKey": "Delete",
          "reqKey": "DELETE",
          "accessFlag": false
        }
      ]
    },
    {
    "_featureId": "f2",
      "resources": "snagmaster",
      "permissions": [
        {
          "userKey": "List",
          "reqKey": "GET",
          "accessFlag": true
        },
        {
          "userKey": "Save",
          "reqKey": "POST",
          "accessFlag": false
        },
        {
          "userKey": "Update",
          "reqKey": "PUT",
          "accessFlag": true
        },
        {
          "userKey": "Delete",
          "reqKey": "DELETE",
          "accessFlag": false
        }
      ]
    },
    {
    "_featureId": "f3",
      "resources": "services",
      "permissions": [
        {
          "userKey": "List",
          "reqKey": "GET",
          "accessFlag": true
        },
        {
          "userKey": "Save",
          "reqKey": "POST",
          "accessFlag": false
        },
        {
          "userKey": "Update",
          "reqKey": "PUT",
          "accessFlag": true
        },
        {
          "userKey": "Delete",
          "reqKey": "DELETE",
          "accessFlag": false
        }
      ]
    }
  ]
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.roleDetailsForm = this.createFormGroup();
    this.assignValuesToForm();
  }

  selectFeature (e, type,feature, string){
    console.log(e.checked);
    console.log(type);
    console.log(feature);
      this.allFeatures && this.allFeatures.length > 0 && 
      this.allFeatures.forEach((f) => {
        if(f._featureId == feature._featureId) {
          f.permissions.forEach((p) =>{
            if (p.userKey == type.userKey) {
              p.accessFlag = e.checked;
              if(string === "selectedFeature"){
                this.selectFeatureValue.push(f);
                console.log(this.selectFeatureValue, 'allFeatures')
              }
              else {
                this.selectApprovalValue.push(f);
                console.log(this.selectApprovalValue, 'allFeatures')
              }
            }
          })
        }
      })
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      _organisationId: new FormControl(this.orgID ? this.orgID : (this.data ? this.data._organisationId : "")),
      _departmentId: new FormControl('', [Validators.required]),
      parentRole: new FormControl('', [Validators.required]),
      features: new FormControl('', [Validators.required]),
      approvals: new FormControl('', [Validators.required]),
      approvalProcess: new FormControl('', [Validators.required])
    });
  }

  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.roleDetailsForm.patchValue(this.data)
    }
  }
 /* addRoles(response) {
    if (response) {
      //this.accessRules = response;
      for (var i = 0; i < response.length; i++) {
        var json = {
          "_featureId": response[i]._featureId._id,
          "featureName": response[i]._featureId.name,
          "rules": response[i].rules
        }
        var access = [];
        var userKey = [];
        response[i].rules.forEach((role: any) => {
          role.permissions.forEach((permission: any) => {
            access.push(permission);
            if (permission.accessFlag) {
              userKey.push(permission.userKey)
            }
          });
        });
        this.permissionArray.push(this.formBuilder.group({
          feature: response[i]._featureId.name,
          permissions: [userKey]
        }));
        this.displayKey.push({
          name: response[i]._featureId.name,
          keys: userKey
        })
        this.permissions.push({
          featureName: response[i]._featureId.name,
          access: access
        });
        this.accessRules.push({
          "_featureId": response[i]._featureId._id,
          "rules": response[i].rules
        })
      }
      if (this.permissions) {
        if (!this.permissions[0].featureName) {
          this.permissions.splice(0, 1);
        }
      }
    } else {
      const roleType = this.createRoles();
      this.permissionArray.push(roleType);
      this.permissions.push({
        featureName: '',
        access: []
      });
    }
  }
  
    onRoleFormSubmit() {
    this.roleForm.controls['access'].setValue(this.accessRules);
    this.roleFormSubmitted = true;
    if (this.roleId !== undefined) {
      this.RoleService.update(this.roleId, this.roleForm.value)
        .then((response: any) => {
          this.roleFormSubmitted = false;
          // toasty message
          const toastOptions: ToastOptions = {
            title: 'Success',
            msg: response.message
          };
          this.toastyService.success(toastOptions);
          this.roleForm['_touched'] = false;
          const path = '/roles'
          // route to role list
          this.router.navigate([path]);
        }, (error: any) => {
          this.roleFormSubmitted = false;
          throw new jspError(error.error.error.message);
        });
    } else {
      if (this.roleForm.valid) {
        this.RoleService.role(this.roleForm.value)
          .then((response: any) => {
            this.roleFormSubmitted = false;
            // toasty message
            const toastOptions: ToastOptions = {
              title: 'Success',
              msg: response.message
            };
            this.toastyService.success(toastOptions);
            this.roleForm['_touched'] = false;
            const path = '/roles'
            // route to role list
            this.router.navigate([path]);
          }, (error: any) => {
            this.roleFormSubmitted = false;
            throw new jspError(error.error.error.message);
          });
      } else {
        throw new jspError('Fill Mandatory Field');
      }
    }
  }
  */

  createRole (){
     this.roleDetailsForm = this.formBuilder.group({
      _organisationId: this.userAuth.organisation._id,
        _departmentId : {},
        name: name,
        parentRole: "",
        description : "",
        approvalProcess: this.selectApprovalValue,
        access : this.selectFeatureValue,
     })

  }
  onSubmit() {
    // Do useful stuff with the gathered data
    console.log(this.roleDetailsForm.value);
  }

}
