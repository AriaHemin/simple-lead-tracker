
let myLeads = [];
const saveButton = document.querySelector("#saveButton");
const deleteButton = document.querySelector("#deleteButton")
const input = document.querySelector("#inputElement");
const leadList = document.querySelector("#leadList");
const saveTabButton = document.querySelector("#saveTabButton");



const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));


if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}




saveTabButton.addEventListener("click", saveTab)
saveButton.addEventListener("click", save);
deleteButton.addEventListener("dblclick", deleteAll)

function save(){
    myLeads.push(input.value);
    input.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    

    render(myLeads)
    

}

function saveTab(){
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        
        render(myLeads)

    })


}

function render(a){
    leadList.innerHTML = ""

    for(let i = 0; i < a.length; i++){
        let link = document.createElement("a");
        let lead = document.createElement('li');
        link.textContent = a[i];
        link.href = a[i];
        link.target = "_blank";
        leadList.appendChild(lead);
        lead.appendChild(link);
    }


}

function deleteAll(){
    localStorage.clear("myLeads")
    myLeads = [];
    render(myLeads)

}


