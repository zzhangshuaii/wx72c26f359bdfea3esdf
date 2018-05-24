//scale.js
//获取应用实例

var app = getApp()
var beta = 0;
var last_beta = 0;
var ratio = 1;
var dis;
var x0 = 0;
var y0 = 0;
var i_width = 740;
var i_height = 480;

const PI = 3.14159;

// the arrow location and direction
var location_x= new Array(-100,300,200);
var location_y= new Array(-100,200,200);
var a_x = location_x[app.globalData.location];
var a_y = location_y[app.globalData.location];
var path_x = new Array(100,300,300,400);
var path_y = new Array(100,90,200,200);

var liftA1_x = 160;
var liftA1_y = 250;
var liftA2_x = 260;
var liftA2_y = 250;
var liftA3_x = 360;
var liftA3_y = 250;
var a_a = PI/4;

var startX = 0;
var startY = 0;
var startang = 0;
var angle = 0;
var diff_ang = 0;
var last_diff_ang = 0;
var src = "../../images/map_s.jpg"
var arrow = "../../images/arrow.png"
var liftA1 = "../../images/lift.png"
var liftA2 = "../../images/lift.png"
var liftA3 = "../../images/lift.png"
var context = wx.createCanvasContext('firstCanvas')

Page({

  data: {

  },

  //Start-------------------------------------------
  touchStart: function (e) {
    if (e.touches.length == 1) {

      startX = e.touches[0].x;
      startY = e.touches[0].y;
    }
    else {
      startX = (e.touches[0].x + e.touches[1].x) / 2;
      startY = (e.touches[0].y + e.touches[1].y) / 2;

      var dx = e.touches[1].x - e.touches[0].x;
      var dy = e.touches[1].y - e.touches[0].y;
      dis = Math.sqrt(dx * dx + dy * dy);

      startang = Math.atan(dy / dx);
    }
    //console.log(x0, y0, x1, y1)
    //console.log(y0)
  },

  //Move--------------------------------------------
  touchMove: function (e) {
    //触摸移动中
    //console.log('touchmoveCallback');
    //console.log(e);

    if (e.touches.length == 1) {

      var x = e.touches[0].x;
      var y = e.touches[0].y;

      var dx = x - startX;
      var dy = y - startY;

      startX = x;
      startY = y;
      //console.log(x,startX,x-startX)
      x0 += dx;
      y0 += dy;

      //console.log(x0, y0, x1, y1)

    } else {

      //双指平移

      // get the middle point of two touch points
      var x = (e.touches[0].x + e.touches[1].x) / 2;
      var y = (e.touches[0].y + e.touches[1].y) / 2;

      // calculate the displacement 
      var dx = x - startX;
      var dy = y - startY;

      // refreash the start point
      startX = x;
      startY = y;



      //双指缩放

      // Manhattan distance between two touch points
      var offsetX = e.touches[1].x - e.touches[0].x;
      var offsetY = e.touches[1].y - e.touches[0].y;

      // the straight distance ^2
      var dis_now = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

      // calc the scale ratio
      ratio = dis_now / dis;

      // refresh the distance
      dis = dis_now;

      // recala the image width & height
      i_width *= ratio;
      i_height *= ratio;

      // recalc the arrow location
      a_x = a_x * ratio;
      a_y = a_y * ratio;
      for (var i = 0; i < path_x.length; i++) {
        path_x[i] = path_x[i] * ratio;
        path_y[i] = path_y[i] * ratio;
      }
      liftA1_x = liftA1_x * ratio;
      liftA1_y = liftA1_y * ratio;
      liftA2_x = liftA2_x * ratio;
      liftA2_y = liftA2_y * ratio;
      liftA3_x = liftA3_x * ratio;
      liftA3_y = liftA3_y * ratio;


      /*
              //双指旋转
              
              angle = Math.atan(offsetY / offsetX);
              diff_ang = angle - startang;
      
              if (Math.abs(diff_ang-last_diff_ang)>0.1*PI){
                  if(diff_ang<0){
                    diff_ang+=PI
                  }else{
                    diff_ang-=PI
                  }
              }
              
      
              //console.log(angle,startang, diff_ang)
      
              //console.log(x, y, x0, y0,diff_ang)
      
              
              var x0_to_x = x - x0;
              var y0_to_y = y - y0;
              var dis_x0_x = Math.sqrt(x0_to_x*x0_to_x + y0_to_y*y0_to_y)
              
              beta = Math.atan( y0_to_y/x0_to_x )
              if((x0_to_x<0)&&(y0_to_y>0)){
                beta+=PI;
              }
              if((x0_to_x<0)&&(y0_to_y<0)){
                beta-=PI;
              }
              
              if (Math.abs(beta-last_beta)>0.6*PI/2){
                  if(beta<0){
                    beta+=PI/2
                  }else{
                    beta-=PI/2
                  }
              }
              last_beta=beta;
      
              var alpha = beta + diff_ang - last_diff_ang;
              last_diff_ang=diff_ang;
              
              // change the origin point location
      
      
      
              
      
              x0 = x - dis_x0_x*Math.cos(alpha);
              y0 = y - dis_x0_x*Math.sin(alpha);
      
              //console.log("after", x0, y0)
      */

      // recalc the origin point after scaling
      x0 = x - (x - x0) * ratio;
      y0 = y - (y - y0) * ratio;

      // after moving
      x0 += dx;
      y0 += dy;

      //Change the location of origin point







      /*
      context.setFontSize(20)
      context.fillText(ratio.toString(), 20, 20)
      
      context.setLineWidth(4);
      context.beginPath();
      context.arc(x, y, 4, 0, 2 * Math.PI, true);
      context.arc(e.touches[1].x, e.touches[1].y, 4, 0, 2 * Math.PI, true);
      context.closePath();
      context.stroke();
      */



    }
    //console.log(y0)
    this.draw()
    /*
    context.translate(x, y)
    context.rotate(diff_ang)
    context.drawImage(src, x0 - x, y0 - y, i_width, i_height)
    context.draw()
    context.translate(0, 0)
    context.rotate(0)
    */
  },

  touchEnd: function (e) {

  },
  onLoad: function (option) {

    //context.drawImage(src, 130, 115, 480 ,365)

    /*for(var i=0;i<350;i+=10)
      for(var j=0;j<500;j+=10){
    context.setLineWidth(2);
    context.beginPath();
    context.arc(i, j, 1, 0, 2 * Math.PI, true);
    context.closePath();
    context.stroke();
      }*/

    //console.log(option)
    if (typeof (option.ax) != "undefined"){
    a_x = option.ax;
    a_y = option.ay;
    }

    a_x = location_x[app.globalData.location];
    a_y = location_y[app.globalData.location];
    path_x = new Array(100, 300, 300, 400, 400);
    path_y = new Array(100, 90, 200, 200, 400);
    liftA1_x=180;
    liftA1_y=280;
    liftA2_x = 290;
    liftA2_y = 284;
    liftA3_x = 300;
    liftA3_y = 130;
    a_a=PI/4;
    beta = 0;
    ratio = 1;
    dis;
    x0 = 0;
    y0 = 0;
    i_width = 740;
    i_height = 480;

    //console.log(a_x)

    startX = 0;
    startY = 0;
    startang = 0;
    angle = 0;
    diff_ang = 0;
    last_diff_ang = 0;
    src = "../../images/map_s.jpg"
    arrow = "../../images/arrow.png"
    liftA1 = "../../images/lift.png"
    liftA2 = "../../images/lift.png"
    liftA3 = "../../images/lift.png"

    context = wx.createCanvasContext('firstCanvas')

    this.draw()
  },

  canvas_path:function(context, x_array,y_array){
    context.beginPath()
    context.setStrokeStyle("#4090FF")
    context.setLineWidth(8)
    context.setLineCap('round')
    for (var i = 0; i < x_array.length-1; i++) {
      context.moveTo(x_array[i], y_array[i]);
      context.lineTo(x_array[i+1], y_array[i+1]);
    }
    

    context.stroke()
  },

  canvas_arrow:function(context, fromx, fromy, angle){
    
    var tox = fromx + 100 * Math.cos(angle)
    var toy = fromy + 100 * Math.sin(angle)

    context.beginPath()
    //context.setGlobalAlpha(0.7)
    context.setFillStyle("#3399ff")
    context.arc(fromx, fromy, 20, 0, 2 * Math.PI)
    context.fill()

    context.beginPath()
    context.setStrokeStyle("#ff0000")
    context.setLineWidth(10)
    context.setLineCap('round')
    var headlen = 30;   // length of head in pixels
    var angle = Math.atan2(toy - fromy, tox - fromx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));

    context.stroke()
  },

  draw: function () {
    context.setFontSize(20)
    var a = beta / PI * 180
    var b = y0 / PI * 180
    var c = diff_ang / PI * 180
    //context.fillText(a.toString(), 20, 20)
    //context.fillText(b.toString(), 20, 40)
    //context.fillText(c.toString(), 20, 60)

    context.translate(x0, y0)
    //context.rotate(diff_ang)

    context.drawImage(src, 0, 0, i_width, i_height)
    context.drawImage(liftA1, liftA1_x-17, liftA1_y-35, 35, 35)
    context.drawImage(liftA2, liftA2_x - 17, liftA2_y - 35, 35, 35)
    context.drawImage(liftA3, liftA3_x - 17, liftA3_y - 35, 35, 35)
    //context.drawImage(arrow, a_x, a_y, 100, 100)
    
    

    //context.moveTo(a_x,a_y)
    //context.lineTo(a_x + 100 * Math.cos(a_a), a_y + 100 * Math.sin(a_a))
    this.canvas_arrow(context, a_x, a_y, a_a)

    this.canvas_path(context, path_x,path_y)
    

    context.draw()
  },


})

