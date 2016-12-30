$(function(){

	// RWD Window 尺寸
	var MOBILESTYLEWIDTH = 960;
	// Desktop 第一頻高度
	var FIRSTSCREENHEIGHT = 600;

	var currentScrollPostion = $(window).scrollTop(); 


	// ** [主題文章] 影音 Resize 比例 12:9

	function videoSize(){
    	var videoWidth = $("#youkuplayer").width();;
    	var videoHeight = Math.round(videoWidth / 12 * 9);
    	$("#youkuplayer").height(videoHeight);
    }


    // ** GoTop 移至頂部

    function goTop(currentScrollPostion){

    	var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
		$body.animate({
			scrollTop: 0
		}, 600);

    	if(currentScrollPostion >= FIRSTSCREENHEIGHT && $(".go-top-btn").css("display") == "none"){
			$(".go-top-btn").stop().animate();
			$(".go-top-btn").fadeIn();
			
		}else if(currentScrollPostion < FIRSTSCREENHEIGHT && $(".go-top-btn").css("display") == "block"){
			$(".go-top-btn").stop().animate();
			$(".go-top-btn").fadeOut();
		}
    }

    // ** go-top-btn : 移動到頂部

	$(".go-top-btn").click(function(){
		goTop(currentScrollPostion);
	});



    // ** 判斷頁面滾動條(scroll)是上滾/下滾 滾動到頭部或者底部
    // Source from : http://www.haorooms.com/post/jquery_scroll_upanddown

 //    scrollDirect: function (fn) {
	//     var beforeScrollTop = document.body.scrollTop;
	//     fn = fn || function () {
	//     };
	//     window.addEventListener("scroll", function (event) {
	//         event = event || window.event;

	//         var afterScrollTop = document.body.scrollTop;
	//         delta = afterScrollTop - beforeScrollTop;
	//         beforeScrollTop = afterScrollTop;

	//         var scrollTop = $(this).scrollTop();
	//         var scrollHeight = $(document).height();
	//         var windowHeight = $(this).height();
	//         if (scrollTop + windowHeight > scrollHeight - 10) {  //滚动到底部执行事件
	//             fn('up');
	//             return;
	//         }
	//         if (afterScrollTop < 10 || afterScrollTop > $(document.body).height - 10) {
	//             fn('up');
	//         } else {
	//             if (Math.abs(delta) < 10) {
	//                 return false;
	//             }
	//             fn(delta > 0 ? "down" : "up");
	//         }
	//     }, false);
	// }

	//

	// var upflag =1;
	// var downflag = 1;

 //    //scroll滑动,上滑和下滑只执行一次！
	// scrollDirect(function (direction) {
 //        if (direction == "down") {
	// 		if (downflag) {

	// 			downflag = 0;
	// 			upflag = 1;
	// 		}
	// 	}
	// 	if (direction == "up") {
	// 		if (upflag) {
				
	// 			downflag = 1;
	// 			upflag = 0;
	// 		}
	// 	}
	// });


	// ** 選單 Fix 功能 

    var isDoubleNav = $(".header").data("is-double-nav");
    var isBrand = $("body").data("is-brand");

    if(! isBrand){
		$(".sub-nav-logo-img").addClass("status-hide");
	}

    function navFix(currentScrollPostion){

    	var navItemHeight;

    	if(isDoubleNav){
			//只有副選
			navItemHeight = $(".main-nav").innerHeight();

		}else{
			// 只有主選
			console.log("只有主選");
			navItemHeight = 0;
		}

		if(currentScrollPostion > navItemHeight){
			$(".header").addClass("status-fixed");
			$(".main-nav").addClass("status-hide");
			$(".sub-nav").addClass("position-clear");

			if(currentScrollPostion < FIRSTSCREENHEIGHT){
				$(".main-nav").removeClass("status-hide");
			}

		}else{
			$(".header").removeClass("status-fixed");
			$(".main-nav").removeClass("status-hide");
			$(".sub-nav").removeClass("position-clear");
		}
    }



    // ** [Mobile][ALL] 漢堡寶開關主選單

    var navToggleNum = 0;

    function navToggle(){

    	var itemNavList = $(".main-nav-list");
    	if($(document.body).outerWidth(true) <= MOBILESTYLEWIDTH){

    		$(".navToggleBtn").on("click",function(){
    			$(".navToggleBtn").css("display","inline-block");
				$(this).css("display","none");

				if(navToggleNum == 0){
					itemNavList.stop().animate();
					itemNavList.fadeIn(250);
					$("body").addClass("screen-mask");
					navToggleNum = 1;
				}else if(navToggleNum == 1){
					itemNavList.stop().animate();
					itemNavList.fadeOut(250);
					$("body").removeClass("screen-mask");
					navToggleNum = 0;
				}

				return false;
    		});
    	}else if($(document.body).outerWidth(true) > MOBILESTYLEWIDTH){
    		
    		$(".navToggleBtn").off("click",function(){
    			$(".navToggleBtn").css("display","inline-block");
				$(this).css("display","none");

				if(navToggleNum == 0){
					itemNavList.stop().animate();
					itemNavList.fadeIn(250);
					$("body").addClass("screen-mask");
					navToggleNum = 1;
				}else if(navToggleNum == 1){
					itemNavList.stop().animate();
					itemNavList.fadeOut(250);
					$("body").removeClass("screen-mask");
					navToggleNum = 0;
				}

				navToggleNum = 0;
				return false;
    		});

    		itemNavList.stop().animate();
    		itemNavList.fadeIn();
    	}
    }



    // ** [產品詳情] 點選小圖片換大圖片

    $(".product-guide-slide-nav img").click(function(){
		
		var imgSrc = $(this).attr("src");
		$("#product-guide-img").attr("src",imgSrc);
	});



	// ** 當捲動時

    $(window).scroll(function(){

    	//go-top-btn : Show / Hide
		currentScrollPostion = $(this).scrollTop(); // 抓取現在 Scroll 位置
		navFix(currentScrollPostion);
		groupScrollRotate(currentScrollPostion);

	});


	$(".product-graphic-slide").owlCarousel({
		loop:true,
    	items:1,
    	responsiveClass:true,
    	startPosition: 2,
	    responsive:{
	        0:{
	        	nav: false,
	            margin: 10,
	            dots: false,
	            stagePadding: 20
	        },
	        768:{
	        	nav:true,
	        	dots: true
	        }
	    }
	});

	$(".owl-stage").css("padding-left","0");


	function brandSubHidden(){
		var item = $(".sub-nav-item:first");
		if($(document.body).outerWidth(true) <= MOBILESTYLEWIDTH && isBrand){
	    	item.hide();
		}else{
			item.show();
		};
	}

	// ** 品牌環

	var groupListItemNum = $(".shinho-group-book-item").length;
	var groupScrollPos = new Array();
	var groupNum = $(".shinho-group-book").data("brand-group-num");
	var groupRotateItem = $(".shinho-group-book-o-rotate");
	var groupRotateDeg;
	var groupRotateLoopNum; 
	var groupRotateItemTop = $(".shinho-group-book-o").position().top - 170; // 最初品牌環 position top 高度

	// 在不同品牌數時 給不同角度 與 Class 樣式

	if(groupNum == 10){
		$(".shinho-group-book-o-list").addClass("list-group-num-" + groupNum);
		groupRotateDeg = 36;
		groupRotateLoopNum = 5;
	}else if(groupNum == 11){
		$(".shinho-group-book-o-list").addClass("list-group-num-" + groupNum);
		groupRotateDeg = 32.73;
		groupRotateLoopNum = 5;
	}else{
		$(".shinho-group-book-o-list").addClass("list-group-num-" + 12);
		groupRotateDeg = 30;
		groupRotateLoopNum = 6;
	}

	

	for(i = 0; i < groupNum; i++){
		$(".shinho-group-book-o-item").eq(i).addClass("status-up");
	}

	for(i = 0; i < groupListItemNum; i++){
		//console.log("i=" +i);
		groupScrollPos[i] = $(".shinho-group-book-item").eq(i).position().top;
	}

	function groupScrollRotate(currentScrollPostion){
		for(j = 0; j < groupListItemNum; j++){
			if( currentScrollPostion >= groupScrollPos[j] - 200 && currentScrollPostion <= groupScrollPos[j] +40){
		
				groupRotateItem.stop().animate();
				groupRotateItem.rotate(-groupRotateDeg * j);

				// 當前的產品編號要大於 6  並   產品編號 (產品)

				//groupListItemNum = 24
				// groupListItemNum - groupRotateLoopNum = 18

				if(j >= groupRotateLoopNum && j < (groupListItemNum - groupRotateLoopNum)){
					//console.log("算數"+(j - groupRotateLoopNum));
					//console.log("要FadeIn的那筆" + (j-groupRotateLoopNum));
					//console.log("中間那筆" + (j));
					//console.log("要FadeIn的那筆" + (j+groupRotateLoopNum));
					$(".shinho-group-book-o-item").removeClass("status-up");
					for(k = (j - groupRotateLoopNum); k < (j + groupRotateLoopNum); k++){
						$(".shinho-group-book-o-item").eq(k).addClass("status-up");
					}

				}else if(j < groupRotateLoopNum){
					$(".shinho-group-book-o-item").removeClass("status-up");
					for(k = 0; k < groupNum; k++){
						$(".shinho-group-book-o-item").eq(k).addClass("status-up");
					}

				}
				else if(j >= (groupListItemNum - groupRotateLoopNum)){
					$(".shinho-group-book-o-item").removeClass("status-up");
					for(k = (groupListItemNum - groupRotateLoopNum*2 -1) ; k < groupListItemNum; k++){
						$(".shinho-group-book-o-item").eq(k).addClass("status-up");
					}
				}
			}
		}

		if(currentScrollPostion > groupRotateItemTop){
			$(".shinho-group-book-o").addClass("status-fixed");
		}else{
			//console.log("有執行");
			$(".shinho-group-book-o").removeClass("status-fixed");
		}

		console.log($(document).scrollTop());
		console.log($(".footer").height());
		console.log($(document).scrollTop() - $(".footer").height());


		if(currentScrollPostion > ($(document).scrollTop() - $(".footer").height()*3)){
			console.log("大於了");
			console.log("現在在"+currentScrollPostion);
			//$(".shinho-group-book-o").stop().animate();
			//$(".shinho-group-book-o").fadeout();
		}else{
			console.log("小於了");
			//$(".shinho-group-book-o").stop().animate();
			//$(".shinho-group-book-o").fadeIn();
		}
	}

	// ** 初始化

	function init(){

		videoSize();
		navToggle();
		brandSubHidden();
		groupScrollRotate(currentScrollPostion);
	}

	$(window).resize(function(){
		
		init();

	});


	init();

	

});

window.onload = function(){

	// ** pre-loader : Loading 效果

	var preLoader = $("#pre-loader");
    preLoader.addClass("fadeout"); //使用渐隐的方法淡出loading page
    var loadingTime = setTimeout(function(){
    	preLoader.hide();
    	clearTimeout(loadingTime);
    },4000);

}

