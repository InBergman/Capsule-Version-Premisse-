angular.module('capsule')
  .controller('CapsuleSelectController', CapsuleSelectController);

function CapsuleSelectController($scope, capsuleDataFactory,userDataFactory) {
	vm = this;
	$scope.admins = [];
	vm.textArea = false;
	vm.cancelContent = '';
	vm.success = '';
	vm.error = '';
	vm.bodyCapsule = {
		"action": '',
		"id": '',
		"reason": ''
	};
	$scope.allForm = {
		name: "",
		action: "",
		adminId: [],
		type: "",
		capsuleId: ''
	}

	userDataFactory.adminAll().then(function (response) {
		$scope.admins = response;
	})

	$scope.submit = function (admins, capsule) {
		angular.forEach(admins, function (value, key) {
			if (admins[key].selected)
				$scope.allForm.adminId.push(admins[key]._id);
		})
		console.log(capsule);
		$scope.allForm.action = 'capsuleUpdateGeneral';
		$scope.allForm.capsuleId = capsule._id;	
		if ($scope.allForm.adminId.length > 0
			&& $scope.allForm.type.length > 0
			&& $scope.allForm.name.length > 0) {
				capsuleDataFactory.capsuleUpdate($scope.allForm).then(function(response) {
				if (response.status === 201) {
					vm.success = "Votre capsule est re-initialise. Veuillez Patienter";
					window.location.reload();
				}
				else
					vm.error = "Ce nom correspond deja une capsule";
			})
		} else {
			vm.error = 'Veuillez remplir tous les champs';
		}
}


	vm.cancelConfirm = function(cancelReason, capsule) {
		vm.bodyCapsule.id = capsule._id;
		vm.bodyCapsule.reason = cancelReason;
		vm.bodyCapsule.action = "capsuleCancel";
		console.log("cancelReason: ", cancelReason.length);
		console.log("capsule.name: ", capsule);
		switch(true) {
			case (cancelReason.length > 30):
				vm.error = '';
				vm.success = "Votre capsule a bien été annulée";
				console.log("success", vm.success);
				capsuleDataFactory.capsuleUpdate(vm.bodyCapsule).then(function(response){
				console.log(response);
				});	
			break;
			case (cancelReason.length == 0):
				vm.error = "Veuillez indiquer la raison de l'annulation";
				console.log("error", vm.error);
			break;
			case ((cancelReason.length > 0) && (cancelReason.length < 30)):
				vm.error = "Votre message est trop court. Veuillez renseigner plus longuement la raison de cette annulation";
				console.log("error", vm.error);
			break;
		}

	}
}