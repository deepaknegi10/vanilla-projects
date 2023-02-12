const searchInput = document.getElementById("search")
const matchList = document.getElementById("match-list")

async function searchStates(value) {
  const res = await fetch("data/states.json")
  const states = await res.json()

  let filteredStates = states.filter((state) => {
    var regex = new RegExp(`^${value}`, "gi")
    return state.name.match(regex) || state.abbr.match(regex)
  })

  if (!value) filteredStates = []
  outputHtml(filteredStates)
}

const outputHtml = (matches) => {
  if (matches.length > 0) {
    console.log(matches)
    const html = matches
      .map(
        (match) => `
      <div class="w-full text-black bg-slate-200 my-0.5 px-6 py-2 rounded-sm">
        <h4>${match.name} (${match.abbr}) <span class="italic font-medium text-slate-400 text-lg">${match.capital}</span></h4>
      </div>
    `
      )
      .join("")

    matchList.innerHTML = html
  } else {
    matchList.innerHTML = ""
  }
}
searchInput.addEventListener("input", () => searchStates(searchInput.value))
