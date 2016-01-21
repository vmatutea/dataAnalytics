var status ={
			running: true
};

$(document).ready(function() {
			$('#running').click(function() {
				runUpdate(status.running);
			});
});

function updatingData() {
	var c = 0;
	var timeIndex = status.timeIndexL;
	var isIntervalworking = false;

	var active = window.intervalId = setInterval(function() {
		// while(status.running){
		// while(c<15){
		if (isIntervalworking) {

		} else {
			isIntervalworking = true;

			var q1 = "SELECT * FROM ue_data";
			var q2 = "SELECT * FROM server_data";
			if (status.t != undefined) {
				q1 += " WHERE `timestamp`>" + status.t;
				q2 += " WHERE `timestamp`>" + status.t;
			}

			// HIER NUR L
			$.ajax({
				url : 'php/getData.php',
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
						status.t = data[i][0];
						$('#divdata').append('<p>'+data[i]+'</p>');
					}
				}
			
			});

//			 HIER NUR R
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
						$('#divdata2').append('<p>'+data[i]+'</p>');

					} // for
					// limitPresentData

					graphs.r1.updateOptions({
						'file' : dataObj.ue1_lbr
					});
					graphs.r2.updateOptions({
						'file' : dataObj.ue2_lbr
					});
					graphs.r3.updateOptions({
						'file' : dataObj.ue3_lbr
					});
					graphs.r4.updateOptions({
						'file' : dataObj.ue4_lbr
					});
				} // if
			});

			isIntervalworking = false;

			
			// if(c>10){
			// // window.clearInterval(active);
			// status.running =false;
			// }
			if (!status.running) {
				window.clearInterval(active);
			}
		}

	}, 3000);
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
