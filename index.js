//Agregar estrellas de favoritos(Solo agrega la estrella, no acutaliza los datos de favoritos)
window.addEventListener("DOMContentLoaded",()=>{
     //Star
     const startButton = document.querySelectorAll('.star');

     startButton.forEach((star, index) => {
         star.addEventListener('click', function() {
             startButton.forEach(s => s.classList.remove('checked'));

             for (let i = 0; i <= index; i++) {
                 startButton[i].classList.add('checked');
            }
        });
    });
})

//Nivel de Prioridad
    // 1: es urgente 
    // 2: es muy importante
    // 3: es importante
    // 4: es medio importante
    // 5: no es tan importante

    const tarea = document.getElementById('task');
    const prioridad = document.getElementById('priority');
    const tareas = document.getElementById('tasked');
    const lista = document.getElementById('list');

    let tasks = [];

    tarea.addEventListener('submit',(e)=>{
        e.preventDefault();

        const tareasInput = tareas.value.trim();
        const prioridades = parseInt(prioridad.value);

        if (!tareasInput) {
            alert('Por favor, escribe una tarea.');
            return;
        }
        
        let prioridadNivel = {
            id : Date.now(),
            text : tareasInput,
            priority : prioridades,
        }

        tasks.push(prioridadNivel);
        ordenarTareas();
        renderizarTareas();

        tareas.value = '';
        prioridad.value = '1';
    });

    //Ordenar Tareas
    function ordenarTareas(){
        tasks.sort((a,b) => a.priority - b.priority);
    }

    const renderizarTareas = () => {
        lista.innerHTML = '';

        tasks.forEach((task)=>{
            const li = document.createElement('li');
            //ESTO ES PARA IDENTIFICA EL NIVEL DE PRIORIDAD QUE TIENE LA TAREA
            li.innerHTML += `
                <span>${task.text}(PRIORIDAD: ${task.priority === 1 ? 'URGENTE' : task.priority === 2 ? 'ALTA' : task.priority === 3 ? 'IMPORTANTE' : task.priority === 4 ? 'MEDIO' : 'BAJO'})</span>
                <div> 
                    <span class="edit" onclick="editarTarea(${task.id})">✏️</span>
                    <span class="delete" onclick="eliminarTarea(${task.id})">❌</span>
                </div>
            `;
            lista.appendChild(li)
        }); 
    }

    //EDITAR LAS TAREAS
    const editarTarea = (id) => {
        const tarea = tasks.find((task) => task.id === id);

        if (tarea) {
            const newText = prompt('Editar tarea: ', tarea.text);
            const newPrioridad = prompt('Editar prioridad: ',tarea.priority)
            if (newText && newPrioridad !== null) {
                tarea.text = newText;
                tarea.priority = parseInt(newPrioridad);
                ordenarTareas();
                renderizarTareas();
            }
        }
    }

    //Eliminar tarea
    function eliminarTarea(id) {
        tasks = tasks.filter((task) => task.id !== id); 
        renderizarTareas();
    }
