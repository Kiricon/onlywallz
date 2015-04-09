/**
 * Created by ergo on 4/9/2015.
 */
var WallView = Backbone.View.extend({
   el: '#wall',
    events: {
        "click #newwall": "newwall"
    },
    initialize: function(){
        this.model.fetch();
        this.model.on('change', this.render, this);
    },
    render: function(){
        this.$el.css('background-image', 'url('+this.model.get('wallpaper')+')');
    },
    newwall: function(){
        this.model.fetch();
    }
});