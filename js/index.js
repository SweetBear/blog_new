$(document).ready(function() {
	$('#banners').bannerize({
		shuffle: 1,
		interval: "5"
	});
	$(".ui-line").hover(function() {
		$(this).addClass("ui-line-hover");
		$(this).find(".ui-bnnerp").addClass("ui-bnnerp-hover");
	}, function() {
		$(this).removeClass("ui-line-hover");
		$(this).find(".ui-bnnerp").removeClass("ui-bnnerp-hover");
	});
});

$(function(){
			//标签云数据
			var data = [
				{
					"name": "javascript",
					"value": 8,
					"data": {} //可以增加额外的数据，当点击该标签时会返回这个数据
				},{
					"name": "java",
					"value": 8
				},{
					"name": "spring",
					"value": 18
				},{
					"name": "hadoop",
					"value": 8
				},{
					"name": "ruby",
					"value": 8
				},{
					"name": "python",
					"value": 8
				},{
					"name": "设计模式",
					"value": 12
				},{
					"name": "分布式系统",
					"value": 8
				},{
					"name": "html",
					"value": 8
				},{
					"name": "css3",
					"value": 8
				},{
					"name": "sass",
					"value": 8
				},{
					"name": "hbase",
					"value": 21
				},{
					"name": "hive",
					"value": 8
				},{
					"name": "redis",
					"value": 8
				},{
					"name": "mybatis",
					"value": 8
				},{
					"name": "dubbo",
					"value": 8
				},{
					"name": "zookeeper",
					"value": 8
				}
			];
			//标签云配置信息
			var cfg = {
					"className": "hot-tag-cloud", //自定义的标签样式
					"colors": ["#66CC99", "#3399CC", "#FF99CC" ,"#CC9933", "#666600"], //自定义的标签调色板
					"tagMinSize": 10, //自定义的标签最小像素
					"tagMaxSize": 30, //自定义的标签最大像素
					"tagClick": {}, //自定义标签的点击事件
					"tagDblClick": tagDblClick //自定义标签的双击事件
				};
			
			$(".tag-cloud").createTagCloud(data, cfg, callBack);
			//$(".tag-cloud").createTagCloud(data, {}, callBack);
		});
		
		function callBack(){
			console.log("callBack");
		}
		
		function tagClick(tag){
			console.log(tag);
			console.log("click");
		}
		
		function tagDblClick(tag){
			console.log(tag);
			console.log("dblclick");
		}
