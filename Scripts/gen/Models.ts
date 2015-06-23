/// WARNING: T4 generated file 
/// <reference path="../../Scaffold/Scripts/typings/jquery/jquery.d.ts"/>

module App.Models {

	import IQuery = Scaffold.IQuery;

    export interface IBaseAccountRecapitulation {
        Id: number;
        RegionId: string;
        ApbnId: number;
        ApbnYear: number;
        ParentRegionId: string;
        RegionName: string;
        BudgetedIncome: number;
        RealizedIncome: number;
        BudgetedExpense: number;
        RealizedExpense: number;
        EmployeeExpense: number;
        GoodsAndServicesExpense: number;
        CapitalExpense: number;
        OthersExpense: number;
        TotalVillage: number;
        AccountCompletedVillage: number;
    }
    
    export class BaseAccountRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: number;
        RegionId: string;
        ApbnId: number;
        ApbnYear: number;
        ParentRegionId: string;
        RegionName: string;
        BudgetedIncome: number;
        RealizedIncome: number;
        BudgetedExpense: number;
        RealizedExpense: number;
        EmployeeExpense: number;
        GoodsAndServicesExpense: number;
        CapitalExpense: number;
        OthersExpense: number;
        TotalVillage: number;
        AccountCompletedVillage: number;
        
        constructor(data?: IBaseAccountRecapitulation) {
            this.Id = data ? data.Id : null;
            this.RegionId = data ? data.RegionId : null;
            this.ApbnId = data ? data.ApbnId : null;
            this.ApbnYear = data ? data.ApbnYear : null;
            this.ParentRegionId = data ? data.ParentRegionId : null;
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
        
    }
    
    
    export interface IBaseEntity {
        Id: number;
        DateCreated: /** System.DateTime **/ any;
        DateModified: /** System.DateTime **/ any;
    }
    
    export class BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: number;
        DateCreated: /** System.DateTime **/ any;
        DateModified: /** System.DateTime **/ any;
        
        constructor(data?: IBaseEntity) {
            this.Id = data ? data.Id : null;
            this.DateCreated = data ? data.DateCreated : null;
            this.DateModified = data ? data.DateModified : null;
        }
        
    }
    
    
    export interface IUserViewModel {
        Id: string;
        FacebookId: string;
        UserName: string;
        Name: string;
        Roles: Array<string>;
        Scopes: Array<App.Models.IRegion>;
    }
    
    export class UserViewModel {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: string;
        FacebookId: string;
        UserName: string;
        Name: string;
        Roles: Array<string>;
        Scopes: Array<App.Models.IRegion>;
        
        constructor(data?: IUserViewModel) {
            this.Id = data ? data.Id : null;
            this.FacebookId = data ? data.FacebookId : null;
            this.UserName = data ? data.UserName : null;
            this.Name = data ? data.Name : null;
            this.Roles = data ? data.Roles : null;
            this.Scopes = data ? data.Scopes : null;
        }
        
    }
    
    
    export interface IRegion {
        Id: string;
        Name: string;
        Type: App.Models.RegionType;
        IsKelurahan: boolean;
        Website: string;
        UrlKey: string;
        fkParentId: string;
        Parent: App.Models.IRegion;
        DateCreated: /** System.DateTime **/ any;
        DateModified: /** System.DateTime **/ any;
    }
    
    export class Region {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: string;
        Name: string;
        Type: App.Models.RegionType;
        IsKelurahan: boolean;
        Website: string;
        UrlKey: string;
        fkParentId: string;
        Parent: App.Models.IRegion;
        DateCreated: /** System.DateTime **/ any;
        DateModified: /** System.DateTime **/ any;
        
        constructor(data?: IRegion) {
            this.Id = data ? data.Id : null;
            this.Name = data ? data.Name : null;
            this.Type = data ? data.Type : null;
            this.IsKelurahan = data ? data.IsKelurahan : null;
            this.Website = data ? data.Website : null;
            this.UrlKey = data ? data.UrlKey : null;
            this.fkParentId = data ? data.fkParentId : null;
            this.Parent = data ? data.Parent : null;
            this.DateCreated = data ? data.DateCreated : null;
            this.DateModified = data ? data.DateModified : null;
        }
        
    }
    
    
    export interface IBaseTransferRecapitulation {
        Id: number;
        RegionId: string;
        ApbnId: number;
        ApbnYear: number;
        ParentRegionId: string;
        RegionName: string;
        BudgetedApbn: number;
        TransferredApbn: number;
        AcknowledgedApbn: number;
        BudgetedAdd: number;
        TransferredAdd: number;
        AcknowledgedAdd: number;
        BudgetedTotal: number;
        TransferredTotal: number;
        AcknowledgedTotal: number;
    }
    
    export class BaseTransferRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: number;
        RegionId: string;
        ApbnId: number;
        ApbnYear: number;
        ParentRegionId: string;
        RegionName: string;
        BudgetedApbn: number;
        TransferredApbn: number;
        AcknowledgedApbn: number;
        BudgetedAdd: number;
        TransferredAdd: number;
        AcknowledgedAdd: number;
        BudgetedTotal: number;
        TransferredTotal: number;
        AcknowledgedTotal: number;
        
        constructor(data?: IBaseTransferRecapitulation) {
            this.Id = data ? data.Id : null;
            this.RegionId = data ? data.RegionId : null;
            this.ApbnId = data ? data.ApbnId : null;
            this.ApbnYear = data ? data.ApbnYear : null;
            this.ParentRegionId = data ? data.ParentRegionId : null;
            this.RegionName = data ? data.RegionName : null;
            this.BudgetedApbn = data ? data.BudgetedApbn : null;
            this.TransferredApbn = data ? data.TransferredApbn : null;
            this.AcknowledgedApbn = data ? data.AcknowledgedApbn : null;
            this.BudgetedAdd = data ? data.BudgetedAdd : null;
            this.TransferredAdd = data ? data.TransferredAdd : null;
            this.AcknowledgedAdd = data ? data.AcknowledgedAdd : null;
            this.BudgetedTotal = data ? data.BudgetedTotal : null;
            this.TransferredTotal = data ? data.TransferredTotal : null;
            this.AcknowledgedTotal = data ? data.AcknowledgedTotal : null;
        }
        
    }
    
    
    export interface IAccount extends IBaseEntity {
        Code: string;
        Name: string;
        Type: App.Models.AccountType;
        ExpenseType: App.Models.ExpenseType;
        ExpenseGroup: App.Models.ExpenseGroup;
        Target: number;
        IsActivated: boolean;
        DateDeactivated: /** System.DateTime **/ any;
        TargetSource: string;
        fkParentAccountId: number;
        ParentAccount: App.Models.IAccount;
        fkApbdesId: number;
        Apbdes: App.Models.IApbdes;
        fkCreatedById: string;
        CreatedBy: /** App.Models.User **/ any;
        fkModifiedById: string;
        ModifiedBy: /** App.Models.User **/ any;
        fkDeactivatedById: string;
        DeactivatedBy: /** App.Models.User **/ any;
        ChildAccounts: Array<App.Models.IAccount>;
        ParentCode: string;
        TotalRealizationPerAccount: number;
    }
    
    export class Account extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Code: string;
        Name: string;
        Type: App.Models.AccountType;
        ExpenseType: App.Models.ExpenseType;
        ExpenseGroup: App.Models.ExpenseGroup;
        Target: number;
        IsActivated: boolean;
        DateDeactivated: /** System.DateTime **/ any;
        TargetSource: string;
        fkParentAccountId: number;
        ParentAccount: App.Models.IAccount;
        fkApbdesId: number;
        Apbdes: App.Models.IApbdes;
        fkCreatedById: string;
        CreatedBy: /** App.Models.User **/ any;
        fkModifiedById: string;
        ModifiedBy: /** App.Models.User **/ any;
        fkDeactivatedById: string;
        DeactivatedBy: /** App.Models.User **/ any;
        ChildAccounts: Array<App.Models.IAccount>;
        ParentCode: string;
        TotalRealizationPerAccount: number;
        
        constructor(data?: IAccount) {
            super(data);
            this.Code = data ? data.Code : null;
            this.Name = data ? data.Name : null;
            this.Type = data ? data.Type : null;
            this.ExpenseType = data ? data.ExpenseType : null;
            this.ExpenseGroup = data ? data.ExpenseGroup : null;
            this.Target = data ? data.Target : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.DateDeactivated = data ? data.DateDeactivated : null;
            this.TargetSource = data ? data.TargetSource : null;
            this.fkParentAccountId = data ? data.fkParentAccountId : null;
            this.ParentAccount = data ? data.ParentAccount : null;
            this.fkApbdesId = data ? data.fkApbdesId : null;
            this.Apbdes = data ? data.Apbdes : null;
            this.fkCreatedById = data ? data.fkCreatedById : null;
            this.CreatedBy = data ? data.CreatedBy : null;
            this.fkModifiedById = data ? data.fkModifiedById : null;
            this.ModifiedBy = data ? data.ModifiedBy : null;
            this.fkDeactivatedById = data ? data.fkDeactivatedById : null;
            this.DeactivatedBy = data ? data.DeactivatedBy : null;
            this.ChildAccounts = data ? data.ChildAccounts : null;
            this.ParentCode = data ? data.ParentCode : null;
            this.TotalRealizationPerAccount = data ? data.TotalRealizationPerAccount : null;
        }
        
    }
    
    
    export interface IAccountRecapitulation extends IBaseAccountRecapitulation {
    }
    
    export class AccountRecapitulation extends BaseAccountRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IAccountRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface IFrozenAccountRecapitulation extends IBaseAccountRecapitulation {
    }
    
    export class FrozenAccountRecapitulation extends BaseAccountRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IFrozenAccountRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface IApbd extends IBaseEntity {
        Dau: number;
        Dbh: number;
        IsActivated: boolean;
        fkApbnId: number;
        Apbn: App.Models.IApbn;
        fkRegionId: string;
        Region: App.Models.IRegion;
        fkApbdFileId: number;
        ApbdFile: App.Models.IApbdFile;
    }
    
    export class Apbd extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Dau: number;
        Dbh: number;
        IsActivated: boolean;
        fkApbnId: number;
        Apbn: App.Models.IApbn;
        fkRegionId: string;
        Region: App.Models.IRegion;
        fkApbdFileId: number;
        ApbdFile: App.Models.IApbdFile;
        
        constructor(data?: IApbd) {
            super(data);
            this.Dau = data ? data.Dau : null;
            this.Dbh = data ? data.Dbh : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.fkApbnId = data ? data.fkApbnId : null;
            this.Apbn = data ? data.Apbn : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
            this.fkApbdFileId = data ? data.fkApbdFileId : null;
            this.ApbdFile = data ? data.ApbdFile : null;
        }
        
    }
    
    
    export interface IApbdes extends IBaseEntity {
        IsActivated: boolean;
        IsCompleted: boolean;
        DateCompleted: /** System.DateTime **/ any;
        SourceUrl: string;
        fkSourceFileId: number;
        SourceFile: App.Models.IBlob;
        fkApbnId: number;
        Apbn: App.Models.IApbn;
        fkRegionId: string;
        Region: App.Models.IRegion;
        fkCompletedById: string;
        CompletedBy: /** App.Models.User **/ any;
        fkModifiedById: string;
        ModifiedBy: /** App.Models.User **/ any;
        Accounts: Array<App.Models.IAccount>;
    }
    
    export class Apbdes extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        IsActivated: boolean;
        IsCompleted: boolean;
        DateCompleted: /** System.DateTime **/ any;
        SourceUrl: string;
        fkSourceFileId: number;
        SourceFile: App.Models.IBlob;
        fkApbnId: number;
        Apbn: App.Models.IApbn;
        fkRegionId: string;
        Region: App.Models.IRegion;
        fkCompletedById: string;
        CompletedBy: /** App.Models.User **/ any;
        fkModifiedById: string;
        ModifiedBy: /** App.Models.User **/ any;
        Accounts: Array<App.Models.IAccount>;
        
        constructor(data?: IApbdes) {
            super(data);
            this.IsActivated = data ? data.IsActivated : null;
            this.IsCompleted = data ? data.IsCompleted : null;
            this.DateCompleted = data ? data.DateCompleted : null;
            this.SourceUrl = data ? data.SourceUrl : null;
            this.fkSourceFileId = data ? data.fkSourceFileId : null;
            this.SourceFile = data ? data.SourceFile : null;
            this.fkApbnId = data ? data.fkApbnId : null;
            this.Apbn = data ? data.Apbn : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
            this.fkCompletedById = data ? data.fkCompletedById : null;
            this.CompletedBy = data ? data.CompletedBy : null;
            this.fkModifiedById = data ? data.fkModifiedById : null;
            this.ModifiedBy = data ? data.ModifiedBy : null;
            this.Accounts = data ? data.Accounts : null;
        }
        
    }
    
    
    export interface IApbdFile extends IBaseEntity {
        FileName: string;
        IsActivated: boolean;
        Apbds: Array<App.Models.IApbd>;
        fkFileId: number;
        File: App.Models.IBlob;
        ApbdCount: number;
        TotalDau: number;
        TotalDbh: number;
    }
    
    export class ApbdFile extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        FileName: string;
        IsActivated: boolean;
        Apbds: Array<App.Models.IApbd>;
        fkFileId: number;
        File: App.Models.IBlob;
        ApbdCount: number;
        TotalDau: number;
        TotalDbh: number;
        
        constructor(data?: IApbdFile) {
            super(data);
            this.FileName = data ? data.FileName : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.Apbds = data ? data.Apbds : null;
            this.fkFileId = data ? data.fkFileId : null;
            this.File = data ? data.File : null;
            this.ApbdCount = data ? data.ApbdCount : null;
            this.TotalDau = data ? data.TotalDau : null;
            this.TotalDbh = data ? data.TotalDbh : null;
        }
        
    }
    
    
    export interface IApbn extends IBaseEntity {
        DanaPerDesa: number;
        Year: number;
    }
    
    export class Apbn extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        DanaPerDesa: number;
        Year: number;
        
        constructor(data?: IApbn) {
            super(data);
            this.DanaPerDesa = data ? data.DanaPerDesa : null;
            this.Year = data ? data.Year : null;
        }
        
    }
    
    
    export interface IBlob extends IBaseEntity {
        Name: string;
        Type: string;
        Size: number;
        RelativeFileName: string;
        FilePath: string;
    }
    
    export class Blob extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Name: string;
        Type: string;
        Size: number;
        RelativeFileName: string;
        FilePath: string;
        
        constructor(data?: IBlob) {
            super(data);
            this.Name = data ? data.Name : null;
            this.Type = data ? data.Type : null;
            this.Size = data ? data.Size : null;
            this.RelativeFileName = data ? data.RelativeFileName : null;
            this.FilePath = data ? data.FilePath : null;
        }
        
    }
    
    
    export interface IDocumentUpload extends IBaseEntity {
        FileName: string;
        Type: App.Models.DocumentUploadType;
        IsActivated: boolean;
        IsApproved: boolean;
        DateApproved: /** System.DateTime **/ any;
        DateActivated: /** System.DateTime **/ any;
        DateDeactivated: /** System.DateTime **/ any;
        fkRegionId: string;
        Region: App.Models.IRegion;
        fkFileId: number;
        File: App.Models.IBlob;
        fkCreatedById: string;
        CreatedBy: /** App.Models.User **/ any;
        fkOrganizationId: number;
        Organization: App.Models.IOrganization;
        fkApprovedById: string;
        ApprovedBy: /** App.Models.User **/ any;
    }
    
    export class DocumentUpload extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        FileName: string;
        Type: App.Models.DocumentUploadType;
        IsActivated: boolean;
        IsApproved: boolean;
        DateApproved: /** System.DateTime **/ any;
        DateActivated: /** System.DateTime **/ any;
        DateDeactivated: /** System.DateTime **/ any;
        fkRegionId: string;
        Region: App.Models.IRegion;
        fkFileId: number;
        File: App.Models.IBlob;
        fkCreatedById: string;
        CreatedBy: /** App.Models.User **/ any;
        fkOrganizationId: number;
        Organization: App.Models.IOrganization;
        fkApprovedById: string;
        ApprovedBy: /** App.Models.User **/ any;
        
        constructor(data?: IDocumentUpload) {
            super(data);
            this.FileName = data ? data.FileName : null;
            this.Type = data ? data.Type : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.IsApproved = data ? data.IsApproved : null;
            this.DateApproved = data ? data.DateApproved : null;
            this.DateActivated = data ? data.DateActivated : null;
            this.DateDeactivated = data ? data.DateDeactivated : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
            this.fkFileId = data ? data.fkFileId : null;
            this.File = data ? data.File : null;
            this.fkCreatedById = data ? data.fkCreatedById : null;
            this.CreatedBy = data ? data.CreatedBy : null;
            this.fkOrganizationId = data ? data.fkOrganizationId : null;
            this.Organization = data ? data.Organization : null;
            this.fkApprovedById = data ? data.fkApprovedById : null;
            this.ApprovedBy = data ? data.ApprovedBy : null;
        }
        
    }
    
    
    export interface IFieldReport extends IBaseEntity {
        Notes: string;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        fkRealizationId: number;
        Realization: App.Models.IRealization;
        fkCreatedById: string;
        CreatedBy: /** App.Models.User **/ any;
        Pictures: Array<App.Models.IBlob>;
    }
    
    export class FieldReport extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Notes: string;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        fkRealizationId: number;
        Realization: App.Models.IRealization;
        fkCreatedById: string;
        CreatedBy: /** App.Models.User **/ any;
        Pictures: Array<App.Models.IBlob>;
        
        constructor(data?: IFieldReport) {
            super(data);
            this.Notes = data ? data.Notes : null;
            this.Date = data ? data.Date : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.fkRealizationId = data ? data.fkRealizationId : null;
            this.Realization = data ? data.Realization : null;
            this.fkCreatedById = data ? data.fkCreatedById : null;
            this.CreatedBy = data ? data.CreatedBy : null;
            this.Pictures = data ? data.Pictures : null;
        }
        
    }
    
    
    export interface IInvitationToken extends IBaseEntity {
        Token: string;
        IsUsed: boolean;
        fkUserId: string;
        User: /** App.Models.User **/ any;
        fkInviterId: string;
        Inviter: /** App.Models.User **/ any;
    }
    
    export class InvitationToken extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Token: string;
        IsUsed: boolean;
        fkUserId: string;
        User: /** App.Models.User **/ any;
        fkInviterId: string;
        Inviter: /** App.Models.User **/ any;
        
        constructor(data?: IInvitationToken) {
            super(data);
            this.Token = data ? data.Token : null;
            this.IsUsed = data ? data.IsUsed : null;
            this.fkUserId = data ? data.fkUserId : null;
            this.User = data ? data.User : null;
            this.fkInviterId = data ? data.fkInviterId : null;
            this.Inviter = data ? data.Inviter : null;
        }
        
    }
    
    
    export interface IOrganization extends IBaseEntity {
        Name: string;
        Description: string;
        Website: string;
        Facebook: string;
        Twitter: string;
        UrlKey: string;
        PictureFileName: string;
        fkPictureId: number;
        Picture: App.Models.IBlob;
    }
    
    export class Organization extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Name: string;
        Description: string;
        Website: string;
        Facebook: string;
        Twitter: string;
        UrlKey: string;
        PictureFileName: string;
        fkPictureId: number;
        Picture: App.Models.IBlob;
        
        constructor(data?: IOrganization) {
            super(data);
            this.Name = data ? data.Name : null;
            this.Description = data ? data.Description : null;
            this.Website = data ? data.Website : null;
            this.Facebook = data ? data.Facebook : null;
            this.Twitter = data ? data.Twitter : null;
            this.UrlKey = data ? data.UrlKey : null;
            this.PictureFileName = data ? data.PictureFileName : null;
            this.fkPictureId = data ? data.fkPictureId : null;
            this.Picture = data ? data.Picture : null;
        }
        
    }
    
    
    export interface IRealization extends IBaseEntity {
        Description: string;
        Vendor: string;
        Sector: App.Models.Sector;
        fkTransactionId: number;
        Transaction: App.Models.ITransaction;
        fkCreatedById: string;
        CreatedBy: /** App.Models.User **/ any;
    }
    
    export class Realization extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Description: string;
        Vendor: string;
        Sector: App.Models.Sector;
        fkTransactionId: number;
        Transaction: App.Models.ITransaction;
        fkCreatedById: string;
        CreatedBy: /** App.Models.User **/ any;
        
        constructor(data?: IRealization) {
            super(data);
            this.Description = data ? data.Description : null;
            this.Vendor = data ? data.Vendor : null;
            this.Sector = data ? data.Sector : null;
            this.fkTransactionId = data ? data.fkTransactionId : null;
            this.Transaction = data ? data.Transaction : null;
            this.fkCreatedById = data ? data.fkCreatedById : null;
            this.CreatedBy = data ? data.CreatedBy : null;
        }
        
    }
    
    
    export interface IBaseTransaction extends IBaseEntity {
        Amount: number;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        SourceUrl: string;
        fkSourceFileId: number;
        SourceFile: App.Models.IBlob;
        fkApbnId: number;
        Apbn: App.Models.IApbn;
        fkSourceId: string;
        Source: App.Models.IRegion;
        fkDestinationId: string;
        Destination: App.Models.IRegion;
        fkAccountId: number;
        Account: App.Models.IAccount;
        fkActorId: string;
        Actor: App.Models.IRegion;
        fkCreatedById: string;
        CreatedBy: /** App.Models.User **/ any;
        fkTransactionFileId: number;
        TransactionFile: App.Models.ITransactionFile;
    }
    
    export class BaseTransaction extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Amount: number;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        SourceUrl: string;
        fkSourceFileId: number;
        SourceFile: App.Models.IBlob;
        fkApbnId: number;
        Apbn: App.Models.IApbn;
        fkSourceId: string;
        Source: App.Models.IRegion;
        fkDestinationId: string;
        Destination: App.Models.IRegion;
        fkAccountId: number;
        Account: App.Models.IAccount;
        fkActorId: string;
        Actor: App.Models.IRegion;
        fkCreatedById: string;
        CreatedBy: /** App.Models.User **/ any;
        fkTransactionFileId: number;
        TransactionFile: App.Models.ITransactionFile;
        
        constructor(data?: IBaseTransaction) {
            super(data);
            this.Amount = data ? data.Amount : null;
            this.Date = data ? data.Date : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.SourceUrl = data ? data.SourceUrl : null;
            this.fkSourceFileId = data ? data.fkSourceFileId : null;
            this.SourceFile = data ? data.SourceFile : null;
            this.fkApbnId = data ? data.fkApbnId : null;
            this.Apbn = data ? data.Apbn : null;
            this.fkSourceId = data ? data.fkSourceId : null;
            this.Source = data ? data.Source : null;
            this.fkDestinationId = data ? data.fkDestinationId : null;
            this.Destination = data ? data.Destination : null;
            this.fkAccountId = data ? data.fkAccountId : null;
            this.Account = data ? data.Account : null;
            this.fkActorId = data ? data.fkActorId : null;
            this.Actor = data ? data.Actor : null;
            this.fkCreatedById = data ? data.fkCreatedById : null;
            this.CreatedBy = data ? data.CreatedBy : null;
            this.fkTransactionFileId = data ? data.fkTransactionFileId : null;
            this.TransactionFile = data ? data.TransactionFile : null;
        }
        
    }
    
    
    export interface ITransaction extends IBaseTransaction {
    }
    
    export class Transaction extends BaseTransaction {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: ITransaction) {
            super(data);
        }
        
    }
    
    
    export interface IFrozenTransaction extends IBaseTransaction {
    }
    
    export class FrozenTransaction extends BaseTransaction {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IFrozenTransaction) {
            super(data);
        }
        
    }
    
    
    export interface ITransactionFile extends IBaseEntity {
        FileName: string;
        IsActivated: boolean;
        fkFileId: number;
        File: App.Models.IBlob;
        Transactions: Array<App.Models.ITransaction>;
        TransactionCount: number;
        DesaCount: number;
        TotalAmount: number;
    }
    
    export class TransactionFile extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        FileName: string;
        IsActivated: boolean;
        fkFileId: number;
        File: App.Models.IBlob;
        Transactions: Array<App.Models.ITransaction>;
        TransactionCount: number;
        DesaCount: number;
        TotalAmount: number;
        
        constructor(data?: ITransactionFile) {
            super(data);
            this.FileName = data ? data.FileName : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.fkFileId = data ? data.fkFileId : null;
            this.File = data ? data.File : null;
            this.Transactions = data ? data.Transactions : null;
            this.TransactionCount = data ? data.TransactionCount : null;
            this.DesaCount = data ? data.DesaCount : null;
            this.TotalAmount = data ? data.TotalAmount : null;
        }
        
    }
    
    
    export interface ITransferRecapitulation extends IBaseTransferRecapitulation {
    }
    
    export class TransferRecapitulation extends BaseTransferRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: ITransferRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface IFrozenTransferRecapitulation extends IBaseTransferRecapitulation {
    }
    
    export class FrozenTransferRecapitulation extends BaseTransferRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IFrozenTransferRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface IUserScope extends IBaseEntity {
        fkUserId: string;
        User: /** App.Models.User **/ any;
        fkRegionId: string;
        Region: App.Models.IRegion;
    }
    
    export class UserScope extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        fkUserId: string;
        User: /** App.Models.User **/ any;
        fkRegionId: string;
        Region: App.Models.IRegion;
        
        constructor(data?: IUserScope) {
            super(data);
            this.fkUserId = data ? data.fkUserId : null;
            this.User = data ? data.User : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
        }
        
    }
    
}
