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



var temp={
		entries:[],
		count:[],
		numb_entries:0
};

var timeIndexL = 0;
var timeIndexLnoData = new Date();
var BrowserReload = 0;
var xtic1="0-15";
var xtic2="15-30";
var windowmyBar;

$(document).ready( function() {
//1. Initialization variables

        timeIndexLnoData= new Date().getTime();
        if ( BrowserReload == 0 ) {
                                for (var g=30 ; g > 0 ; g-- ) {
                                        ue1.buffering.push([timeIndexLnoData-g*1000,5/1,-1/1,null]);
                                        console.log("updatingData,initLBR",g);
                                        console.log("time:",timeIndexLnoData-g*1000);
                                } //for
        } //if

/*
        // 2. graph definition
	ue1.graph = new Dygraph(document.getElementById("div_g1"),
		ue1.buffering, {
			colors	   : new Array( "rgb(0,169,212)", "rgb(137,186,23)","rgb(123,123,23)"),
			strokeWidth: 2,
			valueRange : [ 0, 25 ],
			drawXGrid : false,
                        axes : {
                                x : {   axisLabelFormatter : function (ms){
                                                return  new Date(ms).strftime('%H:%M:%S');},
                                        valueFormatter: function(ms) {
                                                return 'Time(' + new Date(ms).strftime('%H:%M:%S') + ')';},
                                        pixelsPerLabel: 100,
                                        axisLabelFontSize  : 12
                                                },
                                y : { axisLabelFormatter : function (y){
                                        if(y.toString().length == 1){
                                                return y;
                                        } else {
                                                return '';
                                        }
                                }}
                                },
				ylabel : 'C',
				labels : [ 'Time', 'UC', 'BC', '' ]
		});

*/

	var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

		var ctx = document.getElementById("div_g1").getContext("2d");
		windowmyBar = new Chart(ctx).Bar( {
		labels : [xtic1,xtic2],
//		labels : [parseInt(temp.entries[0]),parseInt(temp.entries[1])],
		datasets : [
			{
				fillColor : "rgb(0,169,212)",
				strokeColor : "rgb(123,123,23)",
				highlightFill: "rgb(137,186,23)",
				highlightStroke: "rgba(220,220,220,1)",
				data : [randomScalingFactor(),randomScalingFactor()]
//				data : [temp.count[0],temp.count[1]]
			}
		]

	}, {
			responsive : true
		});


			updatingData();


});// document.ready

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
			var q1 = "SELECT * FROM temp_da";

			$.ajax({
				url : 'php/getData.php',
				async : false,
				data : { query : q1 }
			})
			.fail(function(){
			console.log("updatingData,AJAX CALL ue_data FAIL at timeIndexL+timeIndexLDelta:",timeIndexL+timeIndexLDelta);
			})
			.done(function(data) {
				if (data[0] == "<") {
					var data = $.parseJSON($(data).html());
				} else {
					var data = $.parseJSON(data);
				}
                        // #### END -> SQL DB querry via Ajax/PHP ###
			//data will include: 0:timestamp, 1:ue_id, 2: stream_type, 3:starttime, 4:prebuffer_duration, 5:status_chang
                        // #### BEGIN-> Data Analyzes for Video Status ###
			luc=data.length;
			dataAnalysis(data);
                	}); // !!! AJAX done function
	}, 1000);
} // updating Data

function dataAnalysis(data) {
			temp.numb_entries=data.length;
			var count=0;
			if (temp.numb_entries != 0) {
				// Check the different temperatures
				for ( var i = 0; i < temp.numb_entries; i++) {
					var index=temp.entries.indexOf(parseInt(data[i]));
					if(index < 0){
						temp.entries.push(parseInt(data[i]));
					}
				} // for
				console.log("temp entries", temp.entries[0],temp.entries[1],temp.entries[2]);
				console.log("temp entries length", temp.entries.length);
				temp.count=[];
				//Check the frequency of the temperatures
				for (var h=0; h<temp.entries.length;h++){
					for ( var i = 0; i < temp.numb_entries; i++) {
						if(temp.entries[h]==data[i]){
							count +=1; 
						}//if
					}//for
					temp.count.push((count*100/temp.numb_entries));
					count=0;
				}//for
				console.log("count entries", temp.count[0],temp.count[1],temp.count[2],temp.count[3],temp.count[4],temp.count[5],temp.count[6],temp.count[7],temp.count[8]);
			}
		windowmyBar.datasets[0].bars[0].value=temp.count[0];
		windowmyBar.datasets[0].bars[1].value=temp.count[1];
		windowmyBar.update();
}


