import Ember from 'ember'
const {Router} = Ember

import config from './config/environment'

const MyRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

MyRouter.map(function () {
  this.route('demo', {path: '/'})
})

export default MyRouter
