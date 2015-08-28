/// <reference path="../../gen/Models.ts"/> 

module App.Models {

    import IQuery = Scaffold.IQuery;

    export interface IUser {
        Id: string
        UserName: string
        Roles: string[]
        Scopes: Region[]
        Password: string
        ConfirmPassword: string
    }

    export class User {
        public static ajaxSettings = new Scaffold.AjaxSettings();

        Id: string;
        UserName: string;
        Roles: string[];
        Scopes: Region[]
        Password: string;
        ConfirmPassword: string;

        constructor(data?: IUser) {
            this.Id = data ? data.Id : null
            this.UserName = data ? data.UserName : null;
            this.Roles = data ? data.Roles : [];
            this.Scopes = data ? data.Scopes : [];
            this.Password = data ? data.Password : null;
            this.ConfirmPassword = data ? data.ConfirmPassword : null;
        }

    }
}