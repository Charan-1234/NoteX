const addBtn=document.querySelector('#add');
const  updateLSData = () => {
    const textAreaData=document.querySelectorAll('textarea')//query selector all because of when we clicking the add note it becomes multiple notes
    //so that querySelectorAll selects the all textarea data
    //textAreaData are stored in the form of array  because we using querySelectorAll
    const nwArr=[]; //we are creating empty array
    //next step is adding user entered data in the text area added individual one by one to the nwArr[]

    //the textArea is a array we want to get the data in the array
    //the we have foreach,for in,for of loop in this for each is better
    //for each we have three argument inside for each loop curElement,index number,arr,this 
    console.log(textAreaData);
    textAreaData.forEach((ele) => {
        return nwArr.push(ele.value); // we adding element to the nwArr using push method
        //when we working with text area or input form if we want the its inside data then we writing .value

    });//ele is the element of the each text area
    console.log(nwArr);
    localStorage.setItem('nwArr',JSON.stringify(nwArr));//adding the data to the local storage use setItem()
    //we store in the form of key value pair
    //first data inside setItem is array that is nwArr
    //the second data is always string we not add array or object
    //so that we using json

    
    
    
    
}


const addNewNote = (text='') => { //using text for toggling writing or saving it also specify that only typing 

    const note=document.createElement('div');//creating a div
    note.classList.add('note-outer');//adding the classs of the div
    const htmlData=`<div class="note">
    <div class="operation">
        <button class="edit"><i class="fas fa-edit fa-2x"></i></button>
        <button class="delet"><i class="fas fa-trash-alt fa-2x"></i></button>

    </div>
    <div class="main ${text ? "":"hidden"}"> 

    </div>
    <textarea class="${text ? "hidden" :"" }"></textarea>
   </div>`;//adding the html elemment inside the note-outer class in .main class ${} written for if the data is present or not
    //if the data is already present then it is saved so we hidden the textarea
    //if the data is empty this means we have to added a data /then we hidden the main div
   
    //${text ? "":"hidden"} if there is no text the then the condition become false we not ading any class  so " " and hidden the main
    //${text ? "hidden" :"" } if there is a text then condition becomes true means we retten "hidden" in true case it hidden the text area
    note.insertAdjacentHTML('afterbegin',htmlData);//passing the created htmlData  to the inside the created div note
    //console.log(note);
    
    document.body.appendChild(note); //appendChild() method appends the node as the last child of a node

    //getting the refferences for edit and delete button when we clicking edit it act as edit and save functionality
    const editBtn=note.querySelector('.edit');//here documement.query selector not used because the edit button inside the note
    const deletBtn=note.querySelector('.delet');
    const mainDiv=note.querySelector('.main');
    const textarea=note.querySelector('textarea');

    //deleting the node
    deletBtn.addEventListener('click',() => {
        note.remove();
        updateLSData();//after clicking delete button show the  update remaining data 
        //after deleting the data
        //again it get the available text area data
        //it adds the the data to nwArr key value pair
        //so that it is also delete from  the local storage
    } );

    //togle using edit icon(toggle means edit and save)

    textarea.value=text;
    mainDiv.innerHTML=text;

    //togle using edit button
    editBtn.addEventListener('click',() => {
        mainDiv.classList.toggle('hidden');//toggle is used if the class is hidden then unhide or class is not hidden then add it
        textarea.classList.toggle('hidden');
    })


    textarea.addEventListener('change',(event) => {
        const textval=event.target.value;
        //console.log(textval);
        mainDiv.innerHTML=textval;//adding the text area data to the main div
        //what we written in the text area we are saved in the local storage
        

        
        
        
        updateLSData();
    })
    //how to store entered data in a locally storage
    //The local storage and the session storage  properties allows to save key value pairs in the we browser
    //The local storage object stores the data with no expiration date.
    //The data will not be deleted when the browser is closed and available the next day week or the year
}

//getting data back to the local storage
//local storage data in the form of  string
//we have to parse the data because our getting data will be in the form of object or array
const getLocDta=JSON.parse(localStorage.getItem('nwArr'));//getting the value of the key from the local storage
if(getLocDta){ getLocDta.forEach((css) => addNewNote(css))};

addBtn.addEventListener('click', () => addNewNote() );