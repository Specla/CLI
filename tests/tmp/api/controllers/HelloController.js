const { db } = Specla.modules;

class HelloController {

  index(req, res){
    res.render('hello');
  }

}

module.exports = HelloController;
