fetch('/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Handle the response data
    const bodyElement = document.body;
    const message = document.createElement("h1");
    const time = document.createElement("h1");

    message.textContent = data.message;
    time.textContent = data.timestamp;

    bodyElement.append(message, time);

  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });