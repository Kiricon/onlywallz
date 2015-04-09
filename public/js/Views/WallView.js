/**
 * Created by ergo on 4/9/2015.
 */
var WallView = Backbone.View.extend({
   el: '#wall',
    model: new WallModel,
    events: {
        "click #newwall": "newwall"
    },
    initialize: function(){
        this.model.fetch();
        this.model.on('sync', this.render, this);
    },
    render: function(){
        this.$el.css('background-image', 'url('+this.model.get('wallpaper')+')');
        this.$('#loading').remove();
    },
    newwall: function(){
        this.$el.append('<div id="loading">LOADING.....</div>');
        this.model.fetch();
    }
});