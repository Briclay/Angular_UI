	import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
	import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
	import { HttpClient, HttpHeaders } from '@angular/common/http';
	import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
	import {merge as observableMerge, Subject} from 'rxjs';
	import { Router, ActivatedRoute } from '@angular/router';
	import {takeUntil} from 'rxjs/operators';
	import {FileManagerService} from '../../../../components/core/dashboard/file-manager/file-manager.service';
	import {UserService} from '../../../../components/core/dashboard/user/user.service';
	import { BpdListService } from '../../../../components/core/dashboard/bpd-list/bpd-list.service';
	import { NcmService } from '../../../../components/core/dashboard/ncm/ncm.service';
	declare var moment: any;

	@Component({
		selector: 'app-ncm-dashboard',
		templateUrl: './ncm-dashboard.component.html',
		styleUrls: ['./ncm-dashboard.component.scss']
	})
	export class NcmDashboardComponent implements OnInit {
		@Input() data: any;
		@Input() formType: string;
		bpdAllLists: any;
		bpdListForm: FormGroup;
		orgID: string;
		userAuth : any;
		profileImageUrl = "";
		user: any;
		usrType : any;
		userId : any;
		userName: any;
		roleName: any;
		isLoading : boolean;
		pageIndex : number = 0;
		pageSize : number = 5;
		bpdLists  = [];
		selectedOrgId : any;  
		ncmAnalytics : any;
		ncmBpdListAnalytics : any;
		analyticsLoading = false;
		userBPDOptions : any;
		private unsubscribe: Subject<any> = new Subject();

		constructor(
			private fileManagerService: FileManagerService,
			private bpdListService: BpdListService,
			private ncmService : NcmService,
			private formBuilder : FormBuilder,
			private http: HttpClient,
			private router: Router,
			private route: ActivatedRoute,
			private userService : UserService,
			private snackBar : MatSnackBar) {    
			this.user = JSON.parse(window.localStorage.getItem('authUser')); 
			this.userId = this.user._id;   
			this.usrType = this.user.userType;
			this.userName = this.user.displayName;
			this.roleName = this.user._roleId.name;
			this.profileImageUrl = this.user.profileImageUrl ? this.user.profileImageUrl : "./assets/images/avatars/profile.jpg";
			this.userAuth = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
			let dep = JSON.parse(window.localStorage.getItem('authUserDepartment'));
			this.orgID = this.userAuth._id;
			this.selectedOrgId = this.orgID
		}

		ngOnInit() {
		/*BPD List Form*/
			this.bpdListForm = this.formBuilder.group({
			initiatedDate: ['', Validators.required],
			_organisationId: ['', Validators.required],
			process: [''],
			bpdNumber: [''],
		/*process Owner Form*/
			processOwner: this.formBuilder.group({
				_id: [''],
				name: [''],
				email: [''],
			}),
		/*point of contact Form*/
			pointOfContact: this.formBuilder.group({ 
				_id: [''], 
				name: [''],
				email: [''],
			}),
			depNamePOContact : [''],
			depNameProcessOwner : [''],
			});
			this.getBPDListData()
			this.getNcmAnalytics()
			this.getNcmBpdListAnalytics()
		}
		
		/*method to get BPD List */
		getBPDListData() {
			this.bpdListService.getAll().pipe().subscribe(res => {
			this.bpdAllLists = res;
			if(res.length > 0){
				res.forEach(list => {
				if(list.processOwner._id === this.userId || list.pointOfContact._id === this.userId){
				res.length > 0 && res.forEach((list) => {
					list.initiatedDateDummy = moment(list.initiatedDate).local().format("MM-DD-YYYY")
				})
				this.bpdLists.push(list)
				this.userBPDOptions = [
					{
					title: 'bpdNumber', key: 'bpdNumber', hideTitle: true, type: 'label'
					}, 
					{
					title: 'initiatedDate', key: 'initiatedDateDummy', hideTitle: true, type: 'label'
					},
					{
					title: 'process', key: 'process', hideTitle: true, type: 'label'
					}
				]
				}
				})
			}
			})
		}

		getNcmAnalytics (){
			this.analyticsLoading = true;
			this.ncmService.getNcmAnalytics().pipe().subscribe(res => {
				this.ncmAnalytics = res;
				this.analyticsLoading = false;
			}, (error: any) => {
				this.snackBar.open(error.message, 'error', {
					duration: 5000,
				});
				console.log(error)
			});
		}

		getNcmBpdListAnalytics (){
			this.analyticsLoading = true;
			this.ncmService.getNcmBpdListAnalytics().pipe().subscribe(res => {
				this.ncmBpdListAnalytics = res;
				this.analyticsLoading = false;
			}, (error: any) => {
				this.snackBar.open(error.message, 'error', {
					duration: 5000,
				});
				console.log(error)
			});
		}

		onFileInput(event, fileList?) {
			let reader = new FileReader()
			if (event.target.files && event.target.files.length > 0) {
				let file = event.target.files[0];
				reader.readAsDataURL(file);
				let fileExt = file.name.split(".");
				let fileName = (new Date().getTime()) + "." + fileExt[fileExt.length - 1];
				this.fileManagerService.getS3Url(`file-name=${fileName}&file-type=${file.type}&_organisationId=${this.orgID}`)
				.pipe().subscribe(res => {
					let json = {
						savedFileName: fileName,
						_organisationId: this.orgID,
						name: file.name,
						type: 'file',
						fileExt: fileExt[fileExt.length - 1],
						path: res.url,
						size: file.size,
						message: "File uploaded by ",
						details: "file original name is " + file.name
					};
					this.saveOnS3(res, file, json)
				}, (error: any) => {
					this.snackBar.open(error.message, 'error', {
						duration: 5000,
					});
					console.log(error)
				});
			} else {
				console.log('false');
			}
		}
	/*method to save input file on S3*/
		saveOnS3(response: any, file, body: any) {
			this.isLoading = true;
			this.http.put(response.signedRequest, file, {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).subscribe((awsRes: any) => {
				let filePath = 'https://s3.ap-south-1.amazonaws.com/' + this.orgID + '/' + body.savedFileName;
		this.profileImageUrl = filePath;
		this.isLoading = false;
		if(this.profileImageUrl !== ""){
			this.onSubmit()
		}
	}, (error: any) => {
		this.snackBar.open(error.message, 'error', {
			duration: 5000,
		});
		console.log(error)
	});
		}

		onSubmit() {
		let userData = {
		_organisationId : this.orgID,
		profileImageUrl : this.profileImageUrl,
		userType : this.usrType
		}
		this.userService.updateUser(this.userId, userData )
		.pipe().subscribe(res => {
			this.isLoading = false;
			this.snackBar.open("Profile image updated Succesfully", 'User', {
			duration: 5000,
			});
		}, (error: any) => {
			this.isLoading = false;
			this.snackBar.open(error.message, 'User', {
			duration: 5000,
			});
		});
	}

	}
