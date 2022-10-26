
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require("cors");
const { json } = require('express');


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: "DBMSProject",
});

app.use(cors());
app.use(express.json());

app.post('/check' , (req,res) =>{
    // console.log(req.body);
      const user = req.body.user;
      const pass = req.body.pass;
      
      db.query('SELECT COUNT(*) as count FROM shop WHERE name = (?) AND password = (?) ',[user,pass],(err,result) =>{
        if(err){
            console.log(err);
        }
        else{
          
            if(result[0].count ===1){
                res.send("1");
                console.log("success1");
            }
            else{
               res.send("0");
               console.log("error");
            }
        }
      })
}
)

app.get('/value', (req,res)=>{
    // res.send("hello");
    db.query('SELECT COUNT(*) as cnt FROM DBMSProject.orders orders where user_id = 1' , (err,result) =>{
       if(err){
        console.log(err);
       }
       else{
        // console.log(result[0].cnt);
        res.send(Object.values(result[0]));
        // res.send("hii")
       }
    })
})

app.get('/Pvalue', (req,res)=>{
    // res.send("hello");
    db.query('SELECT COUNT(*) as cnt FROM DBMSProject.product where user_id = 1' , (err,result) =>{
       if(err){
        console.log(err);
       }
       else{
        // console.log(result[0].cnt);
        res.send(Object.values(result[0]));
        // res.send("hii")
       }
    })
})

app.get('/Svalue', (req,res)=>{
    // res.send("hello");
    db.query('SELECT COUNT(*) as cnt FROM DBMSProject.suppliers' , (err,result) =>{
       if(err){
        console.log(err);
       }
       else{
        // console.log(result[0].cnt);
        res.send(Object.values(result[0]));
        // res.send("hii")
       }
    })
})

app.get('/Cvalue', (req,res)=>{
    // res.send("hello");
    db.query('SELECT COUNT(*) as cnt FROM DBMSProject.customers ' , (err,result) =>{
       if(err){
        console.log(err);
       }
       else{
        // console.log(result[0].cnt);
        res.send(Object.values(result[0]));
        // res.send("hii")
       }
    })
})

app.post('/AddOrder', (req,res)=>{
    const id= req.body.id;
    const quantity= req.body.quantity; 
    const supId = req.body.supID;
    const TotalPrice= req.body.TotalPrice;
    const date= req.body.date;
    const time= req.body.time;
    db.query('insert into orders(order_quantity,total_price,date,time,user_id,product_id,supplier_id) values((?),(?),(?),(?),(1),(?),(?))',[quantity,TotalPrice,date,time,id,supId],(err,result)=>{
        if(err){
            console.log(err);
            res.send("0");
        }
        else{
            console.log("successfully inserted");
            res.send("1");
        }
    })
})

app.post('/AddProduct', (req,res)=>{
    const ID = req.body.ID;
    const name= req.body.name;
    const price= req.body.price;
    const quantity= req.body.quantity; 
    const category= req.body.category;
    const Supplier = req.body.Supplier;
    const Image = req.body.Image;
    db.query('INSERT INTO `DBMSProject`.`Product` (`Product_id`, `Product_name`, `Product_Quantity`, `Price_p_unit`, `user_id`, `Supplier_id`, `Category_id`, `image`) VALUES ((?),(?),(?),(?),(?),(?),(?),(?))' ,[ID,name,quantity,price,1,Supplier,category,Image],(err,result)=>{
        if(err){
           
            console.log(Image);
            res.send("0");
        }
        else{
            console.log("successfully inserted");
            
            res.send("1");
        }
    })
})

app.post('/AddCustomer', (req,res)=>{
    const customer = req.body.customer;
    const Phone = req.body.Phone;
    const Age = req.body.Age;
    db.query('INSERT INTO `DBMSProject`.`customers` (`customer_name`,`user_id`,`Phone_no`, `age`) VALUES ((?),(1),(?),(?))',[customer,Phone,Age],(err,result)=>{
        if(err){
            console.log(err);
            res.send("0");
        }
        else{
            console.log("successfully inserted customer values");
            res.send("1");
        }
    })
})

// app.get('/', (req,res)=>{
//     res.send("hello")
// })

app.get('/getProducts', (req,res)=>{
    // res.send("hello");
    db.query('SELECT product_id FROM DBMSProject.product where user_id = 1' , (err,result) =>{
       if(err){
        console.log(err);
       }
       else{
        res.send(result);
       }
    })
})
app.get('/getSupplier', (req,res)=>{
    // res.send("hello");
    db.query('SELECT supplier_id FROM DBMSProject.Suppliers' , (err,result) =>{
       if(err){
        console.log(err);
       }
       else{
        res.send(result);
       }
    })
})

app.get('/getCategory', (req,res)=>{
    // res.send("hello");
    db.query('SELECT category_id FROM DBMSProject.Category' , (err,result) =>{
       if(err){
        console.log(err);
       }
       else{
        res.send(result);
       }
    })
})

app.post('/getPrice', (req,res)=>{
    const ID = req.body.id;
    db.query('select Product_name,Price_p_unit,Category_name from DBMSProject.product natural join DBMSProject.Category where product_id=(?)',[ID],(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

app.get('/fetchProducts', (req,res)=>{
    // res.send("hello");
    db.query('SELECT image , product_name, product_id, product_quantity, price_p_unit , supplier_id , category_name FROM DBMSProject.product natural join DBMSProject.Category where user_id = 1' , (err,result) =>{
       if(err){
        console.log(err);
       }
       else{
        res.send(result);
       }
    })
})

app.get('/fetchOrders', (req,res)=>{
    // res.send("hello");
    db.query('SELECT order_id,order_quantity,total_price,date,time,product_id,supplier_id from DBMSProject.Orders where user_id = 1' , (err,result) =>{
       if(err){
        console.log(err);
       }
       else{
        res.send(result);
       }
    })
})
app.get('/fetchCustomers', (req,res)=>{
    // res.send("hello");
    db.query('SELECT customer_name,Phone_no ,age from DBMSProject.Customers where user_id = 1' , (err,result) =>{
       if(err){
        console.log(err);
       }
       else{
        res.send(result);
       }
    })
})



app.post('/updateProducts', (req,res)=>{
    const id = req.body.ID;
    const quant = req.body.NewQuant;
    const price = req.body.NewPrice;
    db.query('Update DBMSProject.Product SET Product_Quantity = (?) , Price_p_unit = (?) where product_id = (?)',[quant,price,id],(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.send("success");
        }
    })
})

app.post('/deleteProducts', (req,res)=>{
    const id = req.body.id;
    db.query('DELETE FROM DBMSProject.Product where product_id = (?)',[id],(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.send("successfully deleted");
        }
    })
})

app.listen(3001,()=>{
    console.log("server is listening on port 3001");
})