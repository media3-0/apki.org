//(c) Jakub Krol 2015

module ApkiOrg.CourseMgr {
    /**
     * Model: Achievement.
     */
    export class MAchievement{
        title               :string;            //Title of achievement
        icon_src            :string;            //Src to use with image to represent achievement
        points              :number;            //Number of points to add (DONT USE IT AT SERVER SIDE, use ID of achievement instead)
    }
}