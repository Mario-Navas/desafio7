// ---------------------- Modulos ----------------------
const express = require('express');
const bodyParser = require('body-parser');

// ---------------------- Instancia de express ----------------------/
const app = express();

// para cargar productos ejemplos en memoria
const productos = require('./productos.json');
const carrito = []

// ---------------------- Middlewares ---------------------- /
app.use(express.static('public'));
// para que utilice body-parser como método de parseo de las request
app.use(express.json())   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//------ Plantillas
// Se indica la carpeta donde se almacenarán las plantillas 
app.set('views', './views');
// Se indica el motor del plantillas a utilizar
app.set('view engine', 'ejs');


// ---------------------- routers ----------------------/
const routerproductos = express.Router();
const routercarrito = express.Router();
app.use('/api/productos', routerproductos);
app.use('/api/carrito', routercarrito);


//  Muestra producto segun la id que recibe   /
app.get('/:id', (req, res)=>{
    for (const producto of Object.keys(productos)) {
        for (const producto of Object.keys(productos)) {
            if (producto.id=2) {
                res.status(200).json({msg:'Producto get', producto})
            }
        }
        }
    })

app.get('/', (req, res) => {
    res.render('inicio', { productos });
});
 
/*
routercarrito.post("/agregar/:id_producto", async (req, res) => {
      const newProduct = await products.getProductById(id)
      if (newProduct) {
        const result = await cart.addProduct({
          timestamp: new Date().toLocaleString(),
          producto: newProduct,
          quantity,
          email,
          address,
        })
        res.send(result)
      } else {
        res.send("El producto no existe, no se puede agregar al carrito.")
      }
    } else {
      res.send("No esta logueado")
    }
  })

*/
// Muestra todos los productos
//router.get('/', (req, res)=>{
//    res.status(200).json({msg:'Total de Productos ingresados', productos});
//});

//   Obtiene nuevo producto del formulario de entrada 
//   genera su id y lo agrega al array existente   
routerproductos.post('/guardar', (req, res)=>{
    // obtengo el ultimo id
    let orden = 1;
    for (const producto of Object.keys(productos)) {
        orden += 1;
    }
    // obtiene producto de formulario html
    let producto = {
//        TimeStamp: req.body.timeStamp,
        TimeStamp: Date.now(),
        Nombre: req.body.nombre,
        Descripcion: req.body.descripcion,
        Codigo: req.body.codigo,
        Foto: req.body.foto,
        Precio: req.body.precio,
        Stock: req.body.stock,
        Id: orden
    }
//    res.status(200).json({msg:'Producto  recibido', producto: producto});
    // Agrega producto recibido al array de productos
    productos.push(producto);
//    res.status(200).json({msg:'Total de Productos ', productos});
    res.redirect('/')

//console.log(productos)

});



//  Elimina un producto por su id
routerproductos.delete(':id', (req, res)=>{
    const borrar = productos.find((m) => m.id == id)
    if (borrar=0) {
         res.send('Producto no encontrado')    
    } else {
        productos.splice(borrar, 1); 
    }
})


// Recibe un Producto y actualiza
routerproductos.put(':id', (req, res)=>{
    const buscar = productos.find((m) => m.id == id)
    for (const producto of Object.keys(productos)) {
    }
    if (borrar=0) {
        res.send('Producto no encontrado')    
    } else {

        let producto = {
            TimeStamp: req.body.TimeStamp,
            Nombre: req.body.nombre,
            Descripcion: req.body.Descripcion,
            Codigo: req.body.Codigo,
            Foto: req.body.Foto,
            Precio: req.body.precio,
            Stock: req.body.Stock,
            Id: orden
        }
    }
})

// ---------------------- Servidor ----------------------
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
})
module.exports = routerproductos;
module.exports = routercarrito;

