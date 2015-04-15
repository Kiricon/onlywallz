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
        this.$('#video').remove();
        this.$el.css('background-image', 'url('+this.model.get('wallpaper')+')');
        var url = this.model.get('audio').match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        this.$('#videocontainer').append('<iframe id="video" width="640" height="360" src="https://www.youtube.com/embed/'+url[1]+'?version=3&amp;iv_load_policy=3&amp;rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=0" frameborder=0 allowfullscreen></iframe>');
        this.$('#loading').remove();
    },
    newwall: function(){
        this.$('#videocontainer').append('<div id="loading">LOADING.....</div>');
        this.model.fetch();
    }
});

var NewWallView = Backbone.View.extend({

    el: '#wallsubmit',
    model: new WallModel,
    events: {
        'click #submit': 'submit',
        'click #showsubmit': 'display'
    },
    submit: function(){
        this.model.set({
           wallpaper: this.$('.wallpaper').val(),
            audio: this.$('.audio').val()
        });

        this.model.save();
        this.$('#submitform').css('display', 'none');

    },
    display: function(){
        this.$('#submitform').toggle();
    }


});