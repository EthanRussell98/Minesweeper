let width = 0;
let height = 0;
let bombs = 0;
let myArr = [];
let randomNumbers = [];
let zeroArr = []
let firstclick = true;
let time = 0;
let tilesRemain = 0;
const fs = require('fs');
let mytimer = (yn) => { yn == true ? timer = setInterval(startTimer, 1000) : clearInterval(timer)}
let loadGame = () => {
    fs.readFile('test.txt', 'utf8', (err, data) => {
        if(err){console.error(err)
        return;}
        console.log(data);
    })
    scorejs.tev();
    myArr = [];
    randomNumbers = [];
    zeroArr = []
    firstclick = true;
    medDiff();
    let board = document.getElementById('board')
    for(i=0; i<height; i++){
        myArr.push(emptyArr());
    }
    board.innerHTML += createBoard();
    rightClick()
}

function medDiff(){
    width = 18;
    height = 14;
    bombs = 40;
    tilesRemain = (width*height)-bombs;
}

function createBoard(){
    let x = '';
    let color = '#aad751';
    for(i=0; i<(width*height); i++){
        // need to change color here.
        if((i)%width != 0){
            color == '#aad751' ? color = '#a2d149' : color = '#aad751'
        }
        x+= `<div class="square" id="s${i}"style="width:${(720/ width)}px; height:${(720/ width)}px; background-color:${color}; "'></div>`
        
    }
    return(x)
}


function getNum(myNum){
    if(firstclick == true){
        randomNums(myNum);
        mytimer(true)
        firstclick = false;
    }
    z = convert(myNum)
    a = z[0];
    b = z[1];
    if(document.getElementById(`s${myNum}`).innerHTML == ''){
        document.getElementById(`s${myNum}`).innerHTML = myArr[a][b] == 1 ? '&#9679' : numCalc(a, b)
        myArr[a][b] == 1 ? gameOver() : tilesRemain--
        if(tilesRemain == 0){
            gameOver(true)
        }
    if(document.getElementById(`s${myNum}`).innerHTML == 0){
        clearzero(myNum)
    }
    else {backgroundColor(myNum); colorNum(numCalc(a, b), myNum)}}
}

function emptyArr(){
    let x = []
    for(f=0; f<width; f++){
        x.push(0)
    }
    return x
}

function randomNums(a){
    x = [a, ((a-width)-1), (a-width), ((a-width)+1), (a-1), (a+1), ((a+width)-1), (a+width), ((a+width)+1)]
  
    for(i=0; i<bombs; i++){
        z = Math.floor(Math.random() * (width*height))
        
        x.includes(z) ? i-- : addBombs(z), x.push(z)
    }
    console.log(myArr)
}

function addBombs(y){
    zz = convert(y)
    a = zz[0];
    b = zz[1];
    myArr[a][b] = 1;
}

function convert(f){
    a = Math.floor(f/width);
    b = (f - (a*width))
    return [a, b]
}

function numCalc(a, b){
    x = 0;
    for(i=-1;i<2;i++){
        if(a==0 && i==-1){continue;}
        if(a==(height-1) && i==1){continue;}
        for(f=-1;f<2;f++){
            if(b==0 && f==-1){continue;}
            if(b==(width-1) && f==1){continue;}
            x += myArr[a+i][b+f]
        }
    }
    return x
}

function clearzero(x){
    l=0;
    z = convert(x)
    aa = z[0]
    bb = z[1]
    for(ii=-1;ii<2;ii++){
        if(aa==0 && ii==-1){continue;}
        if(aa==(height-1) && ii==1){continue;}
        for(ff=-1;ff<2;ff++){
            if(bb==0 && ff==-1){continue;}
            if(bb==(width-1) && ff==1){continue;}
               v =  numCalc((aa+ii), (bb+ff))
               if(v == 0 && `${(aa+ii)},${(bb+ff)}` != String(z) && document.getElementById(`s${((aa+ii)*width)+(bb+ff)}`).innerHTML == ''){
                zeroArr.push([aa+ii, bb+ff])
               }
               if(document.getElementById(`s${((aa+ii)*width)+(bb+ff)}`).innerHTML == ''){
                tilesRemain--
                if(tilesRemain==0){
                    gameOver(true)
                }
               }
               v == 0 ? document.getElementById(`s${((aa+ii)*width)+(bb+ff)}`).innerHTML = ' ' : document.getElementById(`s${((aa+ii)*width)+(bb+ff)}`).innerHTML = v
               backgroundColor(((aa+ii)*width)+(bb+ff))
                colorNum(v, ((aa+ii)*width)+(bb+ff))            
        }
    }
    if(zeroArr.length>0){
        let te = (zeroArr[0][0]*width)+zeroArr[0][1]
        zeroArr.splice(0, 1)
      
        clearzero(te)
    }
}

function backgroundColor(i){
    (Math.floor(i/width)-i)%2 == 0 ? document.getElementById(`s${i}`).style.background = '#e5c29f' : document.getElementById(`s${i}`).style.background = '#d7b899' 
}

function colorNum(v, id){
   let color = ['#2278cf', '#3c8d40', '#d13135', '#7a27a0', '#fd8f25', '#0b959b', '#474044', '#a29e98']
   if(document.getElementById(`s${id}`).innerHTML == '●'){color = 'black'}
   document.getElementById(`s${id}`).style.color = color[v-1]
}

function rightClick(){
    let flag = `<div class='flag'><div class='t'></div><div class='r'></div></div>`
    let flagNum = bombs;
    for(i=0;i<width*height;i++){
        document.getElementById(`s${i}`).addEventListener('mouseup', (e) => {
            if(e.button == 2 && document.getElementById(e.toElement.id).innerHTML == ''){
                document.getElementById(e.toElement.id).innerHTML = flag
                flagNum--
                document.getElementById('flagNum').innerHTML = flagNum
            }
                
            else if(e.button == 2 &&  e.target.children.length == 1){
                    document.getElementById(e.toElement.id).innerHTML = ''
                    flagNum++
                    document.getElementById('flagNum').innerHTML = flagNum
                }
            else if(e.button == 0){ 
                getNum(Number(e.target.id.slice(1))) 
            }
        })
        document.getElementById(`s${i}`).addEventListener('contextmenu', (e) => {
            e.preventDefault()
        })

    }
}

function gameOver(w){
    mytimer(false)
    w == true ? document.getElementById('popupText').innerHTML = 'Stage Complete! <br><br><br> Score: ' + time : document.getElementById('popupText').innerHTML = 'Game Over!'
    document.getElementById('gameOver').style.display = 'block'
    
}

function startTimer(){
    time++
    document.getElementById('timer').innerHTML = time;
}
/* 
a = (num/width) round down for array num 
b = (num - (a  *  width))
*/