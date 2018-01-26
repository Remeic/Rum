let menuState = 0

$("#mobile__button > i").on("click",()=>{
  let mobileButton = $("#mobile__button > i")
  if(menuState == 0){
    $(".menu").addClass("menu__opened")
    mobileButton.removeClass("fa-bars")
    mobileButton.addClass("fa-times")
    menuState = 1
  }
  else{
    mobileButton.removeClass("fa-times")
    mobileButton.addClass("fa-bars")
    $(".menu").removeClass("menu__opened")
    menuState = 0
  }
})