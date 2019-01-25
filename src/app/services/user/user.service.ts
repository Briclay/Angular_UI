import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { constantService } from '../../constant/constant.serive';
import { UserData } from '../../interfaces/interfaces';
import {ApiService} from  '../api.service';
import {environmentService} from '../../constant/environment'

const data: UserData = {
    "result": "success",
    "data": [
        {
            "name": {
                "first": "first",
                "last": "last"
            },
            "address": {
                "flat": "102/45, flat no",
                "street": "Street Address",
                "area": "Bannargetta Road",
                "city": "Bangalore",
                "state": "Karnataka",
                "pincode": 560001
            },
            "userType": "USER",
            "profileImageUrl": "assets/images/avatars/profile.jpg",
            "deleteFlag": false,
            "activeFlag": true,
            "_id": "5c13b307b7d5a000143b6719",
            "_organisationId": {
                "address": {
                    "area": "Bannargetta Road",
                    "city": "Bangalore",
                    "state": "Karnataka",
                    "pincode": 560001
                },
                "orgType": "ADMINISTRATOR",
                "plant": [],
                "logoImageUrl": "storage/organisation/logo/default.png",
                "description": "Matkraft organisation description",
                "_users": [
                    "5c065a91e1dfe52f21c486c4",
                    "5c0fdf61a38c5e0014efe87d",
                    "5c13b307b7d5a000143b6719"
                ],
                "_features": [
                    "5c06495d3833482555ab8e52",
                    "5c0649703833482555ab8e5b",
                    "5c0649783833482555ab8e64",
                    "5c06497d3833482555ab8e6d",
                    "5c064bef3833482555ab8e76"
                ],
                "_departments": [],
                "deleteFlag": false,
                "activeFlag": true,
                "_id": "5c06514194e4d234998720a0",
                "orgCode": "JSP",
                "name": "JSP",
                "email": "jsp@gmail.com",
                "phone": 9643520561,
                "imageUrls": [],
                "_createdBy": "5a5844cd734d1d61613f7066",
                "_updatedBy": "5a5844cd734d1d61613f7066",
                "deleteNote": "",
                "createdAt": "2018-01-12T19:08:29.284Z",
                "updatedAt": "2018-01-12T19:08:29.284Z",
                "__v": 7
            },
            "email": "demo123@gmail.com",
            "username": "demo123",
            "password": "Ji9SzbpTMGyWB/QEoMHvBtYtsJapWZxEEtEl4s/lQrWhvx3nIae+ZEKoxnA0E42RiaTlaFZt2Z9NjunH5iACMQ==",
            "_roleId": {
                "_id": "5c0658e34a0a4b2d411b115b",
                "name": "Test Role"
            },
            "phone": 9686038003,
            "_createdBy": {
                "profileImageUrl": "assets/images/avatars/profile.jpg",
                "_id": "5c06520194e4d234998720ff",
                "displayName": "JSP Admin",
                "email": "jspadmin@gmail.com",
                "username": "jspadmin"
            },
            "createdAt": "2018-12-14T13:41:27.115Z",
            "devices": [],
            "imageUrls": [],
            "salt": "mwks/dkIPLs6VYu43LhHQg==",
            "displayName": "first last",
            "__v": 0
        },
        {
            "name": {
                "first": "sonal",
                "last": "vishwakarma"
            },
            "address": {
                "flat": "102/45, flat no",
                "street": "Street Address",
                "area": "Bannargetta Road",
                "city": "Bangalore",
                "state": "Karnataka",
                "pincode": 560001
            },
            "userType": "USER",
            "profileImageUrl": "assets/images/avatars/profile.jpg",
            "deleteFlag": false,
            "activeFlag": true,
            "_id": "5c0fdf61a38c5e0014efe87d",
            "_organisationId": {
                "address": {
                    "area": "Bannargetta Road",
                    "city": "Bangalore",
                    "state": "Karnataka",
                    "pincode": 560001
                },
                "orgType": "ADMINISTRATOR",
                "plant": [],
                "logoImageUrl": "storage/organisation/logo/default.png",
                "description": "Matkraft organisation description",
                "_users": [
                    "5c065a91e1dfe52f21c486c4",
                    "5c0fdf61a38c5e0014efe87d",
                    "5c13b307b7d5a000143b6719"
                ],
                "_features": [
                    "5c06495d3833482555ab8e52",
                    "5c0649703833482555ab8e5b",
                    "5c0649783833482555ab8e64",
                    "5c06497d3833482555ab8e6d",
                    "5c064bef3833482555ab8e76"
                ],
                "_departments": [],
                "deleteFlag": false,
                "activeFlag": true,
                "_id": "5c06514194e4d234998720a0",
                "orgCode": "JSP",
                "name": "JSP",
                "email": "jsp@gmail.com",
                "phone": 9643520561,
                "imageUrls": [],
                "_createdBy": "5a5844cd734d1d61613f7066",
                "_updatedBy": "5a5844cd734d1d61613f7066",
                "deleteNote": "",
                "createdAt": "2018-01-12T19:08:29.284Z",
                "updatedAt": "2018-01-12T19:08:29.284Z",
                "__v": 7
            },
            "email": "sona.karma21@@gmail.com",
            "username": "sonal",
            "password": "HjLzuKMQ0jivnmjHAQx1antyfi8rDkLszCsp14my7C5fhAancwgsKoux2iZ33WhXt9xWWIOnb16zjl5kctV/sQ==",
            "_roleId": {
                "_id": "5c0fdf47a38c5e0014efe85a",
                "name": "Admin"
            },
            "phone": 9686038003,
            "_createdBy": {
                "profileImageUrl": "assets/images/avatars/profile.jpg",
                "_id": "5a5844cd734d1d61613f7066",
                "displayName": "Super Admin",
                "email": "superadmin@matkraft.com",
                "username": "superadmin"
            },
            "createdAt": "2018-12-11T16:01:37.641Z",
            "devices": [],
            "imageUrls": [],
            "salt": "CjO6RWwZhG6THg7ElXVfzQ==",
            "displayName": "sonal vishwakarma",
            "__v": 0,
            "lastLoginAt": "2018-12-13T12:24:05.764Z"
        },
        {
            "name": {
                "first": "moht",
                "last": "Maddhesiya"
            },
            "address": {
                "flat": "102/45, flat no",
                "street": "Street Address",
                "area": "Bannargetta Road",
                "city": "Bangalore",
                "state": "Karnataka",
                "pincode": 560001
            },
            "userType": "USER",
            "profileImageUrl": "assets/images/avatars/profile.jpg",
            "deleteFlag": false,
            "activeFlag": true,
            "_id": "5c065a91e1dfe52f21c486c4",
            "_organisationId": {
                "address": {
                    "area": "Bannargetta Road",
                    "city": "Bangalore",
                    "state": "Karnataka",
                    "pincode": 560001
                },
                "orgType": "ADMINISTRATOR",
                "plant": [],
                "logoImageUrl": "storage/organisation/logo/default.png",
                "description": "Matkraft organisation description",
                "_users": [
                    "5c065a91e1dfe52f21c486c4",
                    "5c0fdf61a38c5e0014efe87d",
                    "5c13b307b7d5a000143b6719"
                ],
                "_features": [
                    "5c06495d3833482555ab8e52",
                    "5c0649703833482555ab8e5b",
                    "5c0649783833482555ab8e64",
                    "5c06497d3833482555ab8e6d",
                    "5c064bef3833482555ab8e76"
                ],
                "_departments": [],
                "deleteFlag": false,
                "activeFlag": true,
                "_id": "5c06514194e4d234998720a0",
                "orgCode": "JSP",
                "name": "JSP",
                "email": "jsp@gmail.com",
                "phone": 9643520561,
                "imageUrls": [],
                "_createdBy": "5a5844cd734d1d61613f7066",
                "_updatedBy": "5a5844cd734d1d61613f7066",
                "deleteNote": "",
                "createdAt": "2018-01-12T19:08:29.284Z",
                "updatedAt": "2018-01-12T19:08:29.284Z",
                "__v": 7
            },
            "email": "mohitmaddhesiya@gmail.com",
            "username": "mohti",
            "password": "Yv08e0R2n2hhLiv5ULCkCxxstLV1La8oGHwt4OkDUzr7qdV7O2i9NcwNOCrrB2Dui9SxJzXe6KciCZo/nANxpw==",
            "_roleId": {
                "_id": "5c0658e34a0a4b2d411b115b",
                "name": "Test Role"
            },
            "phone": 9686038003,
            "_createdBy": {
                "profileImageUrl": "assets/images/avatars/profile.jpg",
                "_id": "5c06520194e4d234998720ff",
                "displayName": "JSP Admin",
                "email": "jspadmin@gmail.com",
                "username": "jspadmin"
            },
            "createdAt": "2018-12-04T10:44:33.082Z",
            "devices": [],
            "imageUrls": [],
            "salt": "Ao7IXLb1ay46Ve/gmCj1og==",
            "displayName": "moht Maddhesiya",
            "__v": 0
        },
        {
            "name": {
                "first": "Super",
                "last": "Admin"
            },
            "address": {
                "flat": "102/45, flat no",
                "street": "Street Address",
                "area": "Bannargetta Road",
                "city": "Bangalore",
                "state": "Karnataka",
                "pincode": 560001
            },
            "userType": "SUPERADMIN",
            "profileImageUrl": "assets/images/avatars/profile.jpg",
            "deleteFlag": false,
            "activeFlag": true,
            "_id": "5a5844cd734d1d61613f7066",
            "_organisationId": {
                "address": {
                    "area": "Bannargetta Road",
                    "city": "Bangalore",
                    "state": "Karnataka",
                    "pincode": 560001
                },
                "orgType": "ADMINISTRATOR",
                "plant": [],
                "logoImageUrl": "storage/organisation/logo/default.png",
                "description": "Matkraft organisation description",
                "_users": [],
                "_features": [
                    "5c06495d3833482555ab8e52",
                    "5c0649703833482555ab8e5b",
                    "5c0649783833482555ab8e64",
                    "5c06497d3833482555ab8e6d",
                    "5c064bef3833482555ab8e76"
                ],
                "_departments": [],
                "deleteFlag": false,
                "activeFlag": true,
                "_id": "5a58438f734d1d61613f6ed9",
                "orgCode": "SA",
                "name": "Matkraft Building Solutions Pvt Ltd",
                "email": "mohitmaddhesiya@gmail.com",
                "phone": 9643520561,
                "imageUrls": [],
                "_createdBy": "5a5844cd734d1d61613f7066",
                "_updatedBy": "5a5844cd734d1d61613f7066",
                "deleteNote": "",
                "createdAt": "2018-01-12T19:08:29.284Z",
                "updatedAt": "2018-01-12T19:08:29.284Z",
                "__v": 6
            },
            "displayName": "Super Admin",
            "email": "superadmin@matkraft.com",
            "username": "superadmin",
            "password": "TEALN6OSpaDyx3za3S+ui9KNE80+3gIVJ3crFjcW09kvGb+L3aaF78eWbaQ4MPloBvGD1Uk3zQUNc5/H2ddXHw==",
            "salt": "JoJ6i8XzNefn65O03TzmhA==",
            "_roleId": {
                "_id": "5a5849218e64e99e47f98b53",
                "name": "SuperAdmin"
            },
            "phone": 9876543210,
            "imageUrls": [],
            "reviewPoints": 0,
            "devices": [],
            "resetPasswordToken": "",
            "resetPasswordExpires": null,
            "activateToken": "",
            "activateTokenExpires": null,
            "lastLoginAt": "2018-12-11T15:57:24.824Z",
            "createdBy": "5a5844cd734d1d61613f7066",
            "updatedBy": "5a5844cd734d1d61613f7066",
            "deletedBy": "5a5844cd734d1d61613f7066",
            "deleteNote": "",
            "createdAt": "2018-01-12T19:08:29.284Z",
            "updatedAt": "2018-01-12T19:08:29.284Z",
            "deletedAt": "2018-01-12T19:08:29.284Z",
            "__v": 0,
            "access": [],
            "roles": []
        },
        {
            "name": {
                "first": "JSP",
                "last": "Admin"
            },
            "address": {
                "flat": "102/45, flat no",
                "street": "Street Address",
                "area": "Bannargetta Road",
                "city": "Bangalore",
                "state": "Karnataka",
                "pincode": 560001
            },
            "userType": "ADMIN",
            "profileImageUrl": "assets/images/avatars/profile.jpg",
            "deleteFlag": false,
            "activeFlag": true,
            "_id": "5c06520194e4d234998720ff",
            "_organisationId": {
                "address": {
                    "area": "Bannargetta Road",
                    "city": "Bangalore",
                    "state": "Karnataka",
                    "pincode": 560001
                },
                "orgType": "ADMINISTRATOR",
                "plant": [],
                "logoImageUrl": "storage/organisation/logo/default.png",
                "description": "Matkraft organisation description",
                "_users": [
                    "5c065a91e1dfe52f21c486c4",
                    "5c0fdf61a38c5e0014efe87d",
                    "5c13b307b7d5a000143b6719"
                ],
                "_features": [
                    "5c06495d3833482555ab8e52",
                    "5c0649703833482555ab8e5b",
                    "5c0649783833482555ab8e64",
                    "5c06497d3833482555ab8e6d",
                    "5c064bef3833482555ab8e76"
                ],
                "_departments": [],
                "deleteFlag": false,
                "activeFlag": true,
                "_id": "5c06514194e4d234998720a0",
                "orgCode": "JSP",
                "name": "JSP",
                "email": "jsp@gmail.com",
                "phone": 9643520561,
                "imageUrls": [],
                "_createdBy": "5a5844cd734d1d61613f7066",
                "_updatedBy": "5a5844cd734d1d61613f7066",
                "deleteNote": "",
                "createdAt": "2018-01-12T19:08:29.284Z",
                "updatedAt": "2018-01-12T19:08:29.284Z",
                "__v": 7
            },
            "displayName": "JSP Admin",
            "email": "jspadmin@gmail.com",
            "username": "jspadmin",
            "password": "TEALN6OSpaDyx3za3S+ui9KNE80+3gIVJ3crFjcW09kvGb+L3aaF78eWbaQ4MPloBvGD1Uk3zQUNc5/H2ddXHw==",
            "salt": "JoJ6i8XzNefn65O03TzmhA==",
            "_roleId": {
                "_id": "5c064f1794e4d23499871fa9",
                "name": "Admin"
            },
            "phone": 9876543210,
            "imageUrls": [],
            "reviewPoints": 0,
            "devices": [],
            "resetPasswordToken": "",
            "resetPasswordExpires": null,
            "activateToken": "",
            "activateTokenExpires": null,
            "lastLoginAt": "2018-12-14T13:35:50.716Z",
            "createdBy": "5a5844cd734d1d61613f7066",
            "updatedBy": "5a5844cd734d1d61613f7066",
            "deletedBy": "5a5844cd734d1d61613f7066",
            "deleteNote": "",
            "createdAt": "2018-01-12T19:08:29.284Z",
            "updatedAt": "2018-01-12T19:08:29.284Z",
            "deletedAt": "2018-01-12T19:08:29.284Z",
            "__v": 0,
            "access": [],
            "roles": []
        }
    ]
}

@Injectable()
export class UserService {
    constructor(
        private apiService: ApiService
    ) { }
    // pass params data
    public getUser(): Observable<UserData> {
        let url = `${environmentService.briclayCore}/users?select=all`
        return this.apiService.get(url).pipe(map(res     => res));
    }


}