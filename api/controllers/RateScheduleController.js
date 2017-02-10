module.exports = {
  'submitRateSchedule': function(req, res) {
    var params = req.params.all();
    if (!params.name)
    {
      res.view('home');
    }
    RateSchedule.create(params);
    return res.ok();
  }
}