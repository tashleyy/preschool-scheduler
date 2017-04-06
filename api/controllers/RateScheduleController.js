module.exports = {
  create(req, res) {
    const params = req.params.all();
    if (!params.name || !params.cost || !params.monday || !params.tuesday
      || !params.wednesday || !params.thursday || !params.friday
      || isNaN(params.cost)) {
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
    }).exec((err, rateSchedule) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(rateSchedule);
    });
  },

  find(req, res) {
    RateSchedule.find().exec((err, rateSchedules) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(rateSchedules);
    });
  },

  findOne(req, res) {
    const params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    RateSchedule.findOne({ id: params.id }).exec((err, rateSchedule) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      if (!rateSchedule) {
        return res.notFound();
      }
      return res.ok(rateSchedule);
    });
  },

  update(req, res) {
    const params = req.params.all();
    if (!params.id || (params.cost && isNaN(params.cost))) {
      return res.badRequest();
    }

    const id = params.id;
    delete params.id;
    RateSchedule.update({ id }, params)
      .exec((err, rateSchedules) => {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }
        if (!rateSchedules || rateSchedules.length === 0) {
          return res.notFound();
        }
        const rateSchedule = rateSchedules[0];
        return res.ok(rateSchedule);
      });
  },

  destroy(req, res) {
    const params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    RateSchedule.destroy({ id: params.id }).exec((err) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok();
    });
  },
};
