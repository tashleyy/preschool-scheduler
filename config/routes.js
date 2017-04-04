/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // ViewController routes

  'get /login': 'ViewController.login',
  
  'get /': 'ViewController.home',

  'get /home': 'ViewController.home',

  'get /addstudent': 'ViewController.addstudent',

  'get /rateschedules': 'ViewController.rateschedules',

  'get /addrateschedule': 'ViewController.addrateschedule',

  'get /afterschoolactivities': 'ViewController.afterschoolactivities',

  'get /addafterschoolactivity': 'ViewController.addafterschoolactivity',

  'get /students': 'ViewController.students',

  'get /students/:studentId': 'ViewController.student',

  'get /addtimeperiod/:studentId': 'ViewController.addtimeperiod',

  'get /income': 'ViewController.income',

  // UserController routes

  'post /user/login': 'UserController.login',

  'post /user/logout': 'UserController.logout',

  // RateScheduleController routes

  'post /rateschedule/create': 'RateScheduleController.create',

  'get /rateschedule/find': 'RateScheduleController.find',

  'get /rateschedule/findone': 'RateScheduleController.findOne',

  'put /rateschedule/update': 'RateScheduleController.update',

  'delete /rateschedule/destroy': 'RateScheduleController.destroy',

  // AfterSchoolActivityController routes

  'post /afterschoolactivity/create': 'AfterSchoolActivityController.create',

  'get /afterschoolactivity/find': 'AfterSchoolActivityController.find',

  'get /afterschoolactivity/findone': 'AfterSchoolActivityController.findOne',

  'put /afterschoolactivity/update': 'AfterSchoolActivityController.update',

  'delete /afterschoolactivity/destroy': 'AfterSchoolActivityController.destroy',

  // StudentController routes

  'post /student/create': 'StudentController.create',

  'get /student/find': 'StudentController.find',

  'get /student/findone': 'StudentController.findOne',

  'put /student/update': 'StudentController.update',

  'delete /student/destroy': 'StudentController.destroy',

  // StudentController routes

  'post /timeperiod/create': 'TimePeriodController.create',

  'get /timeperiod/find': 'TimePeriodController.find',

  'get /timeperiod/findone': 'TimePeriodController.findOne',

  'put /timeperiod/update': 'TimePeriodController.update',

  'delete /timeperiod/destroy': 'TimePeriodController.destroy',


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
