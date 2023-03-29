document.addEventListener("DOMContentLoaded",()=>{
    showRamen()
    NewRamenEvent()
})

function showRamen(){
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(ramens => {
        ramens.forEach(ramen => renderRamen(ramen))
        displayDetails(ramens[0])
    })
}

function renderRamen(ramen){
    const ramenMenu = document.getElementById("ramen-menu")
    const img = document.createElement("img")
    const div = document.createElement("div")

    img.src = ramen.image
    ramenMenu.append(div)
    div.append(img)

    img.addEventListener("click", ()=> displayDetails(ramen))

    const btn = document.createElement("button")
    btn.textContent = "Remove Ramen"
    btn.className = "delete-btn"
    div.append(btn)

    btn.addEventListener("click", ()=> {removeRamen(ramen.id, div)}
    )
}

function displayDetails(ramen){
    const ramenImage = document.getElementById("image")
    const ramenName = document.getElementById("name")
    const ramenRestaurant = document.getElementById("restaurant")
    const ramenRating = document.getElementById("rating-display")
    const ramenComment = document.getElementById("comment-display")

    ramenImage.src = ramen.image
    ramenName.textContent = ramen.name
    ramenRestaurant.textContent = ramen.restaurant
    ramenRating.textContent = ramen.rating
    ramenComment.textContent = ramen.comment
}

function addNewRamen(){
    const newName = document.getElementById("new-name").value
    const newRestaurant = document.getElementById("new-restaurant").value
    const newImage = document.getElementById("new-image").value
    const newRating = document.getElementById("new-rating").value
    const newComment = document.getElementById("new-comment").value

    const newRamen ={
        "name": newName,
        "restaurant": newRestaurant,
        "image": newImage,
        "rating": newRating,
        "comment": newComment
    }

    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({newRamen})
    })
    renderRamen(newRamen)
    displayDetails(newRamen)
}

function NewRamenEvent(){
    const ramenForm = document.getElementById("new-ramen")
    ramenForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        addNewRamen()
        ramenForm.reset()
    })
}

//needs to click twice on delete to delete div of new ramen

function removeRamen(id, ramen){
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(() => {
        ramen.remove()
        // location.reload()
    })
}


