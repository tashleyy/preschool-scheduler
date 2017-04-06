module.exports = {
  create(req, res) {
    const params = req.params.all();
    if (!params.name || !params.cost || !params.monday || !params.tuesday
        || !params.wednesday || !params.thursday || !params.friday
        || isNaN(params.cost)) {
      return res.badRequest();
    }

    AfterSchoolActivity.create({
      name: params.name,
      cost: params.cost,
      monday: params.monday,
      tuesday: params.tuesday,
      wednesday: params.wednesday,
      thursday: params.thursday,
      friday: params.friday,
    }).exec((err, afterSchoolActivity) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(afterSchoolActivity);
    });
  },

  find(req, res) {
    AfterSchoolActivity.find().exec((err, afterSchoolActivities) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(afterSchoolActivities);
    });
  },

  findOne(req, res) {
    const params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    AfterSchoolActivity.findOne({ id: params.id }).exec((err, afterSchoolActivity) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      if (!afterSchoolActivity) {
        return res.notFound();
      }
      return res.ok(afterSchoolActivity);
    });
  },

  update(req, res) {
    const params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    const id = params.id;
    delete params.id;
    AfterSchoolActivity.update({ id }, params)
      .exec((err, afterSchoolActivities) => {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }
        if (!afterSchoolActivities || afterSchoolActivities.length === 0) {
          return res.notFound();
        }
        const afterSchoolActivity = afterSchoolActivities[0];
        return res.ok(afterSchoolActivity);
      });
  },

  destroy(req, res) {
    const params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    AfterSchoolActivity.destroy({ id: params.id }).exec((err) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok();
    });
  },
};
