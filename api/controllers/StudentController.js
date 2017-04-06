module.exports = {
  create(req, res) {
    const params = req.params.all();
    if (!params.name || !params.birthday || !params.parent1 || !params.parentPhone1
    || !params.physician || !params.physicianPhone) {
      return res.badRequest();
    }

    Student.create({
      name: params.name,
      birthday: params.birthday,
      parent1: params.parent1,
      parentPhone1: params.parentPhone1,
      parent2: params.parent2,
      parentPhone2: params.parentPhone2,
      physician: params.physician,
      physicianPhone: params.physicianPhone,
    }).exec((err, student) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(student);
    });
  },

  find(req, res) {
    Student.find().populate('timePeriods').exec((err, students) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(students);
    });
  },

  findOne(req, res) {
    const params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    Student.findOne({ id: params.id }).populate('timePeriods').exec((err, student) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      if (!student) {
        return res.notFound();
      }
      return res.ok(student);
    });
  },

  update(req, res) {
    const params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    const id = params.id;
    delete params.id;
    Student.update({ id }, params)
      .exec((err, students) => {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }
        if (!students || students.length === 0) {
          return res.notFound();
        }
        const student = students[0];
        return res.ok(student);
      });
  },

  destroy(req, res) {
    const params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    Student.findOne({ id: params.id }).populate('timePeriods').exec((err, student) => {
      const tps = [];
      for (let i = 0; i < student.timePeriods.length; i++) {
        tps.push(student.timePeriods[i].id);
      }
      TimePeriod.destroy({ id: tps }).exec((err2) => {
        if (err2) {
          sails.log.error(err2);
          return res.serverError();
        }
        Student.destroy({ id: params.id }).exec((err3) => {
          if (err3) {
            sails.log.error(err3);
            return res.serverError();
          }
          return res.ok();
        });
      });
    });
  },
};
