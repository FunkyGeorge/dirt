app.controller('indexController', function ($scope, $location, $routeParams, jobsFactory, geoFactory) {
	//////////////////////////////////////////////////////
	//										INITIALIZATION
	//////////////////////////////////////////////////////
	if (payload) {
		var position;

		//state variable
		$scope.state = [
			1, 			//scroll
			true, 	//keepscrolling flag
			true, 	//distance/latest flag
			false,	//isLoadedflag
			0,			//public/self jobs flag
			false,	//pickup flag
			false,	//dropoff flag
		];
		//#####  Commented to save api calls  #####
		navigator.geolocation.getCurrentPosition(showPosition);
		function showPosition(position){
			geoFactory.getCurrentZip(position.coords.latitude, position.coords.longitude, zipList);
		}
		function zipList (data){
			$scope.zipcodes = [data]
			geoFactory.getNearbyZips(data, function(zips, distances){
				$scope.zipcodes[1] = zips;
				$scope.distances = distances
				$scope.state[3] = true;
				appendJobs();
			}); //result is 95112... insert near zips here
		}

		//######  TEMP  ###################
		// $scope.zipcodes = "'95112','95194','95192','95113','95172','95103','95196','95173','95109','95106','95126','95190','95116','95110','95191','95155','95161','95101','95133','95156','95115','95131','95053','95122','95125','95150','95164','95050','95052','95128','95159','95011','95127','95117','95121','95111','95009','95055','95136','95158','95152','95056','95054','95051','95148','95157','95154','95008','95118','95123','95035','95134','95170','95129','95151','95130','95124','95153','95036','94089','94085','94086','94087','95193','95032','94088','95160','95132','95015','95120','95002','94035','94039','94041','95108','95014','95070','95071','95138','95119','95139','95030','95042','94539','94538','94043','94042','94040','94024','95013','95033','94560','94023','95135','95026','94306','94022','95141','95044','95031','94303','95140','95066','94587','94586','94536','94537','94555','94063','94026','94025','94027','94301','94302','94305','94309','94028','94304','94020','95037','95006','95073','94550','94061','95007','95005','95065','94566','94544','94064','95018','95003','94557','94545','94062','94021','94060','95046','95041','95010','94568','94541','94543','94542','94540','94404','94065','94002','94070','94074','95017','95038','95060','95001','95063','95064','95062','95061','94580','94403','95067','95076','94552','94546','94578','94579','94497','94402','95019','94401','95077','94582','94583','94551','94577','95377','94010','94011','94019','95020','95021','95004','94528','94526','94506','94588','94619','94613','94601','94620','95391','94605','94617','94621','94624','94622','94502','94603','94614','95304','94128','94030','95387','94018','95039','94507','94083','94066','95012','94598','94517','94596','94595','94529','94575','94556','94516','94611','94514','94661','94610','94659','94612','94602','95378','94666','94649','94604','94623','94615','94625','94606','94660','94501','94188','95376','94125','94124','94134','94160','94014','94005','94080','94044','94037','94038','95363','95360','93907','94597','94549','94563','94505','94705','94712','94701','94618','94662','94608','94609','94607','94177','94151','94126','94163','94162','94156','94103','94199','94175','94171','94155','94154','94153','94152','94150','94136','94135','94106','94101','94158','94107','94141','94140','94110','94146','94131','94112','94016','94013','94017','94015','95385','95045','93912','94531','94521','94523','94518','94513','94708','94706','94709','94720','94704','94702','94703','94710','94130','94133','94123','94147','94111','94109','94108','94104','94161','94145','94139','94138','94137','94120','94105','94115','94118','94142','94164','94159','94119','94144','94102','94117','94143','94172','94122','94114','94116','94127','94132','95023','93906','94519','94527','94524','95234','94707','95330','94129','94121','95337','95024','93933','94509','94548','94850','93905','94565','94522','94520','94561','94553','94803','94805','94808','94802','94530','94807','95206','94804','95358','95313','93902','93915','94820','95213','95208','94966','95322','95231','94920','94511','94564'"
		// $scope.state[3] = true;
		// zipList(95112);
		//#############################################################
	}
	else
		$location.url('/welcome');

	//////////////////////////////////////////////////////
	//										HELPER FUNCTIONS
	//////////////////////////////////////////////////////
	function appendJobs(){
		if ($scope.state[3]){ //isLoaded?
			jobsFactory.index($scope.state, $scope.zipcodes[1], function(data) {
				if ($scope.jobs && $scope.jobs.length == data.length){
					$scope.state[1] = false;
				} else {
					if (data.errors)
						displayErrorNotification("Could not load jobs. Please wait a while and try reloading. Contact an admin if the problem persists.");
					else {
						for (var i = 0; i < data.length; i++)
							data[i].src = data[i].dirt_type.toLowerCase().replace(/-/g, "").replace(/ /g,  "");

						transportDistance(data);
						$scope.jobs = data;
						$scope.state[0]++;
					}
				}
			});
		}
	}

	function transportDistance(jobs){
		for(var i = 0; i < jobs.length; i++){
			if (jobs[i].job_type == 2 && !$scope.distances[jobs[i].id]){
				geoFactory.distBetween(jobs[i],function(job, res){
					$scope.distances[job.id] = $scope.distances[job.p_zip] + res;
				});
			}
		}
	}

	$scope.append = function(){
		if ($scope.state && $scope.state[1]){
			appendJobs();
		}
	};

	$scope.getDistance = function(job){
		if(job.job_type == 0 && $scope.distances[job.p_zip])
			return $scope.distances[job.p_zip];
		else if (job.job_type == 1 && $scope.distances[job.d_zip])
			return $scope.distances[job.d_zip];
		else if (job.job_type == 2)
			return $scope.distances[job.id];
		else
			return '?'
	};

	$scope.toggle = function(flag){
		if ($scope.state && $scope.state[2] != flag){
			$scope.jobs = [];
			$scope.state[2] = flag;
			$scope.state[1] = true;
			$scope.state[0] = 1;
			appendJobs();
		}
	};

	$scope.filterByStatus = function(value){
		if (!$scope.state[5] && !$scope.state[6])
			return true;
		else if ($scope.state[5] && $scope.state[6])
			return false
		else if ($scope.state[5] && (value.job_type == 0 || value.job_type == 2))
			return true;
		else if ($scope.state[6] && value.job_type == 1)
			return true;
		else
			return false;
	};

	$scope.getAllListings = function(){
		$scope.state[1] = true;
		appendJobs();
	};

	$scope.getYourListings = function(){
		if ($scope.user_type == 'user')
			jobsFactory.getUserJobs($scope.id, function(data){
				for (var i = 0; i < data.length; i++)
					data[i].src = data[i].dirt_type.toLowerCase().replace(/-/g, "").replace(/ /g,  "");

				$scope.jobs = data;
			});
		else if ($scope.user_type = 'trucker')
			jobsFactory.getTruckerJobs($scope.id, function(data){
				for (var i = 0; i < data.length; i++)
					data[i].src = data[i].dirt_type.toLowerCase().replace(/-/g, "").replace(/ /g,  "");

				$scope.jobs = data;
			});
	};

});
