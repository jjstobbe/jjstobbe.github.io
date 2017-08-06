var Minesweeper = new Minesweeper();

$(document).ready(function() {
    Minesweeper.GenerateBoard(16, 40);
    
    ko.applyBindings(Minesweeper);
});

function Tile(x, y, mine, number, uncovered, flag) {
    var self = this;
    
    self.X = ko.observable(x);
    self.Y = ko.observable(y);
    self.Mine = ko.observable(mine);
    self.Number = ko.observable(number);
    self.Uncovered = ko.observable(uncovered);
    self.Flag = ko.observable(flag);
    
    self.TileClicked = (data) => {
        if(!self.Uncovered()) {
            self.Uncovered(true);
            self.Flag(false);
            
            if($(window).width() > $(window).height()){
                $('.Tile span').css('line-height', 100.0/Minesweeper.Size() -1 + 'vh');
            }else {
                $('.Tile span').css('line-height', 100.0/Minesweeper.Size() -1 + 'vw');
            }
            
            if(self.Mine()){
                Minesweeper.Status(1);
            }else{
                Minesweeper.NumUncovered(Minesweeper.NumUncovered()+1);
            }
            
            if(self.Number() == 0){
                for(var k = self.X() - 1;k < self.X()+2;k++){
                    for(var l = self.Y()-1;l < self.Y()+2;l++){
                      if ( k > -1 && l > -1 && k < Minesweeper.Size() && l < Minesweeper.Size()){
                        Minesweeper.TileRows()[k].Tiles()[l].TileClicked();
                      }
                    }
                }
            }
        }
    }
        
    self.TileRightClicked = (data) => {
        if(!self.Uncovered()) {
            self.Flag(!self.Flag());
        }
    }
}

function TileRow() {
    var self = this;
    self.Tiles = ko.observableArray([]);
}

function Minesweeper() {
    var self = this;
    
    self.TileRows = ko.observableArray([]);
    self.Size = ko.observable(0);    
    self.Mines = ko.observable(0);
    self.Status = ko.observable(0); // 4 statuses - playing, lost, won, change diff.
    self.NumUncovered = ko.observable(0);
    
    self.NumUncovered.subscribe((num) => {
        if(num >= (self.Size()*self.Size()) - self.Mines()){
            self.Status(2);
        }
    });
    
    self.Status.subscribe((value) => {
        if(value == 0) {
            self.GenerateBoard(self.Size() || 10, self.Mines() || 15);
        }
    });
    
    window.onresize = () => {   
        self.recalcSize();
    };
    
    self.recalcSize = () => {
        if($(window).width() > $(window).height()){
            $('.Tile').css('width', 100.0/self.Size() -1+'vh');
            $('.Tile').css('height', 100.0/self.Size() -1+'vh');
            $('.Tile span').css('line-height', 100.0/self.Size() -1 + 'vh');
        }else {
            $('.Tile').css('width', 100.0/self.Size() -1+'vw');
            $('.Tile').css('height', 100.0/self.Size() -1+'vw');
            $('.Tile span').css('line-height', 100.0/self.Size() -1 + 'vw');
        }
    };
    
    self.GenerateBoard = (size, numMines) => {
        self.TileRows.removeAll();
        self.NumUncovered(0);
        Minesweeper.Status(0);
        
        self.Size(size);
        self.Mines(numMines);
        
        for(var i = 0;i<size;i++){
            var tileRow = new TileRow();
            for(var j = 0;j<size;j++){
                tileRow.Tiles.push(new Tile(i, j, false, 0, false, false));
            }
            self.TileRows.push(tileRow);
        }
        
        // Generate the mine locations
        for(i = 0;i<numMines;i++){
            var random = {X: Math.floor(Math.random()*size), Y: Math.floor(Math.random()*size)};
            self.TileRows()[random.X].Tiles()[random.Y].Mine(true);
        }

        for(var i = 0;i<size;i++){
            for(var j = 0;j<size;j++){
                if(self.TileRows()[i].Tiles()[j].Mine()){
                    self.AddNumbers(i, j);
                }
            }
        }
        
        var found = 0;
        while(found != -1 && found < 40) {
            random = {X: Math.floor(Math.random()*size), Y: Math.floor(Math.random()*size)};
            
            var foundTile = self.TileRows()[random.X].Tiles()[random.Y];
            if(foundTile.Number() == 0){
                foundTile.TileClicked();
                found = -1;
            }else {
                found++;
            }
        }
        
        self.recalcSize();
    };
    
    self.AddNumbers = (i, j) => {
        for(var k = i - 1;k < i+2;k++){
            for(var l = j-1;l < j+2;l++){
              if ( k > -1 && l > -1 && k < self.Size() && l < self.Size()){
                  self.TileRows()[k].Tiles()[l].Number(self.TileRows()[k].Tiles()[l].Number()+1);
              }
            }
         }
    };
    
    // Function to get the data for the leaderboard
    self.GetLeaderboard = () => {
        self.Leaderboard.removeAll();
        
        /*
        ajax('GET', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/Minesweeper', null, (data) => {
            for(var i = 0; i < data.length; i++){
                var event = new Event(data[i]._id, data[i].Content, data[i].Date);
                self.EventList.push(event);
                
                self.SelectedDate(getCalendarDate());
                if(data[i].Date == self.SelectedDate()){
                    self.FilteredEvents.push(event);
                }
            }
        });
        */
    };
}

function ajax(type, url, data, successFunction) {
    $.ajax
    ({
      type: type,
      url: url,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: data,
      headers: {
        "Authorization": 'Kinvey ' + document.cookie.substring(document.cookie.indexOf('=')+1),
          "X-Kinvey-API-Version": '3',
          
      },success: (data) => {
          successFunction(data);
      },error: (data) => {
          if(data.status == 400){
              window.location.href = 'login';
          }
      }
    });
}