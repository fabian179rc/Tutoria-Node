import mongoose from "mongoose";

const URI = "URI";

mongoose.connect(URI, (error) => {
  if (error) {
    console.log(`Error de conexion a la base de datos: ${error}`);
  } else {
    console.log("Conexion a la base de datos exitosa");
  }
});
