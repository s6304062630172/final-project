const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "air-con"
})

app.get('/product', (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) {
      console.log(err);

    } else {
      res.send(result);
    }
  });

});

// product


app.post("/create", (req, res) => {

  const product_img = req.body.product_img;
  const product_name = req.body.product_name;
  const product_type = req.body.product_type;
  const product_brand = req.body.product_brand;
  const product_detail = req.body.product_detail;
  const product_price = req.body.product_price;
  const product_number = req.body.product_number;


  db.query(
    "INSERT INTO product (product_img,product_name,product_type,product_brand,product_detail,product_price,product_number) VALUES(?,?,?,?,?,?,?) ",
    [product_img, product_name, product_type, product_brand, product_detail, product_price, product_number],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});



app.delete('/delete/:product_id', (req, res) => {
  const product_id = req.params.product_id;
  db.query("DELETE FROM product WHERE product_id = ?", product_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})
app.get('/editproduct/:product_id',(req,res)=>{
  const product_id = req.params.product_id
  db.query("SELECT * FROM product WHERE product_id = ?",product_id,(err,result)=>{
    if (err){
      console.log(err)
    }else{
      res.send(result)
    }
  })
  
})

app.put('/update/:product_id',(req,res)=>{
  
  const sql = "UPDATE product SET product_name = ? WHERE product_id =?"
  
  const product_id =req.params.product_id;
  db.query(sql,[req.body.product_name,product_id],(err,result)=>{
    if(err) return res.json("error") 
    return res.json({updated: true})
  })  

})

// app.put('/update',(req,res)=>
// {
//   const product_id = req.body.product_id
//   const product_img = req.body.product_img;
//   const product_name = req.body.product_name;
//   const product_type = req.body.product_type;
//   const product_brand = req.body.product_brand;
//   const product_detail = req.body.product_detail;
//   const product_price = req.body.product_price;
//   const product_number = req.body.product_number;
//   db.query("UPDATE product SET product_name = ?, product_type= ?,product_brand = ?,product_detail = ?,product_price=? ,product_number = ? WHERE product_id = ?",
//   [product_name,product_type,product_brand,product_detail,product_price,product_number,product_id],(err,result)=>{
//     if(err)
//     {
//       console.log(err)

//     }else{
//       res.send(result);
//     }
//   })
// })




////////////////Quatation////////////////


app.get('/get/quotation', (req, res) => {
  db.query("SELECT * FROM quotation", (err, result) => {
    if (err) {
      console.log(err);

    } else {
      res.send(result);
    }
  });

});

app.post("/post/create", (req, res) => {


  const title_quotation = req.body.title_quotation;
  const date_ = req.body.date_;
  const id_tax_user = req.body.id_tax_user;
  const id_tax_admin = req.body.id_tax_admin;
  const annotation = req.body.annotation;
  const phone_admin = req.body.phone_admin;
  const phone_user = req.body.phone_user;
  const address_user = req.body.address_user;
  const email = req.body.email;


  db.query(
    "INSERT INTO quotation (title_quotation,date_,id_tax_user,id_tax_admin,annotation,phone_admin,phone_user,address_user,email) VALUES(?,?,?,?,?,?,?,?,?) ",
    [title_quotation, date_, id_tax_user, id_tax_admin, annotation, phone_admin, phone_user, address_user, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});



app.delete('/delete/quotation/:no_quotation', (req, res) => {
  const no_quotation = req.params.no_quotation;
  db.query("DELETE FROM quotation WHERE no_quotation = ?", no_quotation, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

////////////////Employee////////////////

app.get('/get/employee', (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);

    } else {
      res.send(result);
    }
  });

});

app.post("/post/employee", (req, res) => {


  const employee_name = req.body.employee_name;
  const employee_surname = req.body.employee_surname;
  const employee_phone = req.body.employee_phone;
  const employee_position = req.body.employee_position;



  db.query(
    "INSERT INTO employee (employee_name,employee_surname,employee_phone,employee_position) VALUES(?,?,?,?) ",
    [employee_name,employee_surname,employee_phone,employee_position],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});



app.delete('/delete/employee/:id', (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employee WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.listen('3001', () => {
  console.log('server is running on port 3001');
}) 