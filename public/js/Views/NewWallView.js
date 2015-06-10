var NewWallView = Backbone.View.extend({

    el: '#wallsubmit',
    model: new WallModel,
    events: {
        'click #submit': 'submit',
        'click #showsubmit': 'display',
        'keyup .audio': 'youvalidate',
        'input .audio': 'youvalidate',
        'keyup .wallpaper': 'wallvalidate',
        'input .wallpaper': 'wallvalidate'
    },
    submit: function(){
        var match = this.$('.audio').val().match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/);
        var url = this.$('.wallpaper').val();
        if(match && url.match(/\.(jpeg|jpg|gif|png)$/)) {
            this.model.set({
                wallpaper: this.$('.wallpaper').val(),
                audio: this.$('.audio').val()
            });
            this.model.save(null, {
                success: function(){
                    $('#submitform').css('display', 'none');
                    $('.success').fadeIn(400).delay(3000).fadeOut(400);
                },
                error: function(){
                    alert('Something went wrong... Reload the page and try again.')
                }
            });

        } else {
            this.$('input').css('border', 'solid 4px red')
        }

    },
    display: function(){
        this.$('#submitform').toggle();
    },
    youvalidate: function(){
        var match = this.$('.audio').val().match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/);
        if(match){
            this.$('.audio').css('border', 'solid 4px green');
            WallOutput.model.set("audio", this.$('.audio').val());
            WallOutput.render();
        }else{
            this.$('.audio').css('border', 'solid 4px grey');
        }
    },
    wallvalidate: function(){
        var url = this.$('.wallpaper').val();
        if(url.match(/\.(jpeg|jpg|gif|png)$/)){
            this.$('.wallpaper').css('border', 'solid 4px green');
            WallOutput.model.set("wallpaper", url);
            WallOutput.render();

        }else {
            this.$('.wallpaper').css('border', 'solid 4px grey');
        }
    }


});