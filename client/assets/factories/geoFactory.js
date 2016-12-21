app.factory('geoFactory',['$http',function($http){
  var apiKeyTexasAM = "79f75c2a0b3e4c55ac77af0b27c4c379"; //add API key
  var apiKeyZipcodeAPI = "js-Tpcw8udTEtPtcsbhWczJxWXEkFjryeysELYMfbFTFvmSXyaUKKDiGAW1ggsPu1i8"; //add API key

  function SLL(){
    this.head = null;
    this.insert = function(val){
      var sort = new node(val);
      var didInsert = false;
      if (!this.head)
        this.head = sort;
      else {
        if (sort.val.distance < this.head.val.distance){
          sort.next = this.head;
          this.head = sort;
        } else {
          var current = this.head;

          while (current.next){
            if (sort.val.distance > current.val.distance){
              current = current.next;
            } else {
              sort.next = current.next;
              current.next = sort;
              didInsert = true;
              break;
            }
          }
          if (!didInsert){
            current.next = sort;
          }
        }


      }
    };

    this.toArray = function(){
      if (this.head){
        var current = this.head;
        var array = [];
        while (current){
          array.push(current.val);
          current = current.next;
        }

        return array;
      }
    };

    this.toStringList = function(){
      if (this.head){
        var current = this.head.next;
        var string = `'${this.head.val.zip_code}'`
        while (current){
          string += `,'${current.val.zip_code}'`;
          current = current.next;
        }

        return string;
      }
    };

    this.toDictionary = function(){
      if(this.head){
        var dict = {};
        var current = this.head.next;
        dict[this.head.val.zip_code] = this.head.val.distance;
        while (current){
          dict[current.val.zip_code] = current.val.distance;
          current = current.next;
        }

        return dict;
      }
    };

  }

  function node(val){
    this.val = val;
    this.next = null;
  }

  return {
    getCurrentZip: function(lat, long, callback){
      var url = "http://geoservices.tamu.edu/Services/ReverseGeocoding/WebService/v04_01/rest/default.aspx?"
      url += `lat=${lat}&lon=${long}&apikey=${apiKeyTexasAM}&format=json&notStore=false&version=4.01`
      $http.get(url).then(function(res){
        callback(res.data.StreetAddresses[0].Zip);
      });
    },

    getNearbyZips: function(zip, callback){
      var radius = 50;
      var url = "https://www.zipcodeapi.com/rest/";
      url += `${apiKeyZipcodeAPI}/radius.json/${zip}/${radius}/mile`;
      $http.get(url).then(function(res){
        var list = new SLL();

        for (var i = 0; i < res.data.zip_codes.length; i++){
          list.insert(res.data.zip_codes[i]);
        }

        var zipList = list.toStringList();
        var distances = list.toDictionary();

        callback(zipList, distances);
      })
    },

    distBetween: function(job, callback){
      var url = "https://www.zipcodeapi.com/rest/";
      url += `${apiKeyZipcodeAPI}/distance.json/${job.p_zip}/${job.d_zip}/mile`;
      $http.get(url).then(function(res){
        callback(res.distance);
      })
    }
  }
}]);
