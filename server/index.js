const express = require ("express");
const app = express();
const mysql = require ("mysql2");
const cors = require ("cors");


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost' ,
    user: 'root',
    password: 'root',
    database:'empleados_crud',
    port: 3306
}
);

//insertar datos a la tabla EMPLEADOS
app.post("/create",(req,res)=>{

    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios= req.body.anios;
    
    db.query('INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES (?,?,?,?,?)' ,[nombre, edad, pais, cargo, anios],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }


    );
});

//listar datos de la tabla EMPLEADOS
app.get("/empleados",(req,res)=>{
    
    db.query('SELECT * FROM empleados',
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result); 
            }
        }


    );
});

//para actualizar datos de la tabla empleados
app.put("/update",(req,res)=>{
    const idEmpleados = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios= req.body.anios;
    
    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE idEmpleados=?' ,[nombre, edad, pais, cargo, anios, idEmpleados],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    );
});

//para eliminar datos de la tabla empleados
app.delete("/delete/:id",(req,res)=>{
    const idEmpleados = req.params.id;
    
    db.query('DELETE FROM empleados WHERE idEmpleados=?' ,idEmpleados,
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    );
});

app.listen(3001, ()=> {
    console.log("corriendo en el puerto 3001")
});