// WARNING: T4 generated file  (it is related to CodeToServerProxy)
//
/// <reference path="../Scaffold/Scripts/typings/jquery/jquery.d.ts"/>
var Scaffold;
(function (Scaffold) {
    var AjaxSettings = (function () {
        function AjaxSettings() {
            this.async = true;
            this.cache = false;
            this.timeout = -1;
        }
        AjaxSettings.prototype.build = function (settings) {
            return {
                async: this.async,
                cache: this.cache,
                timeout: this.timeout,
                dataType: 'json',
                contentType: 'application/json',
                type: settings.type,
                url: settings.url,
                data: settings.data
            };
        };
        return AjaxSettings;
    })();
    Scaffold.AjaxSettings = AjaxSettings;
})(Scaffold || (Scaffold = {}));

var App;
(function (App) {
    (function (Models) {
        var Blob = (function () {
            function Blob(data) {
                this.ID = data ? data.ID : null;
                this.Name = data ? data.Name : null;
                this.Type = data ? data.Type : null;
                this.Path = data ? data.Path : null;
                this.Size = data ? data.Size : null;
            }
            Blob.ajaxSettings = new Scaffold.AjaxSettings();
            return Blob;
        })();
        Models.Blob = Blob;

        var Region = (function () {
            function Region(data) {
                this.ID = data ? data.ID : null;
                this.Name = data ? data.Name : null;
                this.Type = data ? data.Type : null;
                this.ParentID = data ? data.ParentID : null;
                this.Parent = data ? data.Parent : null;
                this.Children = data ? data.Children : null;
            }
            /* App.Controllers.RegionController */
            Region.GetAll = function (query) {
                var res = $.ajax(Region.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Region/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new Region(model);
                    });
                });
                return res;
            };

            Region.Get = function (id) {
                var res = $.ajax(Region.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Region/Get/' + id
                })).then(function (model) {
                    return new Region(model);
                });
                return res;
            };

            Region.Count = function (query) {
                var res = $.ajax(Region.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Region/GetCount',
                    data: query
                }));
                return res;
            };

            Region.prototype.Save = function () {
                var _this = this;
                var isNew = this.ID == null;
                var model = this;
                var res = $.ajax(Region.ajaxSettings.build({
                    type: isNew ? 'POST' : 'PUT',
                    url: '/api/Region/' + (isNew ? 'Post' : 'Put'),
                    data: JSON.stringify(this)
                })).then(function (id) {
                    if (isNew) {
                        _this.ID = id;
                    }
                });
                return res;
            };

            Region.prototype.Delete = function () {
                var res = $.ajax(Region.ajaxSettings.build({
                    type: 'DELETE',
                    url: '/api/Region/Delete/' + this.ID
                }));
                return res;
            };

            Region.Delete = function (id) {
                var res = $.ajax(Region.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Region/Delete/' + id
                }));
                return res;
            };
            Region.ajaxSettings = new Scaffold.AjaxSettings();
            return Region;
        })();
        Models.Region = Region;

        var Transaction = (function () {
            function Transaction(data) {
                this.ID = data ? data.ID : null;
                this.Amount = data ? data.Amount : null;
                this.Date = data ? data.Date : null;
                this.ProofID = data ? data.ProofID : null;
                this.SourceID = data ? data.SourceID : null;
                this.DestinationID = data ? data.DestinationID : null;
                this.Proof = data ? data.Proof : null;
                this.Source = data ? data.Source : null;
                this.Destination = data ? data.Destination : null;
            }
            /* App.Controllers.TransactionController */
            Transaction.GetAll = function (query) {
                var res = $.ajax(Transaction.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Transaction/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new Transaction(model);
                    });
                });
                return res;
            };

            Transaction.Get = function (id) {
                var res = $.ajax(Transaction.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Transaction/Get/' + id
                })).then(function (model) {
                    return new Transaction(model);
                });
                return res;
            };

            Transaction.Count = function (query) {
                var res = $.ajax(Transaction.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Transaction/GetCount',
                    data: query
                }));
                return res;
            };

            Transaction.prototype.Save = function () {
                var _this = this;
                var isNew = this.ID == null;
                var model = this;
                var res = $.ajax(Transaction.ajaxSettings.build({
                    type: isNew ? 'POST' : 'PUT',
                    url: '/api/Transaction/' + (isNew ? 'Post' : 'Put'),
                    data: JSON.stringify(this)
                })).then(function (id) {
                    if (isNew) {
                        _this.ID = id;
                    }
                });
                return res;
            };

            Transaction.prototype.Delete = function () {
                var res = $.ajax(Transaction.ajaxSettings.build({
                    type: 'DELETE',
                    url: '/api/Transaction/Delete/' + this.ID
                }));
                return res;
            };

            Transaction.Delete = function (id) {
                var res = $.ajax(Transaction.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Transaction/Delete/' + id
                }));
                return res;
            };
            Transaction.ajaxSettings = new Scaffold.AjaxSettings();
            return Transaction;
        })();
        Models.Transaction = Transaction;
    })(App.Models || (App.Models = {}));
    var Models = App.Models;
})(App || (App = {}));
//# sourceMappingURL=Models.js.map
