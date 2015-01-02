// WARNING: T4 generated file  (it is related to CodeToServerProxy)
//
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
        var BaseAccountRecapitulation = (function () {
            function BaseAccountRecapitulation(data) {
                this.ID = data ? data.ID : null;
                this.RegionID = data ? data.RegionID : null;
                this.APBNID = data ? data.APBNID : null;
                this.APBNYear = data ? data.APBNYear : null;
                this.ParentRegionID = data ? data.ParentRegionID : null;
                this.RegionName = data ? data.RegionName : null;
                this.BudgetedIncome = data ? data.BudgetedIncome : null;
                this.RealizedIncome = data ? data.RealizedIncome : null;
                this.BudgetedExpense = data ? data.BudgetedExpense : null;
                this.RealizedExpense = data ? data.RealizedExpense : null;
                this.EmployeeExpense = data ? data.EmployeeExpense : null;
                this.GoodsAndServicesExpense = data ? data.GoodsAndServicesExpense : null;
                this.CapitalExpense = data ? data.CapitalExpense : null;
                this.OthersExpense = data ? data.OthersExpense : null;
                this.TotalVillage = data ? data.TotalVillage : null;
                this.AccountCompletedVillage = data ? data.AccountCompletedVillage : null;
            }
            BaseAccountRecapitulation.ajaxSettings = new Scaffold.AjaxSettings();
            return BaseAccountRecapitulation;
        })();
        Models.BaseAccountRecapitulation = BaseAccountRecapitulation;

        var BaseEntity = (function () {
            function BaseEntity(data) {
                this.ID = data ? data.ID : null;
                this.DateCreated = data ? data.DateCreated : null;
                this.DateModified = data ? data.DateModified : null;
            }
            BaseEntity.ajaxSettings = new Scaffold.AjaxSettings();
            return BaseEntity;
        })();
        Models.BaseEntity = BaseEntity;

        var BaseTransferRecapitulation = (function () {
            function BaseTransferRecapitulation(data) {
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
                this.BudgetedTotal = data ? data.BudgetedTotal : null;
                this.TransferredTotal = data ? data.TransferredTotal : null;
                this.AcknowledgedTotal = data ? data.AcknowledgedTotal : null;
            }
            BaseTransferRecapitulation.ajaxSettings = new Scaffold.AjaxSettings();
            return BaseTransferRecapitulation;
        })();
        Models.BaseTransferRecapitulation = BaseTransferRecapitulation;

        var Account = (function (_super) {
            __extends(Account, _super);
            function Account(data) {
                _super.call(this, data);
                this.Code = data ? data.Code : null;
                this.Name = data ? data.Name : null;
                this.Type = data ? data.Type : null;
                this.ExpenseType = data ? data.ExpenseType : null;
                this.ExpenseGroup = data ? data.ExpenseGroup : null;
                this.Target = data ? data.Target : null;
                this.IsActivated = data ? data.IsActivated : null;
                this.DateDeactivated = data ? data.DateDeactivated : null;
                this.TargetSource = data ? data.TargetSource : null;
                this.fkParentAccountID = data ? data.fkParentAccountID : null;
                this.ParentAccount = data ? data.ParentAccount : null;
                this.ChildAccounts = data ? data.ChildAccounts : null;
                this.fkAPBDesID = data ? data.fkAPBDesID : null;
                this.APBDes = data ? data.APBDes : null;
                this.fkCreatedByID = data ? data.fkCreatedByID : null;
                this.CreatedBy = data ? data.CreatedBy : null;
                this.fkModifiedByID = data ? data.fkModifiedByID : null;
                this.ModifiedBy = data ? data.ModifiedBy : null;
                this.fkDeactivatedByID = data ? data.fkDeactivatedByID : null;
                this.DeactivatedBy = data ? data.DeactivatedBy : null;
                this.ParentCode = data ? data.ParentCode : null;
            }
            Account.ajaxSettings = new Scaffold.AjaxSettings();
            return Account;
        })(BaseEntity);
        Models.Account = Account;

        var AccountRecapitulation = (function (_super) {
            __extends(AccountRecapitulation, _super);
            function AccountRecapitulation(data) {
                _super.call(this, data);
            }
            /* App.Controllers.AccountRecapitulationController */
            AccountRecapitulation.GetAll = function (query) {
                var res = $.ajax(AccountRecapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/AccountRecapitulation/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new AccountRecapitulation(model);
                    });
                });
                return res;
            };

            AccountRecapitulation.Get = function (id) {
                var res = $.ajax(AccountRecapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/AccountRecapitulation/Get/' + id
                })).then(function (model) {
                    return new AccountRecapitulation(model);
                });
                return res;
            };

            AccountRecapitulation.Count = function (query) {
                var res = $.ajax(AccountRecapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/AccountRecapitulation/GetCount',
                    data: query
                }));
                return res;
            };
            AccountRecapitulation.ajaxSettings = new Scaffold.AjaxSettings();
            return AccountRecapitulation;
        })(BaseAccountRecapitulation);
        Models.AccountRecapitulation = AccountRecapitulation;

        var FrozenAccountRecapitulation = (function (_super) {
            __extends(FrozenAccountRecapitulation, _super);
            function FrozenAccountRecapitulation(data) {
                _super.call(this, data);
            }
            /* App.Controllers.FrozenAccountRecapitulationController */
            FrozenAccountRecapitulation.GetAll = function (query) {
                var res = $.ajax(FrozenAccountRecapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/FrozenAccountRecapitulation/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new FrozenAccountRecapitulation(model);
                    });
                });
                return res;
            };

            FrozenAccountRecapitulation.Get = function (id) {
                var res = $.ajax(FrozenAccountRecapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/FrozenAccountRecapitulation/Get/' + id
                })).then(function (model) {
                    return new FrozenAccountRecapitulation(model);
                });
                return res;
            };

            FrozenAccountRecapitulation.Count = function (query) {
                var res = $.ajax(FrozenAccountRecapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/FrozenAccountRecapitulation/GetCount',
                    data: query
                }));
                return res;
            };
            FrozenAccountRecapitulation.ajaxSettings = new Scaffold.AjaxSettings();
            return FrozenAccountRecapitulation;
        })(BaseAccountRecapitulation);
        Models.FrozenAccountRecapitulation = FrozenAccountRecapitulation;

        var APBD = (function (_super) {
            __extends(APBD, _super);
            function APBD(data) {
                _super.call(this, data);
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
        })(BaseEntity);
        Models.APBD = APBD;

        var APBDes = (function (_super) {
            __extends(APBDes, _super);
            function APBDes(data) {
                _super.call(this, data);
                this.IsActivated = data ? data.IsActivated : null;
                this.IsCompleted = data ? data.IsCompleted : null;
                this.DateCompleted = data ? data.DateCompleted : null;
                this.SourceURL = data ? data.SourceURL : null;
                this.fkSourceFileID = data ? data.fkSourceFileID : null;
                this.SourceFile = data ? data.SourceFile : null;
                this.fkAPBNID = data ? data.fkAPBNID : null;
                this.APBN = data ? data.APBN : null;
                this.fkRegionID = data ? data.fkRegionID : null;
                this.Region = data ? data.Region : null;
                this.Accounts = data ? data.Accounts : null;
                this.fkCompletedByID = data ? data.fkCompletedByID : null;
                this.CompletedBy = data ? data.CompletedBy : null;
                this.fkModifiedByID = data ? data.fkModifiedByID : null;
                this.ModifiedBy = data ? data.ModifiedBy : null;
            }
            /* App.Controllers.APBDesController */
            APBDes.GetAll = function (query) {
                var res = $.ajax(APBDes.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/APBDes/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new APBDes(model);
                    });
                });
                return res;
            };

            APBDes.Get = function (id) {
                var res = $.ajax(APBDes.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/APBDes/Get/' + id
                })).then(function (model) {
                    return new APBDes(model);
                });
                return res;
            };

            APBDes.Count = function (query) {
                var res = $.ajax(APBDes.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/APBDes/GetCount',
                    data: query
                }));
                return res;
            };

            APBDes.UpdateSources = function () {
                var res = $.ajax(APBDes.ajaxSettings.build({
                    type: 'POST',
                    url: '/api/APBDes/UpdateSources'
                }));
                return res;
            };

            APBDes.Complete = function (apbdesID) {
                var res = $.ajax(APBDes.ajaxSettings.build({
                    type: 'POST',
                    url: '/api/APBDes/Complete?apbdesID=' + apbdesID + ''
                }));
                return res;
            };

            APBDes.AddAccounts = function (apbdesID, rootAccountID, accounts) {
                var res = $.ajax(APBDes.ajaxSettings.build({
                    type: 'POST',
                    url: '/api/APBDes/AddAccounts?apbdesID=' + apbdesID + '&rootAccountID=' + rootAccountID + '',
                    data: JSON.stringify(accounts)
                }));
                return res;
            };

            APBDes.GetByRegionID = function (regionID) {
                var res = $.ajax(APBDes.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/APBDes/GetByRegionID?regionID=' + regionID + ''
                }));
                return res;
            };
            APBDes.ajaxSettings = new Scaffold.AjaxSettings();
            return APBDes;
        })(BaseEntity);
        Models.APBDes = APBDes;

        var APBDFile = (function (_super) {
            __extends(APBDFile, _super);
            function APBDFile(data) {
                _super.call(this, data);
                this.FileName = data ? data.FileName : null;
                this.IsActivated = data ? data.IsActivated : null;
                this.APBDs = data ? data.APBDs : null;
                this.fkFileID = data ? data.fkFileID : null;
                this.File = data ? data.File : null;
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

            APBDFile.PostFile = function () {
                var res = $.ajax(APBDFile.ajaxSettings.build({
                    type: 'POST',
                    url: '/api/APBDFile/PostFile'
                }));
                return res;
            };
            APBDFile.ajaxSettings = new Scaffold.AjaxSettings();
            return APBDFile;
        })(BaseEntity);
        Models.APBDFile = APBDFile;

        var APBN = (function (_super) {
            __extends(APBN, _super);
            function APBN(data) {
                _super.call(this, data);
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
        })(BaseEntity);
        Models.APBN = APBN;

        var Blob = (function (_super) {
            __extends(Blob, _super);
            function Blob(data) {
                _super.call(this, data);
                this.Name = data ? data.Name : null;
                this.Type = data ? data.Type : null;
                this.Size = data ? data.Size : null;
                this.RelativeFileName = data ? data.RelativeFileName : null;
                this.FilePath = data ? data.FilePath : null;
            }
            /* App.Controllers.BlobController */
            Blob.GetAll = function (query) {
                var res = $.ajax(Blob.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Blob/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new Blob(model);
                    });
                });
                return res;
            };

            Blob.Get = function (id) {
                var res = $.ajax(Blob.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Blob/Get/' + id
                })).then(function (model) {
                    return new Blob(model);
                });
                return res;
            };

            Blob.Count = function (query) {
                var res = $.ajax(Blob.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Blob/GetCount',
                    data: query
                }));
                return res;
            };

            Blob.Download = function (blobID) {
                var res = $.ajax(Blob.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Blob/Download?blobID=' + blobID + ''
                }));
                return res;
            };
            Blob.ajaxSettings = new Scaffold.AjaxSettings();
            return Blob;
        })(BaseEntity);
        Models.Blob = Blob;

        var FieldReport = (function (_super) {
            __extends(FieldReport, _super);
            function FieldReport(data) {
                _super.call(this, data);
                this.Notes = data ? data.Notes : null;
                this.Date = data ? data.Date : null;
                this.IsActivated = data ? data.IsActivated : null;
                this.fkRealizationID = data ? data.fkRealizationID : null;
                this.Realization = data ? data.Realization : null;
                this.Pictures = data ? data.Pictures : null;
                this.fkCreatedByID = data ? data.fkCreatedByID : null;
                this.CreatedBy = data ? data.CreatedBy : null;
            }
            /* App.Controllers.FieldReportController */
            FieldReport.GetAll = function (query) {
                var res = $.ajax(FieldReport.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/FieldReport/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new FieldReport(model);
                    });
                });
                return res;
            };

            FieldReport.Get = function (id) {
                var res = $.ajax(FieldReport.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/FieldReport/Get/' + id
                })).then(function (model) {
                    return new FieldReport(model);
                });
                return res;
            };

            FieldReport.Count = function (query) {
                var res = $.ajax(FieldReport.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/FieldReport/GetCount',
                    data: query
                }));
                return res;
            };

            FieldReport.AddFieldReport = function () {
                var res = $.ajax(FieldReport.ajaxSettings.build({
                    type: 'POST',
                    url: '/api/FieldReport/AddFieldReport'
                }));
                return res;
            };
            FieldReport.ajaxSettings = new Scaffold.AjaxSettings();
            return FieldReport;
        })(BaseEntity);
        Models.FieldReport = FieldReport;

        var Realization = (function (_super) {
            __extends(Realization, _super);
            function Realization(data) {
                _super.call(this, data);
                this.Description = data ? data.Description : null;
                this.Vendor = data ? data.Vendor : null;
                this.Sector = data ? data.Sector : null;
                this.fkTransactionID = data ? data.fkTransactionID : null;
                this.Transaction = data ? data.Transaction : null;
                this.fkCreatedByID = data ? data.fkCreatedByID : null;
                this.CreatedBy = data ? data.CreatedBy : null;
            }
            /* App.Controllers.RealizationController */
            Realization.GetAll = function (query) {
                var res = $.ajax(Realization.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Realization/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new Realization(model);
                    });
                });
                return res;
            };

            Realization.Get = function (id) {
                var res = $.ajax(Realization.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Realization/Get/' + id
                })).then(function (model) {
                    return new Realization(model);
                });
                return res;
            };

            Realization.Count = function (query) {
                var res = $.ajax(Realization.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Realization/GetCount',
                    data: query
                }));
                return res;
            };
            Realization.ajaxSettings = new Scaffold.AjaxSettings();
            return Realization;
        })(BaseEntity);
        Models.Realization = Realization;

        var Region = (function (_super) {
            __extends(Region, _super);
            function Region(data) {
                _super.call(this, data);
                this.ID = data ? data.ID : null;
                this.Name = data ? data.Name : null;
                this.Type = data ? data.Type : null;
                this.IsKelurahan = data ? data.IsKelurahan : null;
                this.Website = data ? data.Website : null;
                this.UrlKey = data ? data.UrlKey : null;
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

            Region.GetByURLKey = function (urlKey) {
                var res = $.ajax(Region.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Region/GetByURLKey?urlKey=' + encodeURI(urlKey) + ''
                }));
                return res;
            };
            Region.ajaxSettings = new Scaffold.AjaxSettings();
            return Region;
        })(BaseEntity);
        Models.Region = Region;

        var BaseTransaction = (function (_super) {
            __extends(BaseTransaction, _super);
            function BaseTransaction(data) {
                _super.call(this, data);
                this.Amount = data ? data.Amount : null;
                this.Date = data ? data.Date : null;
                this.IsActivated = data ? data.IsActivated : null;
                this.SourceURL = data ? data.SourceURL : null;
                this.fkSourceFileID = data ? data.fkSourceFileID : null;
                this.SourceFile = data ? data.SourceFile : null;
                this.fkAPBNID = data ? data.fkAPBNID : null;
                this.APBN = data ? data.APBN : null;
                this.fkSourceID = data ? data.fkSourceID : null;
                this.Source = data ? data.Source : null;
                this.fkDestinationID = data ? data.fkDestinationID : null;
                this.Destination = data ? data.Destination : null;
                this.fkAccountID = data ? data.fkAccountID : null;
                this.Account = data ? data.Account : null;
                this.fkActorID = data ? data.fkActorID : null;
                this.Actor = data ? data.Actor : null;
                this.fkCreatedByID = data ? data.fkCreatedByID : null;
                this.CreatedBy = data ? data.CreatedBy : null;
                this.fkTransactionFileID = data ? data.fkTransactionFileID : null;
                this.TransactionFile = data ? data.TransactionFile : null;
            }
            BaseTransaction.ajaxSettings = new Scaffold.AjaxSettings();
            return BaseTransaction;
        })(BaseEntity);
        Models.BaseTransaction = BaseTransaction;

        var Transaction = (function (_super) {
            __extends(Transaction, _super);
            function Transaction(data) {
                _super.call(this, data);
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

            Transaction.AddTransferTransaction = function () {
                var res = $.ajax(Transaction.ajaxSettings.build({
                    type: 'POST',
                    url: '/api/Transaction/AddTransferTransaction'
                }));
                return res;
            };

            Transaction.GetTransferTransactions = function (regionID) {
                var res = $.ajax(Transaction.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Transaction/GetTransferTransactions?regionID=' + regionID + ''
                }));
                return res;
            };

            Transaction.AddAccountTransaction = function (transaction, realization) {
                var res = $.ajax(Transaction.ajaxSettings.build({
                    type: 'POST',
                    url: '/api/Transaction/AddAccountTransaction?transaction=' + transaction + '&realization=' + realization + ''
                }));
                return res;
            };

            Transaction.GetRealizationTransactions = function (accountID) {
                var res = $.ajax(Transaction.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/Transaction/GetRealizationTransactions?accountID=' + accountID + ''
                }));
                return res;
            };
            Transaction.ajaxSettings = new Scaffold.AjaxSettings();
            return Transaction;
        })(BaseTransaction);
        Models.Transaction = Transaction;

        var FrozenTransaction = (function (_super) {
            __extends(FrozenTransaction, _super);
            function FrozenTransaction(data) {
                _super.call(this, data);
            }
            FrozenTransaction.ajaxSettings = new Scaffold.AjaxSettings();
            return FrozenTransaction;
        })(BaseTransaction);
        Models.FrozenTransaction = FrozenTransaction;

        var TransactionFile = (function (_super) {
            __extends(TransactionFile, _super);
            function TransactionFile(data) {
                _super.call(this, data);
                this.FileName = data ? data.FileName : null;
                this.IsActivated = data ? data.IsActivated : null;
                this.Transactions = data ? data.Transactions : null;
                this.fkFileID = data ? data.fkFileID : null;
                this.File = data ? data.File : null;
                this.TransactionCount = data ? data.TransactionCount : null;
                this.DesaCount = data ? data.DesaCount : null;
                this.TotalAmount = data ? data.TotalAmount : null;
            }
            TransactionFile.ajaxSettings = new Scaffold.AjaxSettings();
            return TransactionFile;
        })(BaseEntity);
        Models.TransactionFile = TransactionFile;

        var TransferRecapitulation = (function (_super) {
            __extends(TransferRecapitulation, _super);
            function TransferRecapitulation(data) {
                _super.call(this, data);
            }
            /* App.Controllers.TransferRecapitulationController */
            TransferRecapitulation.GetAll = function (query) {
                var res = $.ajax(TransferRecapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/TransferRecapitulation/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new TransferRecapitulation(model);
                    });
                });
                return res;
            };

            TransferRecapitulation.Get = function (id) {
                var res = $.ajax(TransferRecapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/TransferRecapitulation/Get/' + id
                })).then(function (model) {
                    return new TransferRecapitulation(model);
                });
                return res;
            };

            TransferRecapitulation.Count = function (query) {
                var res = $.ajax(TransferRecapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/TransferRecapitulation/GetCount',
                    data: query
                }));
                return res;
            };
            TransferRecapitulation.ajaxSettings = new Scaffold.AjaxSettings();
            return TransferRecapitulation;
        })(BaseTransferRecapitulation);
        Models.TransferRecapitulation = TransferRecapitulation;

        var FrozenTransferRecapitulation = (function (_super) {
            __extends(FrozenTransferRecapitulation, _super);
            function FrozenTransferRecapitulation(data) {
                _super.call(this, data);
            }
            /* App.Controllers.FrozenTransferRecapitulationController */
            FrozenTransferRecapitulation.GetAll = function (query) {
                var res = $.ajax(FrozenTransferRecapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/FrozenTransferRecapitulation/GetAll',
                    data: query
                })).then(function (models) {
                    return models.map(function (model) {
                        return new FrozenTransferRecapitulation(model);
                    });
                });
                return res;
            };

            FrozenTransferRecapitulation.Get = function (id) {
                var res = $.ajax(FrozenTransferRecapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/FrozenTransferRecapitulation/Get/' + id
                })).then(function (model) {
                    return new FrozenTransferRecapitulation(model);
                });
                return res;
            };

            FrozenTransferRecapitulation.Count = function (query) {
                var res = $.ajax(FrozenTransferRecapitulation.ajaxSettings.build({
                    type: 'GET',
                    url: '/api/FrozenTransferRecapitulation/GetCount',
                    data: query
                }));
                return res;
            };
            FrozenTransferRecapitulation.ajaxSettings = new Scaffold.AjaxSettings();
            return FrozenTransferRecapitulation;
        })(BaseTransferRecapitulation);
        Models.FrozenTransferRecapitulation = FrozenTransferRecapitulation;

        var UserScope = (function (_super) {
            __extends(UserScope, _super);
            function UserScope(data) {
                _super.call(this, data);
                this.fkUserID = data ? data.fkUserID : null;
                this.User = data ? data.User : null;
                this.fkRegionID = data ? data.fkRegionID : null;
                this.Region = data ? data.Region : null;
            }
            UserScope.ajaxSettings = new Scaffold.AjaxSettings();
            return UserScope;
        })(BaseEntity);
        Models.UserScope = UserScope;
    })(App.Models || (App.Models = {}));
    var Models = App.Models;
})(App || (App = {}));
//# sourceMappingURL=Models.js.map
