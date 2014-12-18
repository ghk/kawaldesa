// WARNING: T4 generated file  (it is related to CodeToServerProxy)
//

/// <reference path="../Scaffold/Scripts/typings/jquery/jquery.d.ts"/>

module Scaffold {
    export class AjaxSettings {
        async = true;
        cache = false;
        timeout = -1;

        public build(settings: JQueryAjaxSettings): JQueryAjaxSettings{
            return {
                async: this.async,
                cache: this.cache,
                timeout: this.timeout,
                dataType: 'json',
				contentType: 'application/json',
			    type: settings.type,
			    url: settings.url,
                data: settings.data
            }
        }

    }

	export interface IQuery {
		PageLength?: number;
		PageBegin?: number;
		SortField?: string;
		SortOrder: string;
	}
}

module App.Models {
	import IQuery = Scaffold.IQuery;
    export interface IAPBD {
        ID: number;
        DAU: number;
        DBH: number;
        IsCommited: boolean;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkRegionID: number;
        Region: App.Models.IRegion;
        fkAPBDFileID: number;
        APBDFile: App.Models.IAPBDFile;
    }

    export class APBD {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        DAU: number;
        DBH: number;
        IsCommited: boolean;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkRegionID: number;
        Region: App.Models.IRegion;
        fkAPBDFileID: number;
        APBDFile: App.Models.IAPBDFile;
        constructor(data?: IAPBD) {
            this.ID = data ? data.ID : null;
            this.DAU = data ? data.DAU : null;
            this.DBH = data ? data.DBH : null;
            this.IsCommited = data ? data.IsCommited : null;
            this.fkAPBNID = data ? data.fkAPBNID : null;
            this.APBN = data ? data.APBN : null;
            this.fkRegionID = data ? data.fkRegionID : null;
            this.Region = data ? data.Region : null;
            this.fkAPBDFileID = data ? data.fkAPBDFileID : null;
            this.APBDFile = data ? data.APBDFile : null;
        }

    }

    export interface IAPBDFile {
        ID: number;
        FileName: string;
        IsCommited: boolean;
        APBDs: Array<App.Models.IAPBD>;
    }

    export class APBDFile {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        FileName: string;
        IsCommited: boolean;
        APBDs: Array<App.Models.IAPBD>;
        constructor(data?: IAPBDFile) {
            this.ID = data ? data.ID : null;
            this.FileName = data ? data.FileName : null;
            this.IsCommited = data ? data.IsCommited : null;
            this.APBDs = data ? data.APBDs : null;
        }

    }

    export interface IAPBN {
        ID: number;
        DanaPerDesa: number;
        Year: number;
    }

    export class APBN {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        DanaPerDesa: number;
        Year: number;
        constructor(data?: IAPBN) {
            this.ID = data ? data.ID : null;
            this.DanaPerDesa = data ? data.DanaPerDesa : null;
            this.Year = data ? data.Year : null;
        }

    }

    export interface IBlob {
        ID: number;
        Name: string;
        Type: string;
        Path: string;
        Size: number;
    }

    export class Blob {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        Name: string;
        Type: string;
        Path: string;
        Size: number;
        constructor(data?: IBlob) {
            this.ID = data ? data.ID : null;
            this.Name = data ? data.Name : null;
            this.Type = data ? data.Type : null;
            this.Path = data ? data.Path : null;
            this.Size = data ? data.Size : null;
        }

    }

    export interface IRecapitulation {
        ID: number;
        RegionID: number;
        APBNID: number;
        APBNYear: number;
        ParentRegionID: number;
        RegionName: string;
        BudgetedAPBN: number;
        TransferredAPBN: number;
        AcknowledgedAPBN: number;
        BudgetedADD: number;
        TransferredADD: number;
        AcknowledgedADD: number;
        BudgettedTotal: number;
        TransferredTotal: number;
        AcknowledgedTotal: number;
    }

    export class Recapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        RegionID: number;
        APBNID: number;
        APBNYear: number;
        ParentRegionID: number;
        RegionName: string;
        BudgetedAPBN: number;
        TransferredAPBN: number;
        AcknowledgedAPBN: number;
        BudgetedADD: number;
        TransferredADD: number;
        AcknowledgedADD: number;
        BudgettedTotal: number;
        TransferredTotal: number;
        AcknowledgedTotal: number;
        constructor(data?: IRecapitulation) {
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

        static GetAll(query?: IQuery): JQueryPromise<Array<Recapitulation>> {
            var res = $.ajax(Recapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/Recapitulation/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new Recapitulation(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<Recapitulation> {
            var res = $.ajax(Recapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/Recapitulation/Get/'+id,
            })).then((model) => new Recapitulation(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(Recapitulation.ajaxSettings.build({
                type: 'GET',
                url: '/api/Recapitulation/GetCount',
				data: query,
            }));
            return res;
        }

                
    }

    export interface IRegion {
        ID: number;
        Name: string;
        Type: /** App.Models.RegionType **/ any;
        fkParentID: number;
        Parent: App.Models.IRegion;
    }

    export class Region {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        Name: string;
        Type: /** App.Models.RegionType **/ any;
        fkParentID: number;
        Parent: App.Models.IRegion;
        constructor(data?: IRegion) {
            this.ID = data ? data.ID : null;
            this.Name = data ? data.Name : null;
            this.Type = data ? data.Type : null;
            this.fkParentID = data ? data.fkParentID : null;
            this.Parent = data ? data.Parent : null;
        }

        /* App.Controllers.RegionController */

        static GetAll(query?: IQuery): JQueryPromise<Array<Region>> {
            var res = $.ajax(Region.ajaxSettings.build({
                type: 'GET',
                url: '/api/Region/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new Region(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<Region> {
            var res = $.ajax(Region.ajaxSettings.build({
                type: 'GET',
                url: '/api/Region/Get/'+id,
            })).then((model) => new Region(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(Region.ajaxSettings.build({
                type: 'GET',
                url: '/api/Region/GetCount',
				data: query,
            }));
            return res;
        }

                
        Save(): JQueryPromise<void> {
            var isNew = this.ID == null;
            var model = this;
            var res = $.ajax(Region.ajaxSettings.build({
                type: isNew ? 'POST' : 'PUT',
                url: '/api/Region/'+(isNew ? 'Post' : 'Put'),
                data: JSON.stringify(this)
            })).then((id) => {
                if(isNew){
                    this.ID = id;
                }
            });
            return res;
        }

        Delete(): JQueryPromise<void> {
            var res = $.ajax(Region.ajaxSettings.build({
                type: 'DELETE',
                url: '/api/Region/Delete/'+this.ID,
            }));
            return res;
        }

        static Delete(id: number): JQueryPromise<void> {
            var res = $.ajax(Region.ajaxSettings.build({
                type: 'GET',
                url: '/api/Region/Delete/'+id,
            }));
            return res;
        }
                
    }

    export interface ITransaction {
        ID: number;
        Amount: number;
        Date: /** System.DateTime **/ any;
        IsCommited: boolean;
        fkProofID: number;
        Proof: App.Models.IBlob;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkSourceID: number;
        Source: App.Models.IRegion;
        fkDestinationID: number;
        Destination: App.Models.IRegion;
        fkActorID: number;
        Actor: App.Models.IRegion;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        fkTransactionFileID: number;
        TransactionFile: App.Models.ITransactionFile;
    }

    export class Transaction {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        Amount: number;
        Date: /** System.DateTime **/ any;
        IsCommited: boolean;
        fkProofID: number;
        Proof: App.Models.IBlob;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkSourceID: number;
        Source: App.Models.IRegion;
        fkDestinationID: number;
        Destination: App.Models.IRegion;
        fkActorID: number;
        Actor: App.Models.IRegion;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        fkTransactionFileID: number;
        TransactionFile: App.Models.ITransactionFile;
        constructor(data?: ITransaction) {
            this.ID = data ? data.ID : null;
            this.Amount = data ? data.Amount : null;
            this.Date = data ? data.Date : null;
            this.IsCommited = data ? data.IsCommited : null;
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

        static GetAll(query?: IQuery): JQueryPromise<Array<Transaction>> {
            var res = $.ajax(Transaction.ajaxSettings.build({
                type: 'GET',
                url: '/api/Transaction/GetAll',
				data: query,
            })).then((models) => {
                return models.map((model) => new Transaction(model));
            });
            return res;
        }

        static Get(id: number): JQueryPromise<Transaction> {
            var res = $.ajax(Transaction.ajaxSettings.build({
                type: 'GET',
                url: '/api/Transaction/Get/'+id,
            })).then((model) => new Transaction(model));
            return res;
        }

		static Count(query?: IQuery): JQueryPromise<number> {
            var res = $.ajax(Transaction.ajaxSettings.build({
                type: 'GET',
                url: '/api/Transaction/GetCount',
				data: query,
            }));
            return res;
        }

                
        Save(): JQueryPromise<void> {
            var isNew = this.ID == null;
            var model = this;
            var res = $.ajax(Transaction.ajaxSettings.build({
                type: isNew ? 'POST' : 'PUT',
                url: '/api/Transaction/'+(isNew ? 'Post' : 'Put'),
                data: JSON.stringify(this)
            })).then((id) => {
                if(isNew){
                    this.ID = id;
                }
            });
            return res;
        }

        Delete(): JQueryPromise<void> {
            var res = $.ajax(Transaction.ajaxSettings.build({
                type: 'DELETE',
                url: '/api/Transaction/Delete/'+this.ID,
            }));
            return res;
        }

        static Delete(id: number): JQueryPromise<void> {
            var res = $.ajax(Transaction.ajaxSettings.build({
                type: 'GET',
                url: '/api/Transaction/Delete/'+id,
            }));
            return res;
        }
                
    }

    export interface ITransactionFile {
        ID: number;
        FileName: string;
        IsCommited: boolean;
        Transactions: Array<App.Models.ITransaction>;
    }

    export class TransactionFile {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        FileName: string;
        IsCommited: boolean;
        Transactions: Array<App.Models.ITransaction>;
        constructor(data?: ITransactionFile) {
            this.ID = data ? data.ID : null;
            this.FileName = data ? data.FileName : null;
            this.IsCommited = data ? data.IsCommited : null;
            this.Transactions = data ? data.Transactions : null;
        }

    }

}
