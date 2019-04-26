 /**
 *
 * @authors zzp
 * @date    2019-04-22 09:23:19
 * @version $Id$
 */
        var ctx = document.getElementById("canvas").getContext('2d');
        //整个蛇的身体
        var snake = [];
        //蛇的长度和宽度
        var width = 15;
        var height = 15;
        //蛇的头
        var head;
        //蛇开始运动的速度
        var speed = 500;
        //游戏得分
        var score = 0;
        //食物开始的位置
        var food = new food(15,15);
        //绘制网格线
        for(var i = 0;i<30;i++){
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.moveTo(0,15*i);
            ctx.lineTo(450,15*i);
            ctx.moveTo(15*i,0);
            ctx.lineTo(15*i,450);
            ctx.closePath();
            ctx.stroke();
        }
        //蛇的节点长度
        for(var i = 0;i<5;i++){
            snake[i] = new cell(i,0,-2)
        }
        //蛇的节点 x，y代表坐标，f代表方向
        function cell(x,y,f){
            this.x = x;
            this.y = y;
            this.f = f;
        }
        drawsnake();
        //绘制蛇的开始雏形
        function drawsnake(){
            ctx.clearRect(0,0,450,450)
            for(var i = 0;i<snake.length;i++){
                ctx.fillStyle = "black";
                //蛇头的特别颜色
                if(i==snake.length-1){
                    ctx.fillStyle = "red";
                }
                ctx.beginPath();
                ctx.rect(snake[i].x*15,snake[i].y*15,width,height);
                ctx.closePath();
                ctx.fill();
            }
            head = snake[snake.length-1];
            drawfood();
            //判断食物碰撞
            if(head.x==food.x&&head.y==food.y){
                var newcell = new cell(head.x,head.y,head.f);
                var Score;
                score++;
                Score = score;
                document.getElementById("score1").innerHTML = Score;
                switch(head.f){
                    case 1:newcell.y--;break;
                    case 2:newcell.x--;break;
                    case -1:newcell.y++;break;
                    case -2:newcell.x++;break;
                }
                snake[snake.length] = newcell;
                //蛇的速度增加
                if(speed>100){
                    speed = speed-20;//20个
                }if (speed>50){
                    speed = speed-5;//30个
                }else{
                    speed = speed- 2;//55个最多
                }
                initfood();

            }
        }
        //食物的坐标
        function food(x,y){
            this.x = x;
            this.y = y;
        }
        //绘制食物
        function drawfood(){
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.rect(food.x*15,food.y*15,width,height);
            ctx.closePath();
            ctx.fill();
        }
        //食物随机生成
        function initfood(){
            var x = Math.ceil(Math.random()*28+1);
            var y = Math.ceil(Math.random()*28+1);
            food.x = x;
            food.y = y;
            for(var i = 0;i<snake.length;i++){
                if(snake[i].x == x&&snake[i].y ==y){
                    initfood();
                }
            }
        }
        //键盘监听事件//上1下-1左2右-2
        document.onkeydown = function(e){
            var code = e.keyCode;
            var direction = 0;
            switch (code) {
                case 38:direction = 1;break
                case 39:direction = -2;break
                case 40:direction = -1;break
                case 37:direction = 2;break
            }
            //禁止蛇进行掉头
            if(direction!=0){
                if(parseInt(head.f)+direction!=0){
                    movesnake(direction);
                }
            }
        }
        //蛇移动的方法
        function movesnake(direction){
            var newcell = new cell(head.x,head.y,head.f);
            newcell.f = direction;
            var newsnake = [];
            //循环定义新的蛇
            for(var i = 1;i<snake.length;i++){
                newsnake[i-1] = snake[i];
            }
            newsnake[newsnake.length] = newcell;
            switch(direction){
                case 1:newcell.y--;break;
                case 2:newcell.x--;break;
                case -1:newcell.y++;break;
                case -2:newcell.x++;break;
            }
            snake = newsnake;
            head = snake[snake.length-1];
            //判断是否执行游戏结束，游戏结束，停止蛇的绘画
            if(isgameover()){
                drawsnake();
            }
        }
        //判断游戏结束
        function isgameover(){
            //超出边框
            if(head.x>=30||head.x<0||head.y>=30||head.y<0){
                alert('游戏结束');
                window.location.reload();
            }
            //在自己碰撞
            for(var i=0;i<snake.length-2;i++){
                if(head.x==snake[i].x&&head.y==snake[i].y){
                    alert('游戏结束');
                    window.location.reload();
                }
            }
            return true;
        }
        //自动移动
        function movecell(){
            movesnake(head.f);
            setTimeout("movecell()",speed)
        }
        movecell();
