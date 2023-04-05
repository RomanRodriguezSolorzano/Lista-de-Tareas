require('colors');
const Tarea = require('./tarea');


class Tareas {

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }

    }

    cargarTareasFromArray( tareas = [] ) {
        
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(id => {
            listado.push(this._listado[id]);
        });
        return listado;
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    get listadoCompleto() {
        let listado = '\n';

        this.listadoArr.forEach((tarea, i) => {
            const estado = (tarea.CompleadoEn) ?
                `${'Completada'.green}` :
                `${'Pendiente'.red} `
            listado += `  ${((i+1)+".").green} ${tarea.descripcion} :: ${estado} \n\n`
        })
        return listado;
    }

    listadoPenCom= (completado) =>{
        let lista = '\n';
        let i = 1;
        this.listadoArr.forEach((tarea) => {
            if (completado){
                if(tarea.CompleadoEn){ 
                lista += `  ${((i)+".").green} ${tarea.descripcion} :: ${tarea.CompleadoEn.green} \n\n`;
                i++;
                }}
            else{
                if(!tarea.CompleadoEn){
                lista += `  ${((i)+".").green} ${tarea.descripcion} :: ${'Pendiente'.red} \n\n`;
                i++;
                }}
        })
        return lista;
    }


    ConfirmarTareas(ids=[]){
        ids.forEach(id => {
            if(!this._listado[id].CompleadoEn)
                this._listado[id].CompleadoEn = new Date().toISOString();
        })

        this.listadoArr.forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].CompleadoEn = null;
            }
        })

    }

}



module.exports = Tareas;