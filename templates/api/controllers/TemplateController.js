import { Controller } from 'specla/modules'

export default class TemplateController extends Controller {

  constructor (req, res, next) {
    next()
  }

  index (req, res) {
    res.send('hej')
  }

}
