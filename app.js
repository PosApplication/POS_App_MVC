var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
var path = require('path');
app.use(express.static(path.resolve('./public')));
var routes=require('./routes');
app.get('/',routes.home);
var db = require('./model/data');
 
app.get('/frontend', function(req, res) {
	 db.query("SELECT * FROM dropdown", function (err, result, fields) {
		    if (err)  	throw err;
		   
		    var list=result;
		    console.log('success');
		    res.render('index.ejs',{list:list});
		    console.log(fields);
		  });
		});
	
app.get('/productHandler', function(req, res) {
	
	
	
			res.write("Successfully connected to database");
			var ProductName = req.query.productname;
			var ProductCode = req.query.productCode;
			var ProductPrice = req.query.productprice;
			var ProductType = req.query.producttype;
			var ProductTax = req.query.producttax;
			
		  var values = [

				[ ProductName, ProductCode, ProductPrice, ProductType,
						ProductTax ]

				];
				var data = "insert into posapp values ?";
				db.query(data, [ values ], function(err) {

					if (err) {
						console.log(err);
					} else {
						console.log([values]);
						res.write(" and Data inserted successfully");
						res.end();
					}
					});
				
	

	});

	app.listen(7009,function(){
		console.log("server running successfully");
	});


