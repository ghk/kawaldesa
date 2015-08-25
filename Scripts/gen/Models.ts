/// WARNING: T4 generated file 
/// <reference path="../../Scaffold/Scripts/typings/jquery/jquery.d.ts"/>

module App.Models {

	import IQuery = Scaffold.IQuery;

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
        Organization: App.Models.IOrganization;
        Roles: Array<string>;
        Scopes: Array<App.Models.IRegion>;
    }
    
    export class UserViewModel {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: string;
        FacebookId: string;
        UserName: string;
        Name: string;
        Organization: App.Models.IOrganization;
        Roles: Array<string>;
        Scopes: Array<App.Models.IRegion>;
        
        constructor(data?: IUserViewModel) {
            this.Id = data ? data.Id : null;
            this.FacebookId = data ? data.FacebookId : null;
            this.UserName = data ? data.UserName : null;
            this.Name = data ? data.Name : null;
            this.Organization = data ? data.Organization : null;
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
    
    
    export interface IRegionSearchResult {
        Id: string;
        Name: string;
        Type: App.Models.RegionType;
        TypeName: string;
        ParentId: string;
        Parent: string;
    }
    
    export class RegionSearchResult {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: string;
        Name: string;
        Type: App.Models.RegionType;
        TypeName: string;
        ParentId: string;
        Parent: string;
        
        constructor(data?: IRegionSearchResult) {
            this.Id = data ? data.Id : null;
            this.Name = data ? data.Name : null;
            this.Type = data ? data.Type : null;
            this.TypeName = data ? data.TypeName : null;
            this.ParentId = data ? data.ParentId : null;
            this.Parent = data ? data.Parent : null;
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
    
    
    export interface IApbd extends IBaseEntity {
        fkApbnId: number;
        Apbn: App.Models.IApbn;
        fkRegionId: string;
        Region: App.Models.IRegion;
    }
    
    export class Apbd extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        fkApbnId: number;
        Apbn: App.Models.IApbn;
        fkRegionId: string;
        Region: App.Models.IRegion;
        
        constructor(data?: IApbd) {
            super(data);
            this.fkApbnId = data ? data.fkApbnId : null;
            this.Apbn = data ? data.Apbn : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
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
    
    
    export interface IApbn extends IBaseEntity {
        Key: string;
        Year: number;
        IsPerubahan: boolean;
    }
    
    export class Apbn extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Key: string;
        Year: number;
        IsPerubahan: boolean;
        
        constructor(data?: IApbn) {
            super(data);
            this.Key = data ? data.Key : null;
            this.Year = data ? data.Year : null;
            this.IsPerubahan = data ? data.IsPerubahan : null;
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
        DocumentName: string;
        Type: App.Models.DocumentUploadType;
        Notes: string;
        ApbnKey: string;
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
        DocumentName: string;
        Type: App.Models.DocumentUploadType;
        Notes: string;
        ApbnKey: string;
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
            this.DocumentName = data ? data.DocumentName : null;
            this.Type = data ? data.Type : null;
            this.Notes = data ? data.Notes : null;
            this.ApbnKey = data ? data.ApbnKey : null;
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
    
    
    export interface INationalAddAllocation extends IBaseEntity {
        No: string;
        RegionName: string;
        Dbh: number;
        Dau: number;
        Dak: number;
        Add: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        IsActivated: boolean;
        fkApbdId: number;
        Apbd: App.Models.IApbd;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
    }
    
    export class NationalAddAllocation extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        No: string;
        RegionName: string;
        Dbh: number;
        Dau: number;
        Dak: number;
        Add: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        IsActivated: boolean;
        fkApbdId: number;
        Apbd: App.Models.IApbd;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
        
        constructor(data?: INationalAddAllocation) {
            super(data);
            this.No = data ? data.No : null;
            this.RegionName = data ? data.RegionName : null;
            this.Dbh = data ? data.Dbh : null;
            this.Dau = data ? data.Dau : null;
            this.Dak = data ? data.Dak : null;
            this.Add = data ? data.Add : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.fkApbdId = data ? data.fkApbdId : null;
            this.Apbd = data ? data.Apbd : null;
            this.fkDocumentUploadId = data ? data.fkDocumentUploadId : null;
            this.DocumentUpload = data ? data.DocumentUpload : null;
        }
        
    }
    
    
    export interface INationalBhprAllocation extends IBaseEntity {
        No: string;
        RegionName: string;
        RegionalTax: number;
        RegionalRetribution: number;
        Bhpr: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        IsActivated: boolean;
        fkApbdId: number;
        Apbd: App.Models.IApbd;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
    }
    
    export class NationalBhprAllocation extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        No: string;
        RegionName: string;
        RegionalTax: number;
        RegionalRetribution: number;
        Bhpr: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        IsActivated: boolean;
        fkApbdId: number;
        Apbd: App.Models.IApbd;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
        
        constructor(data?: INationalBhprAllocation) {
            super(data);
            this.No = data ? data.No : null;
            this.RegionName = data ? data.RegionName : null;
            this.RegionalTax = data ? data.RegionalTax : null;
            this.RegionalRetribution = data ? data.RegionalRetribution : null;
            this.Bhpr = data ? data.Bhpr : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.fkApbdId = data ? data.fkApbdId : null;
            this.Apbd = data ? data.Apbd : null;
            this.fkDocumentUploadId = data ? data.fkDocumentUploadId : null;
            this.DocumentUpload = data ? data.DocumentUpload : null;
        }
        
    }
    
    
    export interface INationalDdAllocation extends IBaseEntity {
        No: string;
        RegionName: string;
        RegionalTransfer: number;
        Dd: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        IsActivated: boolean;
        fkApbnId: number;
        Apbn: App.Models.IApbn;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
    }
    
    export class NationalDdAllocation extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        No: string;
        RegionName: string;
        RegionalTransfer: number;
        Dd: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        IsActivated: boolean;
        fkApbnId: number;
        Apbn: App.Models.IApbn;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
        
        constructor(data?: INationalDdAllocation) {
            super(data);
            this.No = data ? data.No : null;
            this.RegionName = data ? data.RegionName : null;
            this.RegionalTransfer = data ? data.RegionalTransfer : null;
            this.Dd = data ? data.Dd : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.fkApbnId = data ? data.fkApbnId : null;
            this.Apbn = data ? data.Apbn : null;
            this.fkDocumentUploadId = data ? data.fkDocumentUploadId : null;
            this.DocumentUpload = data ? data.DocumentUpload : null;
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
    
    
    export interface IRegionalAddAllocation extends IBaseEntity {
        No: string;
        RegionName: string;
        BaseAllocation: number;
        Population: number;
        PopulationRatio: number;
        PopulationWeight: number;
        PoorPopulation: number;
        PoorPopulationRatio: number;
        PoorPopulationWeight: number;
        Area: number;
        AreaRatio: number;
        AreaWeight: number;
        Ikg: number;
        IkgRatio: number;
        IkgWeight: number;
        TotalWeight: number;
        FormulaBasedAllocation: number;
        Add: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        IsActivated: boolean;
        fkApbdId: number;
        Apbd: App.Models.IApbd;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
    }
    
    export class RegionalAddAllocation extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        No: string;
        RegionName: string;
        BaseAllocation: number;
        Population: number;
        PopulationRatio: number;
        PopulationWeight: number;
        PoorPopulation: number;
        PoorPopulationRatio: number;
        PoorPopulationWeight: number;
        Area: number;
        AreaRatio: number;
        AreaWeight: number;
        Ikg: number;
        IkgRatio: number;
        IkgWeight: number;
        TotalWeight: number;
        FormulaBasedAllocation: number;
        Add: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        IsActivated: boolean;
        fkApbdId: number;
        Apbd: App.Models.IApbd;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
        
        constructor(data?: IRegionalAddAllocation) {
            super(data);
            this.No = data ? data.No : null;
            this.RegionName = data ? data.RegionName : null;
            this.BaseAllocation = data ? data.BaseAllocation : null;
            this.Population = data ? data.Population : null;
            this.PopulationRatio = data ? data.PopulationRatio : null;
            this.PopulationWeight = data ? data.PopulationWeight : null;
            this.PoorPopulation = data ? data.PoorPopulation : null;
            this.PoorPopulationRatio = data ? data.PoorPopulationRatio : null;
            this.PoorPopulationWeight = data ? data.PoorPopulationWeight : null;
            this.Area = data ? data.Area : null;
            this.AreaRatio = data ? data.AreaRatio : null;
            this.AreaWeight = data ? data.AreaWeight : null;
            this.Ikg = data ? data.Ikg : null;
            this.IkgRatio = data ? data.IkgRatio : null;
            this.IkgWeight = data ? data.IkgWeight : null;
            this.TotalWeight = data ? data.TotalWeight : null;
            this.FormulaBasedAllocation = data ? data.FormulaBasedAllocation : null;
            this.Add = data ? data.Add : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.fkApbdId = data ? data.fkApbdId : null;
            this.Apbd = data ? data.Apbd : null;
            this.fkDocumentUploadId = data ? data.fkDocumentUploadId : null;
            this.DocumentUpload = data ? data.DocumentUpload : null;
        }
        
    }
    
    
    export interface IRegionalBhprAllocation extends IBaseEntity {
        No: string;
        RegionName: string;
        BaseAllocation: number;
        Pdrd: number;
        PdrdRatio: number;
        FormulaBasedAllocation: number;
        Bhpr: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        IsActivated: boolean;
        fkApbdId: number;
        Apbd: App.Models.IApbd;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
    }
    
    export class RegionalBhprAllocation extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        No: string;
        RegionName: string;
        BaseAllocation: number;
        Pdrd: number;
        PdrdRatio: number;
        FormulaBasedAllocation: number;
        Bhpr: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        IsActivated: boolean;
        fkApbdId: number;
        Apbd: App.Models.IApbd;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
        
        constructor(data?: IRegionalBhprAllocation) {
            super(data);
            this.No = data ? data.No : null;
            this.RegionName = data ? data.RegionName : null;
            this.BaseAllocation = data ? data.BaseAllocation : null;
            this.Pdrd = data ? data.Pdrd : null;
            this.PdrdRatio = data ? data.PdrdRatio : null;
            this.FormulaBasedAllocation = data ? data.FormulaBasedAllocation : null;
            this.Bhpr = data ? data.Bhpr : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.fkApbdId = data ? data.fkApbdId : null;
            this.Apbd = data ? data.Apbd : null;
            this.fkDocumentUploadId = data ? data.fkDocumentUploadId : null;
            this.DocumentUpload = data ? data.DocumentUpload : null;
        }
        
    }
    
    
    export interface IRegionalDdAllocation extends IBaseEntity {
        No: string;
        RegionName: string;
        BaseAllocation: number;
        Population: number;
        PopulationRatio: number;
        PopulationWeight: number;
        PoorPopulation: number;
        PoorPopulationRatio: number;
        PoorPopulationWeight: number;
        Area: number;
        AreaRatio: number;
        AreaWeight: number;
        Ikg: number;
        IkgRatio: number;
        IkgWeight: number;
        TotalWeight: number;
        FormulaBasedAllocation: number;
        Dd: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        IsActivated: boolean;
        fkApbdId: number;
        Apbd: App.Models.IApbd;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
    }
    
    export class RegionalDdAllocation extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        No: string;
        RegionName: string;
        BaseAllocation: number;
        Population: number;
        PopulationRatio: number;
        PopulationWeight: number;
        PoorPopulation: number;
        PoorPopulationRatio: number;
        PoorPopulationWeight: number;
        Area: number;
        AreaRatio: number;
        AreaWeight: number;
        Ikg: number;
        IkgRatio: number;
        IkgWeight: number;
        TotalWeight: number;
        FormulaBasedAllocation: number;
        Dd: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        IsActivated: boolean;
        fkApbdId: number;
        Apbd: App.Models.IApbd;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
        
        constructor(data?: IRegionalDdAllocation) {
            super(data);
            this.No = data ? data.No : null;
            this.RegionName = data ? data.RegionName : null;
            this.BaseAllocation = data ? data.BaseAllocation : null;
            this.Population = data ? data.Population : null;
            this.PopulationRatio = data ? data.PopulationRatio : null;
            this.PopulationWeight = data ? data.PopulationWeight : null;
            this.PoorPopulation = data ? data.PoorPopulation : null;
            this.PoorPopulationRatio = data ? data.PoorPopulationRatio : null;
            this.PoorPopulationWeight = data ? data.PoorPopulationWeight : null;
            this.Area = data ? data.Area : null;
            this.AreaRatio = data ? data.AreaRatio : null;
            this.AreaWeight = data ? data.AreaWeight : null;
            this.Ikg = data ? data.Ikg : null;
            this.IkgRatio = data ? data.IkgRatio : null;
            this.IkgWeight = data ? data.IkgWeight : null;
            this.TotalWeight = data ? data.TotalWeight : null;
            this.FormulaBasedAllocation = data ? data.FormulaBasedAllocation : null;
            this.Dd = data ? data.Dd : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.fkApbdId = data ? data.fkApbdId : null;
            this.Apbd = data ? data.Apbd : null;
            this.fkDocumentUploadId = data ? data.fkDocumentUploadId : null;
            this.DocumentUpload = data ? data.DocumentUpload : null;
        }
        
    }
    
    
    export interface ISourceDocument extends IBaseEntity {
        FileName: string;
        OriginalFileName: string;
        Type: App.Models.DocumentUploadType;
        Function: App.Models.SourceDocumentFunction;
        ApbnKey: string;
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
    
    export class SourceDocument extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        FileName: string;
        OriginalFileName: string;
        Type: App.Models.DocumentUploadType;
        Function: App.Models.SourceDocumentFunction;
        ApbnKey: string;
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
        
        constructor(data?: ISourceDocument) {
            super(data);
            this.FileName = data ? data.FileName : null;
            this.OriginalFileName = data ? data.OriginalFileName : null;
            this.Type = data ? data.Type : null;
            this.Function = data ? data.Function : null;
            this.ApbnKey = data ? data.ApbnKey : null;
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
    
    
    export interface IBaseTransaction extends IBaseEntity {
        Amount: number;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        SourceUrl: string;
        Year: number;
        fkSourceFileId: number;
        SourceFile: App.Models.IBlob;
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
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
    }
    
    export class BaseTransaction extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Amount: number;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        SourceUrl: string;
        Year: number;
        fkSourceFileId: number;
        SourceFile: App.Models.IBlob;
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
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
        
        constructor(data?: IBaseTransaction) {
            super(data);
            this.Amount = data ? data.Amount : null;
            this.Date = data ? data.Date : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.SourceUrl = data ? data.SourceUrl : null;
            this.Year = data ? data.Year : null;
            this.fkSourceFileId = data ? data.fkSourceFileId : null;
            this.SourceFile = data ? data.SourceFile : null;
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
            this.fkDocumentUploadId = data ? data.fkDocumentUploadId : null;
            this.DocumentUpload = data ? data.DocumentUpload : null;
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
    
    
    export interface IBaseTransfer extends IBaseEntity {
        Dd: number;
        Add: number;
        Bhpr: number;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        Year: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
    }
    
    export class BaseTransfer extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Dd: number;
        Add: number;
        Bhpr: number;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        Year: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        fkDocumentUploadId: number;
        DocumentUpload: App.Models.IDocumentUpload;
        
        constructor(data?: IBaseTransfer) {
            super(data);
            this.Dd = data ? data.Dd : null;
            this.Add = data ? data.Add : null;
            this.Bhpr = data ? data.Bhpr : null;
            this.Date = data ? data.Date : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.Year = data ? data.Year : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
            this.fkDocumentUploadId = data ? data.fkDocumentUploadId : null;
            this.DocumentUpload = data ? data.DocumentUpload : null;
        }
        
    }
    
    
    export interface ITransfer extends IBaseTransfer {
    }
    
    export class Transfer extends BaseTransfer {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: ITransfer) {
            super(data);
        }
        
    }
    
    
    export interface IFrozenTransfer extends IBaseTransfer {
    }
    
    export class FrozenTransfer extends BaseTransfer {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IFrozenTransfer) {
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
module App.Models.Views {

	import IQuery = Scaffold.IQuery;
    
    export interface IBaseAccountRecapitulation {
        Id: string;
        RegionId: string;
        ApbnId: number;
        ApbnKey: string;
        ParentRegionId: string;
        RegionName: string;
        BudgetedIncome: number;
        RealizedIncome: number;
        BudgetedExpense: number;
        RealizedExpense: number;
        Recap1Expense: number;
        Recap2Expense: number;
        Recap3Expense: number;
        Recap4Expense: number;
        TotalDesa: number;
        CompletedDesa: number;
    }
    
    export class BaseAccountRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: string;
        RegionId: string;
        ApbnId: number;
        ApbnKey: string;
        ParentRegionId: string;
        RegionName: string;
        BudgetedIncome: number;
        RealizedIncome: number;
        BudgetedExpense: number;
        RealizedExpense: number;
        Recap1Expense: number;
        Recap2Expense: number;
        Recap3Expense: number;
        Recap4Expense: number;
        TotalDesa: number;
        CompletedDesa: number;
        
        constructor(data?: IBaseAccountRecapitulation) {
            this.Id = data ? data.Id : null;
            this.RegionId = data ? data.RegionId : null;
            this.ApbnId = data ? data.ApbnId : null;
            this.ApbnKey = data ? data.ApbnKey : null;
            this.ParentRegionId = data ? data.ParentRegionId : null;
            this.RegionName = data ? data.RegionName : null;
            this.BudgetedIncome = data ? data.BudgetedIncome : null;
            this.RealizedIncome = data ? data.RealizedIncome : null;
            this.BudgetedExpense = data ? data.BudgetedExpense : null;
            this.RealizedExpense = data ? data.RealizedExpense : null;
            this.Recap1Expense = data ? data.Recap1Expense : null;
            this.Recap2Expense = data ? data.Recap2Expense : null;
            this.Recap3Expense = data ? data.Recap3Expense : null;
            this.Recap4Expense = data ? data.Recap4Expense : null;
            this.TotalDesa = data ? data.TotalDesa : null;
            this.CompletedDesa = data ? data.CompletedDesa : null;
        }
        
    }
    
    
    export interface IBaseNationalAddRecapitulation {
        Id: string;
        RegionId: string;
        ApbnKey: string;
        RegionName: string;
        ParentRegionId: string;
        Dbh: number;
        Dau: number;
        Dak: number;
        Add: number;
        TotalDesa: number;
        CompletedDesa: number;
    }
    
    export class BaseNationalAddRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: string;
        RegionId: string;
        ApbnKey: string;
        RegionName: string;
        ParentRegionId: string;
        Dbh: number;
        Dau: number;
        Dak: number;
        Add: number;
        TotalDesa: number;
        CompletedDesa: number;
        
        constructor(data?: IBaseNationalAddRecapitulation) {
            this.Id = data ? data.Id : null;
            this.RegionId = data ? data.RegionId : null;
            this.ApbnKey = data ? data.ApbnKey : null;
            this.RegionName = data ? data.RegionName : null;
            this.ParentRegionId = data ? data.ParentRegionId : null;
            this.Dbh = data ? data.Dbh : null;
            this.Dau = data ? data.Dau : null;
            this.Dak = data ? data.Dak : null;
            this.Add = data ? data.Add : null;
            this.TotalDesa = data ? data.TotalDesa : null;
            this.CompletedDesa = data ? data.CompletedDesa : null;
        }
        
    }
    
    
    export interface IBaseNationalBhprRecapitulation {
        Id: string;
        RegionId: string;
        ApbnKey: string;
        RegionName: string;
        ParentRegionId: string;
        RegionalTax: number;
        RegionalRetribution: number;
        Bhpr: number;
        TotalDesa: number;
        CompletedDesa: number;
    }
    
    export class BaseNationalBhprRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: string;
        RegionId: string;
        ApbnKey: string;
        RegionName: string;
        ParentRegionId: string;
        RegionalTax: number;
        RegionalRetribution: number;
        Bhpr: number;
        TotalDesa: number;
        CompletedDesa: number;
        
        constructor(data?: IBaseNationalBhprRecapitulation) {
            this.Id = data ? data.Id : null;
            this.RegionId = data ? data.RegionId : null;
            this.ApbnKey = data ? data.ApbnKey : null;
            this.RegionName = data ? data.RegionName : null;
            this.ParentRegionId = data ? data.ParentRegionId : null;
            this.RegionalTax = data ? data.RegionalTax : null;
            this.RegionalRetribution = data ? data.RegionalRetribution : null;
            this.Bhpr = data ? data.Bhpr : null;
            this.TotalDesa = data ? data.TotalDesa : null;
            this.CompletedDesa = data ? data.CompletedDesa : null;
        }
        
    }
    
    
    export interface IBaseNationalDdRecapitulation {
        Id: string;
        RegionId: string;
        ApbnKey: string;
        RegionName: string;
        ParentRegionId: string;
        RegionalTransfer: number;
        Dd: number;
        TotalDesa: number;
        CompletedDesa: number;
    }
    
    export class BaseNationalDdRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: string;
        RegionId: string;
        ApbnKey: string;
        RegionName: string;
        ParentRegionId: string;
        RegionalTransfer: number;
        Dd: number;
        TotalDesa: number;
        CompletedDesa: number;
        
        constructor(data?: IBaseNationalDdRecapitulation) {
            this.Id = data ? data.Id : null;
            this.RegionId = data ? data.RegionId : null;
            this.ApbnKey = data ? data.ApbnKey : null;
            this.RegionName = data ? data.RegionName : null;
            this.ParentRegionId = data ? data.ParentRegionId : null;
            this.RegionalTransfer = data ? data.RegionalTransfer : null;
            this.Dd = data ? data.Dd : null;
            this.TotalDesa = data ? data.TotalDesa : null;
            this.CompletedDesa = data ? data.CompletedDesa : null;
        }
        
    }
    
    
    export interface IBaseRegionalAddRecapitulation {
        Id: string;
        RegionId: string;
        ParentRegionId: string;
        ApbnKey: string;
        RegionName: string;
        BaseAllocation: number;
        Population: number;
        PopulationRatio: number;
        PopulationWeight: number;
        PoorPopulation: number;
        PoorPopulationRatio: number;
        PoorPopulationWeight: number;
        Area: number;
        AreaRatio: number;
        AreaWeight: number;
        Ikg: number;
        IkgRatio: number;
        IkgWeight: number;
        TotalWeight: number;
        FormulaBasedAllocation: number;
        Add: number;
    }
    
    export class BaseRegionalAddRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: string;
        RegionId: string;
        ParentRegionId: string;
        ApbnKey: string;
        RegionName: string;
        BaseAllocation: number;
        Population: number;
        PopulationRatio: number;
        PopulationWeight: number;
        PoorPopulation: number;
        PoorPopulationRatio: number;
        PoorPopulationWeight: number;
        Area: number;
        AreaRatio: number;
        AreaWeight: number;
        Ikg: number;
        IkgRatio: number;
        IkgWeight: number;
        TotalWeight: number;
        FormulaBasedAllocation: number;
        Add: number;
        
        constructor(data?: IBaseRegionalAddRecapitulation) {
            this.Id = data ? data.Id : null;
            this.RegionId = data ? data.RegionId : null;
            this.ParentRegionId = data ? data.ParentRegionId : null;
            this.ApbnKey = data ? data.ApbnKey : null;
            this.RegionName = data ? data.RegionName : null;
            this.BaseAllocation = data ? data.BaseAllocation : null;
            this.Population = data ? data.Population : null;
            this.PopulationRatio = data ? data.PopulationRatio : null;
            this.PopulationWeight = data ? data.PopulationWeight : null;
            this.PoorPopulation = data ? data.PoorPopulation : null;
            this.PoorPopulationRatio = data ? data.PoorPopulationRatio : null;
            this.PoorPopulationWeight = data ? data.PoorPopulationWeight : null;
            this.Area = data ? data.Area : null;
            this.AreaRatio = data ? data.AreaRatio : null;
            this.AreaWeight = data ? data.AreaWeight : null;
            this.Ikg = data ? data.Ikg : null;
            this.IkgRatio = data ? data.IkgRatio : null;
            this.IkgWeight = data ? data.IkgWeight : null;
            this.TotalWeight = data ? data.TotalWeight : null;
            this.FormulaBasedAllocation = data ? data.FormulaBasedAllocation : null;
            this.Add = data ? data.Add : null;
        }
        
    }
    
    
    export interface IBaseRegionalBhprRecapitulation {
        Id: string;
        RegionId: string;
        ParentRegionId: string;
        ApbnKey: string;
        RegionName: string;
        BaseAllocation: number;
        Pdrd: number;
        PdrdRatio: number;
        FormulaBasedAllocation: number;
        Bhpr: number;
    }
    
    export class BaseRegionalBhprRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: string;
        RegionId: string;
        ParentRegionId: string;
        ApbnKey: string;
        RegionName: string;
        BaseAllocation: number;
        Pdrd: number;
        PdrdRatio: number;
        FormulaBasedAllocation: number;
        Bhpr: number;
        
        constructor(data?: IBaseRegionalBhprRecapitulation) {
            this.Id = data ? data.Id : null;
            this.RegionId = data ? data.RegionId : null;
            this.ParentRegionId = data ? data.ParentRegionId : null;
            this.ApbnKey = data ? data.ApbnKey : null;
            this.RegionName = data ? data.RegionName : null;
            this.BaseAllocation = data ? data.BaseAllocation : null;
            this.Pdrd = data ? data.Pdrd : null;
            this.PdrdRatio = data ? data.PdrdRatio : null;
            this.FormulaBasedAllocation = data ? data.FormulaBasedAllocation : null;
            this.Bhpr = data ? data.Bhpr : null;
        }
        
    }
    
    
    export interface IBaseRegionalDdRecapitulation {
        Id: string;
        RegionId: string;
        ParentRegionId: string;
        ApbnKey: string;
        RegionName: string;
        BaseAllocation: number;
        Population: number;
        PopulationRatio: number;
        PopulationWeight: number;
        PoorPopulation: number;
        PoorPopulationRatio: number;
        PoorPopulationWeight: number;
        Area: number;
        AreaRatio: number;
        AreaWeight: number;
        Ikg: number;
        IkgRatio: number;
        IkgWeight: number;
        TotalWeight: number;
        FormulaBasedAllocation: number;
        Dd: number;
    }
    
    export class BaseRegionalDdRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: string;
        RegionId: string;
        ParentRegionId: string;
        ApbnKey: string;
        RegionName: string;
        BaseAllocation: number;
        Population: number;
        PopulationRatio: number;
        PopulationWeight: number;
        PoorPopulation: number;
        PoorPopulationRatio: number;
        PoorPopulationWeight: number;
        Area: number;
        AreaRatio: number;
        AreaWeight: number;
        Ikg: number;
        IkgRatio: number;
        IkgWeight: number;
        TotalWeight: number;
        FormulaBasedAllocation: number;
        Dd: number;
        
        constructor(data?: IBaseRegionalDdRecapitulation) {
            this.Id = data ? data.Id : null;
            this.RegionId = data ? data.RegionId : null;
            this.ParentRegionId = data ? data.ParentRegionId : null;
            this.ApbnKey = data ? data.ApbnKey : null;
            this.RegionName = data ? data.RegionName : null;
            this.BaseAllocation = data ? data.BaseAllocation : null;
            this.Population = data ? data.Population : null;
            this.PopulationRatio = data ? data.PopulationRatio : null;
            this.PopulationWeight = data ? data.PopulationWeight : null;
            this.PoorPopulation = data ? data.PoorPopulation : null;
            this.PoorPopulationRatio = data ? data.PoorPopulationRatio : null;
            this.PoorPopulationWeight = data ? data.PoorPopulationWeight : null;
            this.Area = data ? data.Area : null;
            this.AreaRatio = data ? data.AreaRatio : null;
            this.AreaWeight = data ? data.AreaWeight : null;
            this.Ikg = data ? data.Ikg : null;
            this.IkgRatio = data ? data.IkgRatio : null;
            this.IkgWeight = data ? data.IkgWeight : null;
            this.TotalWeight = data ? data.TotalWeight : null;
            this.FormulaBasedAllocation = data ? data.FormulaBasedAllocation : null;
            this.Dd = data ? data.Dd : null;
        }
        
    }
    
    
    export interface IBaseTransferRecapitulation {
        Id: string;
        RegionId: string;
        ApbnId: number;
        ApbnKey: string;
        ParentRegionId: string;
        RegionName: string;
        BudgetedDd: number;
        TransferredDd: number;
        BudgetedAdd: number;
        TransferredAdd: number;
        BudgetedBhpr: number;
        TransferredBhpr: number;
    }
    
    export class BaseTransferRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Id: string;
        RegionId: string;
        ApbnId: number;
        ApbnKey: string;
        ParentRegionId: string;
        RegionName: string;
        BudgetedDd: number;
        TransferredDd: number;
        BudgetedAdd: number;
        TransferredAdd: number;
        BudgetedBhpr: number;
        TransferredBhpr: number;
        
        constructor(data?: IBaseTransferRecapitulation) {
            this.Id = data ? data.Id : null;
            this.RegionId = data ? data.RegionId : null;
            this.ApbnId = data ? data.ApbnId : null;
            this.ApbnKey = data ? data.ApbnKey : null;
            this.ParentRegionId = data ? data.ParentRegionId : null;
            this.RegionName = data ? data.RegionName : null;
            this.BudgetedDd = data ? data.BudgetedDd : null;
            this.TransferredDd = data ? data.TransferredDd : null;
            this.BudgetedAdd = data ? data.BudgetedAdd : null;
            this.TransferredAdd = data ? data.TransferredAdd : null;
            this.BudgetedBhpr = data ? data.BudgetedBhpr : null;
            this.TransferredBhpr = data ? data.TransferredBhpr : null;
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
    
    
    export interface INationalAddRecapitulation extends IBaseNationalAddRecapitulation {
    }
    
    export class NationalAddRecapitulation extends BaseNationalAddRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: INationalAddRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface IFrozenNationalAddRecapitulation extends IBaseNationalAddRecapitulation {
    }
    
    export class FrozenNationalAddRecapitulation extends BaseNationalAddRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IFrozenNationalAddRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface INationalBhprRecapitulation extends IBaseNationalBhprRecapitulation {
    }
    
    export class NationalBhprRecapitulation extends BaseNationalBhprRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: INationalBhprRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface IFrozenNationalBhprRecapitulation extends IBaseNationalBhprRecapitulation {
    }
    
    export class FrozenNationalBhprRecapitulation extends BaseNationalBhprRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IFrozenNationalBhprRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface INationalDdRecapitulation extends IBaseNationalDdRecapitulation {
    }
    
    export class NationalDdRecapitulation extends BaseNationalDdRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: INationalDdRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface IFrozenNationalDdRecapitulation extends IBaseNationalDdRecapitulation {
    }
    
    export class FrozenNationalDdRecapitulation extends BaseNationalDdRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IFrozenNationalDdRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface IRegionalAddRecapitulation extends IBaseRegionalAddRecapitulation {
    }
    
    export class RegionalAddRecapitulation extends BaseRegionalAddRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IRegionalAddRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface IFrozenRegionalAddRecapitulation extends IBaseRegionalAddRecapitulation {
    }
    
    export class FrozenRegionalAddRecapitulation extends BaseRegionalAddRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IFrozenRegionalAddRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface IRegionalBhprRecapitulation extends IBaseRegionalBhprRecapitulation {
    }
    
    export class RegionalBhprRecapitulation extends BaseRegionalBhprRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IRegionalBhprRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface IFrozenRegionalBhprRecapitulation extends IBaseRegionalBhprRecapitulation {
    }
    
    export class FrozenRegionalBhprRecapitulation extends BaseRegionalBhprRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IFrozenRegionalBhprRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface IRegionalDdRecapitulation extends IBaseRegionalDdRecapitulation {
    }
    
    export class RegionalDdRecapitulation extends BaseRegionalDdRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IRegionalDdRecapitulation) {
            super(data);
        }
        
    }
    
    
    export interface IFrozenRegionalDdRecapitulation extends IBaseRegionalDdRecapitulation {
    }
    
    export class FrozenRegionalDdRecapitulation extends BaseRegionalDdRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        
        constructor(data?: IFrozenRegionalDdRecapitulation) {
            super(data);
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
    
}
