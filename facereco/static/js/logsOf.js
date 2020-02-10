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

$(document).ready(function() {
  var id, name;
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams);
  if (urlParams.has("name") & urlParams.has("id")) {
    name = urlParams.get("name");
    id = urlParams.get("id");
    console.log("name,id");
    $("#search").append(name);
    var rootRef = firebase
      .database()
      .ref()
      .child("dummy/logs/" + id + "/");

    rootRef.on("value", async function(snapshot) {
      let snap = JSON.stringify(snapshot);
      data = JSON.parse(snap);
      console.log(data)
      $('#details').append(data['name'])
    });
  } else if (urlParams.has("name") & !urlParams.has("id")) {
    name = urlParams.get("name");
    $("#search").append("Result for "+name);
    var rootRef = firebase
      .database()
      .ref()
      .child("dummy2");
    rootRef.on("value", async function(snapshot) {
      let snap = JSON.stringify(snapshot);
      data_mess = JSON.parse(snap);
      searchField = name
      console.log("Search: "+searchField)
      var expression = new RegExp(searchField, "i");
      console.log(expression);
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
              "<span>" +
              " " +
              key +
              "</span>" +
              "</ul>"
          );
        }
      });
      $("#result").on("click", "ul", function() {
        var click_text = $(this)
          .text()
          .split(" ");
        console.log(click_text[2]);
        $("#result").html("");
        
        $(location).attr('href',"logsOf?name="+click_text[0]+click_text[1]+"&"+"id="+click_text[2])
      });
    });
  }
});
