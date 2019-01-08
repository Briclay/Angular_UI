
export interface RequestTrackerData {
    data: RequestTrackerList[];
    status: string;
}

export interface RequestTrackerList {
    '_id': string;
    '_organisationId': {
        '_id': string;
        'name': string;
        'logoImageUrl': string;
        'orgType': string;
    };
    '_projectId': {
        '_id': string;
        'name': string;
    };
    'requestNumber': string;
    '_assignedId': {
        '_id': string;
        'displayName': string;
        'salt': string;
        'username': string;
        'email': string;
        'password': string;
        'phone': number;
        '_roleId': string;
        '_organisationId': string;
        '_createdBy': string;
        'createdAt': string;
        '__v': number;
        'activeFlag': boolean;
        'deleteFlag': false;
        'reviewPoints': 0;
        'roles': string[];
        'shift': {
            'monthShift': boolean
        };
        'access': string[];
        'profileImageUrl': string;
        'imageUrls': string[];
        'address': any;
        'userType': string;
        'devices': string[];
        'name': {
            'last': string;
            'first': string;
        }
    };
    'workDescription': string;
    'typeOfWork': string;
    'workCategory': string;
    'leadDuration': number;
    'needByDate': string;
    'leadDaysToComplete': string;
    'needByStatusReason': '';
    'supportRole': {
        '_id': string;
        'displayName': string;
        'salt': string;
        'username': string;
        'email': string;
        'password': string;
        'phone': number;
        '_roleId': string;
        '_organisationId': string;
        '_createdBy': string;
        'createdAt': string;
        '__v': number;
        'activeFlag': boolean;
        'deleteFlag': boolean;
        'reviewPoints': number;
        'roles': string[];
        'shift': {
            'monthShift': boolean
        };
        'access': string[];
        'profileImageUrl': string;
        'imageUrls': string[];
        'address': any;
        'userType': string;
        'devices': string[];
        'name': {
            'last': string;
            'first': string;
        }
    };
    'awardedDate': Date;
    'RFAPutUpDate': Date;
    'timeToComplete': string;
    'RFAapprovalDate': Date;
    'remark': '';
    'workOrderPutDate': Date;
    'workOrderApprovalDate': Date;
    '_createdBy': {
        '_id': string;
        'displayName': string;
        'email': string;
        'username': string;
        'profileImageUrl': string;
    };
    'createdAt': string;
    '__v': number;
    'deleteFlag': boolean;
    'date': string;
    'documentStatus': string;
    'status': string;
    'initiatedDate': string;
    '_documentDetails': {
        _folderId: {
            name: string
        }
    }[];

}

