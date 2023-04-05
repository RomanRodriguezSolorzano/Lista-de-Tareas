require('colors');
let opcs;  
const mostrarMenu = () =>{       
    console.clear();
    console.log('================================'.bgBrightRed);
    console.log('     Seleccione una opcion:     '.bgBrightRed);
    console.log('================================'.bgBrightRed);

    console.log(`${'1.'.brightRed} Crear tarea`);
    console.log(`${'2.'.brightRed} Listar tarea`);
    console.log(`${'3.'.brightRed} Listar tarea completadas`);
    console.log(`${'4.'.brightRed} Listar tarea pendientes`);
    console.log(`${'5.'.brightRed} Completar tarea(s)`);
    console.log(`${'6.'.brightRed} Borrar tareas`);
    console.log(`${'0.'.brightRed} Salir\n`);

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Seleccione una opcion: ',opc=>{
        opcs = opc;
        console.log({opc});
        readline.close();
    })          
}



module.exports = mostrarMenu;