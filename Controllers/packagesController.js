const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Package = mongoose.model('Packages');

router.get('/',(req,res)=>{
    res.render("packages/addOrEdit",{
        viewTitle : "Insert Packages"
    })
});

router.post('/',(req,res)=>{
    insertRecord(req,res);
    });

function insertRecord(req,res){
    var packages = new Package();
    packages.PackageId =req.body.pkgid;
    packages.PkgName =req.body.pkgname;
    packages.PkgStartDate =req.body.pkgstartdate;
    packages.PkgEndDate =req.body.pkgenddate;
    packages.PkgDesc =req.body.pkgdesc;
    packages.PkgBasePrice =req.body.pkgprice;
    packages.PkgAgencyCommission =req.body.pkgcommission;
    packages.save((err,doc)=>{
        if(!err)
            res.redirect('packages/list');
        else{
            console.log('Error during record insertion:'+err);
        }
    });
}

router.get('/list', (req, res) => {
    var data = [];
    Package.find((err, docs) => {
        if (!err) {
            
            docs.forEach(d => {
                data.push({"id": d.id,"PackageId":d.PackageId,"PkgName":d.PkgName,"PkgStartDate":d.PkgStartDate,"PkgEndDate":d.PkgEndDate,"PkgDesc":d.PkgDesc,"PkgBasePrice":d.PkgBasePrice,"PkgAgencyCommission":d.PkgAgencyCommission});
            });
            res.render("packages/list", {
                list: data
            });
        }
        else {
            console.log('Error in retrieving packages list :' + err);
        }
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

function updateRecord(req, res) {
    Package.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('packages/list'); }
        else {
            if (err.name == 'ValidationError') {
                
                res.render("packages/addOrEdit", {
                    viewTitle: 'Update Package',
                    packages: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/:id', (req, res) => {
    Package.findById(req.params.id, (err, d) => {
        if (!err) {
            var data = {"id": d.id,"PackageId":d.PackageId,"PkgName":d.PkgName,"PkgStartDate":d.PkgStartDate,"PkgEndDate":d.PkgEndDate,"PkgDesc":d.PkgDesc,"PkgBasePrice":d.PkgBasePrice,"PkgAgencyCommission":d.PkgAgencyCommission};
            res.render("packages/addOrEdit", {
                viewTitle: "Update Package",
                packages: data
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Package.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/packages/list');
        }
        else { console.log('Error in package delete :' + err); }
    });
});


    module.exports = router;