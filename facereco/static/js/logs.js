var firebaseConfig = {
  apiKey: "AIzaSyD7H6ZxUcR0M9acTTrg7cyV0Dxu4C27cUU",
  authDomain: "security-sgp.firebaseapp.com",
  databaseURL: "https://security-sgp.firebaseio.com",
  projectId: "security-sgp",
  storageBucket: "security-sgp.appspot.com",
  messagingSenderId: "193607441095",
  appId: "1:193607441095:web:5d06e1014f9c33917efce2",
  measurementId: "G-EZK89HXM88"
};

firebase.initializeApp(firebaseConfig);
var rootRef = firebase
  .database()
  .ref()
  .child("dummy2");

rootRef.on("value", async function(snapshot) {
  let snap = JSON.stringify(snapshot);
  data_mess = JSON.parse(snap);

var searchField;
var date;
  $(document).ready(function() {
    $.ajaxSetup({ cache: false });
    $("#search").keyup(function() {
      $("#result").html("");
      $("#state").val("");
      date=$('#date').val()
      searchField = $("#search").val();
      var expression = new RegExp(searchField, "i");
      $.each(data_mess, function(key, value) {
        if (
          data_mess[key].name.search(expression) != -1 ||
          key.search(expression) != -1
        ) {
          $("#result").append(
            '<ul style="list-style-type:none">' +
              "<li>" +
              data_mess[key].name +
              "</li>" +
              "<span>" +" "+
              key +
              "</span>" +
              "</ul>"
          );
        }
      });
    });
      
      $("#result").on("click", "ul", function() {
        var click_text = $(this)
          .text()
          .split(" ");
        console.log(click_text[2]);
        $("#result").html("");
        
        $(location).attr('href',"logsOf?name="+click_text[0]+click_text[1]+"&"+"id="+click_text[2])
        //console.log(date)
      });
      $("#butt").click(function(){
        //console.log(searchField)
        $(location).attr('href',"logsOf?name="+searchField)
        //console.log(date)
      });
    
  });
});
