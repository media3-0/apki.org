//(c) Jakub Krol 2015

module ApkiOrg.CourseMgr {
    /**
     * Model: Achievement.
     */
    export class MAchievement extends MBase{
        data: MAchievementData;

        constructor() {
            super();
            this.data = new MAchievementData();
        }
    }

    export class MAchievementData {
        title               :string;            //Title of achievement
        icon_src            :string;            //Src to use with image to represent achievement
        points              :number;            //Number of points to add (DONT USE IT AT SERVER SIDE, use ID of achievement instead)

        constructor() {
            this.title = '';
            this.icon_src = '';
            this.points = 0;
        }
    }
}