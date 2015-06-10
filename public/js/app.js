var WallModel=Backbone.Model.extend({urlRoot:"/Wallz","default":{wallpaper:"",audio:""}}),NewWallView=Backbone.View.extend({el:"#wallsubmit",model:new WallModel,events:{"click #submit":"submit","click #showsubmit":"display","keyup .audio":"youvalidate","input .audio":"youvalidate","keyup .wallpaper":"wallvalidate","input .wallpaper":"wallvalidate"},submit:function(){var match=this.$(".audio").val().match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/),url=this.$(".wallpaper").val();match&&url.match(/\.(jpeg|jpg|gif|png)$/)?(this.model.set({wallpaper:this.$(".wallpaper").val(),audio:this.$(".audio").val()}),this.model.save(null,{success:function(){$("#submitform").css("display","none"),$(".success").fadeIn(400).delay(3e3).fadeOut(400)},error:function(){alert("Something went wrong... Reload the page and try again.")}})):this.$("input").css("border","solid 4px red")},display:function(){this.$("#submitform").toggle()},youvalidate:function(){var match=this.$(".audio").val().match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/);match?(this.$(".audio").css("border","solid 4px green"),WallOutput.model.set("audio",this.$(".audio").val()),WallOutput.render()):this.$(".audio").css("border","solid 4px grey")},wallvalidate:function(){var url=this.$(".wallpaper").val();url.match(/\.(jpeg|jpg|gif|png)$/)?(this.$(".wallpaper").css("border","solid 4px green"),WallOutput.model.set("wallpaper",url),WallOutput.render()):this.$(".wallpaper").css("border","solid 4px grey")}}),WallView=Backbone.View.extend({el:"#wall",model:new WallModel,events:{"click #newwall":"newwall"},initialize:function(){this.model.on("sync",this.render,this)},render:function(){function onPlayerReady(event){event.target.playVideo()}function onPlayerStateChange(event){0===event.data&&WallOutput.newwall()}this.$("iframe").remove(),this.$el.css("background-image","url("+this.model.get("wallpaper")+")");var url=this.model.get("audio").match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);this.$("#videocontainer").append('<div id="player"></div>');var player;player=new YT.Player("player",{height:"360",width:"640",videoId:url[1],events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange}}),this.$el.css("opacity","1")},newwall:function(){this.$el.css("opacity","0"),this.model.fetch()}}),WallOutput=new WallView,WallSubmit=new NewWallView;