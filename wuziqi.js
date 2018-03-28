var container = document.querySelector('.container');
var pointbox = document.querySelector('.pointbox');
var mask = document.querySelector('.mask');
var restartbtn = document.querySelector('.restart');
var fivebtn = document.querySelector('.five');
var sevenbtn = document.querySelector('.seven');
var boardsizebtn = document.querySelector('.boardsize');
var maskinner = document.querySelector('.maskinner');
var xlinebox = document.querySelector('.xlinebox');
var ylinebox = document.querySelector('.ylinebox');
var pointNum = 5;
var startIndex = 1;
//切换为五子棋
fivebtn.onclick = function () {
    window.alert('当前为五子棋模式！');
    pointNum = 5;
};
//切换为七子棋
sevenbtn.onclick = function () {
    window.alert('当前为七子棋模式！');
    pointNum = 7;
}

//画点
function Ponit(x, y) {
    var point = document.createElement('div');
    point.className = 'point';
    point.style.top = x * 50 - 15 + 'px';
    point.style.left = y * 50 - 15 + 'px';
    point.setAttribute('y', x);
    point.setAttribute('x', y);
    pointbox.appendChild(point);
}

// 画线
function Line() {
    var countLine = parseInt(window.getComputedStyle(container).width) / 50 + 1;
    for (var i = 0; i < countLine; i++) {
        var xline = document.createElement('div');
        xline.className = 'xline';
        xlinebox.appendChild(xline);
        xline.style.top = i * 50 + 'px';
        for (var j = 0; j < countLine; j++) {
            var yline = document.createElement('div');
            yline.className = 'yline';
            ylinebox.appendChild(yline);
            yline.style.left = i * 50 + 'px';
            Ponit(i, j);
        }
    }
}

Line();

//判断输赢
function Win(winobj, color) {
    var num1 = 0;
    var num2 = 0;
    var num3 = 0;
    var num4 = 0;
    var line1 = winobj.du45;
    var line2 = winobj.du90;
    var line3 = winobj.du135;
    var line4 = winobj.du180;

    for (var k = 0; k < line1.length; k++) {
        if (line1[k].classList.contains(color)) {
            num1++;
            if (num1>= pointNum) {
                break;
            }
        } else {
            num1 = 0;
        }
    }
    for (var k = 0; k < line2.length; k++) {
        if (line2[k].classList.contains(color)) {
            num2++;
            if (num2 >= pointNum) {
                break;
            }
        } else {
            num2 = 0;
        }
    }
    for (var k = 0; k < line3.length; k++) {
        if (line3[k].classList.contains(color)) {
            num3++;
            if (num3>= pointNum ){
               break;
            }
        } else {
            num3 = 0;
        }
    }
    for (var k = 0; k < line4.length; k++) {
        if (line4[k].classList.contains(color)) {
            num4++;
            if (num4 >= pointNum) {
                break;
            }
        } else {
            num4 = 0;
        }
    }
    if (num1 >= pointNum || num2 >= pointNum || num3 >= pointNum || num4 >= pointNum) {
        if (color === 'white') {
            maskinner.innerText = '恭喜白色方获胜';
        } else {
            maskinner.innerText = '恭喜黑色方获胜';
        }
        mask.style.display = 'table';
    }
}

// 获取四个方向的点
function getPoints(x, y, color) {
    var winobj = {
        du45: [],
        du90: [],
        du135: [],
        du180: []
    };
    var points = document.querySelectorAll('.point');
    for (var t = 0; t < points.length; t++) {
        if (points[t].getAttribute('x') === x ) {
            // y
            winobj.du90.push(points[t]);
        }
    }
    for (var t = 0; t < points.length; t++) {
         if (points[t].getAttribute('y') === y) {
            // x
            winobj.du180.push(points[t]);
        }
    }
    for (var t = 0; t < points.length; t++) {
       if (Number(points[t].getAttribute('y')) + Number(points[t].getAttribute('x')) === Number(y) + Number(x)) {
            //45度
            winobj.du45.push(points[t]);
        }
    }
    for (var t = 0; t < points.length; t++) {
         if (points[t].getAttribute('x') - points[t].getAttribute('y') === x - y) {
            //135度
            winobj.du135.push(points[t]);
        }
    }
    Win(winobj, color);
}

container.onclick = function (e) {
    var target = e.target || e.srcElement;
    var color = 'white';
    if (target.className === 'point') {
        if (startIndex % 2 === 0) {
            target.classList = 'point white';
            color = 'white';
        } else {
            target.classList = 'point black';
            color = 'black';
        }
        startIndex++;
        var x = target.getAttribute('x');
        var y = target.getAttribute('y');
        getPoints(x, y, color);
    }
}

// 重新开始函数
function Restart() {
    var oldPoint = document.querySelectorAll('.point');
    mask.style.display = 'none';
    for (var b = 0; b < oldPoint.length; b++) {
        oldPoint[b].classList = 'point';
    }
}

restartbtn.onclick = function () {
    Restart();
};
mask.onclick = function () {
    Restart();
};
boardsizebtn.onclick = function () {
    var rownum = prompt('请输入棋盘行数', '请输入数字');
    if (rownum) {
        rownum = parseInt(rownum);
    } else {
       return;
    }
    if (rownum) {
        xlinebox.innerHTML = '';
        ylinebox.innerHTML = '';
        pointbox.innerHTML = '';
        container.style.width = rownum * 50 + 'px';
        container.style.height = rownum * 50 + 'px';
        Line();
    } else {
        window.alert('请输入数字');
    }
}