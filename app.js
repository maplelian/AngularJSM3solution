(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller("NarrowItDownController",NarrowItDownController)
.service("MenuSearchService",MenuSearchService)
.directive('foundItems',FoundItemsDirective);

function FoundItemsDirective(){
  var ddo = {
      templateUrl:'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
    controller:FoundItemsDirectiveController,
    controllerAs:'list',
    bindToController:true
  };

  return ddo;
}

function FoundItemsDirectiveController(){
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var list = this;
  list.searchTerm = "";

  //***Reteive the data from HTTP service.***//
  var promise = MenuSearchService.getMatchedMenuItems();
     promise.then (function(result){
     list.result = result.data;
     list.menu_items = list.result.menu_items;
     list.description = list.result.description;
     console.log(list.menu_items);
     console.log(list.menu_items[2]);
  })
  .catch(function(error){
      console.log("Something went terrible wrong.");
  });


//***Define the FountItems function.***//
list.getFoundItems = function (){
      list.foundItems =[];
   console.log(list.searchTerm); 
   console.log(list.foundItems); 
   if ((list.searchTerm === ""))
   {
       list.errorMessage = "Nothing found." ;
   }else{
         for (var i = 0; i < list.menu_items.length; i++){
              if (list.menu_items[i].description.includes(list.searchTerm)){
                list.foundItems.push(list.menu_items[i]);
              } 
            }  
             list.errorMessage = "";
            }
};
    
   //***Remove the item from menu_items list***//
list.removeItem = function (itemIndex){
    list.foundItems.splice(itemIndex, 1);  
}
};

//***MenuSearchService***//
MenuSearchService.$inject = ['$http']
function MenuSearchService($http){
    var service = this;
    

 service.getMatchedMenuItems = function (){
     var result = $http({
         method: "GET",
         url:("https://davids-restaurant.herokuapp.com/menu_items.json"),
        });
    return result;
 };
 

}

})();