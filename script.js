let num=0;
let chose;
function random() {
    let check = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let position;
    for (let i = 0; i < 16; i++) {
      $(".first>.box-box").attr("value", "fill");
      $(".second>.box-box").removeAttr("value");
      do {
        position = Math.round(Math.random() * 15);
      } 
      while (check[position]);
      $(`.box:eq(${i})`).attr("id", `${position + 1}`);
      $(`.first>.box-box:eq(${i})`).append($(`.box:eq(${i})`));
      check[position] = 1;
      $(".pzl").css("background-image", "url(./photo-1453728013993-6d66e9c9123a.jpg)");
    }
}
random();
$(".box-box").sortable({
    connectWith: '.box-box',
    contaiment: ".main",
    scroll: false,
    start: function(event,ui){
        num++;
        if(num==1){
            $(".start").trigger("click");
        }
    },
    receive: function (event, ui) {
        if ($(this).attr("value") == "fill") {
          chose = 1;
        } else {
          $(this).attr("value", "fill");
          chose = 0;
        }
    },
    stop: function(event,ui){
        if(chose==1){
            $(this).sortable("cancel");
        } 
        else{
            $(this).removeAttr("value");
        }
    }
})
$(".boxz").droppable({
    drop: function(event, ui){
    }
})
let text=60;
$(".start").click(function(){
    $(this).attr("disabled", "disabled");
    $(this).css("background-color", "lightgrey")
    let a=setInterval(function(){
        text--;
        $("h1").text(`00:${text}`);
        if(text<10){
            $("h1").text(`00:0${text}`);
        }
        if(text==0){
            $("h2").text(`It's a pity, but you lost`);
            $(".window").css("display","block");
            $(".grey").css("display","block");
            clearInterval(a);
        }
    },1000)
})
$(".new").click(function(){
    location.reload()
})
$(".check").click(function(){
    $("h2").text(`You still have time, you sure? ${text}sec`);
    $(".window1").css("display","block");
    $(".grey").css("display","block");
    
})
$(".close").click(function(){
    $(".window1").css("display","none");
    $(".grey").css("display","none");
    
})
$(".check1").click(function(){
    let res=0;
    $(".boxz").each(function(id, item){
        if(item.firstChild){
        if(item.firstChild.id==id+1){
            res++;
        } 
        }   
    })
    if(res==16){
        $("h2").text(`Woohoo, well done, you did it!`);
        $(".check1").css("display","none");
        setTimeout(() => {
            location.reload();;
        }, 2000);
    }
    else{
        $("h2").text(`It's a pity, but you lost`);
        $(".check1").css("display","none");
        setTimeout(() => {
            location.reload();;
        }, 2000);
        
    }
})

