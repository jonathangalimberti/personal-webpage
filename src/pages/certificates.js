const url = "../data/certificates.json"

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });

 