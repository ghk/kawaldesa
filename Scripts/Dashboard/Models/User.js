/// <reference path="../../Models.ts"/>
var App;
(function (App) {
    (function (Models) {
        var User = (function () {
            function User(data) {
                this.Id = data ? data.Id : null;
                this.UserName = data ? data.UserName : null;
                this.Roles = data ? data.Roles : [];
                this.Password = data ? data.Password : null;
                this.ConfirmPassword = data ? data.ConfirmPassword : null;
            }
            User.GetAll = function (query) {
                var res = $.ajax(User.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/User/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new User(model);
                    });
                });
                return res;
            };

            User.Get = function (id) {
                var res = $.ajax(User.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/User/Get/' + id
                })).then(function (model) {
                    return new User(model);
                });
                return res;
            };

            User.Count = function (query) {
                var res = $.ajax(User.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/User/GetCount',
                    data: query
                }));
                return res;
            };

            User.prototype.Save = function () {
                var _this = this;
                var isNew = this.Id == null;
                var model = this;
                var res = $.ajax(User.ajaxSettings.build({
                    type: isNew ? 'POST' : 'PUT',
                    url: (isNew ? '/api/User/Register' : '/api/User/Update'),
                    data: JSON.stringify(this)
                })).then(function (id) {
                    if (isNew) {
                        _this.Id = id;
                    }
                });
                return res;
            };

            User.prototype.Delete = function () {
                var res = $.ajax(User.ajaxSettings.build({
                    type: 'DELETE',
                    url: '/api/User/Delete/' + this.Id
                }));
                return res;
            };

            User.Delete = function (id) {
                var res = $.ajax(User.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/User/Delete/' + id
                }));
                return res;
            };

            User.prototype.Login = function () {
                var model = this;
                var res = $.ajax(User.ajaxSettings.build({
                    type: 'POST',
                    url: '/api/User/Login',
                    data: JSON.stringify(this)
                }));
                return res;
            };

            User.Logout = function () {
                var res = $.ajax(User.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/User/Logout'
                }));
                return res;
            };
            User.ajaxSettings = new Scaffold.AjaxSettings();
            return User;
        })();
        Models.User = User;
    })(App.Models || (App.Models = {}));
    var Models = App.Models;
})(App || (App = {}));
//# sourceMappingURL=User.js.map
