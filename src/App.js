// let currentSlideID = 1;
// let nxtBtn = document.getElementById('nexti');
// let prevBtn = document.getElementById('previ');
// let sliderElement = document.getElementById('slider');
// let totalslides = sliderElement.childElementCount;
// console.log(totalslides);

// nxtBtn.addEventListener('click', next);

// prevBtn.addEventListener('click', prev);

// function next() {
//   if (currentSlideID < totalslides) {
//     currentSlideID++;
//     showSlide();
//   }
// }
// function prev() {
//   if (currentSlideID > 1) {
//     currentSlideID--;
//     showSlide();
//   }
// }
// function showSlide() {
//   slides = document.getElementById('slider').getElementsByTagName('li');
//   for (let index = 0; index < totalslides; index++) {
//     const element = slides[index];
//     if (currentSlideID === index + 1) {
//       element.classList.remove('hidden')
//     }
//     else {
//       element.classList.add('hidden')
//     }
//   }
// }

let index = 0;
displayImages();
function displayImages() {
  let i;
  const images = document.getElementsByClassName("image");
  for (i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }
  index++;
  if (index > images.length) {
    index = 1;
  }
  images[index - 1].style.display = "block";
  setTimeout(displayImages, 5000);
}

let suggestions = [
  "Insecticides",
  "Growth Promoter"
]

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e) => {
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if (userData) {
    icon.onclick = () => {
      webLink = `https://www.google.com/search?q=${userData}`;
      linkTag.setAttribute("href", webLink);
      linkTag.click();
    }
    emptyArray = suggestions.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      // passing return data inside li tag
      return data = `<li>${data}</li>`;
    });
    searchWrapper.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active"); //hide autocomplete box
  }
}

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  icon.onclick = () => {
    webLink = `https://www.google.com/search?q=${selectData}`;
    linkTag.setAttribute("href", webLink);
    linkTag.click();
  }
  searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join('');
  }
  suggBox.innerHTML = listData;
}
