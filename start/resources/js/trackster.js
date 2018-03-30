var Trackster = {};
const API_KEY = '';

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
Trackster.renderTracks = function(tracks) {
	 for (var i = 0; i < data.length; i++) {

	 }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
		$.ajax({
					url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track='+($("#inputField").val())+'&api_key='+API_KEY+'&format=json',
					success: function(data) {
						console.log("Success!", data);
					},
					error: function(e) {
						console.log("Error!", e);
					}
				})
};

$(document).ready(function() {
	$("#submitButton").click(function() {
		Trackster.searchTracksByTitle($("#inputField").val());
	})
})