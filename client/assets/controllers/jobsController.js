app.controller('jobsController', function ($scope, $location, jobsFactory) {
	//////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
		if ($scope.user_type != 'user')
			$location.url('/');
		else if($scope.user_type == 'user') {
			$scope.job = {
				job_type: 0,
				dirt_type: 'Sand',
				p_loader: false,
				d_loader: false
			};
			$scope.description = "Natural or screened / washed / crushed granular that can be compacted."
			$scope.src = "../static/images/dirt_types/sand.jpg";
			$scope.today = new Date();
			$scope.step = 1;
			$scope.progress = {'width': '0%'};
		}
	}
	else
		$location.url('/welcome');

	//////////////////////////////////////////////////////
	//										HELPER FUNCTIONS
	//////////////////////////////////////////////////////
	$scope.change = function() {
		switch($scope.job.dirt_type) {
			case 'Sand':
				$scope.description = "Natural or screened / washed / crushed granular that can be compacted."
				$scope.src = "../static/images/dirt_types/sand.jpg";
				break;
			case 'Sandyclay':
				$scope.description = "Contains both sand and clay."
				$scope.src = "../static/images/dirt_types/sandyclay.jpg";
				break;
			case 'Clay':
				$scope.description = "Clay that can be compacted."
				$scope.src = "../static/images/dirt_types/clay.jpg";
				break;
			case 'Gravel':
				$scope.description = "Natural or screened / washed / crushed rock that can be compacted."
				$scope.src = "../static/images/dirt_types/gravel.jpg";
				break;
			case 'Recycled Asphalt':
				$scope.description = "Crushed for reuse, from a recycling plant or staging area."
				$scope.src = "../static/images/dirt_types/recycled_asphalt.jpg";
				break;
			case 'Recycled Concrete':
				$scope.description = "Crushed for reuse, from a recycling plant or staging area."
				$scope.src = "../static/images/dirt_types/recycled_concrete.jpg";
				break;
			case 'Recycled Base Material':
				$scope.description = "Ready for reuse, from under roads &amp; parking lots."
				$scope.src = "../static/images/dirt_types/recycled_base_material.jpg";
				break;
			case 'Clean Fill':
				$scope.description = "Sand, sandyclay, clay, topsoil or a mixture of any of these with less than 5% clumps or rocks or sod or roots or weeds or concrete chunks, etc."
				$scope.src = "../static/images/dirt_types/clean_fill.jpg";
				break;
			case 'Rough Fill':
				$scope.description = "Same as Clean Fill, with 5% or more clumps or rocks or sod or roots or weeds, or concrete chunks, etc. Also gumbo clay and marsh bottom."
				$scope.src = "../static/images/dirt_types/rough_fill.jpg";
				break;
			case 'Topsoil - Nice':
				$scope.description = "High quality, rich black organic, natural or screened."
				$scope.src = "../static/images/dirt_types/topsoil_nice.jpg";
				break;
			case 'Topsoil - Average':
				$scope.description = "Average quality, medium black organic, little or no clumps, rocks, sod, or roots, etc."
				$scope.src = "../static/images/dirt_types/topsoil_average.jpg";
				break;
			case 'Topsoil - Economy':
				$scope.description = "Low quality, some black organic, could have some clumps, rocks, sod, or roots, etc."
				$scope.src = "../static/images/dirt_types/topsoil_economy.jpg";
				break;
			case 'Peat':
				$scope.description = "Decomposed plant material, marsh bottom, could be wet or dry."
				$scope.src = "../static/images/dirt_types/peat.jpg";
				break;
			case 'River Rock':
				$scope.description = "Rounded stones varies in color, 1/2 inch to 3 inches."
				$scope.src = "../static/images/dirt_types/river_rock.jpg";
				break;
			case 'Rip-Rap':
				$scope.description = "Rock, 3 inches to 10 inches."
				$scope.src = "../static/images/dirt_types/rip_rap.jpg";
				break;
			case 'Boulders':
				$scope.description = "Rock, larger than 10 inches."
				$scope.src = "../static/images/dirt_types/boulders.jpg";
				break;
			case 'Asphalt Chunks':
				$scope.description = "Broken pieces of asphalt, not been recycled."
				$scope.src = "../static/images/dirt_types/asphalt_chunks.jpg";
				break;
			case 'Concrete Chunks':
				$scope.description = "Broken pieces of concrete, not been recycled."
				$scope.src = "../static/images/dirt_types/concrete_chunks.jpg";
				break;
			case 'Contaminated Fill':
				$scope.description = "Dirtfill with gas, diesel fuel, PCBs, toxic chemicals, etc."
				$scope.src = "../static/images/dirt_types/contaminated_fill.jpg";
				break;
			case 'Snow':
				$scope.description = "Removed from streets, parking lots or driveways."
				$scope.src = "../static/images/dirt_types/snow.jpg";
				break;
		}
	}

	$scope.setVolume = function() {
		$scope.job.volume = $scope.preview;
		// $scope.job.volume = Math.round($scope.length * $scope.depth * $scope.height * 100)/100;
		$scope.step = 3;
	}

	$scope.calculate = function(){
		switch ($scope.shape) {
			case '1':  //rectangle
			$scope.preview = Math.round($scope.length * $scope.depth * $scope.width * 100)/100;
			break;
			case '2':  //wedge
			$scope.preview = Math.round($scope.length * $scope.depth * $scope.width * 50)/100;
			break;
			case '3':  //cylinder
			$scope.preview = Math.round(Math.PI * $scope.depth * Math.pow(($scope.width/2),2) * 100)/100;
			break;
			case '4':  //cone
			$scope.preview = Math.round(Math.PI * ($scope.depth/3) * Math.pow(($scope.width/2),2) * 100)/100;
			break;
			case '5': //bowl
			$scope.preview = Math.round((2 * Math.PI * $scope.length * $scope.depth * $scope.width)/3 * 100)/100;
			break;
			case '6':
			$scope.preview = Math.round($scope.length * $scope.depth * $scope.width * 100)/100;
			break;
			default:
		}
	}

	//////////////////////////////////////////////////////
	//										JOB
	//////////////////////////////////////////////////////	
	$scope.create = function() {
		$scope.error = null;
		jobsFactory.create($scope.job, function(data) {
			if (data.errors) {
				var error = "Could not create new job. "
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error + " Fix the error before re-submitting.");
			}
			else {
				$scope.id = data.id;
				$.notify({
					icon: "glyphicon glyphicon-check",
					message: `Successfully listed new job!`,
					url: `#/jobs/${data.id}`
				}, {
					type: "success",
					placement: {
						from: "bottom"
					},
					delay: 4000,
					animate: {
						enter: 'animated fadeInUp',
						exit: 'animated fadeOutDown',
					} 
				});					
				$scope.step = 7;
			}
		});
	}
});
