/// WARNING: T4 generated file 
/// <reference path="../../Scaffold/Scripts/typings/jquery/jquery.d.ts"/>

module App.Controllers.Models {
	import IQuery = Scaffold.IQuery;
	import Models = App.Models;

    export class BaseAccountRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
	}
        
    export class AccountRecapitulationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : Models.IAccountRecapitulation = null;
        
        constructor(data?: Models.IAccountRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): JQueryPromise<Array<Models.IAccountRecapitulation>> {
			var res = $.ajax(AccountRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/AccountRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new Models.AccountRecapitulation(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<Models.IAccountRecapitulation> {
			var res = $.ajax(AccountRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/AccountRecapitulation/Get/'+id,
			})).then((model) => new Models.AccountRecapitulation(model));
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
        public dataModel : Models.IFrozenAccountRecapitulation = null;
        
        constructor(data?: Models.IFrozenAccountRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): JQueryPromise<Array<Models.IFrozenAccountRecapitulation>> {
			var res = $.ajax(FrozenAccountRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/FrozenAccountRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new Models.FrozenAccountRecapitulation(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<Models.IFrozenAccountRecapitulation> {
			var res = $.ajax(FrozenAccountRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/FrozenAccountRecapitulation/Get/'+id,
			})).then((model) => new Models.FrozenAccountRecapitulation(model));
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
        
    export class APBDesController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : Models.IAPBDes = null;
        
        constructor(data?: Models.IAPBDes) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): JQueryPromise<Array<Models.IAPBDes>> {
			var res = $.ajax(APBDesController.ajaxSettings.build({
				type: 'GET',
				url: '/api/APBDes/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new Models.APBDes(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<Models.IAPBDes> {
			var res = $.ajax(APBDesController.ajaxSettings.build({
			type: 'GET',
			url: '/api/APBDes/Get/'+id,
			})).then((model) => new Models.APBDes(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(APBDesController.ajaxSettings.build({
				type: 'GET',
				url: '/api/APBDes/GetCount',
				data: query,
			}));
			return res;
		}
	        
        static UpdateSources(multipart: Scaffold.Multipart): any  {
			var res = multipart.upload('/api/APBDes/UpdateSources');
			   return res;
	    }
    
        static Complete(apbdesID: number): JQueryPromise<void> {
			var res = $.ajax(APBDesController.ajaxSettings.build({
			type: 'POST',
			url: '/api/APBDes/Complete?apbdesID='+apbdesID+'',
				}));
			   return res;
	    }
    
        static AddAccounts(apbdesID: number, rootAccountID: number, /** [FromBody] **/accounts: Array<App.Models.IAccount>): JQueryPromise<void> {
			var res = $.ajax(APBDesController.ajaxSettings.build({
			type: 'POST',
			url: '/api/APBDes/AddAccounts?apbdesID='+apbdesID+'&rootAccountID='+rootAccountID+'',
	            data: JSON.stringify(accounts),
			}));
			   return res;
	    }
    
        static GetByRegionID(regionID: string): JQueryPromise<App.Models.IAPBDes> {
			var res = $.ajax(APBDesController.ajaxSettings.build({
			type: 'GET',
			url: '/api/APBDes/GetByRegionID?regionID='+encodeURI(regionID)+'',
				}));
			   return res;
	    }
	}
    
    export class APBDFileController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : Models.IAPBDFile = null;
        
        constructor(data?: Models.IAPBDFile) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): JQueryPromise<Array<Models.IAPBDFile>> {
			var res = $.ajax(APBDFileController.ajaxSettings.build({
				type: 'GET',
				url: '/api/APBDFile/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new Models.APBDFile(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<Models.IAPBDFile> {
			var res = $.ajax(APBDFileController.ajaxSettings.build({
			type: 'GET',
			url: '/api/APBDFile/Get/'+id,
			})).then((model) => new Models.APBDFile(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(APBDFileController.ajaxSettings.build({
				type: 'GET',
				url: '/api/APBDFile/GetCount',
				data: query,
			}));
			return res;
		}
		
		static Save(model: Models.IAPBDFile): JQueryPromise<void> {
			var isNew = model.ID == null;
            var res = $.ajax(APBDFileController.ajaxSettings.build({
                 type: isNew ? 'POST' : 'PUT',
				 url: '/api/APBDFile/'+(isNew ? 'Post' : 'Put'),
				 data: JSON.stringify(model)
            })).then((id) => {
				if(isNew) {
					model.ID = id;
				}
			});
            return res;
        }

		static Delete(id: number): JQueryPromise<void> {
				var res = $.ajax(APBDFileController.ajaxSettings.build({
					type: 'GET',
					url: '/api/APBDFile/Delete/'+id,
				}));
				return res;
		}
	        
        static PostFile(multipart: Scaffold.Multipart): any  {
			var res = multipart.upload('/api/APBDFile/PostFile');
			   return res;
	    }
	}
    
    export class APBNController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : Models.IAPBN = null;
        
        constructor(data?: Models.IAPBN) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): JQueryPromise<Array<Models.IAPBN>> {
			var res = $.ajax(APBNController.ajaxSettings.build({
				type: 'GET',
				url: '/api/APBN/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new Models.APBN(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<Models.IAPBN> {
			var res = $.ajax(APBNController.ajaxSettings.build({
			type: 'GET',
			url: '/api/APBN/Get/'+id,
			})).then((model) => new Models.APBN(model));
			return res;
		}

		static Count(query?: IQuery): JQueryPromise<number> {
			var res = $.ajax(APBNController.ajaxSettings.build({
				type: 'GET',
				url: '/api/APBN/GetCount',
				data: query,
			}));
			return res;
		}
		
		static Save(model: Models.IAPBN): JQueryPromise<void> {
			var isNew = model.ID == null;
            var res = $.ajax(APBNController.ajaxSettings.build({
                 type: isNew ? 'POST' : 'PUT',
				 url: '/api/APBN/'+(isNew ? 'Post' : 'Put'),
				 data: JSON.stringify(model)
            })).then((id) => {
				if(isNew) {
					model.ID = id;
				}
			});
            return res;
        }

		static Delete(id: number): JQueryPromise<void> {
				var res = $.ajax(APBNController.ajaxSettings.build({
					type: 'GET',
					url: '/api/APBN/Delete/'+id,
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
    
    export class FieldReportController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : Models.IFieldReport = null;
        
        constructor(data?: Models.IFieldReport) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): JQueryPromise<Array<Models.IFieldReport>> {
			var res = $.ajax(FieldReportController.ajaxSettings.build({
				type: 'GET',
				url: '/api/FieldReport/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new Models.FieldReport(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<Models.IFieldReport> {
			var res = $.ajax(FieldReportController.ajaxSettings.build({
			type: 'GET',
			url: '/api/FieldReport/Get/'+id,
			})).then((model) => new Models.FieldReport(model));
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
    
        static GetPicture(realizationID: number): JQueryPromise</** System.Linq.IQueryable<System.Collections.Generic.List<App.Models.Blob>> **/ any> {
			var res = $.ajax(FieldReportController.ajaxSettings.build({
			type: 'GET',
			url: '/api/FieldReport/GetPicture?realizationID='+realizationID+'',
				}));
			   return res;
	    }
	}
    
    export class RealizationController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : Models.IRealization = null;
        
        constructor(data?: Models.IRealization) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): JQueryPromise<Array<Models.IRealization>> {
			var res = $.ajax(RealizationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Realization/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new Models.Realization(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<Models.IRealization> {
			var res = $.ajax(RealizationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Realization/Get/'+id,
			})).then((model) => new Models.Realization(model));
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
        
    export class RegionController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : Models.IRegion = null;
        
        constructor(data?: Models.IRegion) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): JQueryPromise<Array<Models.IRegion>> {
			var res = $.ajax(RegionController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Region/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new Models.Region(model));
			});
			return res;
		}

		static Get(id: string): JQueryPromise<Models.IRegion> {
			var res = $.ajax(RegionController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Region/Get/'+id,
			})).then((model) => new Models.Region(model));
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
    
        static UpdateWebsite(regionID: string, regionWebsite: string): JQueryPromise<void> {
			var res = $.ajax(RegionController.ajaxSettings.build({
			type: 'POST',
			url: '/api/Region/UpdateWebsite?regionID='+encodeURI(regionID)+'&regionWebsite='+encodeURI(regionWebsite)+'',
				}));
			   return res;
	    }
	}
    
    export class TransactionController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        public dataModel : Models.ITransaction = null;
        
        constructor(data?: Models.ITransaction) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): JQueryPromise<Array<Models.ITransaction>> {
			var res = $.ajax(TransactionController.ajaxSettings.build({
				type: 'GET',
				url: '/api/Transaction/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new Models.Transaction(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<Models.ITransaction> {
			var res = $.ajax(TransactionController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Transaction/Get/'+id,
			})).then((model) => new Models.Transaction(model));
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
    
        static GetTransferTransactions(regionID: string): JQueryPromise<Array</** App.Controllers.Models.TransferTransactionRow **/ any>> {
			var res = $.ajax(TransactionController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Transaction/GetTransferTransactions?regionID='+encodeURI(regionID)+'',
				}));
			   return res;
	    }
    
        static AddAccountTransaction(multipart: Scaffold.Multipart): any  {
			var res = multipart.upload('/api/Transaction/AddAccountTransaction');
			   return res;
	    }
    
        static GetRealizationTransactions(accountID: number): JQueryPromise<Array</** App.Controllers.Models.RealizationTransactionRow **/ any>> {
			var res = $.ajax(TransactionController.ajaxSettings.build({
			type: 'GET',
			url: '/api/Transaction/GetRealizationTransactions?accountID='+accountID+'',
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
        public dataModel : Models.ITransferRecapitulation = null;
        
        constructor(data?: Models.ITransferRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): JQueryPromise<Array<Models.ITransferRecapitulation>> {
			var res = $.ajax(TransferRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/TransferRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new Models.TransferRecapitulation(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<Models.ITransferRecapitulation> {
			var res = $.ajax(TransferRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/TransferRecapitulation/Get/'+id,
			})).then((model) => new Models.TransferRecapitulation(model));
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
        public dataModel : Models.IFrozenTransferRecapitulation = null;
        
        constructor(data?: Models.IFrozenTransferRecapitulation) {
            this.dataModel = data;
        }
		static GetAll(query?: IQuery): JQueryPromise<Array<Models.IFrozenTransferRecapitulation>> {
			var res = $.ajax(FrozenTransferRecapitulationController.ajaxSettings.build({
				type: 'GET',
				url: '/api/FrozenTransferRecapitulation/GetAll',
				data: query,
			})).then((models) => {
				return models.map((model) => new Models.FrozenTransferRecapitulation(model));
			});
			return res;
		}

		static Get(id: number): JQueryPromise<Models.IFrozenTransferRecapitulation> {
			var res = $.ajax(FrozenTransferRecapitulationController.ajaxSettings.build({
			type: 'GET',
			url: '/api/FrozenTransferRecapitulation/Get/'+id,
			})).then((model) => new Models.FrozenTransferRecapitulation(model));
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
	import Models = App.Models;

    export class UserController
    {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        static Login(/** [FromBody] **/model: /** App.Models.LoginViewModel **/ any): JQueryPromise</** App.Models.UserViewModel **/ any> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'POST',
			url: '/api/User/Login',
	            data: JSON.stringify(model),
			}));
			   return res;
	    }
    
        static GetCurrentUser(): JQueryPromise</** App.Models.UserViewModel **/ any> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'GET',
			url: '/api/User/GetCurrentUser',
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
    
        static GetAll(): JQueryPromise<Array</** App.Models.UserViewModel **/ any>> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'GET',
			url: '/api/User/GetAll',
				}));
			   return res;
	    }
    
        static Get(id: string): JQueryPromise</** App.Models.UserViewModel **/ any> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'GET',
			url: '/api/User/Get?id='+encodeURI(id)+'',
				}));
			   return res;
	    }
    
    
        static SetScopes(regions: Array<App.Models.IRegion>): JQueryPromise<void> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'POST',
			url: '/api/User/SetScopes?regions='+regions+'',
				}));
			   return res;
	    }
    
        static GetSecretKey(id: string): JQueryPromise</** System.Net.Http.HttpResponseMessage **/ any> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'GET',
			url: '/api/User/GetSecretKey?id='+encodeURI(id)+'',
				}));
			   return res;
	    }
    
        static UpdateVolunteerRoles(roleNames: Array<string>): JQueryPromise<void> {
			var res = $.ajax(UserController.ajaxSettings.build({
			type: 'POST',
			url: '/api/User/UpdateVolunteerRoles?roleNames='+roleNames+'',
				}));
			   return res;
	    }
	}
    
}
