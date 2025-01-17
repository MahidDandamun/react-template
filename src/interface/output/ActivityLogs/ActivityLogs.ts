export interface Activity {
    name: string;
    owner: string;
    creation: string; 
    modified: string; 
    modified_by: string;
    docstatus: number;
    idx: number;
    comment_type: string;
    comment_email: string;
    subject: string;
    content: string;
    published: number;
    seen: number;
    reference_doctype: string;
    reference_name: string;
    doctype: string;
}

export interface ActivityState {
    activityList: Activity[],
    isLoading: boolean,
    error: any
}

// export interface CommentActivity extends BaseActivityList {
//     content?: string;
//     subject?: string;
// }

// export interface LabelActivity extends BaseActivityList {
//     label_content: string;
// }
