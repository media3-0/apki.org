//(c) Jakub Krol 2015

module ApkiOrg.CourseMgr {
    /**
     * Model: Basic model for course-based REST stuff. Not to be used directly.
     */
    export class MBase{
        id          :string;    //Unique ID of element
        parent_id   :string;    //Unique ID of parent element (empty when no parent at all)
//        data        :any;       //Data of element (I...Data interface)
    }
}