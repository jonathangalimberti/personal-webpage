const url = "./src/data/certificates.json";
const container = document.getElementById("container");
let certificates = [];
const home = document.getElementById("home");
const certificatesSection = document.getElementById("certificatesSection");
const main = document.getElementById("main");

function toggleSection() {
  home.classList.toggle("d-none");
  certificatesSection.classList.toggle("d-none");
}

function goToHome(){
    if(home.classList.contains("d-none")){
        toggleSection()
    }
}

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
    container.innerHTML += `
    <div class="col-5 col-md-3">
        <div class="card overflow-visible card-cert card-grow">
        <img class="card-img-top" src="${cert.img}" alt="${cert.name}" />
         <div class="overlay">${cert.name}</div>
        </div>
    </div>
    `;
  });
}

function filter(data) {
  container.innerHTML = "";

  certificates.forEach((cert) => {
    if (cert.category == data) {
      container.innerHTML += `
      <div class="col-5 col-md-3">
        <div class="card overflow-visible card-grow card-cert">
        <img class="card-img-top" src="${cert.img}" alt="${cert.name}" />
        <div class="overlay">${cert.name}</div>
        </div>
    </div>
    `;
    } else if (data === "All") {
      printCertificates(certificates);
    }
  });
}

function searchCertificate(value) {
  container.innerHTML = "";
  let valueString = value.toLowerCase();
  

  for (let i = 0; i < certificates.length; i++) {
    const element = certificates[i];
    if (element.name.toLowerCase().includes(valueString)) {
      container.innerHTML += `
      <div class="col-5 col-md-3">
        <div class="card overflow-visible card-grow card-cert">
        <img class="card-img-top" src="${element.img}" alt="${element.name}" />
        <div class="overlay">${element.name}</div>
        </div>
    </div>
    `;
    }
    else if(!element.name.toLowerCase().includes(valueString)){
  container.innerHTML = `<p class ="text-white text-center fs-1">No certificates found</p>`;
    }
  }
}
