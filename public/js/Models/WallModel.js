/**
 * Created by ergo on 4/9/2015.
 */
var WallModel = Backbone.Model.extend({
   urlRoot: "/Wallz",
    default: {
        wallpaper: '',
        audio: ''
    }
});