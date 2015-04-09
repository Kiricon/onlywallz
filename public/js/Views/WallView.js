/**
 * Created by ergo on 4/9/2015.
 */
var WallView = Backbone.View.extend({
   el: '#wall',
    initialize: function(){
        this.model.fetch();
        this.model.on('change', this.render, this);
    },
    render: function(){
        this.$el.css('background', 'url('+this.model.get('wallpaper')+')');
    }
});