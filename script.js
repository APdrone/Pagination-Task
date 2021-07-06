//Table

const table = createElementWithAttribute("table", "class", "table");
table.classList.add("table-striped");
table.style.color = "#3295FF";

//thead

const thead = createElementWithAttribute("thead", "class", "thead-dark");

const thr1 = createElement("tr");

const th1 = createElementWithAttribute("th", "scope", "col", "ID");
const th2 = createElementWithAttribute("th", "scope", "col", "Name");
const th3 = createElementWithAttribute("th", "scope", "col", "Email");

thr1.append(th1, th2, th3);
thead.append(thr1);

//tbody

//row -1
const tbody = createElement("tbody");

fetchJSONData(1);

table.append(thead, tbody);

//Pagination buttons
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

//for creating pagination buttons 1-10

for (let i = 1; i <= 10; i++) {
  liElement = createElementWithAttribute("li", "class", "page-item");
  aElement = createElementWithAttribute("a", "class", "page-link", i);
  i == 1 ? liElement.classList.add("active") : "";
  liElement.append(aElement);
  ulElement.append(liElement);
}

//for Next button:

liElement = createElementWithAttribute("li", "class", "page-item");
aElement = createElementWithAttribute("a", "class", "page-link", "Next");

setElementAttribute(liElement, "id", "next");
liElement.append(aElement);
ulElement.append(liElement);

navElement.append(ulElement);

document.body.append(table, navElement);

//to create table data

const liList = document.getElementsByTagName("li");

for (let item of liList) {
  item.addEventListener("click", (event) => {
    let page = event.target.innerText;
    let activePage = activeClassPage[0].outerText;
    const previousBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("next");
    if (page !== activePage) {
      if (!(page.includes("Next") || page.includes("Previous"))) {
        setPrevious(Number(page));
        setNext(Number(page));
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

        sibling.classList.add("active");

        active.classList.remove("active");
        fetchJSONData(page, activePage);

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
          nextBtn.classList.remove("disabled");
        } else if (page === 10) {
          nextBtn.classList.add("disabled");
        }
      }
    }
  });
}
