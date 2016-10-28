const { Model } = Specla.modules;

class User extends Model {

  schema(){
    return {
      name: String,
      age: Number
    }
  }

}

module.exports = User;
