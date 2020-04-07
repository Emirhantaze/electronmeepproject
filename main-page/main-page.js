$(document).ready(function() 
{   
    
    //Setting the height
    var bodyheight = $(window).height() -$(".bottom-bar").height()-$(".top-bar").height();   
    $(".content").height(bodyheight);
    $(".editor").width($(window).width()-$("#contents").width()-53)
    /*
 
    In this part we focus on resizing of main window will not effect size

    */
     $(window).on("resize",function() {
        $(".editor").width($(window).width()-$("#contents").width()-53)
          var bodyheight = $(window).height() -$(".bottom-bar").height()-$(".top-bar").height();
          $(".content").height(bodyheight);
     });
     /*
     
     */
     $("#clickregion1").mousedown((e)=>{
        $('body').css( 'cursor', 'e-resize' );
        var old = screenX
         const interval = setInterval(()=>{

            if(!is_down){
                $('body').css( 'cursor', 'default' );
                clearInterval(interval)
                
            }
            const siz = $("#contents").width()+(screenX-old)
            if(siz > 150){
                $(".editor").width($(window).width()-siz-53)
                $("#contents").width(siz)
                
                old =screenX
            }
            
         },40)
         
     })
});
var is_down = false
var movementX= 0
var movementY= 0
var screenX = 0
var screenY = 0
$("body").mouseup(function(){
    is_down=false
 })
 $("body").mousedown(function(){
    is_down=true
 })
function resizecontents(e){
    movementX=e.movementX
    movementY=e.movementY
    screenX=e.screenX
    screenY= e.screenY
}