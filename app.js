(function(){
    'use strict';

    angular.module('shoppingListCheckOff',[])
    .controller('toBuyController',toBuyController)
    .controller('alreadyBoughtController',alreadyBoughtController)
    .service('shoppingListService',shoppingListService);

    function shoppingListService(){
        var service = this;
         var boughtItems= [];  
        //Pre Populating the shopping List
         var items = [{
            name:"cookies",quantity:10
        },{
            name:"Chips",quantity:20
        },{
            name:"Burgers",quantity:15
        },{
            name:"Biscuits",quantity:18
        },{
            name:"PanCakes",quantity:5
        }];
        //Service showing the shopping list
        service.show = function()
        {
            return items;
        }
        service.removeItem = function(itemindex)
        {
            boughtItems.push(items[itemindex]);
            items.splice(itemindex,1);                   
            if(items.length == 0)
            {
                throw new Error("Everything is bought!");
            }
        }
        service.showBoughtItems = function()
        {    
               return boughtItems;        
        };
    };
    
    toBuyController.$inject = ['shoppingListService'];
    function toBuyController(shoppingListService)
    {
        var vm = this;
        vm.items = shoppingListService.show();
        vm.buyItem = function(itemindex)
        {
            try
            {
               shoppingListService.removeItem(itemindex);  
            }
            catch(error)
            {
                 vm.errorMessage = error.message;
            }
                       
        };       
               
    };
    alreadyBoughtController.$inject = ['shoppingListService'];
    function alreadyBoughtController(shoppingListService){
        var vm = this;
        var boughtItems = []; 
        vm.boughtItems = shoppingListService.showBoughtItems();                   
    };
})();