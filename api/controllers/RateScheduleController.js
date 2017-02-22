module.exports = {
  'create': function(req, res) {
    var params = req.params.all();
    if (!params.name || !params.cost || !params.monday || !params.tuesday
      || !params.wednesday || !params.thursday || !params.friday
      || !params.startMonth || !params.endMonth || isNaN(params.cost)) {
      return res.badRequest();
    }
    RateSchedule.create({
      name: params.name, 
      cost: params.cost,
      monday: params.monday,
      tuesday: params.tuesday,
      wednesday: params.wednesday,
      thursday: params.thursday,
      friday: params.friday,
      startMonth: params.startMonth,
      endMonth: params.endMonth
    }).exec(function(err, rateSchedule) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(rateSchedule);
    });
  },

  'find': function(req, res) {
    RateSchedule.find().exec(function(err, rateSchedules) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(rateSchedules);
    });
  },

  'findOne': function(req, res) {
    var params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    RateSchedule.findOne({id: params.id}).exec(function(err, rateSchedule) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(rateSchedule);
    });
  },

  'update': function(req, res) {
    var params = req.params.all();
    if (!params.id || (params.cost && isNaN(params.cost))) {
      return res.badRequest();
    }
    var id = params.id;
    delete params.id;

    RateSchedule.update({id: id}, params)
      .exec(function(err, rateSchedules) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      var rateSchedule = rateSchedules[0];
      if (!rateSchedule) {
        return res.notFound();
      }
      return res.ok(rateSchedule);
    });
  },

  'destroy': function(req, res) {
    var params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    RateSchedule.destroy({id: params.id}).exec(function(err) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok();
    });
  }
}