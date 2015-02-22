angular.module("AngularTest",["LocalStorageModule"]) 
.factory('GUIService', function(){
	var guiService = {};
	guiService.showReqFormVaule = true;

	guiService.showText = function(id,delay){
			var elem=document.getElementById(id);
			setTimeout(function(){elem.style.visibility='visible';},delay*1000)
	};
	guiService.hideText = function(id,delay){
			var elem=document.getElementById(id);
			setTimeout(function(){elem.style.visibility='hidden';},delay*1000)
	};


	guiService.showReqForm = function(){
		guiService.showReqFormVaule = !guiService.showReqFormVaule;
		return guiService.showReqFormVaule;
	};

	return guiService;
})
.factory('RequestService',function(localStorageService){

	var requestService = {};
	requestService.key ="angular-ts-requests";

	if (localStorageService.get(requestService.key)){
			requestService.requests = localStorageService.get(requestService.key);
		}
	else{
		requestService.requests = [];
	};
	requestService.updateLocalStorage =function(){
		localStorageService.set(requestService.key,requestService.requests);
	};
	requestService.subReq = function(newReq){
		try{
			requestService.requests.push(newReq);
			requestService.updateLocalStorage();
		}
		catch(error){
			return false;
		}
		return true;
	};
	
	return requestService;
})
.factory('InfoService', function(localStorageService){
	requestService.clean = function(){
		requestService.requests = [];
		requestService.updateLocalStorage();
		return requestService.getAll();
	};
	requestService.getAll = function(){
		return requestService.requests;
	};

	requestService.removeItem = function(item){
		requestService.requests = requestService.requests.filter(function(request){
			return request !== item;
		});
		requestService.updateLocalStorage();
		return requestService.getAll();
	};
})
.factory('AdminService',function(localStorageService){

	var adminService = {};
	adminService.key ="angular-ts-requests";

	if (localStorageService.get(adminService.key)){
			adminService.reqs = localStorageService.get(adminService.key);
		}
	else{
		adminService.regs = [];
	};
	adminService.getReqs = function(){
		return adminService.reqs;
	};
	/*
	adminService.getItem = function(schoolId){
		adminService.regs = adminService.reqs.filter(function(schoolId){
			return adminService.reqs.studentName == schoolId;
		});
		return adminService.getReqs;
	};
	*/
	return adminService;
})
	.controller("RequestController",function($scope, RequestService, GUIService){
		$scope.showReqForm = true;
		$scope.newReq = {};
		$scope.systemMessage = "System message";
		$scope.submitReq = function(){
			if (RequestService.subReq($scope.newReq)){
				$scope.showReqForm = GUIService.showReqForm();
				$scope.systemMessage = "Your request is being processed ...";
				$scope.newReq = {};
				$scope.systemMessage = "Your request has been successfully submitted";
				
				
			}
			else{
				$scope.systemMessage = "An error has occured. Please check values entered and try agian!";
			}

			$scope.showReqForm = GUIService.showReqForm();
			
		};
		
	})
	.controller("AdminController", function($scope, AdminService, GUIService){
		$scope.requests = AdminService.getReqs();
	})