/// WARNING: T4 generated file 
/// <reference path="../../Scaffold/Scripts/typings/jquery/jquery.d.ts"/>

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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.IAccountRecapitulation>> {
			var res = $.ajax(AccountRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/AccountRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.AccountRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.IAccountRecapitulation> {
			var res = $.ajax(AccountRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/AccountRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.AccountRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(AccountRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.IFrozenAccountRecapitulation>> {
			var res = $.ajax(FrozenAccountRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/FrozenAccountRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.FrozenAccountRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.IFrozenAccountRecapitulation> {
			var res = $.ajax(FrozenAccountRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/FrozenAccountRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.FrozenAccountRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(FrozenAccountRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.IApbdes>> {
			var res = $.ajax(ApbdesController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Apbdes/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Apbdes(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<App.Models.IApbdes> {
			var res = $.ajax(ApbdesController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Apbdes/Get/'+id,
			})).then((model) => new App.Models.Apbdes(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(ApbdesController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Apbdes/GetCount',
				data: query,
			}));
			return res;
		}
	        
        static UpdateSources(multipart: Scaffold.Multipart): any  {
			var res = multipart.upload('/api/Apbdes/UpdateSources');
			   return res;
	    }
    
        static Complete(apbdesId: number): JQueryPromise<void> {
			var res = $.ajax(ApbdesController.ajaxSettings.build({
			type: 'POST',
			url: '/api/Apbdes/Complete?apbdesId='+apbdesId+'',
				}));
			   return res;
	    }
    
        static AddAccounts(apbdesId: number, rootAccountId: number, /** [FromBody] **/accounts: Array<App.Models.IAccount>): JQueryPromise<void> {
			var res = $.ajax(ApbdesController.ajaxSettings.build({
			type: 'POST',
			url: '/api/Apbdes/AddAccounts?apbdesId='+apbdesId+'&rootAccountId='+rootAccountId+'',
	            data: JSON.stringify(accounts),
			}));
			   return res;
	    }
    
        static GetByRegionId(regionId: string): JQueryPromise<App.Models.IApbdes> {
			var res = $.ajax(ApbdesController.ajaxSettings.build({
			type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.IApbn>> {
			var res = $.ajax(ApbnController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Apbn/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Apbn(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<App.Models.IApbn> {
			var res = $.ajax(ApbnController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Apbn/Get/'+id,
			})).then((model) => new App.Models.Apbn(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(ApbnController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Apbn/GetCount',
				data: query,
			}));
			return res;
		}
		
		static Save(model: App.Models.IApbn): JQueryPromise<void> {
			var isNew = model.Id == null;
            var res = $.ajax(ApbnController.ajaxSettings.build({
                 type: isNew ? 'POST' : 'PUT',
				 url: '/api/Apbn/'+(isNew ? 'Post' : 'Put'),
				 data: JSON.stringify(model)
            })).then((id) => {
				if(isNew) {
					model.Id = id;
				}
			});
            return res;
        }

		static Delete(id: number): JQueryPromise<void> {
				var res = $.ajax(ApbnController.ajaxSettings.build({
					type: 'GET',
					url: '/api/Apbn/Delete/'+id,
				}));
				return res;
		}
		}
        
    export class BaseController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        static Post(model: /** TModel **/ any): JQueryPromise</** TId **/ any> {
			var res = $.ajax(BaseController.ajaxSettings.build({
			type: 'POST',
			url: '/api/Base/Post?model='+model+'',
				}));
			   return res;
	    }
    
        static Put(model: /** TModel **/ any): JQueryPromise<void> {
			var res = $.ajax(BaseController.ajaxSettings.build({
			type: 'PUT',
			url: '/api/Base/Put?model='+model+'',
				}));
			   return res;
	    }
    
        static Delete(id: /** TId **/ any): JQueryPromise<void> {
			var res = $.ajax(BaseController.ajaxSettings.build({
			type: 'DELETE',
			url: '/api/Base/Delete?id='+id+'',
				}));
			   return res;
	    }
    
        static Get(id: /** TId **/ any): JQueryPromise</** TModel **/ any> {
			var res = $.ajax(BaseController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Base/Get?id='+id+'',
				}));
			   return res;
	    }
    
        static GetCount(): JQueryPromise<number> {
			var res = $.ajax(BaseController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Base/GetCount',
				}));
			   return res;
	    }
    
        static GetAll(): JQueryPromise</** System.Linq.IQueryable<TModel> **/ any> {
			var res = $.ajax(BaseController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Base/GetAll',
				}));
			   return res;
	    }
	}
    
    export class DocumentUploadController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : App.Models.IDocumentUpload = null;
        
        constructor(data?: App.Models.IDocumentUpload) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.IDocumentUpload>> {
			var res = $.ajax(DocumentUploadController.ajaxSettings.build({
				type: 'GET',
				url: '/api/DocumentUpload/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.DocumentUpload(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<App.Models.IDocumentUpload> {
			var res = $.ajax(DocumentUploadController.ajaxSettings.build({
			type: 'GET',
			url: '/api/DocumentUpload/Get/'+id,
			})).then((model) => new App.Models.DocumentUpload(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(DocumentUploadController.ajaxSettings.build({
				type: 'GET',
				url: '/api/DocumentUpload/GetCount',
				data: query,
			}));
			return res;
		}
		
		static Save(model: App.Models.IDocumentUpload): JQueryPromise<void> {
			var isNew = model.Id == null;
            var res = $.ajax(DocumentUploadController.ajaxSettings.build({
                 type: isNew ? 'POST' : 'PUT',
				 url: '/api/DocumentUpload/'+(isNew ? 'Post' : 'Put'),
				 data: JSON.stringify(model)
            })).then((id) => {
				if(isNew) {
					model.Id = id;
				}
			});
            return res;
        }

		static Delete(id: number): JQueryPromise<void> {
				var res = $.ajax(DocumentUploadController.ajaxSettings.build({
					type: 'GET',
					url: '/api/DocumentUpload/Delete/'+id,
				}));
				return res;
		}
	        
        static GetActive(type: number, regionId: string, apbnKey: string): JQueryPromise<App.Models.IDocumentUpload> {
			var res = $.ajax(DocumentUploadController.ajaxSettings.build({
			type: 'GET',
			url: '/api/DocumentUpload/GetActive?type='+type+'&regionId='+encodeURI(regionId)+'&apbnKey='+encodeURI(apbnKey)+'',
				}));
			   return res;
	    }
    
        static GetTemplate(type: number, regionId: string, apbnKey: string): JQueryPromise</** System.Net.Http.HttpResponseMessage **/ any> {
			var res = $.ajax(DocumentUploadController.ajaxSettings.build({
			type: 'GET',
			url: '/api/DocumentUpload/GetTemplate?type='+type+'&regionId='+encodeURI(regionId)+'&apbnKey='+encodeURI(apbnKey)+'',
				}));
			   return res;
	    }
    
        static Upload(multipart: Scaffold.Multipart, type: number, regionId: string, apbnKey: string): any  {
			var res = multipart.upload('/api/DocumentUpload/Upload?type='+type+'&regionId='+encodeURI(regionId)+'&apbnKey='+encodeURI(apbnKey)+'');
			   return res;
	    }
    
        static GenerateDanaDesaKabs(apbnKey: string): JQueryPromise<void> {
			var res = $.ajax(DocumentUploadController.ajaxSettings.build({
			type: 'GET',
			url: '/api/DocumentUpload/GenerateDanaDesaKabs?apbnKey='+encodeURI(apbnKey)+'',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.IFieldReport>> {
			var res = $.ajax(FieldReportController.ajaxSettings.build({
				type: 'GET',
				url: '/api/FieldReport/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.FieldReport(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<App.Models.IFieldReport> {
			var res = $.ajax(FieldReportController.ajaxSettings.build({
			type: 'GET',
			url: '/api/FieldReport/Get/'+id,
			})).then((model) => new App.Models.FieldReport(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(FieldReportController.ajaxSettings.build({
				type: 'GET',
				url: '/api/FieldReport/GetCount',
				data: query,
			}));
			return res;
		}
	        
        static AddFieldReport(uploader: Scaffold.Multipart): any  {
			var res = uploader.upload('/api/FieldReport/AddFieldReport');
			   return res;
	    }
    
        static GetPicture(realizationId: number): JQueryPromise</** System.Linq.IQueryable<System.Collections.Generic.List<App.Models.Blob>> **/ any> {
			var res = $.ajax(FieldReportController.ajaxSettings.build({
			type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.INationalAddRecapitulation>> {
			var res = $.ajax(NationalAddRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/NationalAddRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.NationalAddRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.INationalAddRecapitulation> {
			var res = $.ajax(NationalAddRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/NationalAddRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.NationalAddRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(NationalAddRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.IFrozenNationalAddRecapitulation>> {
			var res = $.ajax(FrozenNationalAddRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/FrozenNationalAddRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.FrozenNationalAddRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.IFrozenNationalAddRecapitulation> {
			var res = $.ajax(FrozenNationalAddRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/FrozenNationalAddRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.FrozenNationalAddRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(FrozenNationalAddRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.INationalBhprRecapitulation>> {
			var res = $.ajax(NationalBhprRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/NationalBhprRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.NationalBhprRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.INationalBhprRecapitulation> {
			var res = $.ajax(NationalBhprRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/NationalBhprRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.NationalBhprRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(NationalBhprRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.IFrozenNationalBhprRecapitulation>> {
			var res = $.ajax(FrozenNationalBhprRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/FrozenNationalBhprRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.FrozenNationalBhprRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.IFrozenNationalBhprRecapitulation> {
			var res = $.ajax(FrozenNationalBhprRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/FrozenNationalBhprRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.FrozenNationalBhprRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(FrozenNationalBhprRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.INationalDdRecapitulation>> {
			var res = $.ajax(NationalDdRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/NationalDdRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.NationalDdRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.INationalDdRecapitulation> {
			var res = $.ajax(NationalDdRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/NationalDdRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.NationalDdRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(NationalDdRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.IFrozenNationalDdRecapitulation>> {
			var res = $.ajax(FrozenNationalDdRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/FrozenNationalDdRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.FrozenNationalDdRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.IFrozenNationalDdRecapitulation> {
			var res = $.ajax(FrozenNationalDdRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/FrozenNationalDdRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.FrozenNationalDdRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(FrozenNationalDdRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.IOrganization>> {
			var res = $.ajax(OrganizationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Organization/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Organization(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<App.Models.IOrganization> {
			var res = $.ajax(OrganizationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Organization/Get/'+id,
			})).then((model) => new App.Models.Organization(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(OrganizationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Organization/GetCount',
				data: query,
			}));
			return res;
		}
		
		static Save(model: App.Models.IOrganization): JQueryPromise<void> {
			var isNew = model.Id == null;
            var res = $.ajax(OrganizationController.ajaxSettings.build({
                 type: isNew ? 'POST' : 'PUT',
				 url: '/api/Organization/'+(isNew ? 'Post' : 'Put'),
				 data: JSON.stringify(model)
            })).then((id) => {
				if(isNew) {
					model.Id = id;
				}
			});
            return res;
        }

		static Delete(id: number): JQueryPromise<void> {
				var res = $.ajax(OrganizationController.ajaxSettings.build({
					type: 'GET',
					url: '/api/Organization/Delete/'+id,
				}));
				return res;
		}
	        
        static GetByURLKey(urlKey: string): JQueryPromise<App.Models.IOrganization> {
			var res = $.ajax(OrganizationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Organization/GetByURLKey?urlKey='+encodeURI(urlKey)+'',
				}));
			   return res;
	    }
    
        static AddOrgAdmin(id: number, email: string): JQueryPromise<App.Models.IUserViewModel> {
			var res = $.ajax(OrganizationController.ajaxSettings.build({
			type: 'POST',
			url: '/api/Organization/AddOrgAdmin?id='+id+'&email='+encodeURI(email)+'',
				}));
			   return res;
	    }
    
        static AddOrgVolunteer(id: number, email: string): JQueryPromise<App.Models.IUserViewModel> {
			var res = $.ajax(OrganizationController.ajaxSettings.build({
			type: 'POST',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.IRealization>> {
			var res = $.ajax(RealizationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Realization/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Realization(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<App.Models.IRealization> {
			var res = $.ajax(RealizationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Realization/Get/'+id,
			})).then((model) => new App.Models.Realization(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(RealizationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.IRegionalAddRecapitulation>> {
			var res = $.ajax(RegionalAddRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/RegionalAddRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.RegionalAddRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.IRegionalAddRecapitulation> {
			var res = $.ajax(RegionalAddRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/RegionalAddRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.RegionalAddRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(RegionalAddRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.IFrozenRegionalAddRecapitulation>> {
			var res = $.ajax(FrozenRegionalAddRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/FrozenRegionalAddRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.FrozenRegionalAddRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.IFrozenRegionalAddRecapitulation> {
			var res = $.ajax(FrozenRegionalAddRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/FrozenRegionalAddRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.FrozenRegionalAddRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(FrozenRegionalAddRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.IRegionalBhprRecapitulation>> {
			var res = $.ajax(RegionalBhprRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/RegionalBhprRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.RegionalBhprRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.IRegionalBhprRecapitulation> {
			var res = $.ajax(RegionalBhprRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/RegionalBhprRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.RegionalBhprRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(RegionalBhprRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.IFrozenRegionalBhprRecapitulation>> {
			var res = $.ajax(FrozenRegionalBhprRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/FrozenRegionalBhprRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.FrozenRegionalBhprRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.IFrozenRegionalBhprRecapitulation> {
			var res = $.ajax(FrozenRegionalBhprRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/FrozenRegionalBhprRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.FrozenRegionalBhprRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(FrozenRegionalBhprRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.IRegionalDdRecapitulation>> {
			var res = $.ajax(RegionalDdRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/RegionalDdRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.RegionalDdRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.IRegionalDdRecapitulation> {
			var res = $.ajax(RegionalDdRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/RegionalDdRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.RegionalDdRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(RegionalDdRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.IFrozenRegionalDdRecapitulation>> {
			var res = $.ajax(FrozenRegionalDdRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/FrozenRegionalDdRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.FrozenRegionalDdRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.IFrozenRegionalDdRecapitulation> {
			var res = $.ajax(FrozenRegionalDdRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/FrozenRegionalDdRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.FrozenRegionalDdRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(FrozenRegionalDdRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.IRegion>> {
			var res = $.ajax(RegionController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Region/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Region(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.IRegion> {
			var res = $.ajax(RegionController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Region/Get/'+id,
			})).then((model) => new App.Models.Region(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(RegionController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Region/GetCount',
				data: query,
			}));
			return res;
		}
	        
        static GetByURLKey(urlKey: string): JQueryPromise<App.Models.IRegion> {
			var res = $.ajax(RegionController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Region/GetByURLKey?urlKey='+encodeURI(urlKey)+'',
				}));
			   return res;
	    }
    
        static UpdateWebsite(regionId: string, regionWebsite: string): JQueryPromise<void> {
			var res = $.ajax(RegionController.ajaxSettings.build({
			type: 'POST',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.IRegionSearchResult>> {
			var res = $.ajax(RegionSearchResultController.ajaxSettings.build({
				type: 'GET',
				url: '/api/RegionSearchResult/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.RegionSearchResult(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.IRegionSearchResult> {
			var res = $.ajax(RegionSearchResultController.ajaxSettings.build({
			type: 'GET',
			url: '/api/RegionSearchResult/Get/'+id,
			})).then((model) => new App.Models.RegionSearchResult(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(RegionSearchResultController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.ISourceDocument>> {
			var res = $.ajax(SourceDocumentController.ajaxSettings.build({
				type: 'GET',
				url: '/api/SourceDocument/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.SourceDocument(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<App.Models.ISourceDocument> {
			var res = $.ajax(SourceDocumentController.ajaxSettings.build({
			type: 'GET',
			url: '/api/SourceDocument/Get/'+id,
			})).then((model) => new App.Models.SourceDocument(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(SourceDocumentController.ajaxSettings.build({
				type: 'GET',
				url: '/api/SourceDocument/GetCount',
				data: query,
			}));
			return res;
		}
		
		static Save(model: App.Models.ISourceDocument): JQueryPromise<void> {
			var isNew = model.Id == null;
            var res = $.ajax(SourceDocumentController.ajaxSettings.build({
                 type: isNew ? 'POST' : 'PUT',
				 url: '/api/SourceDocument/'+(isNew ? 'Post' : 'Put'),
				 data: JSON.stringify(model)
            })).then((id) => {
				if(isNew) {
					model.Id = id;
				}
			});
            return res;
        }

		static Delete(id: number): JQueryPromise<void> {
				var res = $.ajax(SourceDocumentController.ajaxSettings.build({
					type: 'GET',
					url: '/api/SourceDocument/Delete/'+id,
				}));
				return res;
		}
	        
        static Upload(multipart: Scaffold.Multipart, type: App.Models.DocumentUploadType, regionId: string, apbnKey: string): any  {
			var res = multipart.upload('/api/SourceDocument/Upload?type='+type+'&regionId='+encodeURI(regionId)+'&apbnKey='+encodeURI(apbnKey)+'');
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.ITransaction>> {
			var res = $.ajax(TransactionController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Transaction/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Transaction(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<App.Models.ITransaction> {
			var res = $.ajax(TransactionController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Transaction/Get/'+id,
			})).then((model) => new App.Models.Transaction(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(TransactionController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Transaction/GetCount',
				data: query,
			}));
			return res;
		}
	        
        static AddTransferTransaction(multipart: Scaffold.Multipart): any  {
			var res = multipart.upload('/api/Transaction/AddTransferTransaction');
			   return res;
	    }
    
        static GetTransferTransactions(regionId: string): JQueryPromise<Array</** App.Controllers.Models.TransferTransactionRow **/ any>> {
			var res = $.ajax(TransactionController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Transaction/GetTransferTransactions?regionId='+encodeURI(regionId)+'',
				}));
			   return res;
	    }
    
        static AddAccountTransaction(multipart: Scaffold.Multipart): any  {
			var res = multipart.upload('/api/Transaction/AddAccountTransaction');
			   return res;
	    }
    
        static GetRealizationTransactions(accountId: number): JQueryPromise<Array</** App.Controllers.Models.RealizationTransactionRow **/ any>> {
			var res = $.ajax(TransactionController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Transaction/GetRealizationTransactions?accountId='+accountId+'',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.ITransferRecapitulation>> {
			var res = $.ajax(TransferRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/TransferRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.TransferRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.ITransferRecapitulation> {
			var res = $.ajax(TransferRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/TransferRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.TransferRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(TransferRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
		static GetAll(query?: IQuery): JQueryPromise<Array<App.Models.Views.IFrozenTransferRecapitulation>> {
			var res = $.ajax(FrozenTransferRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/FrozenTransferRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new App.Models.Views.FrozenTransferRecapitulation(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<App.Models.Views.IFrozenTransferRecapitulation> {
			var res = $.ajax(FrozenTransferRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/FrozenTransferRecapitulation/Get/'+id,
			})).then((model) => new App.Models.Views.FrozenTransferRecapitulation(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(FrozenTransferRecapitulationController.ajaxSettings.build({
				type: 'GET',
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
        
        static Login(/** [FromBody] **/model: /** App.Models.LoginViewModel **/ any): JQueryPromise<App.Models.IUserViewModel> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'POST',
			url: '/api/User/Login',
	            data: JSON.stringify(model),
			}));
			   return res;
	    }
    
        static GetCurrentUser(): JQueryPromise<App.Models.IUserViewModel> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'GET',
			url: '/api/User/GetCurrentUser',
				}));
			   return res;
	    }
    
        static Convert(user: /** App.Models.User **/ any): JQueryPromise<App.Models.IUserViewModel> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'GET',
			url: '/api/User/Convert?user='+user+'',
				}));
			   return res;
	    }
    
        static Logout(): JQueryPromise<void> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'GET',
			url: '/api/User/Logout',
				}));
			   return res;
	    }
    
        static Register(/** [FromBody] **/model: /** App.Models.RegisterViewModel **/ any): JQueryPromise</** System.Net.Http.HttpResponseMessage **/ any> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'POST',
			url: '/api/User/Register',
	            data: JSON.stringify(model),
			}));
			   return res;
	    }
    
        static Update(model: /** App.Models.RegisterViewModel **/ any): JQueryPromise</** System.Net.Http.HttpResponseMessage **/ any> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'PUT',
			url: '/api/User/Update?model='+model+'',
				}));
			   return res;
	    }
    
        static GetCount(): JQueryPromise<number> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'GET',
			url: '/api/User/GetCount',
				}));
			   return res;
	    }
    
        static GetAll(): JQueryPromise<Array<App.Models.IUserViewModel>> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'GET',
			url: '/api/User/GetAll',
				}));
			   return res;
	    }
    
        static Get(id: string): JQueryPromise<App.Models.IUserViewModel> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'GET',
			url: '/api/User/Get?id='+encodeURI(id)+'',
				}));
			   return res;
	    }
    
        static GetAllByOrg(orgId: number): JQueryPromise<Array<App.Models.IUserViewModel>> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'GET',
			url: '/api/User/GetAllByOrg?orgId='+orgId+'',
				}));
			   return res;
	    }
    
        static SetScopes(id: string, /** [FromBody] **/regions: Array<App.Models.IRegion>): JQueryPromise<void> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'POST',
			url: '/api/User/SetScopes?id='+encodeURI(id)+'',
	            data: JSON.stringify(regions),
			}));
			   return res;
	    }
    
        static UpdateVolunteerRoles(id: string, /** [FromBody] **/roleNames: Array<string>): JQueryPromise<void> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'POST',
			url: '/api/User/UpdateVolunteerRoles?id='+encodeURI(id)+'',
	            data: JSON.stringify(roleNames),
			}));
			   return res;
	    }
	}
    
}
