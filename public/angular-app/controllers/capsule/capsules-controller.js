angular.module('capsule').controller('CapsulesController', CapsulesController);

function CapsulesController($http, capsuleDataFactory, userDataFactory) {
    var vm = this;
    vm.disabled = true;
    vm.toShow = 'détails';
    vm.allForm = {
        name: "",
        action: "",
        adminId: [],
        type: ""
    }
    vm.CheckBox = {
        ready: {
            classique        : true,
            institutionnel   : true,
            privee           : true,
        },
        wip: {
            classique         : true,
            institutionnel    : true,
            privee            : true,
        },
        cancel: {
            classique         : true,
            institutionnel    : true,
            privee            : true,
        }
    }

capsuleDataFactory.capsuleGetAll().then(function(response){
    vm.capsules = response;
    // console.log(vm.capsules);
})

userDataFactory.adminAll().then(function(response){
    vm.admins = response;
    // console.log(vm.admins);
})

vm.submit = function(admins) {
    angular.forEach(admins, function(value, key){
        if (admins[key].selected) {
            console.log(admins[key]._id);
            console.log(admins[key].username);
            vm.allForm.adminId.push(admins[key]._id);
        }
})
    // console.log("name length", vm.allForm.name.length);
    // console.log("type length", vm.allForm.type.length);
    // console.log("type adminId", vm.allForm.adminId.length);
 if(vm.allForm.adminId.length > 0 
    && vm.allForm.type.length > 0 
    && vm.allForm.name.length > 0) 
 {
    capsuleDataFactory.capsulePost(vm.allForm).then(function(response){
     if (response.status === 201) {
                vm.success = "Votre capsule est initialise. Veuillez Patienter";
                window.location.href="/#!/capsules"
            }
            else
                vm.error = response.data.message;
        })
    } else {
        vm.error = 'Veuillez remplir tous les champs';
    }
}
};