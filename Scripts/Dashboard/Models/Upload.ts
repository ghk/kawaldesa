/// <reference path="../../Models.ts"/> 

module App.Models {

    export class APBNFileUpload {

        static UploadFile(file, result, upload): any {
            var res = upload.upload({
                type: 'POST',
                url: '/api/APBDFile/PostFile',
                data: {"anu": "lalala", "lalala": 11, "caca":true},
                file: file
            });
            return res;
        }
    }
}
