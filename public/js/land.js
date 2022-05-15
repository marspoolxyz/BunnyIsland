/*------------------------------------File Name: custom.js---------------------------------------------*/


/* Scroll to Top*/

$(window).on('scroll', function () {
	scroll = $(window).scrollTop();
	if (scroll >= 100) {
		$("#back-to-top").addClass('b-show_scrollBut')
	} else {
		$("#back-to-top").removeClass('b-show_scrollBut')
	}
});
$('.navbar-toggler').click(function(){
  $(this).toggleClass('active');
  
  $(".navbar").toggleClass('active');
  $(".menu_wrpr").toggleClass('active');

});



  $(window).scroll(function() {    
    
    var scroll = $(window).scrollTop();

     //>=, not <=
    if (scroll >= 50) {
      $(".main_wrapper").addClass("fixed");
    } else {
        $(".main_wrapper").removeClass("fixed");
    }
  });


const icp = document.getElementById("icp");
//const cost = document.getElementById("cost").innerHTML;

const counter = document.getElementById("counter");
const incr = document.querySelector(".incr");
const decr = document.querySelector(".decr");
let count = 0;
var icps = 0;
/*
incr.addEventListener("click", () => {
  if(count < 20)
  {
    count++;
  }
  icps = count * cost;

  var icpstring = icps + "";
  var leng = icpstring.length;

  if(leng == 3)
  {
    icp.innerHTML = "Total " + icps + "0 Eth";
  }
  else
  {
    icp.innerHTML = "Total " + icps + " Eth";
  }
  counter.innerHTML = count;
});


decr.addEventListener("click", () => {
  count--;
  
  if(count <= 1) count =1;
  icps = count * cost;

  var icpstring = icps + "";
  var leng = icpstring.length;  
  if(leng == 3)
  {
    icp.innerHTML = "Total " + icps + "0 Eth";
  }
  else
  {
    icp.innerHTML = "Total " + icps + " Eth";
  }
  counter.innerHTML = count;
});
*/


const modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = document.getElementById(trigger.dataset.modal);
    modal.classList.add("open");
    const exits = modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.remove("open");
      });
    });
  });
});