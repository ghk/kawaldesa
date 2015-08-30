/// WARNING: T4 generated file 
/// <reference path="../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>

module App.Controllers.Models {
	import IQuery = Scaffold.IQuery;

    export class BaseAccountRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
	}
        
    export class AccountRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.IAccountRecapitulation = null;
        
        constructor(data?: App.Models.Views.IAccountRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.IAccountRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.IAccountRecapitulation>>(AccountRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/AccountRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.IAccountRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.IAccountRecapitulation> (AccountRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/AccountRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(AccountRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/AccountRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class FrozenAccountRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.IFrozenAccountRecapitulation = null;
        
        constructor(data?: App.Models.Views.IFrozenAccountRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.IFrozenAccountRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.IFrozenAccountRecapitulation>>(FrozenAccountRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenAccountRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.IFrozenAccountRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.IFrozenAccountRecapitulation> (FrozenAccountRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/FrozenAccountRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(FrozenAccountRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenAccountRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class ApbdesController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.IApbdes = null;
        
        constructor(data?: App.Models.IApbdes) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.IApbdes>> {
			var res = Scaffold.$http<Array<App.Models.IApbdes>>(ApbdesController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Apbdes/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: number): ng.IHttpPromise<App.Models.IApbdes> {
			var res = Scaffold.$http<App.Models.IApbdes> (ApbdesController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Apbdes/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(ApbdesController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Apbdes/GetCount',
				data: query,
			}));
			return res;
		}
	        
        static UpdateSources(multipart: Scaffold.Multipart): any  {
			var res = multipart.upload('/api/Apbdes/UpdateSources');
			   return res;
	    }
    
        static Complete(apbdesId: number): ng.IHttpPromise<void> {
			var res = Scaffold.$http<void>(ApbdesController.ajaxSettings.build({
			method: 'POST',
			url: '/api/Apbdes/Complete?apbdesId='+apbdesId+'',
				}));
			   return res;
	    }
    
        static AddAccounts(apbdesId: number, rootAccountId: number, /** [FromBody] **/accounts: Array<App.Models.IAccount>): ng.IHttpPromise<void> {
			var res = Scaffold.$http<void>(ApbdesController.ajaxSettings.build({
			method: 'POST',
			url: '/api/Apbdes/AddAccounts?apbdesId='+apbdesId+'&rootAccountId='+rootAccountId+'',
	            data: JSON.stringify(accounts),
			}));
			   return res;
	    }
    
        static GetByRegionId(regionId: string): ng.IHttpPromise<App.Models.IApbdes> {
			var res = Scaffold.$http<App.Models.IApbdes>(ApbdesController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Apbdes/GetByRegionId?regionId='+encodeURI(regionId)+'',
				}));
			   return res;
	    }
	}
    
    export class ApbnController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.IApbn = null;
        
        constructor(data?: App.Models.IApbn) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.IApbn>> {
			var res = Scaffold.$http<Array<App.Models.IApbn>>(ApbnController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Apbn/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: number): ng.IHttpPromise<App.Models.IApbn> {
			var res = Scaffold.$http<App.Models.IApbn> (ApbnController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Apbn/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(ApbnController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Apbn/GetCount',
				data: query,
			}));
			return res;
		}
		
		static Save(model: App.Models.IApbn): ng.IHttpPromise<number> {
			var isNew = model.Id == null;
            var res = Scaffold.$http<number>(ApbnController.ajaxSettings.build({
                 method: isNew ? 'POST' : 'PUT',
				 url: '/api/Apbn/'+(isNew ? 'Post' : 'Put'),
				 data: JSON.stringify(model)
            }));
            return res;
        }

		static Delete(id: number): ng.IHttpPromise<void> {
				var res = Scaffold.$http<void>(ApbnController.ajaxSettings.build({
					method: 'GET',
					url: '/api/Apbn/Delete/'+id,
				}));
				return res;
		}
		}
        
    export class BaseController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        static Post(model: /** TModel **/ any): ng.IHttpPromise</** TId **/ any> {
			var res = Scaffold.$http</** TId **/ any>(BaseController.ajaxSettings.build({
			method: 'POST',
			url: '/api/Base/Post?model='+model+'',
				}));
			   return res;
	    }
    
        static Put(model: /** TModel **/ any): ng.IHttpPromise<void> {
			var res = Scaffold.$http<void>(BaseController.ajaxSettings.build({
			method: 'PUT',
			url: '/api/Base/Put?model='+model+'',
				}));
			   return res;
	    }
    
        static Delete(id: /** TId **/ any): ng.IHttpPromise<void> {
			var res = Scaffold.$http<void>(BaseController.ajaxSettings.build({
			method: 'DELETE',
			url: '/api/Base/Delete?id='+id+'',
				}));
			   return res;
	    }
    
        static Get(id: /** TId **/ any): ng.IHttpPromise</** TModel **/ any> {
			var res = Scaffold.$http</** TModel **/ any>(BaseController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Base/Get?id='+id+'',
				}));
			   return res;
	    }
    
        static GetCount(): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(BaseController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Base/GetCount',
				}));
			   return res;
	    }
    
        static GetAll(): ng.IHttpPromise</** System.Linq.IQueryable<TModel> **/ any> {
			var res = Scaffold.$http</** System.Linq.IQueryable<TModel> **/ any>(BaseController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Base/GetAll',
				}));
			   return res;
	    }
	}
    
    export class SpreadsheetController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.ISpreadsheet = null;
        
        constructor(data?: App.Models.ISpreadsheet) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.ISpreadsheet>> {
			var res = Scaffold.$http<Array<App.Models.ISpreadsheet>>(SpreadsheetController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Spreadsheet/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: number): ng.IHttpPromise<App.Models.ISpreadsheet> {
			var res = Scaffold.$http<App.Models.ISpreadsheet> (SpreadsheetController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Spreadsheet/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(SpreadsheetController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Spreadsheet/GetCount',
				data: query,
			}));
			return res;
		}
		
		static Save(model: App.Models.ISpreadsheet): ng.IHttpPromise<number> {
			var isNew = model.Id == null;
            var res = Scaffold.$http<number>(SpreadsheetController.ajaxSettings.build({
                 method: isNew ? 'POST' : 'PUT',
				 url: '/api/Spreadsheet/'+(isNew ? 'Post' : 'Put'),
				 data: JSON.stringify(model)
            }));
            return res;
        }

		static Delete(id: number): ng.IHttpPromise<void> {
				var res = Scaffold.$http<void>(SpreadsheetController.ajaxSettings.build({
					method: 'GET',
					url: '/api/Spreadsheet/Delete/'+id,
				}));
				return res;
		}
	        
        static GetActive(type: number, regionId: string, apbnKey: string): ng.IHttpPromise<App.Models.ISpreadsheet> {
			var res = Scaffold.$http<App.Models.ISpreadsheet>(SpreadsheetController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Spreadsheet/GetActive?type='+type+'&regionId='+encodeURI(regionId)+'&apbnKey='+encodeURI(apbnKey)+'',
				}));
			   return res;
	    }
    
        static GetTemplate(type: number, regionId: string, apbnKey: string): ng.IHttpPromise</** System.Net.Http.HttpResponseMessage **/ any> {
			var res = Scaffold.$http</** System.Net.Http.HttpResponseMessage **/ any>(SpreadsheetController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Spreadsheet/GetTemplate?type='+type+'&regionId='+encodeURI(regionId)+'&apbnKey='+encodeURI(apbnKey)+'',
				}));
			   return res;
	    }
    
        static GetCurrentSheetUrl(type: App.Models.DocumentUploadType, regionId: string, apbnKey: string): ng.IHttpPromise<string> {
			var res = Scaffold.$http<string>(SpreadsheetController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Spreadsheet/GetCurrentSheetUrl?type='+type+'&regionId='+encodeURI(regionId)+'&apbnKey='+encodeURI(apbnKey)+'',
				}));
			   return res;
	    }
    
        static Upload(multipart: Scaffold.Multipart, type: number, regionId: string, apbnKey: string): any  {
			var res = multipart.upload('/api/Spreadsheet/Upload?type='+type+'&regionId='+encodeURI(regionId)+'&apbnKey='+encodeURI(apbnKey)+'');
			   return res;
	    }
    
        static GenerateDanaDesaKabs(apbnKey: string): ng.IHttpPromise<void> {
			var res = Scaffold.$http<void>(SpreadsheetController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Spreadsheet/GenerateDanaDesaKabs?apbnKey='+encodeURI(apbnKey)+'',
				}));
			   return res;
	    }
	}
    
    export class FieldReportController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.IFieldReport = null;
        
        constructor(data?: App.Models.IFieldReport) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.IFieldReport>> {
			var res = Scaffold.$http<Array<App.Models.IFieldReport>>(FieldReportController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FieldReport/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: number): ng.IHttpPromise<App.Models.IFieldReport> {
			var res = Scaffold.$http<App.Models.IFieldReport> (FieldReportController.ajaxSettings.build({
			method: 'GET',
			url: '/api/FieldReport/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(FieldReportController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FieldReport/GetCount',
				data: query,
			}));
			return res;
		}
	        
        static AddFieldReport(uploader: Scaffold.Multipart): any  {
			var res = uploader.upload('/api/FieldReport/AddFieldReport');
			   return res;
	    }
    
        static GetPicture(realizationId: number): ng.IHttpPromise</** System.Linq.IQueryable<System.Collections.Generic.List<App.Models.Blob>> **/ any> {
			var res = Scaffold.$http</** System.Linq.IQueryable<System.Collections.Generic.List<App.Models.Blob>> **/ any>(FieldReportController.ajaxSettings.build({
			method: 'GET',
			url: '/api/FieldReport/GetPicture?realizationId='+realizationId+'',
				}));
			   return res;
	    }
	}
    
    export class BaseNationalAddRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
	}
        
    export class NationalAddRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.INationalAddRecapitulation = null;
        
        constructor(data?: App.Models.Views.INationalAddRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.INationalAddRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.INationalAddRecapitulation>>(NationalAddRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/NationalAddRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.INationalAddRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.INationalAddRecapitulation> (NationalAddRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/NationalAddRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(NationalAddRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/NationalAddRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class FrozenNationalAddRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.IFrozenNationalAddRecapitulation = null;
        
        constructor(data?: App.Models.Views.IFrozenNationalAddRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.IFrozenNationalAddRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.IFrozenNationalAddRecapitulation>>(FrozenNationalAddRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenNationalAddRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.IFrozenNationalAddRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.IFrozenNationalAddRecapitulation> (FrozenNationalAddRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/FrozenNationalAddRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(FrozenNationalAddRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenNationalAddRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class BaseNationalBhprRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
	}
        
    export class NationalBhprRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.INationalBhprRecapitulation = null;
        
        constructor(data?: App.Models.Views.INationalBhprRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.INationalBhprRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.INationalBhprRecapitulation>>(NationalBhprRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/NationalBhprRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.INationalBhprRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.INationalBhprRecapitulation> (NationalBhprRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/NationalBhprRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(NationalBhprRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/NationalBhprRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class FrozenNationalBhprRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.IFrozenNationalBhprRecapitulation = null;
        
        constructor(data?: App.Models.Views.IFrozenNationalBhprRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.IFrozenNationalBhprRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.IFrozenNationalBhprRecapitulation>>(FrozenNationalBhprRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenNationalBhprRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.IFrozenNationalBhprRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.IFrozenNationalBhprRecapitulation> (FrozenNationalBhprRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/FrozenNationalBhprRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(FrozenNationalBhprRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenNationalBhprRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class BaseNationalDdRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
	}
        
    export class NationalDdRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.INationalDdRecapitulation = null;
        
        constructor(data?: App.Models.Views.INationalDdRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.INationalDdRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.INationalDdRecapitulation>>(NationalDdRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/NationalDdRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.INationalDdRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.INationalDdRecapitulation> (NationalDdRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/NationalDdRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(NationalDdRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/NationalDdRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class FrozenNationalDdRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.IFrozenNationalDdRecapitulation = null;
        
        constructor(data?: App.Models.Views.IFrozenNationalDdRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.IFrozenNationalDdRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.IFrozenNationalDdRecapitulation>>(FrozenNationalDdRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenNationalDdRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.IFrozenNationalDdRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.IFrozenNationalDdRecapitulation> (FrozenNationalDdRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/FrozenNationalDdRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(FrozenNationalDdRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenNationalDdRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class OrganizationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.IOrganization = null;
        
        constructor(data?: App.Models.IOrganization) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.IOrganization>> {
			var res = Scaffold.$http<Array<App.Models.IOrganization>>(OrganizationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Organization/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: number): ng.IHttpPromise<App.Models.IOrganization> {
			var res = Scaffold.$http<App.Models.IOrganization> (OrganizationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Organization/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(OrganizationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Organization/GetCount',
				data: query,
			}));
			return res;
		}
		
		static Save(model: App.Models.IOrganization): ng.IHttpPromise<number> {
			var isNew = model.Id == null;
            var res = Scaffold.$http<number>(OrganizationController.ajaxSettings.build({
                 method: isNew ? 'POST' : 'PUT',
				 url: '/api/Organization/'+(isNew ? 'Post' : 'Put'),
				 data: JSON.stringify(model)
            }));
            return res;
        }

		static Delete(id: number): ng.IHttpPromise<void> {
				var res = Scaffold.$http<void>(OrganizationController.ajaxSettings.build({
					method: 'GET',
					url: '/api/Organization/Delete/'+id,
				}));
				return res;
		}
	        
        static GetByURLKey(urlKey: string): ng.IHttpPromise<App.Models.IOrganization> {
			var res = Scaffold.$http<App.Models.IOrganization>(OrganizationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Organization/GetByURLKey?urlKey='+encodeURI(urlKey)+'',
				}));
			   return res;
	    }
    
        static AddOrgAdmin(id: number, email: string): ng.IHttpPromise<App.Models.IUserViewModel> {
			var res = Scaffold.$http<App.Models.IUserViewModel>(OrganizationController.ajaxSettings.build({
			method: 'POST',
			url: '/api/Organization/AddOrgAdmin?id='+id+'&email='+encodeURI(email)+'',
				}));
			   return res;
	    }
    
        static AddOrgVolunteer(id: number, email: string): ng.IHttpPromise<App.Models.IUserViewModel> {
			var res = Scaffold.$http<App.Models.IUserViewModel>(OrganizationController.ajaxSettings.build({
			method: 'POST',
			url: '/api/Organization/AddOrgVolunteer?id='+id+'&email='+encodeURI(email)+'',
				}));
			   return res;
	    }
    
        static Update(multipart: Scaffold.Multipart): any  {
			var res = multipart.upload('/api/Organization/Update');
			   return res;
	    }
	}
    
    export class RealizationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.IRealization = null;
        
        constructor(data?: App.Models.IRealization) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.IRealization>> {
			var res = Scaffold.$http<Array<App.Models.IRealization>>(RealizationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Realization/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: number): ng.IHttpPromise<App.Models.IRealization> {
			var res = Scaffold.$http<App.Models.IRealization> (RealizationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Realization/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(RealizationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Realization/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class BaseRegionalAddRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
	}
        
    export class RegionalAddRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.IRegionalAddRecapitulation = null;
        
        constructor(data?: App.Models.Views.IRegionalAddRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.IRegionalAddRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.IRegionalAddRecapitulation>>(RegionalAddRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/RegionalAddRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.IRegionalAddRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.IRegionalAddRecapitulation> (RegionalAddRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/RegionalAddRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(RegionalAddRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/RegionalAddRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class FrozenRegionalAddRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.IFrozenRegionalAddRecapitulation = null;
        
        constructor(data?: App.Models.Views.IFrozenRegionalAddRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.IFrozenRegionalAddRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.IFrozenRegionalAddRecapitulation>>(FrozenRegionalAddRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenRegionalAddRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.IFrozenRegionalAddRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.IFrozenRegionalAddRecapitulation> (FrozenRegionalAddRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/FrozenRegionalAddRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(FrozenRegionalAddRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenRegionalAddRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class BaseRegionalBhprRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
	}
        
    export class RegionalBhprRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.IRegionalBhprRecapitulation = null;
        
        constructor(data?: App.Models.Views.IRegionalBhprRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.IRegionalBhprRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.IRegionalBhprRecapitulation>>(RegionalBhprRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/RegionalBhprRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.IRegionalBhprRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.IRegionalBhprRecapitulation> (RegionalBhprRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/RegionalBhprRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(RegionalBhprRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/RegionalBhprRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class FrozenRegionalBhprRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.IFrozenRegionalBhprRecapitulation = null;
        
        constructor(data?: App.Models.Views.IFrozenRegionalBhprRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.IFrozenRegionalBhprRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.IFrozenRegionalBhprRecapitulation>>(FrozenRegionalBhprRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenRegionalBhprRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.IFrozenRegionalBhprRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.IFrozenRegionalBhprRecapitulation> (FrozenRegionalBhprRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/FrozenRegionalBhprRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(FrozenRegionalBhprRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenRegionalBhprRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class BaseRegionalDdRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
	}
        
    export class RegionalDdRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.IRegionalDdRecapitulation = null;
        
        constructor(data?: App.Models.Views.IRegionalDdRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.IRegionalDdRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.IRegionalDdRecapitulation>>(RegionalDdRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/RegionalDdRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.IRegionalDdRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.IRegionalDdRecapitulation> (RegionalDdRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/RegionalDdRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(RegionalDdRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/RegionalDdRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class FrozenRegionalDdRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.IFrozenRegionalDdRecapitulation = null;
        
        constructor(data?: App.Models.Views.IFrozenRegionalDdRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.IFrozenRegionalDdRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.IFrozenRegionalDdRecapitulation>>(FrozenRegionalDdRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenRegionalDdRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.IFrozenRegionalDdRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.IFrozenRegionalDdRecapitulation> (FrozenRegionalDdRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/FrozenRegionalDdRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(FrozenRegionalDdRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenRegionalDdRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class RegionController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.IRegion = null;
        
        constructor(data?: App.Models.IRegion) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.IRegion>> {
			var res = Scaffold.$http<Array<App.Models.IRegion>>(RegionController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Region/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.IRegion> {
			var res = Scaffold.$http<App.Models.IRegion> (RegionController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Region/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(RegionController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Region/GetCount',
				data: query,
			}));
			return res;
		}
	        
        static GetByURLKey(urlKey: string): ng.IHttpPromise<App.Models.IRegion> {
			var res = Scaffold.$http<App.Models.IRegion>(RegionController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Region/GetByURLKey?urlKey='+encodeURI(urlKey)+'',
				}));
			   return res;
	    }
    
        static UpdateWebsite(regionId: string, regionWebsite: string): ng.IHttpPromise<void> {
			var res = Scaffold.$http<void>(RegionController.ajaxSettings.build({
			method: 'POST',
			url: '/api/Region/UpdateWebsite?regionId='+encodeURI(regionId)+'&regionWebsite='+encodeURI(regionWebsite)+'',
				}));
			   return res;
	    }
	}
    
    export class RegionSearchResultController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.IRegionSearchResult = null;
        
        constructor(data?: App.Models.IRegionSearchResult) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.IRegionSearchResult>> {
			var res = Scaffold.$http<Array<App.Models.IRegionSearchResult>>(RegionSearchResultController.ajaxSettings.build({
				method: 'GET',
				url: '/api/RegionSearchResult/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.IRegionSearchResult> {
			var res = Scaffold.$http<App.Models.IRegionSearchResult> (RegionSearchResultController.ajaxSettings.build({
			method: 'GET',
			url: '/api/RegionSearchResult/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(RegionSearchResultController.ajaxSettings.build({
				method: 'GET',
				url: '/api/RegionSearchResult/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class SourceDocumentController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.ISourceDocument = null;
        
        constructor(data?: App.Models.ISourceDocument) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.ISourceDocument>> {
			var res = Scaffold.$http<Array<App.Models.ISourceDocument>>(SourceDocumentController.ajaxSettings.build({
				method: 'GET',
				url: '/api/SourceDocument/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: number): ng.IHttpPromise<App.Models.ISourceDocument> {
			var res = Scaffold.$http<App.Models.ISourceDocument> (SourceDocumentController.ajaxSettings.build({
			method: 'GET',
			url: '/api/SourceDocument/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(SourceDocumentController.ajaxSettings.build({
				method: 'GET',
				url: '/api/SourceDocument/GetCount',
				data: query,
			}));
			return res;
		}
		
		static Save(model: App.Models.ISourceDocument): ng.IHttpPromise<number> {
			var isNew = model.Id == null;
            var res = Scaffold.$http<number>(SourceDocumentController.ajaxSettings.build({
                 method: isNew ? 'POST' : 'PUT',
				 url: '/api/SourceDocument/'+(isNew ? 'Post' : 'Put'),
				 data: JSON.stringify(model)
            }));
            return res;
        }

		static Delete(id: number): ng.IHttpPromise<void> {
				var res = Scaffold.$http<void>(SourceDocumentController.ajaxSettings.build({
					method: 'GET',
					url: '/api/SourceDocument/Delete/'+id,
				}));
				return res;
		}
	        
        static Upload(multipart: Scaffold.Multipart, type: App.Models.DocumentUploadType, fn: App.Models.SourceDocumentFunction, regionId: string, apbnKey: string): any  {
			var res = multipart.upload('/api/SourceDocument/Upload?type='+type+'&fn='+fn+'&regionId='+encodeURI(regionId)+'&apbnKey='+encodeURI(apbnKey)+'');
			   return res;
	    }
	}
    
    export class TransactionController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.ITransaction = null;
        
        constructor(data?: App.Models.ITransaction) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.ITransaction>> {
			var res = Scaffold.$http<Array<App.Models.ITransaction>>(TransactionController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Transaction/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: number): ng.IHttpPromise<App.Models.ITransaction> {
			var res = Scaffold.$http<App.Models.ITransaction> (TransactionController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Transaction/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(TransactionController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Transaction/GetCount',
				data: query,
			}));
			return res;
		}
	        
        static AddTransferTransaction(multipart: Scaffold.Multipart): any  {
			var res = multipart.upload('/api/Transaction/AddTransferTransaction');
			   return res;
	    }
    
        static GetTransferTransactions(regionId: string): ng.IHttpPromise<Array</** App.Controllers.Models.TransferTransactionRow **/ any>> {
			var res = Scaffold.$http<Array</** App.Controllers.Models.TransferTransactionRow **/ any>>(TransactionController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Transaction/GetTransferTransactions?regionId='+encodeURI(regionId)+'',
				}));
			   return res;
	    }
    
        static AddAccountTransaction(multipart: Scaffold.Multipart): any  {
			var res = multipart.upload('/api/Transaction/AddAccountTransaction');
			   return res;
	    }
    
        static GetRealizationTransactions(accountId: number): ng.IHttpPromise<Array</** App.Controllers.Models.RealizationTransactionRow **/ any>> {
			var res = Scaffold.$http<Array</** App.Controllers.Models.RealizationTransactionRow **/ any>>(TransactionController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Transaction/GetRealizationTransactions?accountId='+accountId+'',
				}));
			   return res;
	    }
	}
    
    export class TransferController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.ITransfer = null;
        
        constructor(data?: App.Models.ITransfer) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.ITransfer>> {
			var res = Scaffold.$http<Array<App.Models.ITransfer>>(TransferController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Transfer/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: number): ng.IHttpPromise<App.Models.ITransfer> {
			var res = Scaffold.$http<App.Models.ITransfer> (TransferController.ajaxSettings.build({
			method: 'GET',
			url: '/api/Transfer/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(TransferController.ajaxSettings.build({
				method: 'GET',
				url: '/api/Transfer/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class BaseTransferRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
	}
        
    export class TransferRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.ITransferRecapitulation = null;
        
        constructor(data?: App.Models.Views.ITransferRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.ITransferRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.ITransferRecapitulation>>(TransferRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/TransferRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.ITransferRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.ITransferRecapitulation> (TransferRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/TransferRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(TransferRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/TransferRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
    export class FrozenTransferRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.Views.IFrozenTransferRecapitulation = null;
        
        constructor(data?: App.Models.Views.IFrozenTransferRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): ng.IHttpPromise<Array<App.Models.Views.IFrozenTransferRecapitulation>> {
			var res = Scaffold.$http<Array<App.Models.Views.IFrozenTransferRecapitulation>>(FrozenTransferRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenTransferRecapitulation/GetAll',
				params: query,
			}));
			return res;
		}

		static Get(id: string): ng.IHttpPromise<App.Models.Views.IFrozenTransferRecapitulation> {
			var res = Scaffold.$http<App.Models.Views.IFrozenTransferRecapitulation> (FrozenTransferRecapitulationController.ajaxSettings.build({
			method: 'GET',
			url: '/api/FrozenTransferRecapitulation/Get/'+id,
			}));
			return res;
		}

		static Count(query?: IQuery): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(FrozenTransferRecapitulationController.ajaxSettings.build({
				method: 'GET',
				url: '/api/FrozenTransferRecapitulation/GetCount',
				data: query,
			}));
			return res;
		}
		}
        
}
module App.Controllers.Services {
	import IQuery = Scaffold.IQuery;

    export class UserController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        static Login(/** [FromBody] **/model: /** App.Models.LoginViewModel **/ any): ng.IHttpPromise<App.Models.IUserViewModel> {
			var res = Scaffold.$http<App.Models.IUserViewModel>(UserController.ajaxSettings.build({
			method: 'POST',
			url: '/api/User/Login',
	            data: JSON.stringify(model),
			}));
			   return res;
	    }
    
        static GetCurrentUser(): ng.IHttpPromise<App.Models.IUserViewModel> {
			var res = Scaffold.$http<App.Models.IUserViewModel>(UserController.ajaxSettings.build({
			method: 'GET',
			url: '/api/User/GetCurrentUser',
				}));
			   return res;
	    }
    
        static SetAnonymous(isAnonymous: boolean): ng.IHttpPromise<void> {
			var res = Scaffold.$http<void>(UserController.ajaxSettings.build({
			method: 'GET',
			url: '/api/User/SetAnonymous?isAnonymous='+isAnonymous+'',
				}));
			   return res;
	    }
    
        static Convert(user: App.Models.IUser): ng.IHttpPromise<App.Models.IUserViewModel> {
			var res = Scaffold.$http<App.Models.IUserViewModel>(UserController.ajaxSettings.build({
			method: 'GET',
			url: '/api/User/Convert?user='+user+'',
				}));
			   return res;
	    }
    
        static Logout(): ng.IHttpPromise<void> {
			var res = Scaffold.$http<void>(UserController.ajaxSettings.build({
			method: 'GET',
			url: '/api/User/Logout',
				}));
			   return res;
	    }
    
        static Register(/** [FromBody] **/model: /** App.Models.RegisterViewModel **/ any): ng.IHttpPromise</** System.Net.Http.HttpResponseMessage **/ any> {
			var res = Scaffold.$http</** System.Net.Http.HttpResponseMessage **/ any>(UserController.ajaxSettings.build({
			method: 'POST',
			url: '/api/User/Register',
	            data: JSON.stringify(model),
			}));
			   return res;
	    }
    
        static Update(model: /** App.Models.RegisterViewModel **/ any): ng.IHttpPromise</** System.Net.Http.HttpResponseMessage **/ any> {
			var res = Scaffold.$http</** System.Net.Http.HttpResponseMessage **/ any>(UserController.ajaxSettings.build({
			method: 'PUT',
			url: '/api/User/Update?model='+model+'',
				}));
			   return res;
	    }
    
        static GetCount(): ng.IHttpPromise<number> {
			var res = Scaffold.$http<number>(UserController.ajaxSettings.build({
			method: 'GET',
			url: '/api/User/GetCount',
				}));
			   return res;
	    }
    
        static GetAll(): ng.IHttpPromise<Array<App.Models.IUserViewModel>> {
			var res = Scaffold.$http<Array<App.Models.IUserViewModel>>(UserController.ajaxSettings.build({
			method: 'GET',
			url: '/api/User/GetAll',
				}));
			   return res;
	    }
    
        static Get(id: string): ng.IHttpPromise<App.Models.IUserViewModel> {
			var res = Scaffold.$http<App.Models.IUserViewModel>(UserController.ajaxSettings.build({
			method: 'GET',
			url: '/api/User/Get?id='+encodeURI(id)+'',
				}));
			   return res;
	    }
    
        static GetAllByOrg(orgId: number): ng.IHttpPromise<Array<App.Models.IUserViewModel>> {
			var res = Scaffold.$http<Array<App.Models.IUserViewModel>>(UserController.ajaxSettings.build({
			method: 'GET',
			url: '/api/User/GetAllByOrg?orgId='+orgId+'',
				}));
			   return res;
	    }
    
        static SetScopes(id: string, /** [FromBody] **/regions: Array<App.Models.IRegion>): ng.IHttpPromise<void> {
			var res = Scaffold.$http<void>(UserController.ajaxSettings.build({
			method: 'POST',
			url: '/api/User/SetScopes?id='+encodeURI(id)+'',
	            data: JSON.stringify(regions),
			}));
			   return res;
	    }
    
        static UpdateVolunteerRoles(id: string, /** [FromBody] **/roleNames: Array<string>): ng.IHttpPromise<void> {
			var res = Scaffold.$http<void>(UserController.ajaxSettings.build({
			method: 'POST',
			url: '/api/User/UpdateVolunteerRoles?id='+encodeURI(id)+'',
	            data: JSON.stringify(roleNames),
			}));
			   return res;
	    }
	}
    
}
