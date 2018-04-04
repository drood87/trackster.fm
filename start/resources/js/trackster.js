var Trackster = {};
const API_KEY = '975c4032896f16103388baa23cf193f3';
var trackResults;
var trackDuration;

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
        url: 'https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key='+API_KEY+'&artist=' + trackResults[i].artist + '&track='+ trackResults[i].name+ '&format=json',              
        dataType: 'jsonp',
        success: function(d) {
            		console.log("Success", d.track.duration);
            		let trackDuration = d.track.duration;

            		var $tracks = '<div class="container-fluid song-details">'+
					                  '<div class="row align-items-center h-100">'+                                 
					                    '<div class="col-md-1 offset-md-1">'+
					                      '<span>' + parseFloat(i+1) + '</span>'+
					                    '</div>'+
					                    '<div class="col-md-3">'+
					                      '<span>' + trackResults[i].name + '</span>'+
					                    '</div>'+
					                    '<div class="col-md-2">'+
					                      '<span>' + trackResults[i].artist + '</span>'+
					                    '</div>'+
					                    '<div class="col-md-2">'+
					                      '<img src="' + mediaAlbumArt + '" />'+
					                    '</div>'+
					                    '<div class="col-md-1">'+
					                      '<span>' + trackResults[i].listeners + '</span>'+
					                    '</div>'+
					                    '<div class="col-md-1 col-style">'+
					                        '<span>' + parseFloat(trackDuration/1000)  + '</span>'
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
	

