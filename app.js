const apiUrl = "https://api.coingecko.com/api/v3/coins/list";
const coinsArray = [];
const DOM = {
    tabContent: document.getElementById("tabContent"),
}
async function fetchDataJSON1() {
     await fetch(apiUrl).then((respons)=>{
         respons.json()
     }).then(data =>{
         console.log(data);
     }).catch(err=>{
         alert('err')
         console.log(err);
     })
  }

  async function fetchDataJSON() {
  await  $.ajax({
        type: 'GET',
        datatype: 'json',
        url: apiUrl,
        success: function (data) {             
            //console.log(object);
            data.map(coins=>{
                coinsArray.push(coins)
            })
            console.log(coinsArray);
        },
        error: function (error) {
            alert("error , please try again")
            console.log("error : ", error);
        }
    })
}

function createNavTap(tabName,tabId,selected,active){
    const ul = document.getElementById('myNavTab');
    const li = document.createElement('li');
    li.className = 'nav-item';
    const alink = document.createElement('a');
    alink.className = `nav-link ${active}`;
    alink.setAttribute('data-toggle','tab')
    alink.setAttribute('aria-selected',selected)
    alink.id = `${tabId}-tab`;
    alink.modal = 'toggel';
    alink.href = `#${tabId}`;
    alink.toggleClass = 'aria-selected',true;
    alink.innerText = tabName
    li.append(alink)
    ul.append(li)
}


function createTapbContent(tabId,active){
    const div = document.createElement('div');
    if(active==undefined){div.className= 'tab-pane fade';} else{div.className= 'tab-pane fade show active';}

    div.id = tabId;
    div.setAttribute('role','tabpanel')
    div.setAttribute('aria-labelledby',`${tabId}-tab`);
    const cardData = coinsArray.map((coins,index)=>{ 
        console.log(coins);
        //return createCard(coins)  
    })
    console.log(cardData);
    div.append(cardData)
}



function createCard(data){
 
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card col-4';
    cardDiv.style.width = '18rem'
    const cardDivbody = document.createElement('div');
    cardDivbody.className = 'card-body';
    const hCardTitle = document.createElement('h5');
    hCardTitle.className = 'card-title';
    hCardTitle.innerText = data.symbol;
    const cardNmaePara = document.createElement('p');
    cardNmaePara.className = 'card-text';
    cardNmaePara.innerText = 'data'
    const collapsDiv = document.createElement('div');
    collapsDiv.className = 'collapse';
    collapsDiv.id = 'collapseId'
    cardDiv.append(cardDivbody,hCardTitle,cardNmaePara,collapsDiv,drawButton('more info', 'home','btn btn-primary'))
    return cardDiv
}

function drawButton(labelText , id, className,fn){
    const button = document.createElement("BUTTON")
    button.innerText = labelText
    button.id = id
    button.className = className
    button.type = "button"
    button.addEventListener("click",fn)
    return button
}

function draw(){
    
const tapContent = createTapbContent('home','home',true)
DOM.tabContent.append(...tapContent)

}

function init(){
console.log('starting app');
createNavTap('home','home',true, 'active');
createNavTap('about','about');
createTapbContent('about','about')
fetchDataJSON();
draw()
}

init()