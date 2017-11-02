/**
 * This is going to be provider specific
 */
import { db } from 'specla/provider'

export default class TemplateModule extends db.Model {
  /**
   * Name of the table or collection which the model represents
   * @type {String}
   */
  static name = 'template_module'

  /**
   * The schema for the representation of the data
   * @type {Object}
   */
  static schema = {}

}
