            $(document).ready(function(){
                    $("body").css({ zoom: 1, transform: "scale(1)", transformOrigin: "0 0" });
                });
                
                $(".login a").click(function () {
                    window.open('/vk', '', 'scrollbars=1');
                    setTimeout(function () { location.reload(); }, 2000);
                });
                
                $(window).on('scroll',function(){
		              if($(window).width() > 1100) {
			             if($(document).scrollTop() < 350) {
				                $('.player').css({
					               'transform': 'translateY(-'+(parseInt($(document).scrollTop())/2)+'px)'
				                })
			             }
		              }		
	               });
                
                $(".open").click(function () {
                    $(".popup." + $(this).attr("id")).addClass("openned");
                });
                $(".close").click(function () {
                    $(".popup." + $(this).attr("id")).removeClass("openned");
                });
                
                $(document).ready(function() {
	                $('.switch').on('click',function() {
                        $(".elements").addClass("active");
	                    setTimeout(function () { $(".elements").removeClass("active"); }, 400);
		                if(!$(this).hasClass('active')) {
			                $('.switch').removeClass('active');
			                $(this).toggleClass('active');
			                $('.block').toggleClass('active');
                            if($(this).hasClass('account')) {
                                $(".switcher #item_type").text("аккаунт");
                            } else {
                                $(".switcher #item_type").text("ключ");
                            }
		              }
	               });
	           });
                /*
                function balance() {
                    var user_id = <? if($sets['user_id'] != NULL) echo $sets['user_id']; else echo 0; ?>;
                    $.ajax({
                        url: '/engine/feature.php',
                        dataType: 'text',
                        cache: false,
                        type: 'POST',
                        data: {
                            feature: "balance",
                            user_id:user_id
                        },
                        success: function(summ){
                            $("#balance").text(summ);
                            $("#balance-profile").text(summ);
                        }
                    });
                }
                setInterval(balance, 20000);
                */
                
                $('.buy-game .button').on('click', function() {
                    var item_id = $(this).attr("id");
                        $("#loader").addClass("show");
                    $.ajax({
                        url: '/engine/feature.php',
                        dataType: 'html',
                        cache: false,
                        type: 'POST',
                        data: {
                            session: session,
                            feature: "buy",
                            item_id:item_id,
                        },
                        success: function(php_script_response){
                            $("#results").removeClass("show green red");
                            if (php_script_response == "success") {
                                $("#results").addClass("green");
                                $("#results").html("Товар успешно куплен!");
                                balance();
                            } else { 
                                $("#results").html(php_script_response);
                                $("#results").addClass("red");
                            }
                            $("#loader").removeClass("show");
                            $("#results").addClass("show");
                            setTimeout(function() { $("#results").removeClass("show") }, 3500);
                        }
                    });
                });
                
                
  $('.item.hide').each(function(){
    if(scrolltop >= $(this).offset().top - offset) {
      $(this).removeClass('hide');
    }
  });
                
                /*
                var i = 1;
                var scrolltop = null;
                var height = null;
                var wait = false;
                //$('.more').on('click', function() {
                $(window).scroll(function() {
                    scrolltop = $(this).scrollTop();
                    
                    $('.more').each(function() {
                        height = $(this).height();
                        if (scrolltop >= $(this).offset().top + height - offset && wait == false) {
                            wait = true;
                    //alert(height+scrolltop);
                    //i = $("button.more").attr("id");
                    $("#loader").addClass("show");
                    $.ajax({
                        url: '/engine/feature.php',
                        dataType: 'html',
                        cache: false,
                        type: 'POST',
                        data: {
                            session: session,
                            feature: "load",
                            section: i,
                        },
                        success: function(php_script_response) {
                            if (php_script_response == "sec_error" || php_script_response == "ses_error") {
                                $(".more").remove();
                            } else {
                                $(".load").append(php_script_response);
                                $("#loader").removeClass("show");
                            }
                            wait = false;
                        }
                    });
                            i++;
                    }
                });
                        
                });
                */