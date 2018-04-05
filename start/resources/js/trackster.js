var Trackster = {};
const API_KEY = '975c4032896f16103388baa23cf193f3';
var trackResults;
var trackDuration;

function minTommss(minutes){
	 var sign = minutes < 0 ? "-" : "";
	 var min = Math.floor(Math.abs(minutes));
	 var sec = Math.floor((Math.abs(minutes) * 60) % 60);
	 return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}


// click event for search

$(document).ready(function() {
	$('#submitButton').click(function() {
		Trackster.searchTracksByTitle($("#inputField").val());
		$('.detailContainer').empty();			
	})

// Search on enter key press

	$('#inputField').keypress(function(event) {
		if (event.which == 13) {
			$('#submitButton').click();
		}
	}) 			
})

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
Trackster.renderTracks = function(tracks) {
let detailContainer = $('.detailContainer');
for (var i = 0; i <= (trackResults.length)-1; i++) {
    var mediaAlbumArt = trackResults[i].image[1]["#text"];    

    ((i) => $.ajax({
        url: 'https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key='+API_KEY+'&artist=' + trackResults[i].artist + '&track='+ trackResults[i].name + '&format=json',              
        dataType: 'jsonp',
        success: function(d) {
            		console.log("Success", d.track.duration);
            		let trackDuration = d.track.duration/100000;
            		var promises = []
            		var popularity = numeral(trackResults[i].listeners);


				    
					var $tracks = '<div class="container-fluid song-details">'+
					                  '<div class="row align-items-center h-100">'+ 
					                  	'<div class="play-icon col-md-1 offset-md-1">'+
        									'<a href="'+ trackResults[i].url + '" target="_blank"><i class="far fa-play-circle fa-lg"></i></a>'+
      									'</div>'+                                
					                    '<div class="col-md-1">'+
					                      '<span>' + parseFloat(i+1)  + '</span>'+
					                    '</div>'+
					                    '<div class="col-md-2">'+
					                      '<span>' + trackResults[i].name + '</span>'+
					                    '</div>'+
					                    '<div class="col-md-2">'+
					                      '<span>' + trackResults[i].artist + '</span>'+
					                    '</div>'+
					                    '<div class="col-md-1">'+
					                      '<img src="' + mediaAlbumArt + '" />'+
					                    '</div>'+
					                    '<div class="col-md-1">'+
					                      '<span>' + popularity.format('0 ,0') + '</span>'+
					                    '</div>'+
					                    '<div class="col-md-1 col-style">'+
					                        '<span>' + minTommss(trackDuration) + '</span>'
					                    '</div>'+ 
					                  '</div>'+
					               '</div>';                       

           				detailContainer.append($tracks);           
        },
        error: function(err) {
            console.log("Error!", err);
        }

    }))(i)
}}; 

// request title informations

Trackster.searchTracksByTitle = function(title) {
		
		$.ajax({
					url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' +($("#inputField").val())+ '&api_key=' +API_KEY+ '&format=json',
					dataType: 'jsonp',
					success: function(data) {
						console.log("Success!", data);
						trackResults = data.results.trackmatches.track;
						Trackster.renderTracks();											
					},
					error: function(error) {
						console.log("Error!", error);
					}
				})
	}
	

