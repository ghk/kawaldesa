/// WARNING: T4 generated file 
/// <reference path="Microvac.Web.ts"/>

module App.Models {

	import IQuery = Microvac.Web.IQuery;

    export interface IBaseEntity {
        Id: number;
        DateCreated: /** System.DateTime **/ any;
        DateModified: /** System.DateTime **/ any;
    }
    
    export class BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        Id: number;
        DateCreated: /** System.DateTime **/ any;
        DateModified: /** System.DateTime **/ any;
        
        constructor(data?: IBaseEntity) {
            this.Id = data ? data.Id : null;
            this.DateCreated = data ? data.DateCreated : null;
            this.DateModified = data ? data.DateModified : null;
        }
        
    }
    
    
    export interface IUser {
        SecretKey: string;
        SecurityStamp: string;
        PasswordHash: string;
        PhoneNumber: string;
        IsAnonymous: boolean;
        Name: string;
        FacebookId: string;
        FacebookIsVerified: boolean;
        IsADuplicate: boolean;
        IsActive: boolean;
        Email: string;
        fkOrganizationId: number;
        Organization: App.Models.IOrganization;
    }
    
    export class User {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        SecretKey: string;
        SecurityStamp: string;
        PasswordHash: string;
        PhoneNumber: string;
        IsAnonymous: boolean;
        Name: string;
        FacebookId: string;
        FacebookIsVerified: boolean;
        IsADuplicate: boolean;
        IsActive: boolean;
        Email: string;
        fkOrganizationId: number;
        Organization: App.Models.IOrganization;
        
        constructor(data?: IUser) {
            this.SecretKey = data ? data.SecretKey : null;
            this.SecurityStamp = data ? data.SecurityStamp : null;
            this.PasswordHash = data ? data.PasswordHash : null;
            this.PhoneNumber = data ? data.PhoneNumber : null;
            this.IsAnonymous = data ? data.IsAnonymous : null;
            this.Name = data ? data.Name : null;
            this.FacebookId = data ? data.FacebookId : null;
            this.FacebookIsVerified = data ? data.FacebookIsVerified : null;
            this.IsADuplicate = data ? data.IsADuplicate : null;
            this.IsActive = data ? data.IsActive : null;
            this.Email = data ? data.Email : null;
            this.fkOrganizationId = data ? data.fkOrganizationId : null;
            this.Organization = data ? data.Organization : null;
        }
        
    }
    
    
    export interface IUserViewModel {
        Id: string;
        FacebookId: string;
        UserName: string;
        Name: string;
        IsAnonymous: boolean;
        Organization: App.Models.IOrganization;
        Roles: Array<string>;
        Scopes: Array<App.Models.IRegion>;
    }
    
    export class UserViewModel {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        Id: string;
        FacebookId: string;
        UserName: string;
        Name: string;
        IsAnonymous: boolean;
        Organization: App.Models.IOrganization;
        Roles: Array<string>;
        Scopes: Array<App.Models.IRegion>;
        
        constructor(data?: IUserViewModel) {
            this.Id = data ? data.Id : null;
            this.FacebookId = data ? data.FacebookId : null;
            this.UserName = data ? data.UserName : null;
            this.Name = data ? data.Name : null;
            this.IsAnonymous = data ? data.IsAnonymous : null;
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
        IsInScope: boolean;
        Website: string;
        UrlKey: string;
        fkParentId: string;
        Parent: App.Models.IRegion;
        DateCreated: /** System.DateTime **/ any;
        DateModified: /** System.DateTime **/ any;
    }
    
    export class Region {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        Id: string;
        Name: string;
        Type: App.Models.RegionType;
        IsKelurahan: boolean;
        IsInScope: boolean;
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
            this.IsInScope = data ? data.IsInScope : null;
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
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
    
    
    export interface ITransferProgress {
        Id: string;
        Month: number;
        RegionId: string;
        ApbnKey: string;
        TransferredDd: number;
        TransferredAdd: number;
        TransferredBhpr: number;
        AllocatedDd: number;
        AllocatedAdd: number;
        AllocatedBhpr: number;
    }
    
    export class TransferProgress {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        Id: string;
        Month: number;
        RegionId: string;
        ApbnKey: string;
        TransferredDd: number;
        TransferredAdd: number;
        TransferredBhpr: number;
        AllocatedDd: number;
        AllocatedAdd: number;
        AllocatedBhpr: number;
        
        constructor(data?: ITransferProgress) {
            this.Id = data ? data.Id : null;
            this.Month = data ? data.Month : null;
            this.RegionId = data ? data.RegionId : null;
            this.ApbnKey = data ? data.ApbnKey : null;
            this.TransferredDd = data ? data.TransferredDd : null;
            this.TransferredAdd = data ? data.TransferredAdd : null;
            this.TransferredBhpr = data ? data.TransferredBhpr : null;
            this.AllocatedDd = data ? data.AllocatedDd : null;
            this.AllocatedAdd = data ? data.AllocatedAdd : null;
            this.AllocatedBhpr = data ? data.AllocatedBhpr : null;
        }
        
    }
    
    
    export interface IAccount extends IBaseEntity {
        Code: string;
        Name: string;
        Type: App.Models.AccountType;
        Amount: number;
        Notes: string;
        fkApbdesId: number;
        Apbdes: App.Models.IApbdes;
        fkParentAccountId: number;
        ParentAccount: App.Models.IAccount;
        fkCreatedById: string;
        CreatedBy: App.Models.IUser;
        fkModifiedById: string;
        ModifiedBy: App.Models.IUser;
        ChildAccounts: Array<App.Models.IAccount>;
        ParentCode: string;
        TotalRealizationPerAccount: number;
    }
    
    export class Account extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        Code: string;
        Name: string;
        Type: App.Models.AccountType;
        Amount: number;
        Notes: string;
        fkApbdesId: number;
        Apbdes: App.Models.IApbdes;
        fkParentAccountId: number;
        ParentAccount: App.Models.IAccount;
        fkCreatedById: string;
        CreatedBy: App.Models.IUser;
        fkModifiedById: string;
        ModifiedBy: App.Models.IUser;
        ChildAccounts: Array<App.Models.IAccount>;
        ParentCode: string;
        TotalRealizationPerAccount: number;
        
        constructor(data?: IAccount) {
            super(data);
            this.Code = data ? data.Code : null;
            this.Name = data ? data.Name : null;
            this.Type = data ? data.Type : null;
            this.Amount = data ? data.Amount : null;
            this.Notes = data ? data.Notes : null;
            this.fkApbdesId = data ? data.fkApbdesId : null;
            this.Apbdes = data ? data.Apbdes : null;
            this.fkParentAccountId = data ? data.fkParentAccountId : null;
            this.ParentAccount = data ? data.ParentAccount : null;
            this.fkCreatedById = data ? data.fkCreatedById : null;
            this.CreatedBy = data ? data.CreatedBy : null;
            this.fkModifiedById = data ? data.fkModifiedById : null;
            this.ModifiedBy = data ? data.ModifiedBy : null;
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
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        Name: string;
        Year: number;
        IsRevision: boolean;
        fkRegionId: string;
        Region: App.Models.IRegion;
        fkModifiedById: string;
        ModifiedBy: App.Models.IUser;
        Accounts: Array<App.Models.IAccount>;
    }
    
    export class Apbdes extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        IsActivated: boolean;
        Name: string;
        Year: number;
        IsRevision: boolean;
        fkRegionId: string;
        Region: App.Models.IRegion;
        fkModifiedById: string;
        ModifiedBy: App.Models.IUser;
        Accounts: Array<App.Models.IAccount>;
        
        constructor(data?: IApbdes) {
            super(data);
            this.IsActivated = data ? data.IsActivated : null;
            this.Name = data ? data.Name : null;
            this.Year = data ? data.Year : null;
            this.IsRevision = data ? data.IsRevision : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
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
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
    
    
    export interface IFieldReport extends IBaseEntity {
        Notes: string;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        fkRealizationId: number;
        Realization: App.Models.IRealization;
        fkCreatedById: string;
        CreatedBy: App.Models.IUser;
        Pictures: Array<App.Models.IBlob>;
    }
    
    export class FieldReport extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        Notes: string;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        fkRealizationId: number;
        Realization: App.Models.IRealization;
        fkCreatedById: string;
        CreatedBy: App.Models.IUser;
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
        User: App.Models.IUser;
        fkInviterId: string;
        Inviter: App.Models.IUser;
    }
    
    export class InvitationToken extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        Token: string;
        IsUsed: boolean;
        fkUserId: string;
        User: App.Models.IUser;
        fkInviterId: string;
        Inviter: App.Models.IUser;
        
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
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
    }
    
    export class NationalAddAllocation extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
        
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
            this.fkSpreadsheetId = data ? data.fkSpreadsheetId : null;
            this.Spreadsheet = data ? data.Spreadsheet : null;
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
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
    }
    
    export class NationalBhprAllocation extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
        
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
            this.fkSpreadsheetId = data ? data.fkSpreadsheetId : null;
            this.Spreadsheet = data ? data.Spreadsheet : null;
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
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
    }
    
    export class NationalDdAllocation extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        No: string;
        RegionName: string;
        RegionalTransfer: number;
        Dd: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        IsActivated: boolean;
        fkApbnId: number;
        Apbn: App.Models.IApbn;
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
        
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
            this.fkSpreadsheetId = data ? data.fkSpreadsheetId : null;
            this.Spreadsheet = data ? data.Spreadsheet : null;
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
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        fkAccountId: number;
        Account: App.Models.IAccount;
        Amount: number;
        Date: /** System.DateTime **/ any;
    }
    
    export class Realization extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        fkAccountId: number;
        Account: App.Models.IAccount;
        Amount: number;
        Date: /** System.DateTime **/ any;
        
        constructor(data?: IRealization) {
            super(data);
            this.fkAccountId = data ? data.fkAccountId : null;
            this.Account = data ? data.Account : null;
            this.Amount = data ? data.Amount : null;
            this.Date = data ? data.Date : null;
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
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
    }
    
    export class RegionalAddAllocation extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
        
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
            this.fkSpreadsheetId = data ? data.fkSpreadsheetId : null;
            this.Spreadsheet = data ? data.Spreadsheet : null;
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
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
    }
    
    export class RegionalBhprAllocation extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
        
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
            this.fkSpreadsheetId = data ? data.fkSpreadsheetId : null;
            this.Spreadsheet = data ? data.Spreadsheet : null;
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
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
    }
    
    export class RegionalDdAllocation extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
        
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
            this.fkSpreadsheetId = data ? data.fkSpreadsheetId : null;
            this.Spreadsheet = data ? data.Spreadsheet : null;
        }
        
    }
    
    
    export interface ISourceDocument extends IBaseEntity {
        FileName: string;
        OriginalFileName: string;
        GoogleDriveId: string;
        Type: App.Models.DocumentUploadType;
        Function: App.Models.SourceDocumentFunction;
        ThumbnailCreated: boolean;
        ApbnKey: string;
        fkRegionId: string;
        Region: App.Models.IRegion;
        fkFileId: number;
        File: App.Models.IBlob;
        fkCreatedById: string;
        CreatedBy: App.Models.IUser;
        fkOrganizationId: number;
        Organization: App.Models.IOrganization;
        fkApprovedById: string;
        ApprovedBy: App.Models.IUser;
        fkTransferId: number;
        Transfer: App.Models.ITransfer;
    }
    
    export class SourceDocument extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        FileName: string;
        OriginalFileName: string;
        GoogleDriveId: string;
        Type: App.Models.DocumentUploadType;
        Function: App.Models.SourceDocumentFunction;
        ThumbnailCreated: boolean;
        ApbnKey: string;
        fkRegionId: string;
        Region: App.Models.IRegion;
        fkFileId: number;
        File: App.Models.IBlob;
        fkCreatedById: string;
        CreatedBy: App.Models.IUser;
        fkOrganizationId: number;
        Organization: App.Models.IOrganization;
        fkApprovedById: string;
        ApprovedBy: App.Models.IUser;
        fkTransferId: number;
        Transfer: App.Models.ITransfer;
        
        constructor(data?: ISourceDocument) {
            super(data);
            this.FileName = data ? data.FileName : null;
            this.OriginalFileName = data ? data.OriginalFileName : null;
            this.GoogleDriveId = data ? data.GoogleDriveId : null;
            this.Type = data ? data.Type : null;
            this.Function = data ? data.Function : null;
            this.ThumbnailCreated = data ? data.ThumbnailCreated : null;
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
            this.fkTransferId = data ? data.fkTransferId : null;
            this.Transfer = data ? data.Transfer : null;
        }
        
    }
    
    
    export interface ISpreadsheet extends IBaseEntity {
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
        CreatedBy: App.Models.IUser;
        fkOrganizationId: number;
        Organization: App.Models.IOrganization;
        fkApprovedById: string;
        ApprovedBy: App.Models.IUser;
    }
    
    export class Spreadsheet extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        CreatedBy: App.Models.IUser;
        fkOrganizationId: number;
        Organization: App.Models.IOrganization;
        fkApprovedById: string;
        ApprovedBy: App.Models.IUser;
        
        constructor(data?: ISpreadsheet) {
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
    
    
    export interface ISpreadsheetWorkDir extends IBaseEntity {
        GoogleSheetId: string;
        fkUserId: string;
        User: App.Models.IUser;
    }
    
    export class SpreadsheetWorkDir extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        GoogleSheetId: string;
        fkUserId: string;
        User: App.Models.IUser;
        
        constructor(data?: ISpreadsheetWorkDir) {
            super(data);
            this.GoogleSheetId = data ? data.GoogleSheetId : null;
            this.fkUserId = data ? data.fkUserId : null;
            this.User = data ? data.User : null;
        }
        
    }
    
    
    export interface ISpreadsheetWorkItem extends IBaseEntity {
        GoogleSheetId: string;
        fkUserId: string;
        User: App.Models.IUser;
        fkRegionId: string;
        Region: App.Models.IRegion;
        Type: App.Models.DocumentUploadType;
        ApbnKey: string;
    }
    
    export class SpreadsheetWorkItem extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        GoogleSheetId: string;
        fkUserId: string;
        User: App.Models.IUser;
        fkRegionId: string;
        Region: App.Models.IRegion;
        Type: App.Models.DocumentUploadType;
        ApbnKey: string;
        
        constructor(data?: ISpreadsheetWorkItem) {
            super(data);
            this.GoogleSheetId = data ? data.GoogleSheetId : null;
            this.fkUserId = data ? data.fkUserId : null;
            this.User = data ? data.User : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
            this.Type = data ? data.Type : null;
            this.ApbnKey = data ? data.ApbnKey : null;
        }
        
    }
    
    
    export interface ITransaction extends IBaseEntity {
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
        CreatedBy: App.Models.IUser;
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
    }
    
    export class Transaction extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        CreatedBy: App.Models.IUser;
        fkSpreadsheetId: number;
        Spreadsheet: App.Models.ISpreadsheet;
        
        constructor(data?: ITransaction) {
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
            this.fkSpreadsheetId = data ? data.fkSpreadsheetId : null;
            this.Spreadsheet = data ? data.Spreadsheet : null;
        }
        
    }
    
    
    export interface ITransfer extends IBaseEntity {
        Dd: number;
        Add: number;
        Bhpr: number;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        Year: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        SourceDocuments: Array<App.Models.ISourceDocument>;
    }
    
    export class Transfer extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        Dd: number;
        Add: number;
        Bhpr: number;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        Year: number;
        fkRegionId: string;
        Region: App.Models.IRegion;
        SourceDocuments: Array<App.Models.ISourceDocument>;
        
        constructor(data?: ITransfer) {
            super(data);
            this.Dd = data ? data.Dd : null;
            this.Add = data ? data.Add : null;
            this.Bhpr = data ? data.Bhpr : null;
            this.Date = data ? data.Date : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.Year = data ? data.Year : null;
            this.fkRegionId = data ? data.fkRegionId : null;
            this.Region = data ? data.Region : null;
            this.SourceDocuments = data ? data.SourceDocuments : null;
        }
        
    }
    
    
    export interface IUserScope extends IBaseEntity {
        fkUserId: string;
        User: App.Models.IUser;
        fkRegionId: string;
        Region: App.Models.IRegion;
    }
    
    export class UserScope extends BaseEntity {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        fkUserId: string;
        User: App.Models.IUser;
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

	import IQuery = Microvac.Web.IQuery;
    
    export interface IAccountRecapitulation {
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
    
    export class AccountRecapitulation {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        
        constructor(data?: IAccountRecapitulation) {
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
    
    
    export interface INationalAddRecapitulation {
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
    
    export class NationalAddRecapitulation {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        
        constructor(data?: INationalAddRecapitulation) {
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
    
    
    export interface INationalBhprRecapitulation {
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
    
    export class NationalBhprRecapitulation {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        
        constructor(data?: INationalBhprRecapitulation) {
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
    
    
    export interface INationalDdRecapitulation {
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
    
    export class NationalDdRecapitulation {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
        Id: string;
        RegionId: string;
        ApbnKey: string;
        RegionName: string;
        ParentRegionId: string;
        RegionalTransfer: number;
        Dd: number;
        TotalDesa: number;
        CompletedDesa: number;
        
        constructor(data?: INationalDdRecapitulation) {
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
    
    
    export interface IRegionalAddRecapitulation {
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
    
    export class RegionalAddRecapitulation {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        
        constructor(data?: IRegionalAddRecapitulation) {
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
    
    
    export interface IRegionalBhprRecapitulation {
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
    
    export class RegionalBhprRecapitulation {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        
        constructor(data?: IRegionalBhprRecapitulation) {
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
    
    
    export interface IRegionalDdRecapitulation {
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
    
    export class RegionalDdRecapitulation {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        
        constructor(data?: IRegionalDdRecapitulation) {
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
    
    
    export interface ITransferRecapitulation {
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
    
    export class TransferRecapitulation {
        public static ajaxSettings = new Microvac.Web.AjaxSettings();
        
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
        
        constructor(data?: ITransferRecapitulation) {
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
    
}
