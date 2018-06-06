
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.afterSave("GameScore", function(request) {
  console.log('###-----Begin-----###');
  console.log(request);
});
