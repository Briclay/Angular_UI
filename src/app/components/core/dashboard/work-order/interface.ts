
export interface WorkOrderData {
    data: WorkOrderList[];
    status: string;
}

export interface WorkOrderList {
    _id: string;
    _workRequestId: {
        documentStatus: string;
        todayDate: string;
        status: string;
        deleteFlag: boolean;
        _id: string;
        _organisationId: string;
        _projectId: string;
        workDescription: string;
        typeOfWork: string;
        requestNumber: string;
        leadTimeRequire: number;
        needByDate: string;
        initiatedDate: string;
        leadDaysToComplete: number;
        createdAt: string;
        updatedAt: string;
        __v: number
    };
    createdAt: string
}