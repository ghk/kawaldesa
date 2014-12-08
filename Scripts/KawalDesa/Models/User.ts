/// <reference path="../../Models.ts"/> 

module App.Models {

    import IQuery = Scaffold.IQuery;

    export interface IUser {
        Id: string
        UserName: string
        Roles: string[]
        Password: string
        ConfirmPassword: string
    }

    export class User {
        public static ajaxSettings = new Scaffold.AjaxSettings();

        Id: string;
        UserName: string;
        Roles: string[];
        Password: string;
        ConfirmPassword: string;

        constructor(data?: IUser) {
            this.Id = data ? data.Id : null
            this.UserName = data ? data.UserName : null;
            this.Roles = data ? data.Roles : [];
            this.Password = data ? data.Password : null;
            this.ConfirmPassword = data ? data.ConfirmPassword : null;
        }

        static GetAll(query?: IQuery): JQueryPromise<Array<User>> {
            var res = $.ajax(User.ajaxSettings.build({
                type: 'GET',
                url: '/api/User/GetAll',
                data: query,
            })).then((models) => {
                return models.map((model) => new User(model));
            });
            return res;
        }

        static Get(id: string): JQueryPromise<User> {
            var res = $.ajax(User.ajaxSettings.build({
                type: 'GET',
                url: '/api/User/Get/' + id,
            })).then((model) => new User(model));
            return res;
        }

        static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(User.ajaxSettings.build({
                type: 'GET',
                url: '/api/User/GetCount',
                data: query,
            }));
            return res;
        }

        Save(): JQueryPromise<void> {
            var isNew = this.Id == null;
            var model = this;
            var res = $.ajax(User.ajaxSettings.build({
                type: isNew ? 'POST' : 'PUT',
                url: (isNew ? '/api/User/Register' : '/api/User/Update'),
                data: JSON.stringify(this)
            })).then((id) => {
                if (isNew) {
                    this.Id = id;
                }
            });
            return res;
        }

        Delete(): JQueryPromise<void> {
            var res = $.ajax(User.ajaxSettings.build({
                type: 'DELETE',
                url: '/api/User/Delete/' + this.Id,
            }));
            return res;
        }

        static Delete(id: number): JQueryPromise<void> {
            var res = $.ajax(User.ajaxSettings.build({
                type: 'GET',
                url: '/api/User/Delete/' + id,
            }));
            return res;
        }

        Login(): JQueryPromise<User> {
            var model = this;
            var res = $.ajax(User.ajaxSettings.build({
                type: 'POST',
                url: '/api/User/Login',
                data: JSON.stringify(this)
            }));
            return res;
        }

        static Logout(): JQueryPromise<void> {
            var res = $.ajax(User.ajaxSettings.build({
                type: 'GET',
                url: '/api/User/Logout',
            }));
            return res;
        }

    }
}