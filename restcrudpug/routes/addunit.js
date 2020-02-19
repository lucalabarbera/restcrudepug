
var express = require('express');
var router = express.Router();
const sql = require('mssql');

const config = {
    user: 'labarbera.luca',  //Vostro user name
    password: 'xxx123#', //Vostra password
    server: "213.140.22.237",  //Stringa di connessione
    database: 'labarbera.luca', //(Nome del DB)
}

// GET PER RENDERIZZARE ALLA PAGINA ADD CON LA FORM

router.post('/add', function (req, res, next) { 
  let unit = req.body;
  if (!unit) {  
    res.status(500).json({JSON});
    return;
  }
  let sqlInsert = `INSERT INTO dbo.[cr-unit-attributes] (Unit, Cost)
                     VALUES ('${unit.Unit}','${unit.Cost}'`;
  executeQuery(res, sqlInsert, next, unit);
});

let executeQuery = function (res, query, next) {
    sql.connect(config, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.status(500).json({JSON});
            return;
        }
        var request = new sql.Request();
        request.query(query, function (err, result) { 
           if (err) {
                console.log("Error while querying database :- " + err);
                res.status(500).json({JSON});
                sql.close();
                return;
            }
            renderPug(res, result.recordset);
            return;
        });
    });
}

function renderPug(res, recordset) {
    res.render('index', {
        title: 'Tutte le unità:',
        re: recordset,
    });
}

router.get('/' ,function(req, res, next){
    res.render('addunit');
})  

module.exports = router;
