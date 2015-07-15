//(c) Jakub Krol 2015

module ApkiOrg.CourseMgr {
    /**
     * Model: Code lock coordinates.
     */
    export class MCodeLockCoord{
        rowStart            :number;            //Beginning of code lock - starting row
        colStart            :number;            //Beginning of code lock - starting column
        rowEnd              :number;            //End of code lock - ending row
        colEnd              :number;            //End of code lock - ending column
    }
}