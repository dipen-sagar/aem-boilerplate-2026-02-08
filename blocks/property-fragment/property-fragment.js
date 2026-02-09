// put your AEM publish address here
const aem_publish = "https://publish-p129419-e1377476.adobeaemcloud.com";
const AEM_HOST = checkDomain()

function checkDomain(){
  if (window.location.hostname.includes("hlx.page") || window.location.hostname.includes("hlx.live") || window.location.hostname.includes("aem.page") || window.location.hostname.includes("aem.live") || window.location.hostname.includes("localhost")){
    return aem_publish    
  }else{
    return window.location.origin 
  }
}

export default function decorate(block) {

  const slugDiv = block.querySelector('div:nth-child(1)'); 
  const slugID = document.createElement('div');
  slugID.id = 'slug';
  slugDiv.replaceWith(slugID);
  slugID.innerHTML = `${slugDiv.innerHTML}`;
  const slug = slugID.textContent.trim();
  
  const quoteDiv = block.querySelector('div:last-of-type');
  const adventureDiv = document.createElement('div');
  adventureDiv.id = "adventure-" + slug; 
  quoteDiv.replaceWith(adventureDiv);

fetch(AEM_HOST + '/graphql/execute.json/frescopa/allProperties')
.then(response => response.json())
.then(response => {

const backgroundImage = response.data.waslPropertyList.items[0].image._path;
document.getElementById(adventureDiv.id).innerHTML = "<section><img src=" + AEM_HOST + backgroundImage + "></section>";  

const unitNo = response.data.waslPropertyList.items[0].unitNo;
document.getElementById(adventureDiv.id).innerHTML += "<section><h3>Unit : "+ unitNo + "</h3></section>";

const desc = response.data.waslPropertyList.items[0].description.plaintext;
document.getElementById(adventureDiv.id).innerHTML += "<section>" + desc + "</section>";

const propType = response.data.waslPropertyList.items[0]. propertyType;
document.getElementById(adventureDiv.id).innerHTML += "<section>" + "Property Type: " + propType + "</section>";

const price = response.data.waslPropertyList.items[0].price;
document.getElementById(adventureDiv.id).innerHTML += "<section>" +"Price: " + price + "</section>";

const id = response.data.waslPropertyList.items[0].id;
document.getElementById(adventureDiv.id).innerHTML += "<section>" + "Id: " + id + "</section>";

const geoLocation = response.data.waslPropertyList.items[0].geoLocation;
document.getElementById(adventureDiv.id).innerHTML += "<section>" + "Location: " + geoLocation + "</section>";

})
.catch(error => {
  console.log('Error fetching data:', error);
});

}





