module.exports = {
  'create': function(req, res) {
    var params = req.params.all();
    if (!params.name || !params.cost) {
      return res.badRequest();
    }
    AfterSchoolActivity.create({
      name: params.name, 
      cost: params.cost
    }).exec(function(err, afterSchoolActivity) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(afterSchoolActivity);
    });
  },

  'find': function(req, res) {
    AfterSchoolActivity.find().exec(function(err, afterSchoolActivities) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(afterSchoolActivities);
    })
  },

  'findOne': function(req, res) {
    var params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    AfterSchoolActivity.findOne({id: params.id}).exec(function(err, afterSchoolActivity) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(afterSchoolActivity);
    });
  },

  'update': function(req, res) {
    var params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }
    var id = params.id;
    delete params.id;
    AfterSchoolActivity.update({id: id}, params)
      .exec(function(err, afterSchoolActivities) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      var afterSchoolActivity = afterSchoolActivities[0];
      if (!afterSchoolActivity) {
        return res.notFound();
      }
      return res.ok(afterSchoolActivity);
    });
  },

  'destroy': function(req, res) {
    var params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    AfterSchoolActivity.destroy({id: params.id}).exec(function(err) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok();
    });
  }
}