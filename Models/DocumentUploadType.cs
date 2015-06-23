using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Models
{
    public enum DocumentUploadType{
        NationalDd,
        RegionalDd,
        NationalAdd,
        RegionalAdd,
        NationalBhpr,
        RegionalBhpr,
        DdTransfer,
        AddTransfer,
        BhprTransfer,
    }
}