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
        var APBD = (function () {
            function APBD(data) {
                this.ID = data ? data.ID : null;
                this.DAU = data ? data.DAU : null;
                this.DBH = data ? data.DBH : null;
                this.IsActivated = data ? data.IsActivated : null;
                this.fkAPBNID = data ? data.fkAPBNID : null;
                this.APBN = data ? data.APBN : null;
                this.fkRegionID = data ? data.fkRegionID : null;
                this.Region = data ? data.Region : null;
                this.fkAPBDFileID = data ? data.fkAPBDFileID : null;
                this.APBDFile = data ? data.APBDFile : null;
            }
            APBD.ajaxSettings = new Scaffold.AjaxSettings();
            return APBD;
        })();
        Models.APBD = APBD;

        var APBDFile = (function () {
            function APBDFile(data) {
                this.ID = data ? data.ID : null;
                this.FileName = data ? data.FileName : null;
                this.IsActivated = data ? data.IsActivated : null;
                this.APBDs = data ? data.APBDs : null;
                this.DateCreated = data ? data.DateCreated : null;
                this.APBDCount = data ? data.APBDCount : null;
                this.TotalDAU = data ? data.TotalDAU : null;
                this.TotalDBH = data ? data.TotalDBH : null;
            }
            /* App.Controllers.APBDFileController */
            APBDFile.GetAll = function (query) {
                var res = $.ajax(APBDFile.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/APBDFile/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new APBDFile(model);
                    });
                });
                return res;
            };

            APBDFile.Get = function (id) {
                var res = $.ajax(APBDFile.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/APBDFile/Get/' + id
                })).then(function (model) {
                    return new APBDFile(model);
                });
                return res;
            };

            APBDFile.Count = function (query) {
                var res = $.ajax(APBDFile.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/APBDFile/GetCount',
                    data: query
                }));
                return res;
            };

            APBDFile.prototype.Save = function () {
                var _this = this;
                var isNew = this.ID == null;
                var model = this;
                var res = $.ajax(APBDFile.ajaxSettings.build({
                    type: isNew ? 'POST' : 'PUT',
                    url: '/api/APBDFile/' + (isNew ? 'Post' : 'Put'),
                    data: JSON.stringify(this)
                })).then(function (id) {
                    if (isNew) {
                        _this.ID = id;
                    }
                });
                return res;
            };

            APBDFile.prototype.Delete = function () {
                var res = $.ajax(APBDFile.ajaxSettings.build({
                    type: 'DELETE',
                    url: '/api/APBDFile/Delete/' + this.ID
                }));
                return res;
            };

            APBDFile.Delete = function (id) {
                var res = $.ajax(APBDFile.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/APBDFile/Delete/' + id
                }));
                return res;
            };
            APBDFile.ajaxSettings = new Scaffold.AjaxSettings();
            return APBDFile;
        })();
        Models.APBDFile = APBDFile;

        var APBN = (function () {
            function APBN(data) {
                this.ID = data ? data.ID : null;
                this.DanaPerDesa = data ? data.DanaPerDesa : null;
                this.Year = data ? data.Year : null;
            }
            /* App.Controllers.APBNController */
            APBN.GetAll = function (query) {
                var res = $.ajax(APBN.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/APBN/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new APBN(model);
                    });
                });
                return res;
            };

            APBN.Get = function (id) {
                var res = $.ajax(APBN.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/APBN/Get/' + id
                })).then(function (model) {
                    return new APBN(model);
                });
                return res;
            };

            APBN.Count = function (query) {
                var res = $.ajax(APBN.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/APBN/GetCount',
                    data: query
                }));
                return res;
            };

            APBN.prototype.Save = function () {
                var _this = this;
                var isNew = this.ID == null;
                var model = this;
                var res = $.ajax(APBN.ajaxSettings.build({
                    type: isNew ? 'POST' : 'PUT',
                    url: '/api/APBN/' + (isNew ? 'Post' : 'Put'),
                    data: JSON.stringify(this)
                })).then(function (id) {
                    if (isNew) {
                        _this.ID = id;
                    }
                });
                return res;
            };

            APBN.prototype.Delete = function () {
                var res = $.ajax(APBN.ajaxSettings.build({
                    type: 'DELETE',
                    url: '/api/APBN/Delete/' + this.ID
                }));
                return res;
            };

            APBN.Delete = function (id) {
                var res = $.ajax(APBN.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/APBN/Delete/' + id
                }));
                return res;
            };
            APBN.ajaxSettings = new Scaffold.AjaxSettings();
            return APBN;
        })();
        Models.APBN = APBN;

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

        var Recapitulation = (function () {
            function Recapitulation(data) {
                this.ID = data ? data.ID : null;
                this.RegionID = data ? data.RegionID : null;
                this.APBNID = data ? data.APBNID : null;
                this.APBNYear = data ? data.APBNYear : null;
                this.ParentRegionID = data ? data.ParentRegionID : null;
                this.RegionName = data ? data.RegionName : null;
                this.BudgetedAPBN = data ? data.BudgetedAPBN : null;
                this.TransferredAPBN = data ? data.TransferredAPBN : null;
                this.AcknowledgedAPBN = data ? data.AcknowledgedAPBN : null;
                this.BudgetedADD = data ? data.BudgetedADD : null;
                this.TransferredADD = data ? data.TransferredADD : null;
                this.AcknowledgedADD = data ? data.AcknowledgedADD : null;
                this.BudgettedTotal = data ? data.BudgettedTotal : null;
                this.TransferredTotal = data ? data.TransferredTotal : null;
                this.AcknowledgedTotal = data ? data.AcknowledgedTotal : null;
            }
            /* App.Controllers.RecapitulationController */
            Recapitulation.GetAll = function (query) {
                var res = $.ajax(Recapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Recapitulation/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new Recapitulation(model);
                    });
                });
                return res;
            };

            Recapitulation.Get = function (id) {
                var res = $.ajax(Recapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Recapitulation/Get/' + id
                })).then(function (model) {
                    return new Recapitulation(model);
                });
                return res;
            };

            Recapitulation.Count = function (query) {
                var res = $.ajax(Recapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Recapitulation/GetCount',
                    data: query
                }));
                return res;
            };
            Recapitulation.ajaxSettings = new Scaffold.AjaxSettings();
            return Recapitulation;
        })();
        Models.Recapitulation = Recapitulation;

        var Region = (function () {
            function Region(data) {
                this.ID = data ? data.ID : null;
                this.Name = data ? data.Name : null;
                this.Type = data ? data.Type : null;
                this.fkParentID = data ? data.fkParentID : null;
                this.Parent = data ? data.Parent : null;
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
                this.IsActivated = data ? data.IsActivated : null;
                this.fkProofID = data ? data.fkProofID : null;
                this.Proof = data ? data.Proof : null;
                this.fkAPBNID = data ? data.fkAPBNID : null;
                this.APBN = data ? data.APBN : null;
                this.fkSourceID = data ? data.fkSourceID : null;
                this.Source = data ? data.Source : null;
                this.fkDestinationID = data ? data.fkDestinationID : null;
                this.Destination = data ? data.Destination : null;
                this.fkActorID = data ? data.fkActorID : null;
                this.Actor = data ? data.Actor : null;
                this.fkCreatedByID = data ? data.fkCreatedByID : null;
                this.CreatedBy = data ? data.CreatedBy : null;
                this.fkTransactionFileID = data ? data.fkTransactionFileID : null;
                this.TransactionFile = data ? data.TransactionFile : null;
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

        var TransactionFile = (function () {
            function TransactionFile(data) {
                this.ID = data ? data.ID : null;
                this.FileName = data ? data.FileName : null;
                this.IsActivated = data ? data.IsActivated : null;
                this.Transactions = data ? data.Transactions : null;
                this.DateCreated = data ? data.DateCreated : null;
                this.TransactionCount = data ? data.TransactionCount : null;
                this.DesaCount = data ? data.DesaCount : null;
                this.TotalAmount = data ? data.TotalAmount : null;
            }
            /* App.Controllers.TransactionFileController */
            TransactionFile.GetAll = function (query) {
                var res = $.ajax(TransactionFile.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/TransactionFile/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new TransactionFile(model);
                    });
                });
                return res;
            };

            TransactionFile.Get = function (id) {
                var res = $.ajax(TransactionFile.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/TransactionFile/Get/' + id
                })).then(function (model) {
                    return new TransactionFile(model);
                });
                return res;
            };

            TransactionFile.Count = function (query) {
                var res = $.ajax(TransactionFile.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/TransactionFile/GetCount',
                    data: query
                }));
                return res;
            };

            TransactionFile.prototype.Save = function () {
                var _this = this;
                var isNew = this.ID == null;
                var model = this;
                var res = $.ajax(TransactionFile.ajaxSettings.build({
                    type: isNew ? 'POST' : 'PUT',
                    url: '/api/TransactionFile/' + (isNew ? 'Post' : 'Put'),
                    data: JSON.stringify(this)
                })).then(function (id) {
                    if (isNew) {
                        _this.ID = id;
                    }
                });
                return res;
            };

            TransactionFile.prototype.Delete = function () {
                var res = $.ajax(TransactionFile.ajaxSettings.build({
                    type: 'DELETE',
                    url: '/api/TransactionFile/Delete/' + this.ID
                }));
                return res;
            };

            TransactionFile.Delete = function (id) {
                var res = $.ajax(TransactionFile.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/TransactionFile/Delete/' + id
                }));
                return res;
            };
            TransactionFile.ajaxSettings = new Scaffold.AjaxSettings();
            return TransactionFile;
        })();
        Models.TransactionFile = TransactionFile;
    })(App.Models || (App.Models = {}));
    var Models = App.Models;
})(App || (App = {}));
//# sourceMappingURL=Models.js.map
