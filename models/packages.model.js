const mongoose = require('mongoose');

var packagesSchema = new mongoose.Schema({
    PackageId:Number,
    PkgName:String,
    PkgStartDate:Date,
    PkgEndDate:Date,
    PkgDesc:String,
    PkgBasePrice:Number,
    PkgAgencyCommission:String,
    
});

mongoose.model('Packages',packagesSchema);
