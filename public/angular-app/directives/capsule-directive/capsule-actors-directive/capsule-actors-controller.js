angular.module('capsule').controller('CapsuleActorsController', CapsuleActorsController);

function CapsuleActorsController(capsuleDataFactory,userDataFactory, $routeParams, $scope) {
	vm 					= this;
	vm.allId 			= { artistId: [], placeId: [], action: '', capsuleId: '' };
	$scope.indexM		= 0;
	vm.once 			= 0;
	vm.index			= 0;
	vm.boo 				= false;
	vm.confDate 		= false;
	$scope.capsule 		= {};
	$scope.creneauxExist = false;
	$scope.success 		= '';
	$scope.error 		= '';
	$scope.persistDate 	= [];
	$scope.allTimeInfo 	= {
		"weekdays": 	moment()._locale._weekdaysMin,
		"weekdaysLong": moment()._locale._weekdays,
		"month": 		moment().add(vm.index, "month").startOf("month").format('MMMM'),
		"year": 		moment().add(vm.indexM, "month").year(),
		"dayTotal": 	moment().add(vm.indexM, "month").daysInMonth(),
		"dayStart": 	moment().add(vm.indexM, "month").startOf().day(),
		"dayEnd": 		moment().add(vm.indexM, "month").endOf().day(),
		"daysInMonth": [[],[{
			"num": 0,
			"class": '',
			"day": '',
			"month": '',
			"year": 0
		}]]
	}
/////////////// init: initiate value ( make weekDay begin at 'Lundi') //////////////////	
$scope.init = () => {
	if (vm.once++ == 0) {
		if ($scope.allTimeInfo.weekdays[0] == 'Di') {
			$scope.allTimeInfo.weekdays.shift();
			$scope.allTimeInfo.weekdays.push('Di');
			$scope.allTimeInfo.weekdaysLong.shift();
			$scope.allTimeInfo.weekdaysLong.push('Dimanche');
		}
		$scope.fillDays($scope.allTimeInfo.dayStart - 1, $scope.allTimeInfo.dayTotal)
		capsuleDataFactory.capsuleGetOne($routeParams.id).then(function(response) {
			console.log(response);
			$scope.capsule = response;
			try { 
				if (response.daysIntervals[0].creneaux[0])
					$scope.creneauxExist = true;
			} catch(error) {
				$scope.creneauxExist = false;
			}
		})

		}
	}	

$scope.modifCreneaux = () => {
		$scope.creneauxExist = false;

}

// 			- temps de creneaux [et/ou] interval < temps entre debut et fin de creneaux 


// Verifier format des horaires. ( number et c'est tout )
// Verfifier que tous les champs soient remplie
$scope.checkField = (dates) => {
	try {	
		if (dates.capsuleBegin.hours == undefined ||
			dates.capsuleBegin.minutes == undefined ||
			dates.capsuleDuration.hours == undefined ||
			dates.capsuleDuration.minutes == undefined ||
			dates.capsuleEnd.hours == undefined ||
			dates.capsuleEnd.minutes == undefined ||
			dates.capsuleInterval.hours == undefined ||
			dates.capsuleInterval.minutes == undefined ||
			dates.numPerson == undefined)
			return false 
		else  
			return true;
		} catch (error) {
			return false;
		}
		return (true);	
	}

// TODO :	 Verfifier coherence des horaires:
// 			- Heure de depart < Heure de fin
//			- Minutes < 60 et Heures < 24
	$scope.checkFormat = (dates, intervalT, creneauT) => {
		
		var beginT = (dates.capsuleBegin.hours * 60) + dates.capsuleBegin.minutes;
		var endT = (dates.capsuleEnd.hours * 60) + dates.capsuleEnd.minutes;

		if ((dates.capsuleBegin.hours > dates.capsuleEnd.hours)
			|| ((dates.capsuleBegin.hours == dates.capsuleEnd.hours) && (dates.capsuleBegin.minutes == dates.capsuleEnd.minutes))  
			|| (dates.capsuleBegin.hours > 24 || dates.capsuleBegin.hours < 0)
			|| (dates.capsuleBegin.minutes > 59 || dates.capsuleBegin.minutes < 0)
			|| (dates.capsuleEnd.hours > 24 || dates.capsuleEnd.hours < 0)
			|| (dates.capsuleEnd.minutes > 59 || dates.capsuleEnd.minutes < 0)
			|| intervalT < 0
			|| creneauT <= 0 ) {
			return false;
		}
		var diff = endT - beginT;

		if (diff < 60) {
			console.log("temps trop court");
			$scope.error = 'La plages des creneaux est trop courte'
			return false;
		}

		if ((intervalT + creneauT) > diff)
			return false;
	}

	$scope.valideTime = () => {
		angular.forEach($scope.persistDate, function(value, key){
			if ($scope.checkField($scope.persistDate[key]) === false) {
				$scope.error = 'Veuillez correctement remplir tous les champs';
				console.log("Une des valeur est undefined");
				return ;
			}
			$scope.persistDate[key].capsuleBegin.hours = ($scope.persistDate[key].capsuleBegin.hours == 0) ?
														 24 : $scope.persistDate[key].capsuleBegin.hours; 	
			var interval, creneauxT = 0;
			var capsuleC = [{}];
			var capsuleI = [{}];
			var beginMinutes = {
				"hour": $scope.persistDate[key].capsuleBegin.hours,
				"min": $scope.persistDate[key].capsuleBegin.minutes
			};
			var incrementTimeGenerique = (begin, time, timeStore) => {
				begin.hours++;
				begin.minutes = (begin.minutes + time) - 60;
				timeStore.push({
					"hours": begin.hours,
					"minutes": begin.minutes
				});
			}
			var SpeIncrementTimeGenerique = (begin, time, timeStore) => {
				begin.minutes += time;
				timeStore.push({
					"hours": begin.hours,
					"minutes": begin.minutes
				});
			}
			var lastCreneau = (begin, end, interval, creneauxT) => {
			
				var endCreneau 		= (end.hours * 60) + end.minutes;
				var currentCreneaux = ((begin.hours * 60) + begin.minutes) + interval;
				var isFinish 		= (currentCreneaux >= endCreneau) || ((currentCreneaux + creneauxT) >= endCreneau) ? 1 : 0;
				return isFinish;
			}
			var begin 	=  $scope.persistDate[key].capsuleBegin;
			var end 	=  $scope.persistDate[key].capsuleEnd;
			
			interval 	= ($scope.persistDate[key].capsuleInterval.hours > 0) ? 
			($scope.persistDate[key].capsuleInterval.hours * 60) + $scope.persistDate[key].capsuleInterval.minutes : 
			$scope.persistDate[key].capsuleInterval.minutes;
			
			creneauxT 	= ($scope.persistDate[key].capsuleDuration.hours > 0) ? 
			($scope.persistDate[key].capsuleDuration.hours * 60) + $scope.persistDate[key].capsuleDuration.minutes : 
			$scope.persistDate[key].capsuleDuration.minutes;
			
			if ($scope.checkFormat($scope.persistDate[key], interval, creneauxT) == false) {
				$scope.error = 'Veuillez verifier la coherence de vos creneaux';
				console.log("Heure de depart < Heure de fin");
				return ;
			}
			
			capsuleC.push({
				"hours":   $scope.persistDate[key].capsuleBegin.hours,
				"minutes": $scope.persistDate[key].capsuleBegin.minutes
			})
			capsuleC.shift();

			while(lastCreneau(begin, end, interval, creneauxT) != 1) {
				if ((begin.minutes + creneauxT) >= 59) {
					incrementTimeGenerique(begin, creneauxT, capsuleI);
					if ((begin.minutes + interval) >= 59)
						incrementTimeGenerique(begin, interval, capsuleC);
					else
						SpeIncrementTimeGenerique(begin, interval, capsuleC);
				} else {
					SpeIncrementTimeGenerique(begin, creneauxT, capsuleI);
					if ((begin.minutes + interval) >= 59)
						incrementTimeGenerique(begin, interval, capsuleC);
					else
						SpeIncrementTimeGenerique(begin, interval, capsuleC)
				}
			}
			capsuleI.shift();
			$scope.persistDate[key].capsuleBegin.minutes = beginMinutes.min;
			$scope.persistDate[key].capsuleBegin.hours = beginMinutes.hour;
			Object.assign($scope.persistDate[key], {creneaux: capsuleC}, {interval: capsuleI});
			console.log("Creneaux = ", capsuleC);
			console.log("Interval = ", capsuleI);
			vm.index = key;
		});
		Object.assign($scope.persistDate[vm.index], { id: $routeParams.id });
		console.log("YOUHYOUH");
		capsuleDataFactory.capsuleAddCreneaux($scope.persistDate).then(function(response) {
			$scope.success = 'Vos creneaux ont bien ete enregistre';
		});
        window.location.href="/#!/capsules"
	}
/////////////// FunctionName:  //////////////////	
	$scope.select = function(item) {
		var bol = true;
		vm.boo = true;
		angular.forEach($scope.persistDate, function(value, key){
		  
			if 	($scope.persistDate[key].day === item.num 
		  		&& $scope.persistDate[key].month === item.month 
		  		&& $scope.persistDate[key].year === item.year) {
			item.class = "";
		  	$scope.persistDate.splice(key, 1);
		  	console.log("persistDate = ", $scope.persistDate);
		  	bol = false;
		  	return false;
		  }
		})
		if (bol == true) {
			item.class = "active";
			$scope.persistDate.push({
				"day" : item.num,
				"month" : item.month,
				"year" : item.year
			})
		}
	 }
/////////////// End //////////////////	

/////////////// FunctionName:  Add artist from selected ones to the capsule  //////////////////	
	vm.submitArtist = (user) => {
		vm.allId             = {};
		vm.allId.capsuleId   = $routeParams.id;
		vm.allId.action      = 'addArtist';
		vm.allId.artistId    = [];
		angular.forEach(user, function(value, key){
		  if (user[key].artist) {
		    if(user[key].artist.selected)
		      vm.allId.artistId.push(value.artist._id);
		  }
		})
		if (vm.allId.artistId.length > 0) {
		  capsuleDataFactory.capsuleUpdate(vm.allId).then(function(response){
		    console.log(response);
		  })
		}
	}
/////////////// End //////////////////	

	/////////////// FunctionName:  Add artist from selected ones to the capsule  //////////////////	
	vm.submitPlace = (user) => {
		vm.allId = {};
		vm.allId.capsuleId = $routeParams.id;
		vm.allId.action = 'addPlace';
		vm.allId.placeId = [];
		angular.forEach(user, function (value, key) {
			if (user[key].place) {
				if (user[key].place.selected)
					vm.allId.placeId.push(value.place._id);
			}
		})
		console.log(vm.allId.placeId);
		if (vm.allId.placeId.length > 0) {
			capsuleDataFactory.capsuleUpdate(vm.allId).then(function (response) {
				console.log(response);
			})
		}
	}
/////////////// End //////////////////	


/////////////// FunctionName:  //////////////////	
	$scope.fillDays = (beforeStart, days) => {
		var local = 0;
		for (var i = 0; i < 5; i++) {
			$scope.allTimeInfo.daysInMonth[i] = [];
			for (var j = 0; j < 7; j++) {
				$scope.allTimeInfo.daysInMonth[i][j] = {};
				if (local === days) {break};
				local += (i == 0 && j < beforeStart) ? 0 : 1;
				$scope.allTimeInfo.daysInMonth[i][j].num = (i == 0 && j < beforeStart) ? 0 : local;
				$scope.allTimeInfo.daysInMonth[i][j].day = $scope.allTimeInfo.weekdaysLong[j];
				$scope.allTimeInfo.daysInMonth[i][j].month = $scope.allTimeInfo.month;
				$scope.allTimeInfo.daysInMonth[i][j].year  = $scope.allTimeInfo.year;
				for (var h = 0; h < $scope.persistDate.length; h++) {
					if ($scope.allTimeInfo.daysInMonth[i][j].num === $scope.persistDate[h].day 
					&& $scope.allTimeInfo.daysInMonth[i][j].month === $scope.persistDate[h].month
					&& $scope.allTimeInfo.daysInMonth[i][j].year === $scope.persistDate[h].year) {
						$scope.allTimeInfo.daysInMonth[i][j].class = "active";
					}
				}		
			}
		}
	}

/////////////// FunctionName:  //////////////////	
	$scope.add = () => {

		$scope.allTimeInfo.month 	= 	moment().add(++$scope.indexM, "month").startOf("month").format('MMMM');
		$scope.allTimeInfo.year 	= 	moment().add($scope.indexM, "month").year();
		$scope.allTimeInfo.dayTotal = 	moment().add($scope.indexM, "month").daysInMonth();
		$scope.allTimeInfo.dayStart = 	moment().add($scope.indexM, "month").startOf().day();
		$scope.allTimeInfo.dayEnd	= 	moment().add($scope.indexM, "month").endOf().day();

		$scope.fillDays($scope.allTimeInfo.dayStart - 1, $scope.allTimeInfo.dayTotal);
	}

/////////////// FunctionName:  //////////////////	
	$scope.sub = () => {

		$scope.allTimeInfo.month 	= moment().add(--$scope.indexM, "month").startOf("month").format('MMMM');
		$scope.allTimeInfo.year 	= 	moment().add($scope.indexM, "month").year();
		$scope.allTimeInfo.dayTotal = 	moment().add($scope.indexM, "month").daysInMonth();
		$scope.allTimeInfo.dayStart = 	moment().add($scope.indexM, "month").startOf().day();
		$scope.allTimeInfo.dayEnd	= 	moment().add($scope.indexM, "month").endOf().day();

		$scope.fillDays($scope.allTimeInfo.dayStart - 1, $scope.allTimeInfo.dayTotal);
	}
}