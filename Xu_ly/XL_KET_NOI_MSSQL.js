var sql = require("mssql");

var config = {
    user: 'sa',
    password: '113114115',
    server: 'DESKTOP-MALEMT7\\SUNSHINE', 
    database: 'GiaDinhUniversity',
    port:1433 
};

var DBConnection = function(){
    return sql.connect(config, function (err){});
    
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
    
        // create Request object
        var request = new sql.Request();
        //return request;
        //query to the database and get the records
        request.query(query, function (err, result) {
            
            if (err) console.log(err)
    
            // send records as a response
            //res.send(recordset);
            return result.recordset;
        });
        
    });
}


module.exports = DBConnection();