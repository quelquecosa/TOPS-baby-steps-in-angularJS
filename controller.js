/*	
	NOTES:
	*mainController matches up to: <body ng-controller='mainController'> on the interface
		- the logic inside mainController{} is in charge of the interface inside of <body ng-controller='mainController'> and </body>
		- we inject 4 native Angular objects that will help us carry out our tasks
		
	*what is the $scope object? 
		- the glue between the interface and the controller
		- an object in the controller that can be accessed live by the interface (index.html)
		
	*what is the $http object? 
		- an object with methods that allow us to connect to API's from within this controller
		
	*what is the $timeout object? 
		- it works exactly the same as JS's setTimeout, it is just built specifically for Angular
		
		- works like this:
		
		$timeout(function() {
			console.log('3 seconds have passed');
		}, 3000);
*/




// DECLARATION OF OUR mainController:
// it runs as soon as the page loads
// It's name must match with: <body ng-controller='mainController'> on the interface
function mainController ($scope, $http, $timeout, $sce){	
		
	//turn off the spinner by default
	$scope.showSpinner = false;
	
	//declare our empty model. 
	//Here is where we will keep the videos we get from API's.
	$scope.videos = [];
	
	
	/*OUR MODEL WILL LOOK LIKE THIS:*/
	//	-$scope
	//		-videos
	//			-[0]
	//				-title
	//				-URL
	//			-[1]
	//				-title
	//				-URL
	//			-[2]
	//				-title
	//				-URL
	//			-[etc]
	//				-title
	//				-URL
		 
		 
		 
	//get videos from youtube api:
	//this function is being declared, and does not run on-load
	//this function runs when the user clicks the <li ng-click="getYouTube()">, due to ng-click
	$scope.getYouTube = function(){
	 
	 	//turn on the loading spinner
	 	$scope.showSpinner = true;
		
		//go to youtube API and bring back some videos for us
		$http.get('https://gdata.youtube.com/feeds/api/videos?q=cool&max-re‌​sults=5&v=2&alt=jsonc&orderby=published').success(function(response) {
	    	
	    	//once the videos come back…
	    	
	    	console.log('youTube API response:', response);
		
			//empty the model
			//yeah, the one we declared at the top of this controller
			$scope.videos = [];
			
			//insert each video into the model
			//(title and URL)
			for (i=0; i<response.data.items.length; i++){
				$scope.videos[i] = {};
				$scope.videos[i].title = response.data.items[i].title;
				$scope.videos[i].URL = $sce.trustAsResourceUrl('http://www.youtube.com/embed/'+response.data.items[i].id);
				//**we need $sce.trustAsResourceUrl, otherwise angular wont allow us to use concactenated URL's
			}		
		});
			
		console.log('youTube videos ready for view:', $scope.videos);
		
		//turn off the spinner in 3 seconds so videos have time to render to the page before the user sees them
		$timeout(function() {
			$scope.showSpinner = false;
		}, 3000);	
	};
	
	
	
	//get videos from vimeo api:
	// this function is being declared, and does not run on-load
	$scope.getVimeo = function(){
	 	
	 	//turn on the loading spinner
	 	$scope.showSpinner = true;

		//go to youtube API and bring back some videos for us
		$http.get('http://vimeo.com/api/v2/victoriarivera/videos.json?callback=').success(function(response) {
        	
        	console.log('vimeo API response:', response);
		
			//empty the model
			$scope.videos = [];
			
			//insert each video into the model
			//(title and URL)
			for (i=0; i<response.length; i++){
				$scope.videos[i] = {};
				$scope.videos[i].title = response[i].title;	
				$scope.videos[i].URL = $sce.trustAsResourceUrl('http://player.vimeo.com/video/'+response[i].id);
				//**we need $sce.trustAsResourceUrl, otherwise angular wont allow us to use a url	
			}		
    	});
			
		console.log('vimeo videos ready for view:', $scope.videos);
		
		//turn off the spinner in 3 seconds so videos have time to render to the page
		$timeout(function() {
			$scope.showSpinner = false;
		}, 3000);	
	};
}

//END OF mainController


//we can make more controllers, and assign them to different chunks of our interface
function secondController ($scope){
	//logic in here
	//currently not in use  
	//to use, add ng-controller="secondController" to a div outside of mainController in index.html
}

function thirdController ($scope, $http){
	//logic in here
	//currently not in use...
}
