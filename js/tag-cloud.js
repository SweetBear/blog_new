/**
 * 作者：张问先
 * 时间：2017年8月21日09:05:34
 * 描述：用于构建标签树图的一个组件
 */
!(function($){
	var tagNodes = [];//存储标签节点
	
	//一些默认的配置
	var defaultCfg = {
		//可以自定义样式，这是css样式的类名，默认为空
		className: "",
		//标签的默认样式，不能自定义
		tagStyle: "color: #fff;display: inline-block;padding: 4px 10px;border-radius: 3px;margin-bottom: 8px;margin-right: 8px;text-decoration: none;transition: all .3s;cursor: pointer;font-family: 'STHeiti', 'Microsoft YaHei', Helvetica, Arial, sans-serif;",
		//标签默认的hover样式，不能自定义
		hoverStyle: {"background-color": "#4a4a4a"},
		//默认的标签调色板，给不同的标签添加不一样的颜色，可以自定义
		colors: ["#ff5e5c", "#ffbb50", "#19B5FE", "#1ac756", "#e60012", "#9e0ca0"],
		//标签的最小像素值，可以自定义，默认为10px
		tagMinSize: 10,
		//标签的最大像素值，可以自定义，默认为100px
		tagMaxSize: 40
	};
	
	//创建标签云
	$.fn.createTagCloud = function(data, cfg, callback){
		if(cfg.colors){//如果有自定义的调色板，则替换掉默认的调色板
			defaultCfg.colors = cfg.colors;
		}
		var colorLen = defaultCfg.colors.length;
		if(cfg.tagMinSize){//如果有自定义的最小标签像素，根据自定义的值设置默认的最小像素值
			(!cfg.tagMaxSize && (defaultCfg.tagMinSize = 10)) || (defaultCfg.tagMinSize = (cfg.tagMinSize > 100) ? 10 : cfg.tagMinSize);
		}
		if(cfg.tagMaxSize){//如果有自定义的最大标签像素，根据自定义的值设置默认的最大像素值
			(!cfg.tagMinSize && (defaultCfg.tagMaxSize = 100)) || (defaultCfg.tagMaxSize = (cfg.tagMaxSize < 10) ? 100 : cfg.tagMaxSize);
		}
		var minNum = 0, maxNum = 0;//计算标签value的最大值和最小值
		for(var k in data){
			if(data[k].value > maxNum){
				maxNum = data[k].value;
			}
			if(data[k].value < minNum){
				minNum = data[k].value;
			}
			var a = $('<span title="">' + data[k].name + '</span>');
			a.attr("data-tag", JSON.stringify(data[k]));
			//console.log(JSON.stringify(data[k]));
			tagNodes.push(a);
		}
		var averSize = (defaultCfg.tagMaxSize - defaultCfg.tagMinSize)/(maxNum - minNum);//根据标签value的最大值和最小值计算标签的平均像素大小
		if(typeof cfg.tagClick === "function"){//如果自定义了标签的点击事件，给每个标签都添加点击事件
			for(var i in tagNodes){
				tagNodes[i].click(function(){
					cfg.tagClick(JSON.parse(this.dataset.tag));
				});
			}
		}
		if(typeof cfg.tagDblClick === "function"){//如果自定义了标签的双击事件，给每个标签都添加双击事件
			for(var i in tagNodes){
				tagNodes[i].dblclick(function(){
					cfg.tagDblClick(JSON.parse(this.dataset.tag));
				});
			}
		}
		if(cfg.className && cfg.className != ""){//如果有自定义的样式，则使用自定义的样式
			for(var i in tagNodes){
				var a = tagNodes[i];
				a.attr("style", "font-size: " + data[i].value*averSize + "px;background-color: " + defaultCfg.colors[i%colorLen] + ";");
				a.addClass(cfg.className);
				$(this).append(a);
			}
		}else{//否则则使用默认的样式
			for(var i in tagNodes){
				var tagStyle = defaultCfg.tagStyle;
				tagStyle += "font-size: " + data[i].value*averSize + "px;";
				tagStyle += "background-color: " + defaultCfg.colors[i%colorLen] + ";";
				var a = tagNodes[i];
				a.attr("style", tagStyle);
				a.attr("data-color", defaultCfg.colors[i%colorLen]);
				a.hover(function(){
					$(this).css(defaultCfg.hoverStyle);
				}, function(){
					$(this).css({"background-color": $(this)[0].dataset.color});
				});
				$(this).append(a);
			}
		}
		if(typeof callback === "function"){
			callback();
		}
	};
})(jQuery);