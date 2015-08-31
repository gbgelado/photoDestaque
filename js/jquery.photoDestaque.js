/* ------------------------------------------------------------------------
	Class: photoDestaque
	Author: Gabriel Gelado
	Version: 1.0
------------------------------------------------------------------------- */


(function(e) {

    e.fn.photoDestaque = function(s) {

        e.photoDestaque = {
            version: "0.1"
        };

        var info = {
            version: "0.1",
            pause: 7000,
            i: 0
        };

        var BodyWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        var BodyHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

        var htmlContent   = $('.photoDestaqueThumbnails > li').html();
        var arrImgsClone  = $('.photoDestaqueThumbnails > li').find('img').clone();
        var arrDescClone  = $('.photoDestaqueThumbnails > li').find('.imgDesc').clone();
        var arrImgs       = $('.photoDestaqueThumbnails > li').find('img');
        var arrDesc       = $('.photoDestaqueThumbnails > li').find('.imgDesc');
        var photoDestaque = $('#photoDestaque')

        info.i=Loop(info.i,true);

        startLoop();

        $('.imgControls > span').on('click', function(){
            if($(this).hasClass('glyphicon-chevron-left')){
                var prev = info.i-2;
                if(prev<0){
                    prev = (arrImgs.length-1);
                }
                info.i=Loop((prev),true);
            } else if($(this).hasClass('glyphicon-chevron-right')){
                var next = info.i;
                if(next>arrImgs.length-1){
                    next = 0;
                }
                info.i=Loop(next,true)
            } else {
                return false;
            }
        });

        function Loop(index, scroll, callback){

            if(index==undefined) index = 0;

            $('#photoDestaque').find('img').remove();
            $('#photoDestaque').find('.imgDesc').remove();
            $('#photoDestaque').append(arrImgsClone[index]);
            $('#photoDestaque').append(arrDescClone[index]).animate({opacity:1});

            var ImgSize = $('#photoDestaque > img').height();
            var photoDestaqueSize = $('#photoDestaque').height();

            if(photoDestaqueSize<ImgSize){
                var marginTop = -((ImgSize-photoDestaqueSize)/2);
            }

            $('#photoDestaque > img').css({
                'margin-top': marginTop+'px'
            });

            if(callback && typeof(callback) === "function") callback();
            if(scroll && scroll===true) Scroll(index);

            $('#photoDestaque > img').on('click', function(){
                e.photoDestaque.Open();
                stopLoop()
            });

            return index+1;
        }

        function Scroll(index){
            var scrollTo  = $(arrImgs[index]);
            var container = $('.photoDestaqueThumbnails');

            if(index==0){
                container.animate({scrollTop:0},600);
            } else {
                // container.scrollTop(
                //     scrollTo.offset().top - container.offset().top + container.scrollTop() - 5
                // )

                container.animate({
                    scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop() - 5
                })
            }

            arrImgs.removeClass('imgSelect')
            scrollTo.addClass('imgSelect');
        }

        function stopLoop() {
            $(photoDestaque).addClass('stop');
        }

        function startLoop() {
            setInterval(function(){
                if($(photoDestaque).hasClass('stop')) return false;
                info.i = Loop(info.i, true);
                if(info.i>(arrImgsClone.length-1)) info.i=0;
            }, info.pause);
        }

        e.photoDestaque.Open = function(){

            var t = photoDestaque;

            var img = $(t).find('img').clone();
            var desc = $(t).find('.imgDesc').clone();

            $("body").append("<div class='black_overlay'></div><div id='LightIMG'></div>");
            $("#LightIMG").html(img).append(desc);

            ImgWidth  = img.width();
            ImgHeight = img.height();

            var NewHeight  = BodyHeight-(BodyHeight*0.10);
            var Proportion = (NewHeight)/ImgHeight;
            var NewWidth   = ImgWidth*Proportion;

            if(NewWidth>BodyWidth){
                NewWidth  = BodyWidth-(BodyWidth*0.10);
                Proportion = (NewWidth)/ImgWidth;
                NewHeight   = ImgHeight*Proportion;
            }

            $(img).css({
                'width'       : NewWidth,
                'height'      : NewHeight,
                'margin-left' : -(NewWidth/2),
                'margin-top'  : -(NewHeight/2)
            });

            $(desc).css({
                'width'       : (NewWidth-6),
                'margin-left' : (-(NewWidth/2)+3)
            });

            $('.black_overlay').one('click',function() {
                e.photoDestaque.Close(this);
            });
        }

        e.photoDestaque.Close = function(t){
            $(".black_overlay").remove();
            $("#LightIMG").remove();
            // $(photoDestaque).removeClass('stop');
            info.pause = 7000;
        }

        arrImgs.on('click', function(){
            index = arrImgs.index(this);
            info.i=Loop(index, false);
            if(info.i>(arrImgsClone.length-1)) info.i=0;
            arrImgs.removeClass('imgSelect');
            $(arrImgs[index]).addClass('imgSelect');
            stopLoop();
        });

        arrImgs.on('dblclick', function(){
            e.photoDestaque.Open(this);
            stopLoop();
        });


        e(document).unbind("keydown.photoDestaque").bind("keydown.photoDestaque", function(t) {
            // if (typeof $pp_pic_holder != "undefined") {
            //     if ($pp_pic_holder.is(":visible")) {
                    switch (t.keyCode) {
                        case 37:
                            // e.prettyPhoto.changePage("previous");
                            // t.preventDefault();
                            break;
                        case 39:
                            // e.prettyPhoto.changePage("next");
                            // t.preventDefault();
                            break;
                        case 27:
                            // if (!settings.modal) e.prettyPhoto.close();
                            // t.preventDefault();
                            e.photoDestaque.Close();
                            break
                    }
            //     }
            // }
        })

    };

})(jQuery);