var Minesweeper = new Minesweeper();

$(document).ready(function() {
    Minesweeper.GenerateBoard(10, 15);
    
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
            Minesweeper.recalcSize();
            if(self.Number() == 0){
                for(var k = self.X() - 1;k < self.X()+2;k++){
                    for(var l = self.Y()-1;l < self.Y()+2;l++){
                      if ( k > -1 && l > -1 && k < Minesweeper.Size() && l < Minesweeper.Size()){
                        Minesweeper.TileRows()[k].Tiles()[l].TileClicked();
                      }
                    }
                }
            }
            
            self.Flag(false);
            
            if(self.Mine()){
                Minesweeper.GameOver(true);
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
    self.Size = ko.observable();    
    
    self.Size.subscribe((newSize) => {
        self.recalcSize();
    });
    
    window.onresize = () => {   
        self.recalcSize();
    };
    
    self.recalcSize = () => {
        if($(window).width() > $(window).height()){
            $('.Tile').css('width', self.Size()-2+'vh');
            $('.Tile').css('height', self.Size()-2+'vh');
            $('.Tile span').css('line-height', self.Size()-2+'vh');
        }else {
            $('.Tile').css('width', self.Size()-2+'vw');
            $('.Tile').css('height', self.Size()-2+'vw');
            $('.Tile span').css('line-height', self.Size()-2+'vw');
        }
    };
    
    self.Mines = ko.observable();
    self.GameOver = ko.observable(false);
    
    self.GameOver.subscribe((value) => {
        if(!value) {
            self.GenerateBoard(self.Size() || 10, self.Mines() || 15);
        }
    });
    
    self.GenerateBoard = (size, numMines) => {
        self.TileRows.removeAll();
        Minesweeper.GameOver(false);
        
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