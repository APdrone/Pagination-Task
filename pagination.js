const pageLinks = document.getElementsByClassName("page-item");
const activeClassPage = document.getElementsByClassName("active");


const createElement = (elementType, value = "") => {
  const temp = document.createElement(elementType);
  temp.innerHTML = value;
  return temp;
};

const createElementWithAttribute = (
  elementType,
  attributeType,
  attributeValue,
  value = ""
) => {
  const temp = document.createElement(elementType);

  temp.setAttribute(attributeType, attributeValue);
  temp.innerHTML = value;
  return temp;
};

const setElementAttribute = (elementType, attributeType, attributeValue) => {
  elementType.setAttribute(attributeType, attributeValue);
};

for (let item of pageLinks) {
  item.addEventListener("click", (event) => {
    console.log("clicked");
    console.log(event);
  });
}

const fetchJSONData = function (page, active) {
  let req = new XMLHttpRequest();

  req.open(
    "GET",
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
  );

  req.send();

  req.onload = function () {
    let data = JSON.parse(this.response);

    const docBody = document.getElementsByTagName("tbody");
    if (docBody) {
      docBody[0].innerHTML = "";
    }

    let counterLoop = page * 10;
    let initialvalue = Math.abs(counterLoop - 10);
    for (let i = initialvalue; i < counterLoop; i++) {
      const { id, name, email } = data[i];

      const tr2 = createElement("tr");

      const tr2th1 = createElementWithAttribute("th", "scope", "row", id);

      const tr2td1 = createElement("td", name);
      const tr2td2 = createElement("td", email);

      tr2.append(tr2th1, tr2td1, tr2td2);

      tbody.append(tr2);
    }

  };
};




const table = createElementWithAttribute("table", "class", "table");



const thead = createElementWithAttribute("thead", "class", "thead-dark");

const thr1 = createElement("tr");

const th1 = createElementWithAttribute("th", "scope", "col", "ID");
const th2 = createElementWithAttribute("th", "scope", "col", "Name");
const th3 = createElementWithAttribute("th", "scope", "col", "Email");

thr1.append(th1, th2, th3);
thead.append(thr1);


const tbody = createElement("tbody");

fetchJSONData(1);

table.append(thead, tbody);



const navElement = createElementWithAttribute(
  "nav",
  "aria-label",
  "Page_navigation"
);
let ulElement = createElementWithAttribute("ul", "class", "pagination");
let liElement = createElementWithAttribute("li", "class", "page-item");
let aElement = createElementWithAttribute(
  "a",
  "class",
  "page-link",
  "Previous"
);
setElementAttribute(aElement, "href", "#");
liElement.classList.add("disabled");
setElementAttribute(liElement, "id", "previous");

liElement.append(aElement);
ulElement.append(liElement);



for (let i = 1; i <= 10; i++) {
  liElement = createElementWithAttribute("li", "class", "page-item");
  aElement = createElementWithAttribute("a", "class", "page-link", i);
  i == 1 ? liElement.classList.add("active") : "";
  liElement.append(aElement);
  ulElement.append(liElement);
}

liElement = createElementWithAttribute("li", "class", "page-item");
aElement = createElementWithAttribute("a", "class", "page-link", "Next");

setElementAttribute(liElement, "id", "next");
liElement.append(aElement);
ulElement.append(liElement);

navElement.append(ulElement);

document.body.append(table, navElement);


const liList = document.getElementsByTagName("li");

for (let item of liList) {
  item.addEventListener("click", (event) => {
    let page = event.target.innerText;
    let activePage = activeClassPage[0].outerText;
    const previousBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("next");
    console.log(page, activePage);
    if (page !== activePage) {
      if (!(page.includes("Next") || page.includes("Previous"))) {
        // console.log("includes(['next', 'previous']");
        activeClassPage[0].classList.remove("active");
        event.target.parentElement.classList.add("active");
        fetchJSONData(page, activePage);
      }
      if (page === "Next" && Number(activePage) < 10) {
        page = Number(activePage) + 1;
        setPrevious(page);
        setNext(page);
        activeClassPage[0].nextElementSibling.classList.add("active");
        activeClassPage[0].classList.remove("active");
        fetchJSONData(page, activePage);
      }

      if (page === "Previous" && Number(activePage) > 1) {
        page = Number(activePage) - 1;
        const active = activeClassPage[0];
        const sibling = activeClassPage[0].previousElementSibling;

        console.log(active, sibling);

        sibling.classList.add("active");

        active.classList.remove("active");
        fetchJSONData(page, activePage);
        console.log("previousdebug", page, activePage);
        setPrevious(page);
        setNext(page);
      }

      function setPrevious(page) {
        if (page !== 1) {
          previousBtn.classList.remove("disabled");
        } else if (page === 1) {
          previousBtn.classList.add("disabled");
        }
      }

      function setNext(page) {
        if (page !== 10) {
          console.log("if next", typeof page, page);
          nextBtn.classList.remove("disabled");
        } else if (page === 10) {
          console.log("else next", typeof page, page);
          nextBtn.classList.add("disabled");
        }
      }
    }
  });
}
