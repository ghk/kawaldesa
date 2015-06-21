/// WARNING: T4 generated file 
/// <reference path="../../Scaffold/Scripts/typings/jquery/jquery.d.ts"/>

module App.Models {

	import IQuery = Scaffold.IQuery;

    export interface IBaseAccountRecapitulation {
        ID: number;
        RegionID: string;
        APBNID: number;
        APBNYear: number;
        ParentRegionID: number;
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
        
        ID: number;
        RegionID: string;
        APBNID: number;
        APBNYear: number;
        ParentRegionID: number;
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
        
    }
    
    
    export interface IBaseEntity {
        ID: number;
        DateCreated: /** System.DateTime **/ any;
        DateModified: /** System.DateTime **/ any;
    }
    
    export class BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        ID: number;
        DateCreated: /** System.DateTime **/ any;
        DateModified: /** System.DateTime **/ any;
        
        constructor(data?: IBaseEntity) {
            this.ID = data ? data.ID : null;
            this.DateCreated = data ? data.DateCreated : null;
            this.DateModified = data ? data.DateModified : null;
        }
        
    }
    
    
    export interface IRegion {
        ID: string;
        Name: string;
        Type: App.Models.RegionType;
        IsKelurahan: boolean;
        Website: string;
        UrlKey: string;
        fkParentID: string;
        Parent: App.Models.IRegion;
        DateCreated: /** System.DateTime **/ any;
        DateModified: /** System.DateTime **/ any;
    }
    
    export class Region {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        ID: string;
        Name: string;
        Type: App.Models.RegionType;
        IsKelurahan: boolean;
        Website: string;
        UrlKey: string;
        fkParentID: string;
        Parent: App.Models.IRegion;
        DateCreated: /** System.DateTime **/ any;
        DateModified: /** System.DateTime **/ any;
        
        constructor(data?: IRegion) {
            this.ID = data ? data.ID : null;
            this.Name = data ? data.Name : null;
            this.Type = data ? data.Type : null;
            this.IsKelurahan = data ? data.IsKelurahan : null;
            this.Website = data ? data.Website : null;
            this.UrlKey = data ? data.UrlKey : null;
            this.fkParentID = data ? data.fkParentID : null;
            this.Parent = data ? data.Parent : null;
            this.DateCreated = data ? data.DateCreated : null;
            this.DateModified = data ? data.DateModified : null;
        }
        
    }
    
    
    export interface IBaseTransferRecapitulation {
        ID: number;
        RegionID: string;
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
        BudgetedTotal: number;
        TransferredTotal: number;
        AcknowledgedTotal: number;
    }
    
    export class BaseTransferRecapitulation {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        ID: number;
        RegionID: string;
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
        BudgetedTotal: number;
        TransferredTotal: number;
        AcknowledgedTotal: number;
        
        constructor(data?: IBaseTransferRecapitulation) {
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
        fkParentAccountID: number;
        ParentAccount: App.Models.IAccount;
        fkAPBDesID: number;
        APBDes: App.Models.IAPBDes;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        fkModifiedByID: string;
        ModifiedBy: /** App.Models.User **/ any;
        fkDeactivatedByID: string;
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
        fkParentAccountID: number;
        ParentAccount: App.Models.IAccount;
        fkAPBDesID: number;
        APBDes: App.Models.IAPBDes;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        fkModifiedByID: string;
        ModifiedBy: /** App.Models.User **/ any;
        fkDeactivatedByID: string;
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
            this.fkParentAccountID = data ? data.fkParentAccountID : null;
            this.ParentAccount = data ? data.ParentAccount : null;
            this.fkAPBDesID = data ? data.fkAPBDesID : null;
            this.APBDes = data ? data.APBDes : null;
            this.fkCreatedByID = data ? data.fkCreatedByID : null;
            this.CreatedBy = data ? data.CreatedBy : null;
            this.fkModifiedByID = data ? data.fkModifiedByID : null;
            this.ModifiedBy = data ? data.ModifiedBy : null;
            this.fkDeactivatedByID = data ? data.fkDeactivatedByID : null;
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
    
    
    export interface IAPBD extends IBaseEntity {
        DAU: number;
        DBH: number;
        IsActivated: boolean;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkRegionID: string;
        Region: App.Models.IRegion;
        fkAPBDFileID: number;
        APBDFile: App.Models.IAPBDFile;
    }
    
    export class APBD extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        DAU: number;
        DBH: number;
        IsActivated: boolean;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkRegionID: string;
        Region: App.Models.IRegion;
        fkAPBDFileID: number;
        APBDFile: App.Models.IAPBDFile;
        
        constructor(data?: IAPBD) {
            super(data);
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
        
    }
    
    
    export interface IAPBDes extends IBaseEntity {
        IsActivated: boolean;
        IsCompleted: boolean;
        DateCompleted: /** System.DateTime **/ any;
        SourceURL: string;
        fkSourceFileID: number;
        SourceFile: App.Models.IBlob;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkRegionID: string;
        Region: App.Models.IRegion;
        fkCompletedByID: string;
        CompletedBy: /** App.Models.User **/ any;
        fkModifiedByID: string;
        ModifiedBy: /** App.Models.User **/ any;
        Accounts: Array<App.Models.IAccount>;
    }
    
    export class APBDes extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        IsActivated: boolean;
        IsCompleted: boolean;
        DateCompleted: /** System.DateTime **/ any;
        SourceURL: string;
        fkSourceFileID: number;
        SourceFile: App.Models.IBlob;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkRegionID: string;
        Region: App.Models.IRegion;
        fkCompletedByID: string;
        CompletedBy: /** App.Models.User **/ any;
        fkModifiedByID: string;
        ModifiedBy: /** App.Models.User **/ any;
        Accounts: Array<App.Models.IAccount>;
        
        constructor(data?: IAPBDes) {
            super(data);
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
            this.fkCompletedByID = data ? data.fkCompletedByID : null;
            this.CompletedBy = data ? data.CompletedBy : null;
            this.fkModifiedByID = data ? data.fkModifiedByID : null;
            this.ModifiedBy = data ? data.ModifiedBy : null;
            this.Accounts = data ? data.Accounts : null;
        }
        
    }
    
    
    export interface IAPBDFile extends IBaseEntity {
        FileName: string;
        IsActivated: boolean;
        APBDs: Array<App.Models.IAPBD>;
        fkFileID: number;
        File: App.Models.IBlob;
        APBDCount: number;
        TotalDAU: number;
        TotalDBH: number;
    }
    
    export class APBDFile extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        FileName: string;
        IsActivated: boolean;
        APBDs: Array<App.Models.IAPBD>;
        fkFileID: number;
        File: App.Models.IBlob;
        APBDCount: number;
        TotalDAU: number;
        TotalDBH: number;
        
        constructor(data?: IAPBDFile) {
            super(data);
            this.FileName = data ? data.FileName : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.APBDs = data ? data.APBDs : null;
            this.fkFileID = data ? data.fkFileID : null;
            this.File = data ? data.File : null;
            this.APBDCount = data ? data.APBDCount : null;
            this.TotalDAU = data ? data.TotalDAU : null;
            this.TotalDBH = data ? data.TotalDBH : null;
        }
        
    }
    
    
    export interface IAPBN extends IBaseEntity {
        DanaPerDesa: number;
        Year: number;
    }
    
    export class APBN extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        DanaPerDesa: number;
        Year: number;
        
        constructor(data?: IAPBN) {
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
    
    
    export interface IFieldReport extends IBaseEntity {
        Notes: string;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        fkRealizationID: number;
        Realization: App.Models.IRealization;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        Pictures: Array<App.Models.IBlob>;
    }
    
    export class FieldReport extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Notes: string;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        fkRealizationID: number;
        Realization: App.Models.IRealization;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        Pictures: Array<App.Models.IBlob>;
        
        constructor(data?: IFieldReport) {
            super(data);
            this.Notes = data ? data.Notes : null;
            this.Date = data ? data.Date : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.fkRealizationID = data ? data.fkRealizationID : null;
            this.Realization = data ? data.Realization : null;
            this.fkCreatedByID = data ? data.fkCreatedByID : null;
            this.CreatedBy = data ? data.CreatedBy : null;
            this.Pictures = data ? data.Pictures : null;
        }
        
    }
    
    
    export interface IRealization extends IBaseEntity {
        Description: string;
        Vendor: string;
        Sector: App.Models.Sector;
        fkTransactionID: number;
        Transaction: App.Models.ITransaction;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
    }
    
    export class Realization extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Description: string;
        Vendor: string;
        Sector: App.Models.Sector;
        fkTransactionID: number;
        Transaction: App.Models.ITransaction;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        
        constructor(data?: IRealization) {
            super(data);
            this.Description = data ? data.Description : null;
            this.Vendor = data ? data.Vendor : null;
            this.Sector = data ? data.Sector : null;
            this.fkTransactionID = data ? data.fkTransactionID : null;
            this.Transaction = data ? data.Transaction : null;
            this.fkCreatedByID = data ? data.fkCreatedByID : null;
            this.CreatedBy = data ? data.CreatedBy : null;
        }
        
    }
    
    
    export interface IBaseTransaction extends IBaseEntity {
        Amount: number;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        SourceURL: string;
        fkSourceFileID: number;
        SourceFile: App.Models.IBlob;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkSourceID: string;
        Source: App.Models.IRegion;
        fkDestinationID: string;
        Destination: App.Models.IRegion;
        fkAccountID: number;
        Account: App.Models.IAccount;
        fkActorID: string;
        Actor: App.Models.IRegion;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        fkTransactionFileID: number;
        TransactionFile: App.Models.ITransactionFile;
    }
    
    export class BaseTransaction extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        Amount: number;
        Date: /** System.DateTime **/ any;
        IsActivated: boolean;
        SourceURL: string;
        fkSourceFileID: number;
        SourceFile: App.Models.IBlob;
        fkAPBNID: number;
        APBN: App.Models.IAPBN;
        fkSourceID: string;
        Source: App.Models.IRegion;
        fkDestinationID: string;
        Destination: App.Models.IRegion;
        fkAccountID: number;
        Account: App.Models.IAccount;
        fkActorID: string;
        Actor: App.Models.IRegion;
        fkCreatedByID: string;
        CreatedBy: /** App.Models.User **/ any;
        fkTransactionFileID: number;
        TransactionFile: App.Models.ITransactionFile;
        
        constructor(data?: IBaseTransaction) {
            super(data);
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
        fkFileID: number;
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
        fkFileID: number;
        File: App.Models.IBlob;
        Transactions: Array<App.Models.ITransaction>;
        TransactionCount: number;
        DesaCount: number;
        TotalAmount: number;
        
        constructor(data?: ITransactionFile) {
            super(data);
            this.FileName = data ? data.FileName : null;
            this.IsActivated = data ? data.IsActivated : null;
            this.fkFileID = data ? data.fkFileID : null;
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
        fkUserID: string;
        User: /** App.Models.User **/ any;
        fkRegionID: string;
        Region: App.Models.IRegion;
    }
    
    export class UserScope extends BaseEntity {
        public static ajaxSettings = new Scaffold.AjaxSettings();
        
        fkUserID: string;
        User: /** App.Models.User **/ any;
        fkRegionID: string;
        Region: App.Models.IRegion;
        
        constructor(data?: IUserScope) {
            super(data);
            this.fkUserID = data ? data.fkUserID : null;
            this.User = data ? data.User : null;
            this.fkRegionID = data ? data.fkRegionID : null;
            this.Region = data ? data.Region : null;
        }
        
    }
    
}
