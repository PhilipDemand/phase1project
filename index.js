let tools = []
const toolCollectionDiv = document.querySelector("#tool-collection")

function fetchTools() {
    fetch("http://localhost:3000/tools")
    .then(response => response.json())
    .then( (someData) => {
      tools.push(...someData)
      renderToolCards()
      fillDropDown()
    })
}

fetchTools()

function renderToolCards() {
    toolCollectionDiv.innerHTML = ""
    tools.map(renderToolCard)
}

function renderToolCard(toolObject) {
  const divForToolCard = document.createElement("div")
            divForToolCard.className = "card"
          const h2ForToolCard = document.createElement("h2")
            h2ForToolCard.textContent = toolObject.name
          const imageForToolCard = document.createElement("img")
            imageForToolCard.src = toolObject.image
            imageForToolCard.className = "tool-avatar"
           const pTagForToolCard = document.createElement("p")
             pTagForToolCard.textContent = `${toolObject.availability}`
           const pTagForDescription = document.createElement("p")
             pTagForDescription.textContent = toolObject.useDescription
             pTagForDescription.style.display = "none"
          divForToolCard.addEventListener("mouseover", function() {
           pTagForDescription.style.display = "block"
          })
          divForToolCard.addEventListener("mouseleave", function() {
            pTagForDescription.style.display = "none"
          })
          divForToolCard.append(h2ForToolCard , imageForToolCard , pTagForToolCard, pTagForDescription)
          toolCollectionDiv.append(divForToolCard)
}

const selectDropDown = document.getElementById("selectToolMenu");
function fillDropDown(){
  selectDropDown.innerHTML = "";
  tools.map(
    (eachNameObject)=>{
      if(eachNameObject.availability === "Available") {
        const option = document.createElement("option");
        option.text = eachNameObject.name;
        option.value = eachNameObject.name;
        selectDropDown.add(option);
      }
    }
  )  
}

const selectButton = document.getElementById("reserveToolButton");
selectButton.addEventListener("click", function() {
    const item = selectDropDown.value
    const resultObject = tools.find(obj => {
        return Object.values(obj).some(name => name === item);
      });
    alert(`You have successfully reserved a ${item}\nPlease call ${resultObject.phonenumber} to arrange a pickup and dropoff`);
   
    fetch(`http://localhost:3000/tools/${resultObject.id}`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      availability: 'Reserved'
  })
})
  .then(response => response.json())
  .then(updatedTool => {
    tools = tools.map(tool => {
      if (tool.id === updatedTool.id) {
        return updatedTool
      } else {
        return tool
      }
    })
    renderToolCards()
    fillDropDown()
  })
  .catch(error => console.error(error))
  }
  );

  const submitForm = document.getElementById("submitToolForm");
  submitForm.addEventListener("submit", function(e) { 
    e.preventDefault()
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
    .then(newTool => {
      tools = [...tools, newTool]
        renderToolCard(newTool)
        fillDropDown()
      })
  }
  )
