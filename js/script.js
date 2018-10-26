window.onload = init;
   
function init() {
    let todoList = {
        listHTML: document.getElementById("todoList"),
        listTask: [],
        add(task, priority = false) {
            let element = document.createElement("li");
            let p = document.createElement("p");
            p.innerText = task;
            p.style.textDecoration = "none";
            element.appendChild(p);
            element.style.display = "flex";
            // Añadir un boton para marcar de finalizado
            let complete = document.createElement("input");
            complete.type = "button";
            complete.value = "Finalizado";
            complete.style.margin = "0.5em";
            complete.addEventListener("click", function(){
                let texto = this.parentNode.firstChild;
                if (texto.style.textDecoration == "none"){
                    texto.style.textDecoration = "line-through";
                }
                else {
                    texto.style.textDecoration = "none";
                }
            });
            // Elmine de la lista
            let drop = document.createElement("input");
            drop.type = "button";
            drop.value = "Borrar";
            drop.style.margin = "0.5em";
            drop.addEventListener("click", function(){
                let parent = this.parentNode.parentNode;
                parent.removeChild(this.parentNode);
            });
            element.appendChild(complete);
            element.appendChild(drop);
            if (priority) {
                this.listTask.unshift({
                    element,
                    task
                });
                this.listHTML.insertBefore(element, this.listHTML.childNodes[0]);
            } 
            else {
                this.listTask.push({
                    element,
                    task
                });
                this.listHTML.appendChild(element);
            }
        }
    }

    let form = document.managerTask;
    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        let task = form.task.value;

        let validTask = /.{2,}/;
        if (!validTask.test(task)) {
            console.log("Ingrese una descripcion clara");
            return false;
        }

        todoList.add(task, form.important.checked);

    });
}