import { Controller } from 'specla/modules'

export default class TemplateController extends Controller {
  index (req, res) {
    res.send('hej')
  }
}
