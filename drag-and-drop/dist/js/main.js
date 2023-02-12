const draggableList = document.getElementById("draggable-list")
const check = document.getElementById("check")

const deepestLakes = [
  "Lake Baikal",
  "Lake Tanganyika",
  "Caspian Sea",
  "Lake Vostok",
  "San Martín Lake",
  "Lake Nyasa",
  "Lake Ysyk",
  "Great Slave Lake",
  "Crater Lake",
  "Lake Matano",
]

const listItems = []

let dragStartIndex
createList()

function createList() {
  ;[...deepestLakes]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .forEach((lake, index) => {
      const listItem = document.createElement("li")

      listItem.setAttribute("data-index", index)
      listItem.setAttribute("style", "margin: 6px 0;")
      // listItem.classList.add("mx-2") // not sure why this doesn't work
      listItem.classList.add(
        "flex",
        "border-2",
        "rounded",
        "border-solid",
        "border-black"
      )

      listItem.innerHTML = `
        <span style="height: 40px; width: 40px" class="flex items-center justify-center bg-slate-300 mr-2">${
          index + 1
        }.</span>
        <div class="draggable flex items-center justify-between px-4 py-2" draggable="true">
          <p style="min-width: 220px; margin-left: 8px;" class="lake-name">${
            lake.value
          }</p>
          <i class="fa-solid fa-bars"></i>
        </div>
      `

      listItems.push(listItem)
      draggableList.appendChild(listItem)
    })

  addEventListeners()
}

function swapItems(startIndex, endIndex) {
  const itemOne = listItems[startIndex].querySelector(".draggable")
  const itemTwo = listItems[endIndex].querySelector(".draggable")

  listItems[startIndex].appendChild(itemTwo)
  listItems[endIndex].appendChild(itemOne)
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index")
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop() {
  const dragEndIndex = +this.closest("li").getAttribute("data-index")
  swapItems(dragStartIndex, dragEndIndex)
  this.classList.remove("over")
}

function dragEnter() {
  this.classList.add("over")
}

function dragLeave() {
  this.classList.remove("over")
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable")
  const dragListItems = document.querySelectorAll(".draggable-list li")

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart)
  })

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver)
    item.addEventListener("drop", dragDrop)
    item.addEventListener("dragenter", dragEnter)
    item.addEventListener("dragleave", dragLeave)
  })
}

function checkOrder() {
  listItems.forEach((item, index) => {
    const lakeName = item.querySelector(".lake-name").innerText.trim()
    if (deepestLakes[index] !== lakeName) {
      item.classList.add("wrong")
    } else {
      item.classList.remove("wrong")
      item.classList.add("right")
    }
  })
}

check.addEventListener("click", checkOrder)
