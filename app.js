let modes=document.querySelector('.modes');
let header=document.querySelector('.header');
let searcharea=document.querySelector('.search');
let span=document.querySelector('#span');
let region=document.querySelector('#region');
let con=document.querySelector('.con');
let input=document.querySelector('#input');
let display=document.querySelector('.display-contries');
let display_country=document.querySelector('.display_country');
display_country.style.display='none'
// let displayh1=document.querySelector('.display-contries div');
all();
let arr=[];
let arr2=[];
function all(){
let get=fetch(`https://restcountries.eu/rest/v2/all`).then(res=>res.json())
.then(data=>{console.log(data)
    for(let i=0; i<data.length; i++){
        let div=document.createElement('div')
        let hthree=document.createElement('h4')
        let flags=document.createElement('img')
        let pop=document.createElement('p')
        let reg=document.createElement('p')
        let cap=document.createElement('p')
        pop.innerHTML="Population: "+data[i].population
        reg.innerHTML="Region: "+data[i].region
        cap.innerHTML="Capital city"+data[i].capital
        flags.src=data[i].flag;
        div.append(flags)
        hthree.innerHTML=data[i].name
        div.classList.add('country')
        div.append(hthree);
        div.append(pop)
        div.append(reg)
        div.append(cap)
        display.append(div);
        arr.push(data[i]);
        div.setAttribute('data-name',data[i].name)
    }
}).then(()=>{
    let counrt=document.querySelectorAll('.country');
counrt.forEach(country=>{
    country.addEventListener('click', clickcon)
})
})
}
input.addEventListener('keyup',(e)=>{
    console.log(e.target.value);
    let target=e.target.value.toLowerCase();
    display.innerHTML=""
   const filteredsearch= arr.filter(char=>{
       return char.name.toLowerCase().includes(target) 
       || char.region.toLowerCase().includes(target)
    })
    for(let i=0; i<filteredsearch.length; i++){
        let div=document.createElement('div')
        let hthree=document.createElement('h4')
        let flags=document.createElement('img')
        let pop=document.createElement('p')
        let reg=document.createElement('p')
        let cap=document.createElement('p')
        pop.innerHTML="Population: "+filteredsearch[i].population
        reg.innerHTML="Region: "+filteredsearch[i].region
        cap.innerHTML="Capital city"+filteredsearch[i].capital
        flags.src=filteredsearch[i].flag;
        div.append(flags)
        hthree.innerHTML=filteredsearch[i].name
        div.classList.add('country')
        div.append(hthree);
        div.append(pop)
        div.append(reg)
        div.append(cap)
        display.append(div);
        div.setAttribute('data-name',filteredsearch[i].name)
    }
    let counrt=document.querySelectorAll('.country');
    counrt.forEach(country=>{
        country.addEventListener('click', clickcon)
    })
    console.log(filteredsearch);
})
function regionareas(regiona){
    display.innerHTML='';
    let get=fetch(`https://restcountries.eu/rest/v2/region/${regiona}`).then(res=>res.json())
    .then(data=>{console.log(data)
        for(let i=0; i<data.length; i++){
            let div=document.createElement('div')
            let hthree=document.createElement('h4')
            let flags=document.createElement('img')
            let pop=document.createElement('p')
            let reg=document.createElement('p')
            let cap=document.createElement('p')
            pop.innerHTML="Population: "+data[i].population
            reg.innerHTML="Region: "+data[i].region
            cap.innerHTML="Capital city"+data[i].capital
            flags.src=data[i].flag;
            div.append(flags)
            hthree.innerHTML=data[i].name
            div.classList.add('country')
            div.append(hthree);
            div.append(pop)
            div.append(reg)
            div.append(cap)
            display.append(div);
            div.setAttribute('data-name',data[i].name)
        }
    }).then(()=>{
        let counrt=document.querySelectorAll('.country');
        counrt.forEach(country=>{
            country.addEventListener('click', clickcon)
        })
    })
}
region.addEventListener('change',(e)=>{
    let regions=region.childNodes;
    // console.log(regions)
    // regions.forEach(reg=>{
        switch(e.target.value){
            case 'Africa':
                regionareas('africa')
                break;
                case 'Asia':
                    regionareas('asia');  
                break;
                case 'Oceania':
                    regionareas('oceania');
                break;
                case 'Europe':
                    regionareas('europe')
                break;
                case 'America':
                    regionareas('americas')
                break;
                case 'All':
                    display.innerHTML="";
                    all();
                    break;
        }
    // })    
})
modes.addEventListener('click',()=>{
    let countries=document.querySelector('.display_country')
    let btn=document.querySelector('.display_country button')
    header.classList.toggle('changeheader')
    searcharea.classList.toggle('change')
    span.classList.toggle('change')
    con.classList.toggle('change')
    region.classList.toggle('change')
    display.classList.toggle('change');
    countries.classList.toggle('change');
    btn.classList.toggle('change');
});

let newarr=[];
function clickcon(e){
    let country=e.target.parentElement;
    country.getAttribute('data-name')
    let name=country.getAttribute('data-name')
    let grandparent=country.parentElement;
    grandparent.style.display='none';
    searcharea.style.display='none';
    display_country.style.display='block'
    let img=document.createElement('img');
    let counflags=document.querySelector('#flag')
    let countname=document.querySelector('#name')
    let nat=document.querySelector('.nat')
    let pop=document.querySelector('.pop')
    let top=document.querySelector('.top')
    let cur=document.querySelector('.cur')
    let reg=document.querySelector('.reg')
    let lan=document.querySelector('.lan')
    let sub=document.querySelector('.sub')
    let cap=document.querySelector('.cap')
    let bor=document.querySelector('.border')
    for(let i=0; i<arr.length; i++){
        if(arr[i].name===name){
            img.src=arr[i].flag;
            countname.innerHTML=arr[i].name
            nat.innerHTML+=" "+arr[i].nativeName;
            reg.innerHTML+=" "+arr[i].region;
            pop.innerHTML+=" "+arr[i].population; 
            top.innerHTML+=" "+arr[i].topLevelDomain
            sub.innerHTML+=" "+arr[i].subregion
            cap.innerHTML+=" "+arr[i].capital
            counflags.append(img);
            for(let j=0; j<arr[i].languages.length; j++){
                lan.innerHTML+=" "+arr[i].languages[j].name
            }
            for(let k=0; k<arr[i].currencies.length; k++){
                cur.innerHTML+=" "+arr[i].currencies[k].name
            }
            for(let l=0; l<arr[i].borders.length; l++){
                let bord=document.createElement('span');
                bord.innerHTML=arr[i].borders[l]
                bor.append(bord);
            }
        }
        
    }
}
let back=document.querySelector('.back');
back.addEventListener('click',()=>{
    location.reload()
});