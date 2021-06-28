'use strict'

let ToDoController = (function () {

    return {

        NewTask: () => {
            return class Task {
                constructor(Cat, TaskString, Place, Notfi, State = false) {
                    this.Cat = Cat;
                    this.TaskString = TaskString;
                    this.Place = Place;
                    this.Notfi = Notfi;
                    this.State = State;
                }
                Theme() {
                    if (this.Cat === "Business") {
                        this.icon = `<lord-icon src="https://cdn.lordicon.com//fhtaantg.json" trigger="loop"
                                    colors="primary:#30c9e8,secondary:#30c9e8" style="width:50px;height:50px">
                                </lord-icon>`
                    }
                    else if (this.Cat === "Activity") {
                        this.icon = `<lord-icon src="https://cdn.lordicon.com//hovbgwmd.json" trigger="loop"
                        colors="primary:#30c9e8,secondary:#30c9e8" style="width:50px;height:50px">
                    </lord-icon>`
                    }
                    else {
                        this.icon = ` <lord-icon src="https://cdn.lordicon.com//vieswnpa.json" trigger="loop"
                    colors="primary:#30c9e8,secondary:#30c9e8" style="width:50px;height:50px">
                     </lord-icon>`
                    }
                }

            }



        }
    }


})();


let UIController = (function () {


    let DOMstrings =

    {
        CatInput: '#category',
        TaskName: '#task-input',
        Place: '#location-input',
        Note: '#Notification',
        Add_btn: '.add-tak',
        BackCard: '.card-back',
        FortCard: '.card-front',
        back_F_Btn: '.fa-arrow-left',
        Form: 'form',
        Menu: '.todo-list',
        Perso: '.personal-number',
        Buis: '.business-number',
        time: '.time',
        Per: '.perc',
        DeleteBtn: '.fa-trash',
        NoteList: '.Note-list',
        Bell: '#bell',
        NoteNum: '.notification',
        NotePanel: '.Note-panel'
    }

    return {
        GetValue: () => {
            return {
                Cat: document.querySelector(DOMstrings.CatInput),
                TaskName: document.querySelector(DOMstrings.TaskName),
                Place: document.querySelector(DOMstrings.Place),
                NotificationInput: document.querySelector(DOMstrings.Note)
            }
        },
        PassInDom: () => DOMstrings,
    }


})();


let Controller = (function (DoControll, UIdo) {


    let DOMvalue = UIdo.GetValue(); // getting the values of the inputs

    let Dom = UIdo.PassInDom();    // getting the classes

    let ATask = DoControll.NewTask();   // creating a new Task from the class Task
    const Add_btn = document.querySelector(Dom.Add_btn);
    const BackCard = document.querySelector(Dom.BackCard);
    const FortCard = document.querySelector(Dom.FortCard);
    const back_F_Btn = document.querySelector(Dom.back_F_Btn);
    const form = document.querySelector(Dom.Form);
    const List = document.querySelector(Dom.Menu);
    const PorsonalNumber = document.querySelector(Dom.Perso);
    const BusinessNumber = document.querySelector(Dom.Buis);
    const Time = document.querySelector(Dom.time);
    const DonePerc = document.querySelector(Dom.Per);
    const NoteListUi = document.querySelector(Dom.NoteList);
    const NoteNumber = document.querySelector(Dom.NoteNum)
    const NotificationPanel = document.querySelector(Dom.NotePanel);
    const BellNote = document.querySelector(Dom.Bell);
    // array for Task Type
    let TaskMold =
    {
        Personal: 0,
        Business: 0,
    }

    BellNote.addEventListener('click', () => {
            NotificationPanel.classList.toggle('pop');
    })







    // btn for adding task
    form.onsubmit = (e) => {
        let New_task = new ATask(DOMvalue.Cat.value, DOMvalue.TaskName.value, DOMvalue.Place.value, DOMvalue.NotificationInput.value);
        New_task.Theme();

        if (Valid(DOMvalue.Cat.value && DOMvalue.TaskName.value && DOMvalue.Place.value, DOMvalue.NotificationInput.value)) {
            // this statement if/else for Task Type 


            if (New_task.Cat === 'Business') {
                TaskMold.Business++
            }
            else {
                TaskMold.Personal++
            }

            PorsonalNumber.textContent = TaskMold.Personal;

            BusinessNumber.textContent = TaskMold.Business;

            let Li = `
            <li class="todo-list-item" data-category="${New_task.Cat}">
               <div class="todo-icon">
           ${New_task.icon}
            </div>
            <div class="todo-task">
           <h3>${New_task.TaskString}</h3>
           <h4>${New_task.Place}</h4>
            </div>
            <div class="todo-del">
            <i class="fas fa-trash"></i>
                 </div>
             </li>`;
            ///
            let NoteLi = `<li class="Note-list-item">
            <div>
            <h3>${New_task.Notfi} </h3>
            </div>
            <div>
            <i class="far fa-bell" id="bell"></i>
            </div>
            </li>`
            NoteListUi.innerHTML += NoteLi;

            if (NoteListUi.childElementCount > 0) {
                NoteNumber.style.display = 'block';
                NoteNumber.textContent = NoteListUi.childElementCount;
            }

            ///
            // List.insertAdjacentHTML('afterbegin', Li)
            List.innerHTML += Li;
            // 
            let Item_List = document.querySelectorAll(`${Dom.Menu} li`);
            //const Delete = document.querySelectorAll(Dom.DeleteBtn);

            // giving each list item a event click so when it clicked it's done
            let Items = Array.from(Item_List);

            Items.forEach(item => {
                item.addEventListener('click', (e) => {
                    item.classList.toggle('done');
                    if (e.target.className === 'fas fa-trash') {
                        item.remove()
                    }
                })
            })
            ///
            let list_note = document.querySelectorAll('.Note-list-item');
            let Note_items = Array.from(list_note);
            Note_items.forEach(item => {
                item.addEventListener('click', () => {
                    item.remove()
                    NoteNumber.style.display = 'none';
                    NoteNumber.textContent = NoteListUi.childElementCount;
                })
            })

            //
            RestInput(DOMvalue)
            //go back to the front 
            Change()
        }

        else {
            alert('fill in the fields')
        }

        e.preventDefault();
    }




    // button for moving to back card

    Add_btn.addEventListener('click', () => {
        BackCard.classList.toggle('move');
        FortCard.classList.toggle('change');
    })

    // button for changing to front card

    back_F_Btn.addEventListener('click', Change)
    function Change() {
        BackCard.classList.toggle('move');
        FortCard.classList.toggle('change');
    }

    //Btn for add task 

    window.onload = () => {
        PorsonalNumber.textContent = 0;
        BusinessNumber.textContent = 0;
        const event = new Date(Date.UTC(2021, 5, 26, 0, 0, 0));

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        Time.textContent = event.toLocaleDateString('EN-US', options)
    }
    window.setInterval(() => {
        let DoneList = document.querySelectorAll(`${Dom.Menu} .done`);
        let Com = document.querySelector('.number');
        Com.textContent = DoneList.length;
        if (DoneList.length > 0) {
            DonePerc.textContent = `${((DoneList.length * 100) / (TaskMold.Business + TaskMold.Personal)).toFixed(1)}% done`;
            if (DoneList.length < 10) {
                Com.textContent = `0${DoneList.length}`;
            }
        }
        else {
            DonePerc.textContent = `0% done`;
        }
    }, 1000);



})(ToDoController, UIController)

//Reset function for input after adding task

function RestInput(In) {
    In.Cat.value = '';
    In.TaskName.value = '';
    In.Place.value = '';
    In.NotificationInput.value = ''
}

//form validation

function Valid(...Input) {
    for (let i = 0; i < Input.length; i++) {
        if (Input[i] === '') {
            return false;
        }
        if (Input[i].length < 7) {
            return false
        }
    }
    return true;

}
