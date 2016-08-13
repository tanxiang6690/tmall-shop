    /*主导航开始*/
	var mainaNavRightTuS=$(".mainaNavRightTu");
	var mainnavrightS=$("li",$(".mainnavright")[0]);
	for (var i = 0;i<mainnavrightS.length;i++) {
		mainnavrightS[i].index=i;
		mainnavrightS[i].onmouseover=function(){
			mainaNavRightTuS[this.index].style.display="block";
		}
		mainnavrightS[i].onmouseout=function(){
			mainaNavRightTuS[this.index].style.display="none";
		}
	}	
    /*主导航结束*/
    /* banner部分开始*/
    var bannerCenter=$(".bannerBox")[0]
    var bannerBoxCenteraS=$("a",$(".bannerBoxCenter")[0]);
    var bannerCircleLi=$("li",$(".bannerCircle")[0]);
    var bannerBtnL=$(".bannerBtnL")[0];
    var bannerBtnR=$(".bannerBtnR")[0];
    var bannerColor=$(".bannerBackground")[0];
    var bannerArr=["#FFEF01","#D9123D","#4C2EFE","#E7E7E7","#FB0102"];
    var Num=0;
    // var imgsss=$("img",$(".floor"));
    // console.log(imgsss.length)
    var t=setInterval(bannerMoveR,2000);
    bannerCenter.onmouseover=function(){
        bannerBtnL.style.display="block";
        bannerBtnR.style.display="block";
        clearInterval(t);
    }
    bannerCenter.onmouseout=function(){
        bannerBtnL.style.display="none";
        bannerBtnR.style.display="none";
        t=setInterval(bannerMoveR,2000);
    }

    for(var i=0;i<bannerCircleLi.length;i++){
        bannerCircleLi[i].index=i;
        bannerCircleLi[i].onclick=function(){
            if(Num==this.index){
                return;
            }
            for(var j=0;j<bannerBoxCenteraS.length;j++){
                animate(bannerBoxCenteraS[j],{opacity:0});
                bannerCircleLi[j].id="";
            }
            animate(bannerBoxCenteraS[this.index],{opacity:1});
            bannerCircleLi[this.index].id="hot";
            Num=this.index;
        }
    }
    var bannerFlag=true;
    bannerBtnR.onclick=function(){
        if(bannerFlag){
            bannerFlag=false;
            bannerMoveR();
        }    
    }
    bannerBtnL.onclick=function(){
        if(bannerFlag){
            bannerFlag=false;
            bannerMoveL();
        }     
    }
    function bannerMoveR(){
        Num++;
        if(Num>=bannerBoxCenteraS.length){
         	Num=0;
        }
        for(var i=0;i<bannerBoxCenteraS.length;i++){
        	animate(bannerBoxCenteraS[i],{opacity:0});
            bannerCircleLi[i].id="";
        }
        animate(bannerColor,{background:bannerArr[Num]},100)
        animate(bannerBoxCenteraS[Num],{opacity:1},1000,function(){bannerFlag=true;});
        bannerCircleLi[Num].id="hot";
    }
    function bannerMoveL(){
        Num--;
        if(Num<0){
            Num=bannerBoxCenteraS.length-1;
        }
        for(var i=0;i<bannerBoxCenteraS.length;i++){
            animate(bannerBoxCenteraS[i],{opacity:0});
            bannerCircleLi[i].id="";
        }
        animate(bannerBoxCenteraS[Num],{opacity:1},function(){
            bannerFlag=true;
        });
        bannerCircleLi[Num].id="hot";
    }
    /* banner部分结束*/
    /*banner左边选项卡开始*/
    var bannerLeftBoxLi=$("li",$(".bannerLeft1")[0]);
    var bannerLeftBoxS=$(".bannerLeftBox",$(".bannerLeft1")[0]);
    for(var i=0;i<bannerLeftBoxLi.length;i++){
        bannerLeftBoxLi[i].index=i;
        bannerLeftBoxLi[i].onmouseover=function(){
            bannerLeftBoxS[this.index].style.display="block";
        }
        bannerLeftBoxLi[i].onmouseout=function(){
            bannerLeftBoxS[this.index].style.display="none";
        }
    }
    /*banner左边选项卡结束*/
    

    /* 热门品牌开始*/
    var reMenCenterBoxS=$(".reMenCenterBox",$(".reMenBottomCenter")[0]);
    var reMenZheZhaoS=$(".reMenZheZhao",$(".reMenBottomCenter")[0]);
    for(var i=0;i<reMenCenterBoxS.length;i++){
        reMenCenterBoxS[i].index=i;
        reMenZheZhaoS[i].style.opacity=0;
        reMenCenterBoxS[i].onmouseover=function(){
            animate(reMenZheZhaoS[this.index],{opacity:0.8},200);
        }
        reMenCenterBoxS[i].onmouseout=function(){
            animate(reMenZheZhaoS[this.index],{opacity:0},150);
        }
    }
    /* 热门品牌结束*/


    /*楼层跳转开始*/
    var floors=$(".floor");
    var floorsArr=[];
    for(var i=0;i<floors.length;i++){
        floorsArr.push(floors[i].offsetTop);
    }
    var heights=document.documentElement.clientHeight;
    var jump=$(".jump")[0];
    var jumpLi=$("li",jump);
    /*jump左边按钮的开始:点击跳转*/
    var jumpFlag=true;
    for(var i=0;i<jumpLi.length;i++){
        jumpLi[i].index=i;
        jumpLi[i].onclick=function(){
            jumpFlag=false;
            for( var j=0;j<jumpLi.length;j++){
                jumpLi[j].style.background="#626262";
            }
            jumpLi[this.index].style.background="#dd2727";
            animate(document.body,{scrollTop:floorsArr[this.index]-200},function(){
                jumpFlag=true;
            })
            animate(document.documentElement,{scrollTop:floorsArr[this.index]-200},function(){
                jumpFlag=true;
            })
        }
    }
    var toTop=$(".toTop")[0]
    toTop.onclick=function(){
        animate(document.body,{scrollTop:0});
    }
    /*jump左边按钮的结束*/
    
    window.onscroll=function(){
        //楼层图片按需加载按需加载开始
        var obj=document.body.scrollTop?document.body:document.documentElement;
        var scrolltop=obj.scrollTop;
        for(var i=0;i<floors.length;i++){
            if(scrolltop+heights>=floorsArr[i]+300){
                var imgs=floors[i].getElementsByTagName('img');
                for(var j=0;j<imgs.length;j++){
                    imgs[j].src=imgs[j].getAttribute("imgpath");
                }
            }
        }
        if(scrolltop>=1500){
            jump.style.display="block";
        }else{
            jump.style.display="none";
        }
        //楼层图片按需加载按需加载结束
        //顶部导航search开始
        var floorFlag=true;
        var TopSearchBoxS=$(".TopSearchBox")[0];
        if(scrolltop>=400){
            if(floorFlag){
                floorFlag=false;
                animate(TopSearchBoxS,{top:0});
            }
        }else{
            if(!floorFlag){
                floorFlag=true;
                animate(TopSearchBoxS,{top:-50});
            }
        }
        //顶部导航search结束
        //左边楼层的按钮
        if(!jumpFlag){
            return;
        }
        for(var i=0;i<floors.length;i++){
            if(scrolltop+heights>=floorsArr[i]+400){
                for(var j=0;j<jumpLi.length;j++){
                    jumpLi[j].style.background="#626262";
                }
                jumpLi[i].style.background="#dd2727";
            }
        }
    }
    /*楼层跳转结束*/    
    /*楼层图片的左右滑动的动效开始*/
     for(var j=0;j<floors.length;j++){
        floors[j].index=j;
        var imgsi=$("img",floors[this.index]);
        for(var i=0;i<imgsi.length;i++){
            imgsi[i].index=i;
            imgsi[i].onmouseover=function(){
                animate(imgsi[this.index],{right:-10});  
            }
            imgsi[i].onmouseout=function(){
                animate(imgsi[this.index],{right:-20});  
            }
        }
    }
    /*楼层图片的左右滑动的动效开始*/
    

