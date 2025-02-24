$(document).ready(function(){
    let docH = $(document).height();
    let winH = $(window).height();

    $('.login_box a.btn_play').click(function(){
        $('html, body').animate({scrollTop:docH - winH}, 20000);
    });

    let maxLnbH = 0;

    let gnbH = $('header .gnb').height();

    $('header .lnb').each(function(){
        let lnbH = $(this).outerHeight(true);

        if(maxLnbH < lnbH){
            maxLnbH = lnbH
        }
        $('header .lnb_bg').height(maxLnbH + gnbH);
    });
    $('header .lnb').height(maxLnbH);

    $('header .gnb').mouseenter(function(){
        $('header .lnb,header .lnb_bg').fadeIn(150)
    })
    $('header .gnb').mouseleave(function(){
        $('header .lnb,header .lnb_bg').fadeOut(150)
    })

    
    $(".gnb li").hover(
        function() {
            // 0~50px 범위의 랜덤 border-radius 값 생성
            let radius1 = Math.floor(Math.random() * 51) + "px";
            let radius2 = Math.floor(Math.random() * 51) + "px";
            let radius3 = Math.floor(Math.random() * 51) + "px";
            let radius4 = Math.floor(Math.random() * 51) + "px";
            
            $(this).find('a').css("border-radius", `${radius1} ${radius2} ${radius3} ${radius4}`);
        },
        function() {
            // 마우스를 떼면 border-radius를 초기화 (선택 사항)
            $(this).css("border-radius", "0");
        }
    );


    $('#section4 .review').each(function(){
        let maxLength = 70;
        let reviewText = $(this).text().trim();  //공백제외

        if(reviewText.length > maxLength){
            $(this).text(reviewText.substring(0,maxLength)+'...')
        };
    })







    let winScr = $(window).scrollTop();
    let winHeight = $(window).height();
    let winCenter = winScr + winHeight / 2;

    let part1Top = $('#section1').offset().top;
    let part4Top = $('#section4').offset().top;
    let tree1Top = $('.tree1').offset().top;

    // 화면 중앙(winCenter)이 section1부터 section4 사이에 있을 때의 진행 정도 (0 ~ 1)
    let progress = (winCenter - part1Top) / (part4Top - part1Top);
    progress = Math.max(0, Math.min(1, progress)); // progress를 0~1로 클램프

    // 총 dash 길이 (필요에 따라 이 값을 조정하세요)
    let dashTotal = 5200;
    // progress에 따라 dash offset 값 변경 (progress가 0이면 dashTotal, 1이면 0)
    let newDashOffset = dashTotal * (1 - progress);

    let progH = $('.page_progress').height();
    let viyul = progH / (docH - winH)

    // 새로고침시 실행
    carMove()
    part4Action()
    tree()
    progressbar()


    $(window).scroll(function(){
        carMove()     
        part4Action()
        tree()
        progressbar()
    });
    

    function carMove(){
        winScr = $(window).scrollTop();
        winHeight = $(window).height();
        winCenter = winScr + winHeight / 2;
    
        part1Top = $('#section1').offset().top;
        part4Top = $('#section4').offset().top;
        tree1Top = $('.tree1').offset().top;
        // let tree2Top = $('.tree2').offset().top;
    
        // 화면 중앙(winCenter)이 section1부터 section4 사이에 있을 때의 진행 정도 (0 ~ 1)
        progress = (winCenter - part1Top) / (part4Top - part1Top);
        progress = Math.max(0, Math.min(1, progress)); // progress를 0~1로 클램프
    
        // 총 dash 길이 (필요에 따라 이 값을 조정하세요)
        dashTotal = 5200;
        // progress에 따라 dash offset 값 변경 (progress가 0이면 dashTotal, 1이면 0)
        newDashOffset = dashTotal * (1 - progress);
    
        $('.road .doro').css({ strokeDashoffset: newDashOffset });
        $('.road .line2').css({ strokeDashoffset: newDashOffset });
        $('.road .line3').css({ strokeDashoffset: newDashOffset });
        $('.road .line4').css({ strokeDashoffset: newDashOffset });
        $('.road .tire1').css({ strokeDashoffset: newDashOffset });
        $('.road .tire2').css({ strokeDashoffset: newDashOffset });
    }

    function part4Action(){
        // 화면 중앙이 section4에 도달하면 배경 클래스 on 추가
        if(winCenter >= part4Top){
            $('#section4 .bg').addClass('on');
        } else {
            $('#section4 .bg').removeClass('on');
        }
    }

    function tree(){
        if(winScr >= tree1Top - winHeight/2){
            $('.tree1 img').addClass('on')
            $('.tree2 img').addClass('on')
        };
    }

    function progressbar(){
        if(winScr >= winH/2){
            $('.page_progress').fadeIn();
        } else {
            $('.page_progress').fadeOut();
        }
        progH = $('.page_progress').height();
        viyul = progH / (docH - winH)

        $('.bar').height(winScr * viyul)
    }
});