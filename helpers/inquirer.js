const inquirer = require("inquirer");
require("colors");

const questions = [
  {
    type: "list",
    name: "opciones",
    message: `${"Elige alguna opcion".green}`,
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tarea`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tarea completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tarea pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tareas`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const menu = async () => {
  console.log("======================".bgBrightRed);
  console.log("   Elige una opcion   ".bgBrightRed);
  console.log("======================".bgBrightRed);
  const { opciones } = await inquirer.prompt(questions);
  return opciones;
};

const pausa = async () => {
  await inquirer.prompt([
    {
      type: "input",
      name: "Presionar",
      message: `\n\n${"Presione".blue} ${"ENTER".brightGreen} ${
        "para continuar".blue
      }\n\n`,
    },
  ]);
};

const linea = async (message) => {
  const descripcion = await inquirer.prompt([
    {
      type: "input",
      name: "descripcion",
      message,
      validate(desc) {
        if (desc == 0) return "No deje el campo vacio";
        return true;
      },
    },
  ]);
  return descripcion;
};

const listadoMenuBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    return {
      value: tarea.id,
      name: `${(i + 1 + ".").green} ${tarea.descripcion} ${
        tarea.CompleadoEn ? tarea.CompleadoEn.green : "Pendiente".red
      }`,
    };
  });

  choices.push({
    value: "0",
    name: `${"0.".green} Salir sin borrar`,
  });

  const { borrado } = await inquirer.prompt([
    {
      type: "list",
      name: "borrado",
      message: "Elige el que quieras BORRAR",
      choices,
    },
  ]);
  return borrado;
};

const confirmar = async () => {
  const { confirmar } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmar",
      message: "Esta seguro de borrar",
    },
  ]);
  return confirmar;
};

const listCompleadoschecked = async (tareas) => {
  const choices = tareas.map((tarea, i) => {
    return {
      value: tarea.id,
      name: `${(i + 1 + ".").green} ${tarea.descripcion}`,
      checked: tarea.CompleadoEn ? true : false,
    };
  });

  const { ids } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "ids",
      message: "Elige los que quieras seleccionar",
      choices,
    },
  ]);
  return ids;
};

module.exports = {
  menu,
  pausa,
  linea,
  listadoMenuBorrar,
  confirmar,
  listCompleadoschecked
};
