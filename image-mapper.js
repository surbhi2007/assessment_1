const body = document.querySelector("body");
const image_input = document.querySelector("#image-input");
const image_area = document.querySelector("#display-image");
const mimeType = document.querySelector("#mimeType");
const imageName = document.querySelector("#imageName");
const imageDimensions = document.querySelector("#imageDimensions");
const dialogBox = document.querySelector("#dialogBox");
const saveButton = document.querySelector("#save");
const closeButton = document.querySelector("#close");
const coordinatesTable = document.querySelector("#coordinatesTable");
const coordinatesTableBody = document.querySelector("#coordinatesTable tbody");
const description_input = document.querySelector("#description");

body.addEventListener("click", function (event) {
  console.log(event, "...event..");
});

image_input.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const image = new Image();
    image.src = reader.result;
    image.onload = function () {
      imageDimensions.innerText = `Dimensions: ${image.width} x ${image.height}`;
    };
    image_area.append(image);
  });
  mimeType.innerText = `Mime Type: ${this.files[0].type}`;
  imageName.innerText = `Image Name: ${this.files[0].name}`;
  reader.readAsDataURL(this.files[0]);
});

let redMarker = "";
let xPosition;
let yPosition;
image_area.addEventListener("click", function (imageAreaEvent) {
  if (
    imageAreaEvent.target.tagName === "IMG" &&
    (dialogBox.style.display === "none" || !dialogBox.style.display)
  ) {
    redMarker = document.createElement("div");
    xPosition = imageAreaEvent.clientX - redMarker.clientWidth;
    yPosition = imageAreaEvent.clientY - redMarker.clientHeight;
    redMarker.className = "redMark";
    redMarker.style.left = `${xPosition}px`;
    redMarker.style.top = `${yPosition}px`;
    dialogBox.style.left = `${xPosition}px`;
    dialogBox.style.top = `${yPosition}px`;
    dialogBox.style.display = "block";
  } else {
    dialogBox.style.display = "none";
  }
});

closeButton.addEventListener("click", (closeEvent) => {
  closeEvent.stopImmediatePropagation();
  closeEvent.preventDefault();
  dialogBox.style.display = "none";
});

saveButton.addEventListener("click", (saveEvent) => {
  saveEvent.stopImmediatePropagation();
  saveEvent.preventDefault();
  if (description_input.value) {
    coordinatesTable.style.display = "block";
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${xPosition}</td>
                        <td>${yPosition}</td>
                        <td>${description_input.value}</td>`;
    coordinatesTableBody.append(newRow);
    const tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.innerText = description_input.value;
    redMarker.append(tooltip);
    image_area.appendChild(redMarker);
    description_input.value = "";
  }
  dialogBox.style.display = "none";
});
