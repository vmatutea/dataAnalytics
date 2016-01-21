var status = {
        interval : 2000,
        slidingWindow : 30,
        layout : 'lft',
        running : true,
        t : undefined,
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
		status : 0,
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
var CellOccupancy = {
	lbr123 : [],
        lbr456 : [] 
}
var ues = [ue1, ue2, ue3, ue4, ue5, ue6];
var timeIndexL = 0;
var timeIndexLnoDataTMP = new Date();
var timeIndexLnoData = new Date();
var timeIndexLnoDataOld = 0;
var timeIndexLDelta = 0;
var timeIndexR = 0;
var timeIndexRnoDataTMP = new Date();
var timeIndexRnoData = new Date();
var timeIndexRnoDataOld = 0;
var timeIndexRDelta = 0;
var timeDeleteR = 0;
var BrowserReload = 0;
var ConsolUE=false;
var ConsolBC=true;
var ConsolCO=true;
var ConsolCO2=false;
$(document).ready( function() {

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
			
	$('.additional').children().hide();

	$('#advanced').click(function(){
        	if(status.advancedmode){
                	$('.additional').children().hide();
                    	$('#advanced').text('+');
                        status.advancedmode = false;
              	} else {
                    	$('.additional').children().show();
                      	$('#advanced').text('-');
                       	var evt = document.createEvent('UIEvents');
                       	evt.initUIEvent('resize', true, false, window, 0);
                       	window.dispatchEvent(evt);
                       	status.advancedmode = true;
              	}
       	});



// ### BEGIN -> initialize var ue[k].buffering with time pre-values.
        timeIndexLnoData= new Date().getTime();
        timeIndexRnoData= new Date().getTime();
        if ( BrowserReload == 0 ) {
                if ( ConsolUE == true ) console.log("updatingData Init ue[k]");
                        for (var z=0; z < ues.length;z++){
                                for (var f = 30; f > 0;f--){
                                        ues[z].buffering.push([timeIndexLnoData-f*1000,-1/1,-1/1,null]);
                                } //for
                        } //for
// ### initialize var ue[k].lbr 30sec and CellOccupancy 60sec with time & statys pre-values
                if ( ConsolBC == true ) console.log("updatingData,LBR,init,timeIndexRnoData",timeIndexRnoData);
                        for (var y=0; y < ues.length;y++){
                                for (var g=30 ; g > 0 ; g-- ) {
                                        ues[y].lbr.push([timeIndexRnoData-g*1000,-1/1,-1/1]);
                                        if ( ConsolBC == true ) console.log("updatingData,initLBR",y,g);
                                } //for
                        } //for
                        for ( var x=60 ; x > 0 ; x--){
                                CellOccupancy.lbr123.push([parseInt(timeIndexRnoData/1000)-x,-1/1,-1/1]);
                                CellOccupancy.lbr456.push([parseInt(timeIndexRnoData/1000)-x,-1/1,-1/1]);
                        }
                       if ( ConsolCO == true ) console.log("updatingData,COinit123,timeIndexRnoData,length",timeIndexRnoData,CellOccupancy.lbr123.length);
                       if ( ConsolCO == true ) console.log("updatingData,COinit456,timeIndexRnoData,length",timeIndexRnoData,CellOccupancy.lbr456.length);
        } //if
// ### END
//### GRAPH DEFINITION
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
					} else {
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
						drawXGrid : false,
						axes : {
							x : { axisLabelFormatter : function (ms){return null;},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0}
						},
						valueRange : [ 0, 4 ],
						labels : [ 'Time',  'UC', 'BC']
					});
			ue2.graphLBR = new Dygraph(document.getElementById("div_g12"),
					ue2.lbr, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)"),
						drawPoints : true,
						strokeWidth: 2,
                                                drawXGrid : false,
						axes : {
							x : { axisLabelFormatter : function (ms){return null;},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0}
						},
						valueRange : [ 0, 4 ],
						labels : [ 'Time', 'UC', 'BC']
					});
			ue3.graphLBR = new Dygraph(document.getElementById("div_g13"),
					ue3.lbr, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)"),
						drawPoints : true,
						strokeWidth: 2,
                                                drawXGrid : false,
						axes : {
							x : { axisLabelFormatter : function (ms){return null;},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0}
						},
						valueRange : [ 0, 4 ],
						labels : [ 'Time', 'UC', 'BC']
					});
			ue4.graphLBR = new Dygraph(document.getElementById("div_g14"),
					ue4.lbr, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)"),
						drawPoints : true,
						strokeWidth: 2,
                                                drawXGrid : false,
						axes : {
							x : { axisLabelFormatter : function (ms){return null;},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0}
						},
						valueRange : [ 0, 3 ],
						labels : [ 'Time', 'UC', 'BC']
					});
			ue5.graphLBR = new Dygraph(document.getElementById("div_g15"),
					ue5.lbr, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)"),
						drawPoints : true,
						strokeWidth: 2,
                                                drawXGrid : false,
						axes : {
							x : { axisLabelFormatter : function (ms){return null;},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0}
						},
						valueRange : [ 0, 3],
						labels : [ 'Time', 'UC', 'BC']
					});
			ue6.graphLBR = new Dygraph(document.getElementById("div_g16"),
					ue6.lbr, {
						colors	   : new Array("rgb(0,169,212)","rgb(137,186,23)"),
						drawPoints : true,
						strokeWidth: 2,
                                                drawXGrid : false,
						axes : {
							x : { axisLabelFormatter : function (ms){return null;},
								  valueFormatter: function(ms) {
					                  return 'Time(' + new Date(ms*1000).strftime('%H:%M:%S') + ')';
					                },
								  axisLabelFontSize  : 0}
						},
						valueRange : [ 0, 3 ],
						labels : [ 'Time', 'UC', 'BC']
					});
			CellOccupancy.graph123 = new Dygraph(document.getElementById("div_g17"),
					CellOccupancy.lbr123, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)", "rgb(0,98,95)"),
						drawPoints : true,
						strokeWidth: 2,
						fillGraph: true,
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
						labels : [ 'Time', 'UC', 'BC']
					});
			CellOccupancy.graph456 = new Dygraph(document.getElementById("div_g19"),
					CellOccupancy.lbr456, {
						colors	   : new Array( "rgb(0,169,212)","rgb(137,186,23)", "rgb(0,98,95)"),
						drawPoints : true,
						strokeWidth: 2,
						fillGraph: true,
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
						visibility: [false, false, true],
						labels : [ 'Time', 'UC', 'BC']
					});
	
//### MAP
//			$.ajax({
//				url : 'http://aachen1:safgr45J@87.79.1.103/video/index.html'
//			}).done(function(data) {
//				$('#div_g18').html(data);
//			});
//			      $("#div_g18").load("http://www.google.de", function(){
//			    	  alert("Done");
//			      }); 

//### DELETE SQL DB
		if ( BrowserReload == 0) { // delete SQL DB from old data
		BrowserReload=1;
   			var q = "DELETE FROM `server_data`; DELETE FROM `ue_data`;";
                       $.ajax({
       		                url : 'php/getData.php',
                	        async : false,
                         	data : { query : q }
                        }).done(function() { 
			console.log("document.ready: SQL DB Deleted");	
			});
		} // if 

		updatingData();
			
});


function updatingData() {
	var luc=0; //length of serverdata
	var lbc=0; //lengt  of serverdata
	var n=0;	// index variables n,h,o in while loops
	var h=0;
	var o=0;

	var active = window.intervalId = setInterval(function() {
// ########################### Video Status #####################################################################
                        // ### BEGIN -> extract time for the case that no new SQL ue_data are present
                        timeIndexLnoDataOld = timeIndexLnoData;
                        timeIndexLnoData = new Date().getTime();
                        timeIndexLDelta = timeIndexLnoData - timeIndexLnoDataOld;
			// #### BEGIN-> SQL DB querry via Ajax/PHP -> sql table ue_data for Video Status ###
			var q1 = "SELECT * FROM ue_data";
			// check timerequest. 
			if ( timeIndexL != 0 ) {
				q1 += " WHERE `timestamp`>" + timeIndexL;
			}

			q1 += " ORDER BY `timestamp` ASC";

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
                        // #### END -> SQL DB querry via Ajax/PHP ###
			//data will include: 0:timestamp, 1:ue_id, 2: stream_type, 3:starttime, 4:prebuffer_duration, 5:status_chang
                        // #### BEGIN-> Data Analyzes for Video Status ###
			luc=data.length;
			if (luc != 0) {
				for ( var i = 0; i < luc; i++) {
					timeIndexL = parseInt(data[i][0]);
						if ( ConsolUE == true ) console.log("updatingData,ue_data",data[i]);
						switch (data[i][1]) {
							case "1":
								setNewData(data[i]);
								break;

							case "2":
								setNewData(data[i]);
								break;

							case "3":
								setNewData(data[i]);
								break;
							
							case "4":
								setNewData(data[i]);
								break;

							case "5":
								setNewData(data[i]);
								break;

							case "6":
								setNewData(data[i]);
								break;
						} // switch

						setFollowingData(data[i][1]);
				} // for

			} else	{ // NO new data : include new timestamps for all UE's
				setFollowingData(-1);
				}
                	}); // !!! AJAX done function
// ########################### Link Bit Rate ##################################################################### 
	     		// ### BEGIN -> extract time for the case that no new SQL ue_data are present
                        timeIndexRnoDataOld=timeIndexRnoData;
                        timeIndexRnoData= new Date().getTime();
                        timeIndexRDelta=timeIndexRnoData - timeIndexRnoDataOld;
			// #### BEGIN-> SQL DB querry via Ajax/PHP -> sql table server_data for Link Bit Rate ###	
			var q2 = "SELECT * FROM server_data";       	
			if ( timeIndexR != 0 ) {
                      	q2 += " WHERE `timestamp`>" + timeIndexR;
                   	}

			q2 += " ORDER BY `timestamp` ASC, `ue_id` ASC";
			if ( ConsolBC == true ) console.log("updatingData,beforeAJAX q2",q2);
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
                      	// #### END -> SQL DB querry via Ajax/PHP 
			// data will include: 0:timestamp, 1:ue_id, 2: stream_type, 3:link-bit-rate

			lbc = data.length;

			if (lbc != 0) {
				for ( var j=0; j < lbc; j++) {
					timeIndexR=parseInt(data[j][0]);
					if ( ConsolBC == true ) console.log("updatingData,switch,timeIndexR",timeIndexR);
					setCellOccupancy(data[j]); 
 					if ( ConsolBC == true ) console.log("updatingData,server_data",data[j]);
					switch (data[j][1]) {
					
						case "1":
						setNewLBR(data[j]);
						break;

						case "2":
						setNewLBR(data[j]);
						break;

						case "3":
						setNewLBR(data[j]);
						break;

						case "4":
						setNewLBR(data[j]);
						break;

 						case "5":
						setNewLBR(data[j]);
						break;

						case "6":
						setNewLBR(data[j]);
						break;

						case "-1":
						setNewLBR(data[j]);
					} // switch
				}// for
			timeDeleteR=timeIndexR;
			} else { // no new Data
				 if ( ConsolBC == true ) console.log("updatingData,noNewData");
				for(var k=0; k<ues.length; k++){
				 if ( ConsolBC == true ) console.log("updatingData,noNewData push ue[k],timeIndexRDelta,last time ",k,timeIndexRDelta,ues[k].lbr[ues[k].lbr.length-1][0]);
				ues[k].lbr.push([(timeIndexRDelta+ues[k].lbr[ues[k].lbr.length-1][0])/1,ues[k].lbr[ues[k].lbr.length-1][1],ues[k].lbr[ues[k].lbr.length-1][2]]);
				} // for
			CellOccupancy.lbr123.push([(1+CellOccupancy.lbr123[CellOccupancy.lbr123.length-1][0])/1,(CellOccupancy.lbr123[CellOccupancy.lbr123.length-1][1])/1,(CellOccupancy.lbr123[CellOccupancy.lbr123.length-1][2])/1]);
			if (ConsolCO== true) console.log("updatingData,no new data, push previous value",CellOccupancy.lbr123.length);
                      	CellOccupancy.lbr456.push([(1+CellOccupancy.lbr456[CellOccupancy.lbr456.length-1][0])/1,(CellOccupancy.lbr456[CellOccupancy.lbr456.length-1][1])/1,(CellOccupancy.lbr456[CellOccupancy.lbr456.length-1][2])/1]);
//			timeDeleteR=timeIndexRDelta/1+(ues[k].lbr[ues[k].lbr.length-1][0])/1;
			} // elseif


		        for ( var l=0; l <ues.length; l++) { /// remove timestamps older 30 sec, print LBR graph
                		h=0;
				if ( ConsolBC == true ) console.log("updatingData,removeOldLBR before while,timeDeleteR,ues[l].lbr[h][0]",l,h,timeDeleteR-30000,ues[l].lbr[h][0]);
				if ( ConsolBC == true ) console.log("updatingData,removeOldLBR before while,lbr.length",l,h,ues[l].lbr.length);
                		while ( timeDeleteR - 30000 > ues[l].lbr[h][0] ) {
				if ( ConsolBC == true ) console.log("updatingData,removeOldLBR in while,timeDeleteR,ues[l].lbr[h][0]",l,h,timeDeleteR-30000,ues[l].lbr[h][0]);
                        		ues[l].lbr.shift();
                        		h++;
                		} // while
                		ues[l].graphLBR.updateOptions({
                        		'file' : ues[l].lbr
                		});
        		} //for

			// CellOccupancy, remove timestamps older 60 sec, print CellOccupancy
			n=0;
 if ( ConsolCO == true ) console.log("updatingData,removeOld CO123",CellOccupancy.lbr123.length,parseInt(timeDeleteR/1000) - 60,CellOccupancy.lbr123[n][0]);
			while ( parseInt(timeDeleteR/1000) - 60 > CellOccupancy.lbr123[n][0] ) {
				if(ConsolCO2 == true)console.log("timeDeleteR comparison",parseInt(timeDeleteR/1000) - 60);
                             if(ConsolCO2 == true)   console.log("CellOccupancy,CellOccupancy length",CellOccupancy.lbr123[n][0],CellOccupancy.lbr123.length);
				CellOccupancy.lbr123.shift();
			if(ConsolCO2 == true)	console.log("index,updatingData,removeOld CO123",n);
			if ( ConsolCO == true ) console.log("updatingData,removeOld CO123",CellOccupancy.lbr123.length,parseInt(timeDeleteR/1000) - 60,CellOccupancy.lbr123[n][0]); 
			n++;
			 if(ConsolCO2 == true) console.log("CellOccupancy AFTER,CellOccupancy length",CellOccupancy.lbr123[n][0],CellOccupancy.lbr123.length);
			}
			o=0;
		  	while ( parseInt(timeDeleteR/1000) - 60 > CellOccupancy.lbr456[o][0] ) {
                          	CellOccupancy.lbr456.shift();
                           	o++;
                  	}
			if ( ConsolCO == true ) console.log("updatingData,removeOld CO456",CellOccupancy.lbr456.length);

		     	CellOccupancy.graph123.updateOptions({
                      	'file' : CellOccupancy.lbr123
                        });

//                       CellOccupancy.graph456.updateOptions({
//                            	'file' : CellOccupancy.lbr456
//                        });

	         }); // !!! AJAX done function/
	//if (!status.running) { // doesn't work, need to be commented out
	//	console.log("clearInterval(active)",status.running);
	//	window.clearInterval(active);
	//} // if
	}, 1000);
}

function setNewData(data) { 
        // data will include: 0:timestamp, 1:ue_id, 2: stream_type, 3:starttime, 4:prebuffer_duration, 5:status_change
	// obj will include: "ue<1-6>"
	// ue<1-6> object structure	
	// var ue2 ={
        //      buffering : [],
        //	lbr : [],
	//      freeze_time : 0,
	//      freeze_timestamp : 0,
	//      freeze_count : 0,
	//      status : 0,
	//      bc_start: undefined,
	//      bc_end: undefined
	// };
	// 
        // object.status -> data[5] status change  : 0 not playing, 1 playing , -1 FI 
	// data[2] stream_type: 1 UC, 2 BC
	var last_status_uc = ues[data[1]-1].buffering[ues[data[1]-1].buffering.length-1][1];
	var last_status_bc = ues[data[1]-1].buffering[ues[data[1]-1].buffering.length-1][2];	
	var stream_type = data[2];
	var status_change = data[5];
 	 
        if ( ConsolUE == true ) console.log("setNewData,last_status_uc",last_status_uc,data);
	if ( ConsolUE == true ) console.log("setNewData,last_status_bc",last_status_bc,data);
	//no status change: for UC  BC
        var last_status=0; // last_status 0=no playout 1=UE , 2=BC
	// check if UC or BC or nothing is playing
	if ( last_status_bc == -1 && last_status_uc != -1 ) {
		last_status = last_status_uc;
	} 
	if ( last_status_uc == -1 && last_status_bc != -1 ) {
		last_status = last_status_bc;
	} 
	// Convert 2 to -1 in graph, easier to implement in graph 
	if ( status_change == 2 ) {
	status_change=-1/1;
	}
	// no status change: for UC & BC
	if ( last_status == status_change ) { 
		if ( stream_type == 1 ) { // UC
			ues[data[1]-1].buffering.push([timeIndexL,status_change/1,-1/1,null]);
			if ( ConsolUE == true ) console.log("setNewData same status stream_type=1,push",timeIndexL,status_change/1);
		} else { // BC
                        ues[data[1]-1].buffering.push([timeIndexL,-1/1,status_change/1,null]);
	                if ( ConsolUE == true ) console.log("setNewData same status stream_type=2,push",timeIndexL,status_change/1);
		}
	} else { 
	
		if ( stream_type == 1 ) { // UC , status_change != last_status = 0 || 1 || 2
			ues[data[1]-1].buffering.push([timeIndexL,last_status/1,-1/1,null]);   // NEW timespamp OLD status
			ues[data[1]-1].buffering.push([timeIndexL,status_change/1,-1/1,null]); // NEW timespamp NEW status
			if ( ConsolUE == true ) console.log("setNewData new status stream_type=1,push,last_status,status_change",timeIndexL,last_status/1,status_change/1);
      		} else { // BC, status_change != last_status = 0 || 1 || 2
			ues[data[1]-1].buffering.push([timeIndexL,-1/1,last_status/1,null]);   // NEW timespamp OLD status
                	ues[data[1]-1].buffering.push([timeIndexL,-1/1,status_change/1,null]); // NEW timespamp NEW status
			if ( ConsolUE == true ) console.log("setNewData new status stream_type=2,push,last_status,status_change",timeIndexL,last_status/1,status_change/1);
		}
	} //else
}

function setFollowingData(u) {
	var i = 0;
	var timeDeleteL = 0;
        var last_status_uc=2;
	var last_status_bc=2;
	if ( u == -1 ) { //no New Data in SQL, new timestamp old status
	        for( var k = 0; k < ues.length; k++) { 
 			last_status_uc = ues[k].buffering[ues[k].buffering.length-1][1];
                       	last_status_bc = ues[k].buffering[ues[k].buffering.length-1][2];
        if ( ConsolUE == true ) console.log("setFollowingData,noNewData,last_status_uc",u,k,last_status_uc);
        if ( ConsolUE == true ) console.log("setFollowingData,noNewData,last_status_bc",u,k,last_status_bc);
        if ( ConsolUE == true ) console.log("setFollowingData,timestampe",ues[k].buffering[ues[k].buffering.length-1][0]+timeIndexLDelta/1);
			ues[k].buffering.push([((ues[k].buffering[ues[k].buffering.length-1][0])+timeIndexLDelta/1),last_status_uc/1,last_status_bc/1,null]);
		        timeDeleteL=timeIndexLDelta/1+(ues[k].buffering[ues[k].buffering.length-1][0])/1;
		} //for 
	} else { //new data in SQL, new timestamp old status for all ues beside the ue that changed the status
 	     	for( var m = 0; m <ues.length; m++) {
			if( m != (u-1) ){
				last_status_uc = ues[m].buffering[ues[m].buffering.length-1][1]; 
        			last_status_bc = ues[m].buffering[ues[m].buffering.length-1][2];			
                        	ues[m].buffering.push([timeIndexL,last_status_uc,last_status_bc,null]);
        if ( ConsolUE == true ) console.log("setFollowingData,NewData,last_status_uc",u,m,last_status_uc);
        if ( ConsolUE == true ) console.log("setFollowingData,NewData,last_status_bc",u,m,last_status_bc);
        if ( ConsolUE == true ) console.log("setFollowingData,timestampe",timeIndexL,last_status_uc);
			} //if
             	} //for
	timeDeleteL=timeIndexL;
	} //else
	
	for ( var n = 0; n <ues.length; n++) { /// remove data older 30 sec, print in graph
		i=0;
		while ( timeDeleteL - 30000 > ues[n].buffering[i][0] ) {
                        ues[n].buffering.shift();
                	i++;
               	} // while
		ues[n].graph.updateOptions({
                 	'file' : ues[n].buffering
        	});
	} //for
}

function setNewLBR(data){
        // data will include: 0:timestamp, 1:ue_id, 2: stream_type, 3:link-bit-rate
        // obj will include: "ue<1-6>"
        // ue<1-6> object structure
        // var ue2 ={
        //      buffering : [],
        //      lbr : [],
        //      freeze_time : 0,
        //      freeze_timestamp : 0,
        //      freeze_count : 0,
        //      status : 0,
        //      bc_start: undefined,
        //      bc_end: undefined
        // };
        // ue<1-6>.lbr = [ timestamp, UC LBR, BC LBR ]
        // data[1] ue_id:  ue<1-6>, -1 = BC
        // data[2] stream_type: 1 UC, 2 BC
	var last_status_bc=0;
	var last_status_uc=0;
	if ( data[1] == -1 ) { // BC LBR
		for ( var k=0 ; k < ues.length ; k++ ) {
			last_status_bc = ues[k].buffering[ues[k].buffering.length-1][2];
			last_status_uc = ues[k].buffering[ues[k].buffering.length-1][1];
			if ( last_status_bc != -1 ) { // BC playing
				ues[k].lbr.push([timeIndexR,-1/1,data[3]/1]);
                        	if ( ConsolBC == true ) console.log("SetNewLBR,BC playing,push:timeIndexR,-1/1,data[3]/1",k,timeIndexR,-1/1,data[3]/1);
			} else {
				ues[k].lbr.push([timeIndexR,last_status_uc/1,-1/1]);
				if ( ConsolBC == true ) console.log("SetNewLBR,BC no-playing,push:timeIndexR,last_status_uc/1,-1/1",k,timeIndexR,last_status_uc/1,-1/1);
			}  //else
		} // for
	} else { // UC LBR
		last_status_uc = ues[data[1]-1].buffering[ues[data[1]-1].buffering.length-1][1];
		last_status_bc = ues[data[1]-1].buffering[ues[data[1]-1].buffering.length-1][2];
		if ( ConsolBC == true ) console.log("SetNewLBR,UC,laststatus,uc,bc",last_status_uc,last_status_bc);
		if ( last_status_uc != -1 ) { // UC playing
			ues[data[1]-1].lbr.push([timeIndexR,data[3]/1,-1/1]);
		if ( ConsolBC == true ) console.log("SetNewLBR,UC,push ues:timeIndexR,data[3]/1,-1/1",ues[data[1]-1],timeIndexR,data[3]/1,-1/1);
		} else { // no UC LBR, no BC LBR
                if ( ConsolBC == true ) console.log("SetNewLBR,noUCBC,push ues:timeIndexR,-1/1,-1/1",ues[data[1]-1],timeIndexR,-1/1,-1/1);
		if ( last_status_bc == -1 ) {
			ues[data[1]-1].lbr.push([timeIndexR,-1/1,-1/1]);
		} //if
		} // else
	} // else
}

function setCellOccupancy(data){
  	// data will include: 0:timestamp, 1:ue_id, 2: stream_type, 3:link-bit-rate
	// var CellOccupancy = {
        // 	lbr123 : [], // timestamp, UC, BC
	//	lbr456 : []  // timespamp, UC, BC
	
	var timeInt=0;
        if ( ConsolCO == true ) console.log("CO,before parseINT data[0]",data[0]);
        timeInt=parseInt(data[0]/1000);
        if ( ConsolCO == true ) console.log("CO,after  parseINT timeInt",timeInt);
	if ( ConsolCO == true ) console.log("CO,data",data);

	if ( data[1] == -1 ) { // BC
	// graphCO_BC_ues123
		if ( ue1.buffering[ue1.buffering.length-1][2] != -1 || ue2.buffering[ue2.buffering.length-1][2] != -1 || ue3.buffering[ue3.buffering.length-1][2] != -1 ) { // status BC playout
			CellOccupancy.lbr123.push([timeInt,-1/1,data[3]/1]);
			if ( ConsolCO == true ) console.log("CO, BC 123 push:timeInt,-1/1,data[3]/1",timeInt,-1/1,data[3]/1);
        	}
	
	// graphCO_BC_ues456
		if ( ue4.buffering[ue4.buffering.length-1][2] != -1 || ue5.buffering[ue5.buffering.length-1][2] != -1 || ue6.buffering[ue6.buffering.length-1][2] != -1 ) { // status BC playout
       			CellOccupancy.lbr456.push([timeInt,-1/1,data[3]/1]);
			if ( ConsolCO == true ) console.log("CO, BC 456 push:timeInt,-1/1,data[3]/1",timeInt,-1/1,data[3]/1);
        	}	
	} else { // UC
	// graphCO_UC_ues123
		if ( data[1] == 1 || data[1] == 2 || data[1] == 3 ) { // UE1,2,3 
			if ( ues[data[1]-1].buffering[ues[data[1]-1].buffering.length-1][1] != -1 ) { // check UEx status
				if (  CellOccupancy.lbr123[CellOccupancy.lbr123.length-1][0] == timeInt ) { // timestamp exist, add UEs LBR
					if ( CellOccupancy.lbr123[CellOccupancy.lbr123.length-1][1] == -1 ) { // before -1, to add from 0
					CellOccupancy.lbr123[CellOccupancy.lbr123.length-1][1] = 0;
					}
					CellOccupancy.lbr123[CellOccupancy.lbr123.length-1][1] += data[3]/1;
					 if ( ConsolCO == true ) console.log("CO, UC 123 add:timeInt,data[3]/1,sum",timeInt,data[3]/1,CellOccupancy.lbr123[CellOccupancy.lbr123.length-1][1]);
				} else { // push new timestampe to graph 
					CellOccupancy.lbr123.push([timeInt,data[3]/1,-1/1]);
					 if ( ConsolCO == true ) console.log("CO, UC 123 push:timeInt,data[3]/1,-1/1",timeInt,data[3]/1,-1/1);
				}
			} else {
			        if ( CellOccupancy.lbr123[CellOccupancy.lbr123.length-1][0] == timeInt ) {} // timestamp exist
				else { 
				if ( ue1.buffering[ue1.buffering.length-1][2] != -1 || ue2.buffering[ue2.buffering.length-1][2] != -1 || ue3.buffering[ue3.buffering.length-1][2] != -1 ) {
				CellOccupancy.lbr123.push([timeInt,-1/1,CellOccupancy.lbr123[CellOccupancy.lbr123.length-1][2]]);					} else {
				CellOccupancy.lbr123.push([timeInt,-1/1,-1/1]);
				}	
				if ( ConsolCO == true ) console.log("CO, UC 123 not playing push:timeInt,-1/1,last_status",timeInt,-1/1,CellOccupancy.lbr123[CellOccupancy.lbr123.length-1][2]);
				}
			}
        	}
	
	// graphCO_UC_ues456
		if ( data[1] == 4 || data[1] == 5 || data[1] == 6 ) { // UE4,5,6
          	      if ( ues[data[1]-1].buffering[ues[data[1]-1].buffering.length-1][1] != -1 ) { // check UEx status
                	        if (  CellOccupancy.lbr456[CellOccupancy.lbr456.length-1][0] == timeInt ) { //timestamp exist, add UEs LBR
					 if ( CellOccupancy.lbr456[CellOccupancy.lbr456.length-1][1] == -1 ) { // before -1, to add from 0
                                        CellOccupancy.lbr456[CellOccupancy.lbr456.length-1][1] = 0;
                                        }
                        	        CellOccupancy.lbr456[CellOccupancy.lbr456.length-1][1] += data[3]/1;
					if ( ConsolCO == true ) console.log("CO, UC 456 add:timeInt,data[3]/1,sum",timeInt,data[3]/1,CellOccupancy.lbr123[CellOccupancy.lbr123.length-1][1]);
                       	 	} else { // push new timestampe to graph 
                                	CellOccupancy.lbr456.push([timeInt,data[3]/1,-1/1]);
					if ( ConsolCO == true ) console.log("CO, UC 456 push:timeInt,data[3]/1,-1/1",timeInt,data[3]/1,-1/1);
                        	}
                	} else {
				if ( CellOccupancy.lbr456[CellOccupancy.lbr456.length-1][0] == timeInt ) {} // timestamp exist
                                else { 
				CellOccupancy.lbr456.push([timeInt,-1/1,CellOccupancy.lbr456[CellOccupancy.lbr456.length-1][2]]);  
				if ( ConsolCO == true ) console.log("CO, UC 456 not playing push:timeInt,-1/1,laststatus",timeInt,-1/1,CellOccupancy.lbr456[CellOccupancy.lbr456.length-1][2]);	
				}
                        }
        	}
	} // ifelse
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
