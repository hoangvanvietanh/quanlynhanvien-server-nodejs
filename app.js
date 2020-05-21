var NodeJs_Dich_vu = require("http")
var Luu_tru = require("./Xu_ly/XL_LUU_TRU")
var Port = normalizePort(process.env.PORT || 1200);
var Xu_ly_Tham_so = require('querystring')
var Du_lieu = {}
var Danh_sach_Nhan_vien = Luu_tru.Doc_Danh_sach_Nhan_vien()
var Doc_Danh_sach_Nhan_vien_Tu_MMSql = Luu_tru.Doc_Danh_sach_Nhan_vien_Tu_MSSql()

Danh_sach_Nhan_vien.then(Kq => {
    Du_lieu.Danh_sach_Nhan_vien = Kq;
})

// Doc_Danh_sach_Nhan_vien_Tu_MMSql.then(Kq => {
//     Du_lieu.Doc_Danh_sach_Nhan_vien_Tu_MMSql = Kq;
// })

var Dich_vu = NodeJs_Dich_vu.createServer((Yeu_cau, Dap_ung) => {
    var Chuoi_Nhan = ""
    var Dia_chi_Xu_ly = Yeu_cau.url.replace("/", "")
    Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
    Yeu_cau.on('end', () => {

        var Tham_so = Xu_ly_Tham_so.parse(Dia_chi_Xu_ly.replace("?", ""))
        var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
        var Chuoi_Kq = ""
        if (Ma_so_Xu_ly == "Doc_Danh_sach_Nhan_vien") {
            var Doi_tuong_Kq = {}
            Doi_tuong_Kq = Du_lieu.Danh_sach_Nhan_vien
            Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            Dap_ung.end(Chuoi_Kq);
        } 
        else if (Ma_so_Xu_ly == "Doc_Danh_sach_Nhan_vien_Tu_MMSql") {

            console.log(Doc_Danh_sach_Nhan_vien_Tu_MMSql);
            var Doi_tuong_Kq = {}
            Doc_Danh_sach_Nhan_vien_Tu_MMSql.then(x=>{
                Doi_tuong_Kq = x;
            })
            console.log(Doi_tuong_Kq);
            Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            Dap_ung.end(Chuoi_Kq);
        }
        else if (Ma_so_Xu_ly == "Ket_noi_tu_winform") {

            console.log("ok kết nối thành công");
            console.log(Chuoi_Nhan);
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            Chuoi_Kq = Chuoi_Nhan;
            Dap_ung.end(Chuoi_Kq);
        }
        else if (Ma_so_Xu_ly == "Them_nhan_vien_moi_mssql") {
            var nhanvien = JSON.parse(Chuoi_Nhan);
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            console.log(nhanvien);
            Kq = Luu_tru.Ghi_moi_Doi_tuong('employees', nhanvien, nhanvien.Account.UserName);
            Du_lieu.Danh_sach_Nhan_vien.push(nhanvien);
            if (Kq == "") {
                Chuoi_Kq = "OK"
                console.log("Thêm thành công");
            } else {
                Chuoi_Kq = "Error"
            }
            Dap_ung.end(Chuoi_Kq);
        } 
        else if (Ma_so_Xu_ly == "Them_Lich_bieu") {
            var Kq = ""
            var Data = JSON.parse(Chuoi_Nhan)
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            console.log(Data);
            var Dieu_kien = { "Email": Data.username }
            var dataUpdate = [];
            Du_lieu.Danh_sach_Nhan_vien.forEach(dataSchedule => {
                if (dataSchedule.Account.UserName.trim() ==Data.username.trim()) {
                    Data.schedules.id = dataSchedule.Schedules.length;
                    dataSchedule.Schedules.push(Data.schedules);
                    dataUpdate = dataSchedule.Schedules;
                }
            });
            var Gia_tri_Cap_nhat = {
                $set: { Schedules: dataUpdate }
            }
            console.log(Dieu_kien);
            console.log(dataUpdate);
            //Du_lieu.Danh_sach_Cau_hoi.question_list = Cau_hoi.question_list;
            Kq = Luu_tru.Cap_nhat_Doi_tuong("employees", Dieu_kien, Gia_tri_Cap_nhat)
            if (Kq == "") {
                Chuoi_Kq = "OK"
            } else {
                Chuoi_Kq = "Error"
            }

            Dap_ung.end(Chuoi_Kq);
        }
        else {
            Chuoi_Kq = Luu_tru.Doc_Thong_tin_Dich_vu()
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            Dap_ung.end(Chuoi_Kq);
        }
    })
})

Dich_vu.listen(Port,
    
    console.log(`Dịch vụ Dữ liệu đang thực thi tại địa chỉ: http://localhost:${Port}`)
);

Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof Port === 'string' ?
        'Pipe ' + Port :
        'Port ' + Port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = Dich_vu.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind);
}