import './App.css';
import {useState} from "react";
import Axios from "axios";
//importacion de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//importación de alertas
import Swal from 'sweetalert2';

function App() {

  //metodo para ingreso de datos
  const[nombre,setNombre] = useState("");
  const[edad,setEdad] = useState();
  const[pais,setPais] = useState("");
  const[cargo,setCargo] = useState("");
  const[anios,setAnios] = useState();
  const[id,setId] = useState();
  //para editar datos
  const[editar,setEditar] = useState(false);

  //metodo para mostrar lista de empleados desde BD
  const [empleadosList,setEmpleados] = useState([]);

  //funcion para boton de ingreso de datos
  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      //para listar los empleados despues de realizar un registro
      getEmpleados();
      //para limpiar campos
      limpiarCampos ();
      //mensaje de ingreso de datos
      Swal.fire({
        title: "<strong>Registro realizado</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue registrado con éxito</i>",
        icon: 'success',
        timer: 3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error).message)
      });
    });
  }

  //para actualizar la informacion con el boton
  const update = ()=>{
    Axios.put("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      //para listar los empleados despues de realizar un registro
      getEmpleados();
      //para limpiar campos
      limpiarCampos ();
      //mensaje de ingreso de datos
      Swal.fire({
        title: "<strong>Actualización exitosa</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue actualizado con éxito</i>",
        icon: 'success',
        timer: 3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error).message)
      });
    });
  }

  //para eliminar la informacion con el boton
  const deleteEmpleado = (val)=>{
    //mensaje de eliminación de datos
    Swal.fire({
      title: "Eliminar registro",
      html: "<i>¿Desea eliminar al empleado <strong>"+val.nombre+"</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar registro"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.idEmpleados}`).then(()=>{
          //para listar los empleados despues de realizar la eliminación
          getEmpleados();
          limpiarCampos();
          Swal.fire({
            title: "Eliminado",
            html: "<strong>"+val.nombre+"</strong> fue eliminado con éxito",
            icon: "success",
            timer: 3000
          });          
        }).catch(function(error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo eliminar el registro",
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error).message)
          });
        });
      }
    });
    
  }

  //para boton cancelar/limpiar formulario
  const limpiarCampos = ()=>{
    setId("");
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setEditar(false); //para regresar al boton registrar
  }

  //para editar
  const editarEmpleado = (val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.idEmpleados);

  }

  //para listar datos desde la BD
  const getEmpleados = ()=>{
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    });
  }
  //para tener siempre listado los empleados
  //getEmpleados();
  return (
    <div className="container">
      
      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE EMPLEADOS
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre: </span>
            <input type="text" 
            onChange={(event)=>{
              setNombre(event.target.value);
            }}
            className="form-control" value={nombre} placeholder="Ingrese su nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad: </span>
            <input type="number" 
            onChange={(event)=>{
              setEdad(event.target.value);
            }}
            className="form-control" value={edad} placeholder="Ingrese su edad" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País: </span>
            <input type="text" 
            onChange={(event)=>{
              setPais(event.target.value);
            }}
            className="form-control" value={pais} placeholder="Ingrese su país de origen" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo: </span>
            <input type="text" 
            onChange={(event)=>{
              setCargo(event.target.value);
            }}
            className="form-control" value={cargo} placeholder="Ingrese su cargo" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años: </span>
            <input type="number" 
            onChange={(event)=>{
              setAnios(event.target.value);
            }}
            className="form-control" value={anios} placeholder="Ingrese los años de experiencia" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar?
            <div>
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
            <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button> 
            </div>
            :<button className='btn btn-success' onClick={add}>Registrar</button> 

          }
          <br></br> <br></br>
          <button className='btn btn-primary' onClick={getEmpleados}>Listar</button>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años de experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val,key)=>{
              return <tr key={val.id}>
                  <th>{val.idEmpleados}</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anios}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" 
                        onClick={()=>{
                          editarEmpleado(val);
                        }}
                        className="btn btn-info">Editar</button>
                      <button type="button" 
                        onClick={()=>{
                          deleteEmpleado(val);
                        }}
                      className="btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>
            })
          }
          
        </tbody>
      </table>


    </div>
  );
}

export default App;
