const url = "../data/certificates.json";
const container = document.getElementById("container");
let certificates = [];

async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    certificates = data;
    printCertificates(data);
  } catch (err) {
    console.error("Error fetching data " + err);
  }
}

fetchData();

function printCertificates(data) {
  container.innerHTML = "";
  data.forEach((cert) => {
    container.innerHTML += `<div class="card col-3 p-0">
      <img class="card-img-top" src="${cert.img}" alt="Title" />
    </div>
    `;
  });
}

function filter(data) {
  container.innerHTML = "";

  certificates.forEach((cert) => {
    if (cert.category == data) {
      container.innerHTML += `<div class="card col-3 p-0">
      <img class="card-img-top" src="${cert.img}" alt="Title" />
    </div>
    `;
      console.log(cert.category, data);
    } else if (data === "All") {
      printCertificates(certificates);
    }
  });
  console.log(data, certificates);
}

function searchCertificate(value) {
  container.innerHTML = "";
  let valueString = value.toLowerCase();

  for (let i = 0; i < certificates.length; i++) {
    const element = certificates[i];
    if (element.name.toLowerCase().includes(valueString)) {
      container.innerHTML += `<div class="card col-3 p-0">
      <img class="card-img-top" src="${element.img}" alt="Title" />
    </div>
    `;
      console.log(element);
    }
  }

  console.log(value);
}
