const toolCollectionDiv = document.querySelector("#tool-collection")
const selectDropDown = document.getElementById("selectToolMenu");
const nameNumberArray = []

// fetch tools from db.json and render each one into it's own card
function fetchAndRenderTools () {
fetch("http://localhost:3000/tools")
.then(response => response.json())
.then( (someData) => {
  
  //make the json data usable in this funciton
  const arrayOfToolObjects = someData
  toolCollectionDiv.innerHTML = ""
  
  //creates an array of the tools that have the status of "Available"
  const justAvailableNames = arrayOfToolObjects.filter(status => status.availability === "Available");
  //takes the complete tool from justAvailableNames and makes it into an array of just the names of the tools
  const namesArray = justAvailableNames.map(each => each.name);
  
 //populate the dropdown menu with the names of the available tools
  selectDropDown.innerHTML = "";
  for (var j = 0; j < namesArray.length; j++) {
    let option = document.createElement("option");
    option.text = namesArray[j];
    option.value = namesArray[j];
    selectDropDown.add(option);
  }

  //makes the name, id number, and phone number of each tool available in the global
  for (k = 0; k < arrayOfToolObjects.length; k++) {
    nameNumberArray.push(`${arrayOfToolObjects[k].name} : ${arrayOfToolObjects[k].id} : ${arrayOfToolObjects[k].phonenumber}`)
  }

  //creates a card for each tool
  arrayOfToolObjects.map(  
    
    (eachToolObject)=>{
      const divForToolCard = document.createElement("div")
        divForToolCard.className = "card"
      const h2ForToolCard = document.createElement("h2")
        h2ForToolCard.textContent = eachToolObject.name
      const imageForToolCard = document.createElement("img")
        imageForToolCard.src = eachToolObject.image
        imageForToolCard.className = "tool-avatar"
       const pTagForToolCard = document.createElement("p")
         pTagForToolCard.textContent = `${eachToolObject.availability}`
         const pTagForDescription = document.createElement("p")
         pTagForDescription.textContent = eachToolObject.useDescription
         pTagForDescription.style.display = "none"
      divForToolCard.addEventListener("mouseover", function() {
       pTagForDescription.style.display = "block"
      })
      divForToolCard.addEventListener("mouseleave", function() {
        pTagForDescription.style.display = "none"
      })
      divForToolCard.append(h2ForToolCard , imageForToolCard , pTagForToolCard, pTagForDescription)

      toolCollectionDiv.append(divForToolCard)
  })})}
  
fetchAndRenderTools()

//"click" event listener
const selectButton = document.getElementById("reserveToolButton");
  selectButton.addEventListener("click", function() {
    const item = selectDropDown.value
    
    const filteredArray = nameNumberArray.filter(string => string.includes(item));
    let last12 = filteredArray[0].substr(filteredArray[0].length - 12);
    alert(`You have successfully reserved a ${selectDropDown.value}\nPlease call ${last12} to arrange a pickup and dropoff`);
    
    const start = filteredArray[0].indexOf(":") + 1;
    const end = filteredArray[0].lastIndexOf(":");
    const filteredId = parseInt(filteredArray[0].slice(start, end));

    //let filteredId = filteredArray[0].charAt(filteredArray[0].length - 16);
    
    fetch(`http://localhost:3000/tools/${filteredId}`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      availability: 'Reserved'
  })
})
  .then(response => response.json())
  .catch(error => console.error(error));
   fetchAndRenderTools()
  }
  );

  const submitForm = document.getElementById("submitToolForm");

  submitForm.addEventListener("submit", function(e) {
    
    const formElements = e.target.elements;

    for (let i = 0; i < formElements.length; i++) {
      if (!formElements[i].value) {
        e.preventDefault();
        return;
      }
    }
   
    const submittedObject = {
      name:e.target[0].value, 
      image:e.target[1].value,
      availability:"Available",
      phonenumber:e.target[2].value,
      useDescription:e.target[3].value
    }

    fetch("http://localhost:3000/tools", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
        Accept: "application/json"
      },
      body: JSON.stringify(submittedObject)
    })
    .then(response => response.json())
    .then( () => fetchAndRenderTools())
  })