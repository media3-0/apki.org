//(c) Jakub Krol 2015

module ApkiOrg.CourseMgr {
    /**
     * Base class for Rest API. Contains some helpers.
     */
    export class BaseRestAPI{
        /**
         * This will prepare data from backend to frontend use (for example will expose id). Use it like this: 'transformResponse':(data, headersGetter) => { return this.transformFromBackEndToFrontEnd(data, headersGetter, true); } or simply 'transformResponse':this.transformFromBackEndToFrontEnd .
         * @param any data Original data parameter.
         * @param any headersGetter Original data parameter.
         * @param boolean isArr Optional (defaults to false). Pass true if response in an array.
         * @return {*} Prepared data.
         */
        public transformFromBackEndToFrontEnd(data, headersGetter, isArr:boolean=false){
            data = angular.fromJson(data);

            if (isArr){
                //Reassigned ID:
                $.each(data, (i, el) => {
                    data[i].id = data[i].id.$oid;
                });
            } else {
                data.id = data.id.$oid; //Reassigned ID
            }
            return data;
        }
    }
}