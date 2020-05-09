var File = require("fs")
var sql = require("mssql");
var Cong_nghe = "json"
var Thu_muc_Du_lieu = "Nhat_ky_login"
// MongoDB
var DbConnection = require('../Xu_ly/XL_KET_NOI_MONGODB');

var config = {
    user: 'sa',
    password: '113114115',
    server: 'DESKTOP-MALEMT7\\SUNSHINE',
    database: 'GiaDinhUniversity',
    port: 1433
};

function Doc_Thong_tin_Dich_vu() {
    var Duong_dan = "index.html"
    var Chuoi_Thong_tin = File.readFileSync(Duong_dan, "UTF-8")
    return Chuoi_Thong_tin
}


class XL_LUU_TRU {

    Doc_Thong_tin_Dich_vu() {
        return Doc_Thong_tin_Dich_vu()
    }

    async Doc_Danh_sach_Nhan_vien() {
        try {
            var db = await DbConnection.Get();
            var Nhan_vien = await db.collection("employees").find({}).toArray()
            return Nhan_vien
        } catch (Loi) {
            console.log(Loi)
        }
    }

    async Ghi_moi_Doi_tuong(Loai_Doi_tuong, Doi_tuong) {

        try {
            var db = await DbConnection.Get()
            var Kq = await db.collection(Loai_Doi_tuong).insert(Doi_tuong)
            return Kq

        } catch (Loi) {
            console.log(Loi)
        }
    }
    async Cap_nhat_Doi_tuong(Loai_Doi_tuong, Bieu_thuc_dieu_kien, Gia_tri_Cap_nhat) {
        try {
            var db = await DbConnection.Get()

            var Kq = await db.collection(Loai_Doi_tuong).update(Bieu_thuc_dieu_kien, Gia_tri_Cap_nhat)

            return Kq

        } catch (Loi) {
            console.log(Loi);
        }
    }
    async Xoa_Doi_tuong(Loai_Doi_tuong, Bieu_thuc_dieu_kien) {
        try {
            var db = await DbConnection.Get()
            var Kq = await db.collection(Loai_Doi_tuong).remove(Bieu_thuc_dieu_kien);
            return Kq
        } catch (Loi) {
            console.log(Loi);
        }
    }

    async Doc_Danh_sach_Nhan_vien_Tu_MSSql() {

         console.log("2-0");
        // var resultQuery = "123";
        // try {
        //     await sql.connect(config,  function (err) {
        //          console.log("2-1");
        //         if (err) console.log(err);

        //         // create Request object
        //         var request = new sql.Request();
        //         //return request;
        //         //query to the database and get the records
        //          request.query('select * from dbo.Accounts',  function (err, result) {
        //              console.log("2-2");
        //             if (err) console.log(err)

        //             // send records as a response
        //             //res.send(recordset);
        //              console.log("------------------>")
        //              resultQuery = result.recordset;
        //              console.log(resultQuery)
        //              console.log("2-3");
        //             return resultQuery;
        //         });
        //     });
        // } catch (err) {

        // }

     //console.log("2-4");
    }
}



//Public để các file js khác gọi 
var Xu_ly = new XL_LUU_TRU
module.exports = Xu_ly


async function DBConnection() {

    var config = {
        user: 'sa',
        password: '113114115',
        server: 'DESKTOP-MALEMT7\\SUNSHINE',
        database: 'GiaDinhUniversity',
        port: 1433
    };

    var resultQuery = "123";

    await sql.connect(config, async function (err) {
        console.log("2-1");
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        //return request;
        //query to the database and get the records
        await request.query('select * from dbo.Accounts', async function (err, result) {
            console.log("2-2");
            if (err) console.log(err)

            // send records as a response
            //res.send(recordset);
            console.log("------------------>")
            resultQuery = result.recordset;
            console.log(resultQuery)
            console.log("2-3");
            return resultQuery;
        });
    });
    console.log("2-4");
    return resultQuery;
}