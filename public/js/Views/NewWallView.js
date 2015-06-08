var NewWallView = Backbone.View.extend({

    el: '#wallsubmit',
    model: new WallModel,
    events: {
        'click #submit': 'submit',
        'click #showsubmit': 'display',
        'keyup .audio': 'youvalidate',
        'blur .audio': 'youvalidate',
        'keyup .wallpaper': 'wallvalidate',
        'blur .wallpaper': 'wallvalidate'
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
    },
    youvalidate: function(){
        var match = this.$('.audio').val().match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/);
        if(match){
            this.$('.audio').css('border', 'solid 2px green');
        }else{
            this.$('.audio').css('border', 'solid 2px grey');
        }
    },
    wallvalidate: function(){
        var image = new Image();
        image.src = this.$('.wallpaper').val();
        if(image.width){
            this.$('.wallpaper').css('border', 'solid 2px green');
        }else {
            this.$('.wallpaper').css('border', 'solid 2px grey');
        }
    }


});