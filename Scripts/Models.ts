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

    export interface IRegion {
        ID: number;
        Name: string;
        Type: /** App.Models.RegionType **/ any;
        ParentID: number;
        Parent: App.Models.IRegion;
        Children: Array<App.Models.IRegion>;
    }

    export class Region {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        Name: string;
        Type: /** App.Models.RegionType **/ any;
        ParentID: number;
        Parent: App.Models.IRegion;
        Children: Array<App.Models.IRegion>;
        constructor(data?: IRegion) {
            this.ID = data ? data.ID : null;
            this.Name = data ? data.Name : null;
            this.Type = data ? data.Type : null;
            this.ParentID = data ? data.ParentID : null;
            this.Parent = data ? data.Parent : null;
            this.Children = data ? data.Children : null;
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
        ProofID: number;
        SourceID: number;
        DestinationID: number;
        Proof: App.Models.IBlob;
        Source: App.Models.IRegion;
        Destination: App.Models.IRegion;
    }

    export class Transaction {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        ID: number;
        Amount: number;
        Date: /** System.DateTime **/ any;
        ProofID: number;
        SourceID: number;
        DestinationID: number;
        Proof: App.Models.IBlob;
        Source: App.Models.IRegion;
        Destination: App.Models.IRegion;
        constructor(data?: ITransaction) {
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

}
