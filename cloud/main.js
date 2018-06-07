
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.afterSave("GameScore", function(request) {
  console.log('###-----Begin-----###');
  console.log(request);
});

Parse.Cloud.afterSave("Messages", function(request){
  var messageText = request.object.get('msg');
  var usersReceived = request.object.get('tos');
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.containedIn('user', usersReceived);
  //pushQuery.notEqualTo('user', request.user);
  Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: {
      alert: "New message: " + messageText
    }
  }, { useMasterKey: true}).then(() => {
      // Push was successful
      console.log('weeee!');
  }, (e) => {
      console.log(e);
  });
});
