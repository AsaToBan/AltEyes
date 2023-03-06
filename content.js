function getImg(){
  var body = document.getElementsByTagName("body")[0];
  var images = document.getElementsByTagName("img");
  return images
}

function createWrap(){
  var body = document.getElementsByTagName("body")[0];
  var newDiv = document.createElement("div");
  newDiv.ClassName = "chrome-extension-wrap";
  Object.assign(newDiv.style, {
    position : "absolute",
    width : "100%",
    background : "rgba(255,0,0,0.2)",
    padding : "10px"
  });
  return newDiv
}

function setFloatingStyles(element) {
  Object.assign(element.style, {
    background : "rgba(255,0,0,0.2)",
    border : "2px solid red",
    fontWeight :"bold",
    padding : "10px"
  });
}

function insertAltText (){
  var images = getImg();
  for (var i = 0; i < images.length; i++) {
    var alt = images[i].getAttribute("alt")
    if (alt) {
      var span = document.createElement("span");
      setFloatingStyles(span);
      span.textContent = alt;
      span.className = "altName"
      images[i].parentNode.insertBefore(span, images[i].nextSibling);
    }
  }
}

function appendAltText(){
  var images = getImg();
  var newDiv = createWrap();
  for (var i = 0; i < images.length; i++) {
    var alt = images[i].getAttribute("alt")
    var src = images[i].getAttribute("src")

    if(src){
      var paragraph = document.createElement("p");
      paragraph.textContent = alt ? alt : "alt未設定" ;
      var img = new Image();
      img.src=src;
      paragraph.append(img)
      newDiv.append(paragraph)
    }
  }
  document.getElementsByTagName("body")[0].appendChild(newDiv);
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.message){
    case "insert":
      insertAltText()
      break;
    case "append":
      appendAltText()
      break;
    default:
      appendAltText()
  }
});


