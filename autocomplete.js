const createAutoComplete = ({ 
  root, //element that the autocomplete should render into
  renderOption, //function that knows how to render item
  onOptionSelect, // function that gets invoked when user clicks an option
  inputValue, //what user inputs
  fetchData //function to find items
}) => {
root.innerHTML = `
<label><b>Search</b></label>
<input class="input" />
<div class="dropdown">
  <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
  </div>
</div>
`;

const input = root.querySelector("input");
const dropdown = root.querySelector(".dropdown");
const resultsWrapper = root.querySelector(".results");

//sets time interval. when the user stops typing fetchData request will be sent to api.
const onInput = async (event) => {
  const items = await fetchData(event.target.value);
  //if statement to close drop down menu if there is no text in input field
  if (!items.length) {
    dropdown.classList.remove("is-active");
    return;
  }

  //creates element to render image of movie poster in drop down widget
  resultsWrapper.innerHTML = "";
  dropdown.classList.add("is-active");
  for (let item of items) {
    const option = document.createElement("a");

    option.classList.add("dropdown-item");
    option.innerHTML = renderOption(item);
     //function that removes drop down list once option is clicked and changes input of selected title
    option.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = inputValue(item);
      onOptionSelect(item);
    });

    resultsWrapper.appendChild(option);
  }
};

input.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});
};