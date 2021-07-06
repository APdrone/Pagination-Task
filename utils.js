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
