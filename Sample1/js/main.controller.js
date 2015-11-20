app.controller('Head', ['$scope', 'Scopes', function($scope, Scopes){
    Scopes.set('Head', $scope);
    $scope.template = 'grid';
    $scope.cards = [];
    $scope.renCards = [];
    if (localStorage) {
        if (localStorage.getItem('cards') != null) {
            $scope.renCards = JSON.parse(localStorage.getItem('cards'));
            $scope.cards = $scope.renCards;
        }
        if (localStorage.getItem('template') != null) {
            $scope.template = localStorage.getItem('template')
        }
    }

    $scope.init = function() {
       window.location.href = window.location.pathname;
    };

    $scope.changeTemplate = function(temp) {
        $scope.template = temp; 
        localStorage.setItem('template', temp);
        console.log($scope.template);
        Scopes.get('Body').templateChange($scope.template);
    }; 
    
    $scope.addCard = function(){
      $scope.cards.push({
        imageURL: 'http://orig02.deviantart.net/f895/f/2009/306/8/7/lorem_ipsum_by_neosh.jpg', 
        title: "Lorem Ipsum",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eros tellus, luctus et cursus nec, bibendum nec justo. Nam et sapien vehicula, viverra enim ac, commodo arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis eu pharetra lacus."
      });
      
      $scope.renCards = $scope.cards;
      localStorage.setItem('cards', JSON.stringify($scope.renCards, function (key, val) {
         if (key == '$$hashKey') {
           return undefined;
         }
         return val;
      }));
    };    

}]);

app.controller('Body', ['$scope','Scopes', function($scope, Scopes) {
  Scopes.set('Body', $scope);
  $scope.cards = Scopes.get('Head').cards;
  $scope.template = Scopes.get('Head').template;
  $scope.renCards = $scope.cards;
  $scope.templateChange = function(temp) {
    $scope.template = temp;
  }
  $scope.search = function(keyEvent) {
    if (localStorage) {
        if (localStorage.getItem('cards') != null) {
            $scope.cards = JSON.parse(localStorage.getItem('cards'));
        }
    }
    var searchStr = $("#search").val().toLowerCase();
    console.log(searchStr);
    var results = [];
    console.log($scope.cards);
    if (keyEvent.which === 13) {
        for (var i = 0; i < $scope.cards.length; i++) {
            if ($scope.cards[i]["title"].toLowerCase().indexOf(searchStr)!=-1 || $scope.cards[i]["desc"].toLowerCase().indexOf(searchStr)!=-1) {
                results.push($scope.cards[i]);
            }
        }
    }
    $scope.renCards = results;
  };

  $scope.deleteCard = function(hashKey, cards) {
    angular.forEach(cards, function(obj, index){
      if (obj.$$hashKey === hashKey) {
        cards.splice(index, 1);
        $scope.renCards = $scope.cards;
        return;
      };
    });

    localStorage.setItem('cards', JSON.stringify($scope.renCards, function (key, val) {
      if (key == '$$hashKey')
        return undefined;
      return val;
    }));
  };

  $scope.editTitle = function(prevTitle, hashkey) {
      $scope.hashkey = hashkey;
      $('.modal').openModal();
      $(".prev_title").val(prevTitle);
      $(".prev_title").attr("id", hashkey);
    };

    $scope.saveTitle = function() {
      angular.forEach($scope.cards, function(obj, index){
        if(obj.$$hashKey === $scope.hashkey)
          obj.title = $scope.newTitle;
      });

      $scope.renCards = $scope.cards;
      localStorage.setItem('cards', JSON.stringify($scope.renCards, function (key, val) {
         if (key == '$$hashKey') {
           return undefined;
         }
         return val;
      }));
    };

}]);
