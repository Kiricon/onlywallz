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
       // this.model.fetch();
        this.model.on('sync', this.render, this);
    },
    render: function(){
        this.$('iframe').remove();
        this.$el.css('background-image', 'url('+this.model.get('wallpaper')+')');
        var url = this.model.get('audio').match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        //this.$('#videocontainer').append('<iframe id="video" width="640" height="360" src="https://www.youtube.com/embed/'+url[1]+'?version=3&amp;iv_load_policy=3&amp;rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1" frameborder=0 allowfullscreen></iframe>');
        this.$('#videocontainer').append('<div id="player"></div>');
        var player;
            player = new YT.Player('player', {
                height: '360',
                width: '640',
                videoId: url[1],
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });

        // autoplay video
        function onPlayerReady(event) {
            event.target.playVideo();
        }

        // when video ends
        function onPlayerStateChange(event) {
            if(event.data === 0) {
                WallOutput.newwall();
            }
        }
        //this.$('#loading').remove();
        this.$el.css('opacity', '1');
    },
    newwall: function(){
       // this.$('#videocontainer').append('<div id="loading">LOADING.....</div>');
        this.$el.css('opacity', '0');
        this.model.fetch();
    }
});