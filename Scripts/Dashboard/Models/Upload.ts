/// <reference path="../../Models.ts"/> 

module App.Models {

    export class APBNFileUpload {

        static UploadFile(file, result, upload): any {
            var res = upload.upload({
                type: 'POST',
                url: '/api/KawalDesaUpload/PostFile',
                data: result,
                file: file
            });
            return res;
        }
    }
}
