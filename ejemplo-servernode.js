import express from "express";
import ProductManager from "./models/productManager.js";
const product = new ProductManager();

const app = express();
const PORT = 8080; //ideal para subir a la nube, crearlo en el .env e importarlo. (procces.env)
app.get("/", (req, res) => {
  try {
    //utilizamos try catch para manejar cualquier error que pueda surgir en el codigo y que el back no rompa. Si el cliente rompe el back con una consulta, toda la aplicacion se caeria. En esta forma, solo recibiriamos un mensaje de error que esa parte del codigo necesita revision, mientras el resto de la aplicacion se mantiene funcionando.
    console.log("Home");
    res.send("First Server with Express");
  } catch (error) {
    console.log(error); //En caso de utilizar next en la funcion, y un middleware de manejo de errores seria next(error).
  }
});

app.get("/products", async (req, res) => {
  console.log("Products"); //Linea innecesaria, pero por si quieren verlo por consola.
  const { limit } = req.query;
  let items; //se declara fuera del if, para utilizar en ambos casos. (no sirve const, let podes inicializarla sin valor. Const necesitas un valor.)

  try {
    if (!limit) {
      items = await product.getAllProducts(); //Array completo de productos
    } else {
      items = await product.getAllProducts().slice(0, limit); //Array hasta el limite
    }
    if (!items) return res.send("Products Not Found"); //Si la variable esta vacia se da error

    res.status(200).json(items); //Si tiene algun objeto se devuelve(esta devolucion sirve para ambos casos, ya que se guarda el valor correspondiente de cualquiera de las dos consultas, se coloca fuera del if para evitar colocar 2 veces la linea que hace lo mismo.)
  } catch {
    console.log(error);
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  let oneProduct = await product.getProductById(Number(id));
  try {
    if (!product) {
      res.status(400).send("Id Not Found");
    } else {
      res.status(200).json(oneProduct);
      console.log("product return");
    }
  } catch {
    console.log(error);
  }
});

app.listen(PORT, () => {
  //buena practica utilizar variable para el puerto(facilitara mas adelante la carga del server a la nube, lo ideal es hacerlo en el .env)
  console.log(`Server running in PORT ${PORT}`);
});
