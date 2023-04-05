require("colors");
const { guardarDB, leerDB } = require("./helpers/control_db");
const {
  menu,
  pausa,
  linea,
  listadoMenuBorrar,
  confirmar,
  listCompleadoschecked
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  let opc = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }
  do {
    console.clear();
    opc = await menu();
    switch (opc) {
      case "1":
        const { descripcion } = await linea(`${"Describe la tarea:".blue}`);
        tareas.crearTarea(descripcion);
        break;
      case "2":
        console.log(tareas.listadoCompleto);
        break;
      case "3":
        console.log(tareas.listadoPenCom(true));
        break;
      case "4":
        console.log(tareas.listadoPenCom(false));
        break;
      case "5":
        const ids = await listCompleadoschecked(tareas.listadoArr);
        tareas.ConfirmarTareas(ids);
        break;
      case "6":
        const id = await listadoMenuBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("¿Está seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;
    }
    guardarDB(tareas.listadoArr);
    await pausa();
  } while (opc !== "0");
};

main();
