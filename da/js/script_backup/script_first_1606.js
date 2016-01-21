var status = {
	interval : 2000,	
	slidingWindow : 30, 
	layout : 'lft',
	running : true,
	t : undefined,
	timeIndexL : undefined,
	timeIndexR : undefined,
	advancedmode: false
};

var ue1 ={
		buffering : [],
		lbr : [],
		freeze_time : 0,
		freeze_timestamp : 0,
		freeze_count : 0,
		status : 0,
		bc_start: undefined,
		bc_end: undefined
};
var ue2 ={
		buffering : [],
		lbr : [],
		freeze_time : 0,
		freeze_timestamp : 0,
		freeze_count : 0,
		status : 0,
		bc_start: undefined,
		bc_end: undefined
};
var ue3 ={
		buffering : [],
		lbr : [],
		freeze_time : 0,
		freeze_timestamp : 0,
		freeze_count : 0,
		status : 0,
		bc_start: undefined,
		bc_end: undefined
};
var ue4 ={
		buffering : [],
		lbr : [],
		freeze_time : 0,
		freeze_timestamp : 0,
		freeze_count : 0,
		status : 0,
		bc_start: undefined,
		bc_end: undefined
};
var ue5 ={
		buffering : [],
		lbr : [],
		freeze_time : 0,
		freeze_timestamp : 0,
		freeze_count : 0,
		status : 2,
		bc_start: undefined,
		bc_end: undefined
};
var ue6 ={
		buffering : [],
		lbr : [],
		freeze_time : 0,
		freeze_timestamp : 0,
		freeze_count : 0,
		status : 0,
		bc_start: undefined,
		bc_end: undefined
};
var dataObj = {
	sum_lbr : [],
	sum	: 0,
	time : undefined
}

var ues = [ue1, ue2, ue3, ue4, ue5, ue6];

$(document).ready(
		function() {

			var run_status = true;

			$('#running').click(function() {
				runUpdate(status.running);
			});
			
			$('#delete').click(function() {
				var q = "DELETE FROM `server_data`; DELETE FROM `ue_data`;";
				var con = confirm('Are you sure?');
				if( con ){
					$.ajax({
						url : 'php/getData.php',
						async : false,
						data : { query : q }
					}).done(function(data) {
						console.log(data);
					});
				}
			});

			/*
			 * highlightCallback
			 * 
			 * When set, this callback gets called every time a new point is
			 * highlighted. Type: function(event, x, points, row, seriesName)
			 * event: the JavaScript mousemove event x: the x-coordinate of the
			 * highlighted points points: an array of highlighted points: [
			 * {name: 'series', yval: y-value}, … ] row: integer index of the
			 * highlighted row in the data table, starting from 0 seriesName:
			 * name of the highlighted series, only present if
			 * highlightSeriesOpts is set. Default: null
			 */
			//ue1.graph = ...???
			ue1.graph = new Dygraph(document.getElementById("div_g1"),
					ue1.buffering, {
						colors	   : new Array( "rgb(0,169,212)", "rgb(137,186,23)","rgb(123,123,23)"),
						strokeWidth: 2,
						valueRange : [ 0, 1.15 ],
						drawXGrid : false,
						axes : {
							x : { axisLabelFormatter : function (ms){return '';},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0},
							y : { axisLabelFormatter : function (y){
											if(y.toString().length == 1){
												return y;
											}else{
												return '';
											}
							}}
						},
						ylabel : 'UE1',
						labels : [ 'Time', 'UC', 'BC', '' ]
					});
			ue2.graph = new Dygraph(document.getElementById("div_g2"),
					ue2.buffering, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)","rgb(123,123,23)"),
						strokeWidth: 2,
						valueRange : [ 0, 1.15 ],
						drawXGrid : false,
						axes : {
							x : { axisLabelFormatter : function (ms){return '';},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0},
							y : { axisLabelFormatter : function (y){
											if(y.toString().length == 1){
												return y;
											}else{
												return '';
											}
							}}
						},
						ylabel : 'UE2',
						labels : [ 'Time',  'UC', 'BC', '']
					});
			ue3.graph = new Dygraph(document.getElementById("div_g3"),
					ue3.buffering, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)","rgb(123,123,23)"),
						strokeWidth: 2,
						valueRange : [ 0, 1.15 ],
						drawXGrid : false,
						axes : {
							x : { axisLabelFormatter : function (ms){return '';},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0},
							y : { axisLabelFormatter : function (y){
											if(y.toString().length == 1){
												return y;
											}else{
												return '';
											}
							}}
						},
						ylabel : 'UE3',
						labels : [ 'Time',  'UC', 'BC', '' ]
					});
			ue4.graph = new Dygraph(document.getElementById("div_g4"),
					ue4.buffering, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)","rgb(123,123,23)"),
						strokeWidth: 2,
						valueRange : [ 0, 1.15 ],
						drawXGrid : false,
						axes : {
							x : { axisLabelFormatter : function (ms){return '';},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0},
							y : { axisLabelFormatter : function (y){
											if(y.toString().length == 1){
												return y;
											}else{
												return '';
											}
							}}
						},
						ylabel : 'UE4',
						labels : [ 'Time',  'UC', 'BC', '']
					});
			ue5.graph = new Dygraph(document.getElementById("div_g5"),
					ue5.buffering, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)","rgb(123,123,23)"),
						strokeWidth: 2,
						valueRange : [ 0, 1.15 ],
						drawXGrid : false,
						axes : {
							x : { axisLabelFormatter : function (ms){return '';},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0},
							y : { axisLabelFormatter : function (y){
											if(y.toString().length == 1){
												return y;
											}else{
												return '';
											}
							}}
						},
						ylabel : 'UE5',
						labels : [ 'Time',  'UC', 'BC', '']
					});
			ue6.graph = new Dygraph(document.getElementById("div_g6"),
					ue6.buffering, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)","rgb(123,123,23)"),
						strokeWidth: 2,
						valueRange : [ 0, 1.15 ],
						drawXGrid : false,
						axes : {
							x : { axisLabelFormatter : function (ms){return '';},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0},
							y : { axisLabelFormatter : function (y){
											if(y.toString().length == 1){
												return y;
											}else{
												return '';
											}
							}}
						},
						ylabel : 'UE6',
						labels : [ 'Time',  'UC', 'BC', '']
					});
			ue1.graphLBR = new Dygraph(document.getElementById("div_g11"),
					ue1.lbr, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)"),
						drawPoints : true,
						strokeWidth: 2,
						axes : {
							x : { axisLabelFormatter : function (ms){return null;},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0}
						},
						valueRange : [ 0, 3 ],
						labels : [ 'Time',  'u', 'b']
					});
			ue2.graphLBR = new Dygraph(document.getElementById("div_g12"),
					ue2.lbr, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)"),
						drawPoints : true,
						strokeWidth: 2,
						axes : {
							x : { axisLabelFormatter : function (ms){return null;},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0}
						},
						valueRange : [ 0, 3 ],
						labels : [ 'Time', 'u', 'b']
					});
			ue3.graphLBR = new Dygraph(document.getElementById("div_g13"),
					ue3.lbr, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)"),
						drawPoints : true,
						strokeWidth: 2,
						axes : {
							x : { axisLabelFormatter : function (ms){return null;},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0}
						},
						valueRange : [ 0, 3 ],
						labels : [ 'Time', 'u', 'b']
					});
			ue4.graphLBR = new Dygraph(document.getElementById("div_g14"),
					ue4.lbr, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)"),
						drawPoints : true,
						strokeWidth: 2,
						axes : {
							x : { axisLabelFormatter : function (ms){return null;},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0}
						},
						valueRange : [ 0, 3 ],
						labels : [ 'Time', 'u', 'b']
					});
			ue5.graphLBR = new Dygraph(document.getElementById("div_g15"),
					ue5.lbr, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)"),
						drawPoints : true,
						strokeWidth: 2,
						axes : {
							x : { axisLabelFormatter : function (ms){return null;},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0}
						},
						valueRange : [ 0, 3],
						labels : [ 'Time', 'u', 'b']
					});
			ue6.graphLBR = new Dygraph(document.getElementById("div_g16"),
					ue6.lbr, {
						colors	   : new Array("rgb(0,169,212)","rgb(137,186,23)"),
						drawPoints : true,
						strokeWidth: 2,
						axes : {
							x : { axisLabelFormatter : function (ms){return null;},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms*1000).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0}
						},
						valueRange : [ 0, 3 ],
						labels : [ 'Time', 'u', 'b']
					});
			dataObj.graph = new Dygraph(document.getElementById("div_g17"),
					dataObj.sum_lbr, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)", "rgb(0,98,95)"),
						drawPoints : true,
					//	fillGraph: true,
						valueRange : [ 0, 10 ],
						axes : {
							x : { axisLabelFormatter : function (ms){return  new Date(ms*1000).strftime('%H:%M:%S');},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms*1000).strftime('%H:%M:%S') + ')';
					                },
					                pixelsPerLabel: 100
							}
						},
						xAxisLabelWidth: 60,
						connectSeparatedPoints : true,
						visibility: [true, true, false],
//						axes : {
//							x : { axisLabelFormatter : function (ms){return new Date(ms).strftime('%H:%M:%S');},
//								  valueFormatter: function(ms) {
//					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
//					                }
//							},
						labels : [ 'Time',  'u', 'b', 'u2']
					});
			$('.additional').children().hide();
			
			$('#advanced').click(function(){
					if(status.advancedmode){
						$('.additional').children().hide();
						$('#advanced').text('+');
						status.advancedmode = false;
						dataObj.graph.setVisibility(2, false);
					}else{
						$('.additional').children().show();
						$('#advanced').text('-');
						var evt = document.createEvent('UIEvents');
						evt.initUIEvent('resize', true, false, window, 0);
						window.dispatchEvent(evt);
						dataObj.graph.setVisibility(2, true);
						status.advancedmode = true;
					}
					
			});
			var t;
//			$.ajax({
//				url : 'http://aachen1:safgr45J@87.79.1.103/video/index.html'
//			}).done(function(data) {
//				$('#div_g18').html(data);
//			});
//			      $("#div_g18").load("http://www.google.de", function(){
//			    	  alert("Done");
//			      }); 
			updatingData();
			
		});

function nothing() {
}

function updatingData() {
	var timeIndex = status.timeIndexL;
	var isIntervalworking = false;

	var active = window.intervalId = setInterval(function() {
		// while(status.running){
		// while(c<15){
		if (isIntervalworking) {

		} else {
			isIntervalworking = true;
			
			var d = new Date();
			
			var q1 = "SELECT * FROM ue_data";
			var q2 = "SELECT * FROM server_data";
			if (status.timeIndexL != undefined) {
				q1 += " WHERE `timestamp`>" + status.timeIndexL;
				
				//status.timeIndexL = d.getTime();
			}
			q1 += " ORDER BY `timestamp` ASC";
			
			if (status.timeIndexR != undefined) {
				q2 += " WHERE `timestamp`>" + status.timeIndexR;
				var d = new Date();
				//status.timeIndexR = d.getTime();
			}
			q2 += " ORDER BY `timestamp` ASC, `ue_id` ASC";
			
			// HIER NUR L
			$.ajax({
				url : 'php/getData.php',
				async : false,
				data : { query : q1 }
			}).done(function(data) {
				if (data[0] == "<") {
					var data = $.parseJSON($(data).html());
				} else {
					var data = $.parseJSON(data);
				}
				//data will include: 0:timestamp, 1:ue_id, 2: stream_type, 3:starttime, 4:prebuffer_duration, 5:status_change
				var l = data.length;
				// data analyse
				if (l != 0) {

					for ( var i = 0; i < l; i++) {
						//saves latest timestamp
						//status.t = data[i][0]/1;
						status.timeIndexL = data[i][0]/1;

						switch (data[i][1]) {
						// ue1
							case "1":
								//saves uc/bc status per ue to check which data should be used with lbr for this ue
								setNewData(ue1, data[i]);
								//setBufferData(ue1, data[i]);
								break;
							// ue2
							case "2":
								setNewData(ue2, data[i]);
								//setBufferData(ue2)
								break;
							// ue3
							case "3":
								setNewData(ue3, data[i]);
								//setBufferData(ue3,data[i]);
								break;
							// ue4
							case "4":
								setNewData(ue4, data[i]);
								//setBufferData(ue4,data[i]);
								break;
							case "5":
								setNewData(ue5, data[i]);
								//setBufferData(ue5,data[i]);
								break;
							case "6":
								setNewData(ue6, data[i]);
								//setBufferData(ue6,data[i]);
								break;
						} // switch
						//status.timeIndexL++;
						setFollowingData(data[i][1]);
					} // for
					
					setFollowingData(-2);					

				} else{
					setFollowingData(-1);
					//  switch uc/bc by data[i-1],, watch data[i-2] and take opposite 
				}// if
				//console.log(ue1.buffering.length);
			});

			// HIER NUR R
			//alert(location.protocol + '164.48.135.34/HA_Demo/indexDemo.html');
			$.ajax({
				url : 'php/getData.php',
				async : false,
				data : { query : q2 }
			}).done(function(data) {
				if (data[0] == "<") {
					var data = $.parseJSON($(data).html());
				} else {
					var data = $.parseJSON(data);
				}
				var l = data.length;
				// data analyse
				if (l != 0) {

					for ( var i = 0; i < l; i++) {
						
						var d = data[i][0]/1;
						
						setCellOccupancy(data[i]);
						//set cell occupancy
						//if(data[i][2] == 1){
//						if(data[i][1] == 1 || data[i][1]==2 || data[i][1] == 3){
//							var iTS = parseInt(d/1000);
//							if(dataObj.time == undefined || dataObj.time == iTS){	
//								dataObj.sum += data[i][3]/1;
//								dataObj.time = iTS;
//							}else{
//								dataObj.sum_lbr.push([dataObj.time, dataObj.sum, null]);
//								dataObj.sum = data[i][3]/1;
//								dataObj.time = iTS;
//							//push
//							}
//						}
//						if(data[i][2] == 2){
//								for(var j=0; j<ues.length; j++){
//									var ob = ues[j];
//									if(ob.bc_start != undefined && d >= ob.bc_start){
//										if(ob.bc_end == undefined || ob.bc_end >= d){
//												dataObj.sum_lbr.push([parseInt(d/1000),null, data[i][3]/1]);
//												break;
//										}
//									}
//								}
//						}
						
						status.timeIndexR = d;
						
						switch (data[i][1]) {
						
							// ue1
							case "1":
								// and then ever case push [timeIndex, buff1/lbr1,
								setNewLBR(ue1, data[i]);
								break;
							// ue2
							case "2":
								setNewLBR(ue2, data[i]);
								break;
							// ue3
							case "3":
								setNewLBR(ue3, data[i]);
								break;
							// ue4
							case "4":
								setNewLBR(ue4, data[i]);
								break;
							case "5":
								setNewLBR(ue5, data[i]);
								break;
							case "6":
								setNewLBR(ue6, data[i]);
								break;
							case "-1":
								setNewLBR(ue1, data[i]);
//								for(var j = 0; j< dataObj.sum_lbr.length; j++){
//									var t = dataObj.sum_lbr[j][0];
//									if(t == data[i][0]/1){
//										dataObj.sum_lbr[j][2]=data[i][3]/1;
//									}
//								}
//								break;
						} // switch
					}// for
					checkLBRs();
				}else{
					for(var k = 0; k<ues.length; k++){
						if(ues[k].lbr.length != 0){
							ues[k].lbr.push([ ues[k].lbr[ues[k].lbr.length-1][0]+ status.interval, null, null]);
						}
					}
					if(dataObj.sum_lbr.length !=0){
						dataObj.sum_lbr.push([dataObj.sum_lbr[dataObj.sum_lbr.length-1][0]+status.interval/1000,null, null,null]);
					}
				}// if
					limitPresentData();
//
					ue1.graphLBR.updateOptions({
						'file' : ue1.lbr
					});
					ue2.graphLBR.updateOptions({
						'file' : ue2.lbr
					});
					ue3.graphLBR.updateOptions({
						'file' : ue3.lbr
					});
					ue4.graphLBR.updateOptions({
						'file' : ue4.lbr
					});
					ue5.graphLBR.updateOptions({
						'file' : ue5.lbr
					});
					ue6.graphLBR.updateOptions({
						'file' : ue6.lbr
					});
					dataObj.graph.updateOptions({
						'file' : dataObj.sum_lbr
					});
				 
		
			});

			isIntervalworking = false;

			if (!status.running) {
				window.clearInterval(active);
			}
		}

	}, 3000);
}

function setNewData(obj, data){
	var lst = obj.status;
	var st = data[2];
	var val = data[5];
	
	var d = data[0]/1; 
	
	if(obj.buffering.length !=0 && obj.buffering[obj.buffering.length-1][0] == d){
		obj.buffering.slice(-1, 1);
	}
	
	if( obj.buffering.length == 0 || obj.buffering[obj.buffering.length-1][3]!=null){
		if(st == 1 ){
			obj.buffering.push([d,val/1, null,null]);
		}else if( st == 2){
			obj.buffering.push([d,null,val/1,null]);
			obj.bc_start = d;
		}
		obj.status = data[2];
		return;
	}
	
	if (data[5] == 2){
		if(data[2]==2){
			obj.bc_end = d;
		}
		obj.buffering.push([d, null, null, null]);
		obj.status = data[2];
		return;
	}
	//switch uc/bc, both graph gets value, don't case wether 0 or 1
	 if( lst ==1 && st ==2){
		 obj.bc_start = d;
		 obj.bc_end = undefined;
		 
		 obj.buffering.push([d, val/1, val/1, null]);
		 
	 }else if( lst ==2 && st ==1 ){
		 obj.bc_end = d;
		 
		 obj.buffering.push([d, val/1, val/1, null]);
		 
	 }else if(st==1){
		 if(lst==0){
			 
		 }else if(data[5] == 0){ //stream_type UC, now check if stoppt or playing
			 obj.freeze_timestamp = data[0]/1;
			 obj.buffering.push([d,1,null,null]);
		 }else if( data[5] == 1){
			 	obj.freeze_count++;
				var ti = d - obj.freeze_timestamp;
				obj.freeze_timestamp += ti;

			 obj.buffering.push([d,0,null,null]);
		 }
		 
			 obj.buffering.push([d,val/1, null,null]);
	 }else if( st==2){
		 if(lst==0){
			 obj.bc_start = d;
			 obj.bc_end = undefined;
		 }else if(data[5] == 0){
			 obj.freeze_timestamp = d;
			 obj.buffering.push([d,null,1,null]);
		 }else if( data[5] == 1){
			 obj.freeze_count++;
			 var ti = d - obj.freeze_timestamp;
			 obj.freeze_timestamp += ti;
			 obj.buffering.push([d,null,0,null] );
		 }
			
			 obj.buffering.push([d, null, val/1, null]);
	 }
	obj.status = data[2];
	
}

function setFollowingData(u){
	for( var k = 0; k <ues.length; k++){
		if(k != u && k != -2){
			
			//add new x value (+1) with same value as last one
			if(ues[k].buffering.length !=0 ){
				var old = ues[k].buffering[ues[k].buffering.length-1];
				var nd =[];
				 if( 0 < u && u<7 ){
					 nd[0] = status.timeIndexL;
					 
					// ues[k].buffering.push()
				 }else{
					 nd[0] = old[0]+ status.interval;
				 }
				 
				 if(old[1] != null && old[2] != null){
					 if(ues[k].bc_start == old[0]){
						 nd[1] = null;
						 nd[2] = old[2];
						 nd[3] = old[3];
					 }else if(ues[k].bc_end == old[0]){
						 nd[1] = old[1];
						 nd[2] = null;
						 nd[3] = old[3];
					 }
				 }else{
					 nd[1] = old[1];
					 nd[2] = old[2];
					 nd[3] = old[3];
				 }
				 
				ues[k].buffering.push(nd);
			}else{
				ues[k].buffering.push([status.timeIndexL, null, null, null]);
			}
		}
		limitPresentData();
		ues[k].graph.updateOptions({
			'file' : ues[k].buffering
		});
	}
}

function setNewLBR(obj, data){
	if(data[1] == -1){
		var d = data[0]/1;
		//update all and set to broadcast
		//so: push data in alle lbr data
		//bzw fuer die ues, die auf broadcast springen (1,2,3)
		for( var k = 0; k <ues.length; k++){
			//add new x value (+1) with same value as last one
			
			if(ues[k].bc_start != undefined && d >= ues[k].bc_start){
					
				if(ues[k].bc_end == undefined || ues[k].bc_end >= d){
					ues[k].lbr.push([d, null, data[3]/1]);
				}
			}
		}
	}else{
		var d = data[0]/1;
		
		if( obj.bc_start == undefined || (obj.bc_start != undefined && d < obj.bc_start) || (obj.bc_end != undefined && d > obj.bc_end) ){
			obj.lbr.push([d, data[3]/1, null]);
		}

	}
}

function setCastValuesLBR(lst, st, val){
	var r = [];
	
	r[0] = status.timeIndexR;
	
	if(lst == 1){
		if(st == 1){
			 r[1] = val/1;
			 r[2] = null;
		}else if(st == 2){
			//sure about that?
			return null;
		}
	}else if(lst == 2){
		if(st == 1){
			return null;
		}else{
			 r[1] = null;
			 r[2] = val/1;
		}
	}
}

function checkLBRs(){
	var max = 0; 
	for(var i = 0; i< ues.length; i++){
		if(ues[i].lbr.length!=0){
			var temp = ues[i].lbr[ues[i].lbr.length-1][0];
			if(temp > max){
				max = temp;
			}
		}
	}
	
	if(max!=0){
		for(var i = 0; i< ues.length; i++){
			if(ues[i].lbr.length!=0){
				var temp = ues[i].lbr[ues[i].lbr.length-1][0];
			}
			if(ues[i].lbr.length==0 || temp < max){
				ues[i].lbr.push([max, null, null]);
			}
		}
	}
}


function setCellOccupancy(data){
	var iTS = parseInt(data[0]/1000);
	var isBC = false;
	if(data[1] == 1 || data[1]==2 || data[1] == 3 || data[1] == -1){	
		if(data[2]==2){
			for(var j = 0; j<3; j++){
				var ob = ues[j];
				if(ob.bc_start == undefined || data[0] < ob.bc_start){
					if(ob.bc_end != undefined && ob.bc_end < data[0]){
						isBC = true;
					}
				}else if(ob.bc_start != undefined && data[0] >= ob.bc_start){
						if(ob.bc_end == undefined || ob.bc_end >= data[0]){
							dataObj.sum_lbr.push([parseInt(data[0]/1000),null, data[3]/1, null]);
							break;
						}
				}
			}
			if(isBC){
				return;
			}
			
		}
		
		if(dataObj.time == undefined || dataObj.time == iTS){
			dataObj.sum += data[3]/1;
			dataObj.time = iTS;
		}else{
			dataObj.sum_lbr.push([dataObj.time, dataObj.sum, null, null]);
			dataObj.sum = data[3]/1;
			dataObj.time = iTS;
		//push
		}
	}else if( data[1]==4 || data[1] == 5 || data[1] ==6){ 
		//set cell occupancy fuer ue 4,5,6
		//zweiter co graph (evtl nur dunkel blau als dritte farbe und nur visible machen wenn + geoeffnet?
		if(dataObj.time2 == undefined || dataObj.time2 == iTS){
			dataObj.sum2 += data[3]/1;
			dataObj.time2 = iTS;
		}else{
			dataObj.sum_lbr.push([dataObj.time, null, null, dataObj.sum2]);
			dataObj.sum2 = data[3]/1;
			dataObj.time2 = iTS;
		//push
		}
	}
//	
//	if(data[i][2] == 2){
//			for(var j=0; j<3; j++){
//				var ob = ues[j];
//				if(ob.bc_start != undefined && d >= ob.bc_start){
//					if(ob.bc_end == undefined || ob.bc_end >= d){
//							dataObj.sum_lbr.push([parseInt(d/1000),null, data[i][3]/1]);
//							break;
//					}
//				}
//			}
//	}
}


function limitPresentData() {
	var x = status.slidingWindow;
	
	for(var k = 0; k< ues.length; k++){
		if( ues[k].buffering.length > x){
			ues[k].buffering.splice(0, ues[k].buffering.length - x);
		}
		if( ues[k].lbr.length > x){
			ues[k].lbr.splice(0, ues[k].lbr.length - x);
		}
	}
	if( dataObj.sum_lbr.length > x){
		dataObj.sum_lbr.splice(0, dataObj.sum_lbr.length-x);
	}
//	if (ue2_buffering.length > x) {
//		ue2_buffering.splice(0, ue2_buffering.length - x);
//		ue2_lbr.splice(0, ue2_lbr.length - x);
//	}
}

function runUpdate(b) {
	if (b) {
		alert("Stop");
		status.running = false;
	} else {
		alert("Starts Again");
		status.running = true;
		updatingData();
	}
}
