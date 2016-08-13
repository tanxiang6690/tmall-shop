//1
//2016.4.28 
//解决类名的兼容函数 
//classname是你要找的类名
//father：通过父元素来找类名
function getClass(classname,father){
    father=father||document;
     //设置父元素默认值为文档
    if(father.getElementsByClassName){
      //判断是否支持获取类名属性，因此用来判断浏览器类型
        return father.getElementsByClassName(classname);
    }else{//ie浏览器的话，通过下面的方法获取类名
        var arr=[];//定义一个空数组
        var all=father.getElementsByTagName("*")//通过标签名获取所有标签
        for(var i=0;i<all.length;i++){//遍历刚刚获取的标签
          if(checkRe(all[i].className,classname)){//找到指定名称的标签
               arr.push(all[i]);//将符合的对象放入新的数组中
          }          
        }
        return arr;
    }
}
      function checkRe(arr,classname){
      var newarr=arr.split(" ");
        for(var i in newarr){
          if(newarr[i]==classname){//如果条件相等的时候,返回真,用于上面函数中if的条件判断         
            return true;
          }
        }
        return false;
      }
//*******************************************************************************************

   //2016.5.3
   //2.纯文本的兼容函数
   //obj:对象
   //val：要设置的内容
  function getText(obj,val){
    if(val==undefined){
      if(obj.textContent){
        return obj.textContent
      }else{
        return obj.innerText
      }
    }else{
      if(obj.textContent){
        return obj.textContent=val;
      }else{
        return obj.innerText=val;
      }
    }        
  }
//***********************************************************************
   //3获取样式的兼容函数
   //attr属性
   //obj对象
  function getStyle(obj,attr){
      if(obj.currentStyle){
          return parseInt(obj.currentStyle[attr]);
      }else{ 
          return parseInt(getComputedStyle(obj,null)[attr]);
      }
  }
//*******************************************************************
  //2016.5.5
   //4.获取元素的兼容函数      
   /* $(".box")
      $("#box")
      $("li")
   */
   //selector: 表示选择器，与css一样   . # 
   //father:表示父容器，如果传参的时候传father，需要对father先进行一次获取
   //传入的实参必须是字符串
    function $(selector,father){
        father=father||document;
        if(typeof selector=="string"){
            selector=selector.replace(/^\s*|\s*$/g,"");
            //去除字符串左右空格
            if(selector.charAt(0)=="."){
                return getClass(selector.slice(1),father);
            }else if(selector.charAt(0)=="#"){
                return father.getElementById(selector.slice(1)); 
            }else if(/^[a-zA-Z1-6]{1,6}$/.test(selector)){
                return father.getElementsByTagName(selector);
            }
        }else if(typeof selector=="function"){
            window.onload=function(){
                selector();//第一个形参selector,需要让它运行
            }
        }
    }
//******************************************************************************
     //5. 2016 05.06
     //通过节点获取子元素
    function getChild(father,type){
        type=type||"a";
        var all=father.childNodes;
        var arr=[];
        if(type=="a"){
          for(var i=0;i<all.length;i++){
              if(all[i].nodeType==1){
                arr.push(all[i]);
              }
          }
          return arr;
        }
        if(type=="b"){
            for(var i=0;i<all.length;i++){
              if(all[i].nodeType==1||(all[i].nodeValue.replace(/^\s*|\s*$/g,"")!=""&&all[i].nodeType==3)){
                arr.push(all[i]);
              }
            }
            return arr;
        } 
    }
   //6.获得子节点的第一个
      function getFirst(father,type){
          return getChild(father,type)[0];
      }
    //7.获得子节点的最后一个
      function getLast(father,type){
          return  getChild(father,type)[getChild(father,type).length-1];
      }
    //8.获得指定下标的子节点
      function getAny(father,type,num){
          return getChild(father,type)[num]
      }
//***************************************************************************          
    //2016.5.7、 
    //9.获取上一个兄弟节点的兼容函数
    //obj 任意的一个元素节点
      function getUp(obj){
          var up=obj.previousSibling;
          if (up==null){
            return false;
          }
          while(up.nodeType==8||(up.nodeType==3&&up.nodeValue.replace(/^\s*|\s*$/g,"")=="")){
              up=up.previousSibling;
              if(up==null){
                return false;
              }
          }
          return up;
      }
//***************************************************************************  
      function getNext(obj){
          var next=obj.nextSibling;
          if (next==null){
              return false;
          }
          while(next.nodeType==8||(next.nodeType==3&&next.nodeValue.replace(/^\s*|\s*$/g,"")=="")){
              next=next.nextSibling;
              if(next==null){
                return false
              }
          }
          return next;
      }
//***************************************************************************
//10.插入到某个对象之后
      function insertAfter(father,newNode,obj){
          var next=getNext(obj);
          if(next){
            father.insertBefore(newNode,next);
          }else{
            father.appendChild(newNode);
         }     
      }


//****************************************************************************
//11.多个事件绑定兼容函数
//2016.5.11
function addEvent(obj,event,fun){
  if(obj.addEventListener){
    return obj.addEventListener(event,fun,false);
  }else{
    return obj.attachEvent("on"+event,function(){
      fun.call(obj);
    });
  }
}
//*******************************************************************************
//12.删除绑定事件的兼容函数
function deleteEvent(obj,event,fun){
  if(obj.removeEventListener){
    return obj.removeEventListener(event,fun,false)
  }else{
    return obj.detachEvent("on"+event,function(){
      fun.call(obj);
    })
  }
}

//***************************************************************************
//13.滚轮事件向上向下的兼容函数
function mouseWheel(obj,up,down){
  if(obj.attachEvent){
        obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
    }else if(obj.addEventListener){
        obj.addEventListener("mousewheel",scrollFn,false);
        //chrome,safari -webkit-
        obj.addEventListener("DOMMouseScroll",scrollFn,false);
        //firefox -moz-
    }
    function scrollFn(e){
      var ev=e||window.event;
      var val=ev.detail||ev.wheelDelta;
      if(val==-3 || val==120){
        up();
      }else if(val==3||val==-120){
        down();
      }
    }
}

//***************************************************************************
 //14.实现拖拽的构造函数
    /*obj:要实现拖拽的对象
    attrobj:属性对象 以{}节省格式传入
    x:为true时，可以在x轴拖动，false反之；
    y:为true时，可以在y轴拖动，false反之；
    animate:为true时，有缓冲效果，false反之；
    father:父对象*/
    function drag(obj,attrobj){//实现拖拽的构造函数创建 attr属性
        this.obj=obj;//要实现拖拽的对象
        this.cx=0;
        this.cy=0;
        this.ox=0;
        this.oy=0;
        this.attrobj=attrobj==undefined?null:attrobj;
        this.x=attrobj.x!=undefined?attrobj.x:true;
        this.y=attrobj.y!=undefined?attrobj.y:true;
        this.animate=attrobj.animate!=undefined?attrobj.animate:true;
        this.father=attrobj.father!=undefined?attrobj.father:document;
        //
        if(this.father.nodeType==9){//父容器为document
            this.fw=document.documentElement.clientWidth;
            this.fh=document.documentElement.clientHeight;
            document.body.style.position="relative";
        }else{
            this.fw=this.father.offsetWidth;
            this.fh=this.father.offsetHeight;
            this.father.style.position="relative";

        }
         this.ow=this.obj.offsetWidth;
         this.oh=this.obj.offsetHeight;
         this.startx=0;
         this.starty=0;
         this.endx=0;
         this.endy=0;
         this.lenx=0;
         this.leny=0;
         this.speed=0.8;
    }
    drag.prototype={
        drags:function(){//实现拖拽的方法
           //alert(2);
           this.down();   
        },
        down:function(){
            var that=this;//记录方法里this指向实例化对象，事件里，this指事件源
          this.obj.onmousedown=function(e){
           var ev=e||window.event;
            if (ev.preventDefault){ //阻止浏览器的默认行为FF Chrome
              ev.preventDefault(); //阻止默认浏览器动作(W3C)
             }else{
            ev.returnValue=false;//IE中阻止函数器默认动作的方式
           }
           that.ox=ev.clientX-this.offsetLeft;
           that.oy=ev.clientY-this.offsetTop;
            //this.obj是文档对象，可以添加按下事件，而this只实例化出来的obj对象，两者不一样
            // alert(1);
            //alert(this);
            that.startx=that.ox;
            that.starty=that.oy;
            that.move();
            that.up();
          }
        },
        move:function(){
            var that=this;//在方法里，this实例化对象
            document.onmousemove=function(e){
           //alert(3)
           var ev=e||window.event;
            if (ev.preventDefault){ //阻止浏览器的默认行为FF Chrome
          ev.preventDefault();} //阻止默认浏览器动作(W3C)
          else{
           ev.returnValue=false;//IE中阻止函数器默认动作的方式
           }
           that.cx=ev.clientX;
           that.cy=ev.clientY;
           var x=that.cx-that.ox;
           var y=that.cy-that.oy;
           if(x<=0){
            x=0;
           }
           if(y<=0){
            y=0;
           }
           if(x>=that.fw-that.ow){
            x=that.fw-that.ow;
           }
           if(y>=that.fh-that.oh){
            y=that.fh-that.oh;
           }
          
           if(that.x){
             that.obj.style.left=x+"px";
           }
           if(that.y){
             that.obj.style.top=y+"px";
           }
          that.endx=that.cx;
          that.endy=that.cy;
          that.lenx=that.endx-that.startx;
          that.leny=that.endy-that.starty;
          that.startx=that.endx;
          that.starty=that.endy;
            }
        },
        up:function(){
            var that=this;
            document.onmouseup=function(){
                //alert(4); 
                if(that.animate){
                var t=setInterval(function(){
                that.lenx*=that.speed;//距离每次都会减小
                that.leny*=that.speed;
                if(that.lenx>=1){
                   
                    var x=that.lenx+that.obj.offsetLeft;
                    var y=that.leny+that.obj.offsetTop;
                    if(x<=0){
                        x=0;
                       }
                       if(y<=0){
                        y=0;
                       }
                       if(x>=that.fw-that.ow){
                        x=that.fw-that.ow;
                       }
                       if(y>=that.fh-that.oh){
                        y=that.fh-that.oh;
                       }
                    that.obj.style.left=x+"px";
                    that.obj.style.top=y+"px";
                }else{
                    clearInterval(t);
                }
              },40)
            }
                document.onmousemove=null;
                document.onmouseup=null;
            }
        } 
    }
    
//*********************************
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/