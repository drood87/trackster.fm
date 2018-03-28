$(document).ready(function() {
	
	$("#submitButton").click(function() {
		Trackster.searchTracksByTitle($("#inputField").val());
		console.log($.ajax({
			url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=tiny&api_key=975c4032896f16103388baa23cf193f3&format=json'
		}))
	})

})

const API_KEY = 975c4032896f16103388baa23cf193f3;

var Trackster = {};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
Trackster.renderTracks = function(tracks) {

};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {

};

$(document).ready(function() {
	// body...
})