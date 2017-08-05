var Minesweeper = new Minesweeper();

$(document).ready(function() {
    Minesweeper.GenerateBoard(10, 4);
    
    ko.applyBindings(Minesweeper);
});

function Tile(mine, number, uncovered, flag) {
    var self = this;
    
    self.Mine = ko.observable(mine);
    self.Number = ko.observable(number);
    self.Uncovered = ko.observable(uncovered);
    self.Flag = ko.observable(flag);
    
    self.TileClicked = (data) => {
        if(!self.Uncovered()) {
            self.Uncovered(true);
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
    self.Mines = ko.observable();
    self.GameOver = ko.observable(true);
    
    self.GenerateBoard = (size, numMines) => {
        Minesweeper.GameOver(false);
        self.Size(size);
        self.Mines(numMines);
        for(var i = 0;i<size;i++){
            var tileRow = new TileRow();
            for(var j = 0;j<size;j++){
                tileRow.Tiles.push(new Tile(false, 0, false, false));
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
    }
    
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