// init

const ctx=cnv.getContext("2d");
let cw=cnv.width,ch=cnv.height,hw=cw/2,hh=ch/2;

let canSend=false,isMotion=false,px=null,py=null,heldDX=0,heldDY=0;
let latency=0,lastSend=Date.now();

const websocket = new WebSocket("ws://"+location.hostname+":8001/");

function sendHeldD(){
    dnow=Date.now();
    lastSend=dnow;
    websocket.send(["move",heldDX,heldDY].join(","))
    heldDX=heldDY=0;
}

websocket.addEventListener("open",(event)=>{
    sendHeldD();
});

// main

websocket.addEventListener("message",({data})=>{
    latency=Date.now()-lastSend;
    if(data=="OK" && (canSend || isMotion)){
        sendHeldD();
    }
});

let ctouchx=0,ctouchy=0,sensitivity=1,mSensitivity=25;

cnv.addEventListener("touchmove",function(e){
    ctouchx=e.touches[0].clientX;ctouchy=e.touches[0].clientY;
    if(px==null||py==null){
        px=ctouchx;py=ctouchy;
        canSend=true;
        sendHeldD();
    }else{
        heldDX+=Math.round((ctouchx-px)*sensitivity);
        heldDY+=Math.round((ctouchy-py)*sensitivity);
        px=ctouchx;py=ctouchy;
    }
});

cnv.addEventListener("touchend",function(e){
    px=py=null;
    canSend=false;
});

window.sclick=function(m){
    lastSend=Date.now();
    websocket.send(["press",m].join(","));
}

let acl=null;
try{
    // acl = new Accelerometer({ frequency: 30 });
    acl = new Gyroscope({ frequency: 60 });

    acl.addEventListener("reading", () => {
        // console.log(`Acceleration along the X-axis ${acl.x}`);
        // console.log(`Acceleration along the Y-axis ${acl.y}`);
        // console.log(`Acceleration along the Z-axis ${acl.z}`);
        heldDX+=Math.round(-acl.z*mSensitivity);
        heldDY+=Math.round(-acl.x*mSensitivity);
    });
}catch(e){console.error(e);}

window.toggleMotion=function(el){
    isMotion=!isMotion;
    if(acl!==null){
        if(isMotion){acl.start();sendHeldD();}
        else acl.stop();
        el.innerText="Motion mode: "+(isMotion?"ON":"OFF")
    }else{
        el.innerText="Motion mode: Not available";
    }
}

window.updateSensitivity=function(type,value){
    if(type==0){
        sensitivity=value/50;
    }else{
        mSensitivity=value;
    }
}

function mainLoop(){
    ctx.fillStyle="#dcdcdc";
    ctx.fillRect(0,0,cw,ch)

    ctx.fillStyle="#000";
    ctx.fillRect(hw+heldDX*2-10,hh+heldDY*2-10,20,20);

    ctx.font="16pt monospace";
    ctx.fillText(latency+"ms",12,20);

    requestAnimationFrame(mainLoop);
}
mainLoop();
