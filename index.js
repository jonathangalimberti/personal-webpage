const url = "./src/data/certificates.json";
const container = document.getElementById("container");
let certificates = [];
let filteredCertificates = [];
const home = document.getElementById("home");
const certificatesSection = document.getElementById("certificatesSection");
const main = document.getElementById("main");
const sections = document.getElementById("sections")

function toggleSection() {
  home.classList.toggle("d-none");
  certificatesSection.classList.toggle("d-none");
  sections.classList.toggle("d-none");
  console.log("cambiamos de lugar");

}

function goToHome() {
  if (home.classList.contains("d-none")) {
    toggleSection();
   
  }
}

function downloadCv(route, name) {
  const link = document.createElement("a");
  link.href = route;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
    const card = document.createElement("div");
    card.className = "col-5 col-md-3";
    const cardBody = document.createElement("div");
    cardBody.className = "card overflow-visible card-grow card-cert";
    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.src = cert.img;
    cardImg.alt = cert.name;
    const cardText = document.createElement("div");
    cardText.className = "overlay";
    cardText.textContent = cert.name;

    card.appendChild(cardBody);
    cardBody.appendChild(cardImg);
    cardBody.appendChild(cardText);
    container.appendChild(card);
  });
}

function filter(data) {
  filteredCertificates = [];
  certificates.forEach((cert) => {
    if (cert.category == data) {
      filteredCertificates.push(cert);
      printCertificates(filteredCertificates);
    } else if (data === "All") {
      printCertificates(certificates);
    }
  });
}

function searchCertificate(value) {
  filteredCertificates = [];
  let valueString = value.toLowerCase();

  certificates.forEach((cert) => {
    if (cert.name.toLowerCase().includes(valueString)) {
      filteredCertificates.push(cert);
      printCertificates(filteredCertificates);
    }
    if (filteredCertificates.length == 0) {
      container.innerHTML = `<p class ="text-white text-center fs-1">No certificates found</p>`;
    }
  });
}
