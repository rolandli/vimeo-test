var nVideo=0;
var lastVideoFlag=false;

$( document ).ready(function() {
	//loads first 3 videos
	init();
	//scroll to top
	document.body.scrollTop = document.documentElement.scrollTop = 0;
});
function init()
{
	for(var i = 0; i<3; i++){
	  $.get( "datagetter.php?q="+i, function( data ) {
	  printData(data);
	  nVideo++
      });
	}
	
	//endless scroll
	
	$(window).scroll(function()
	{
      if($(window).scrollTop() == $(document).height() - $(window).height())
      {
      	nVideo++;
        $.ajax({
        url: "datagetter.php?q="+nVideo,
        success: function(data){
          if(JSON.parse(data) != null)
          {	
            printData(data)
          }else
          {
          	if(!lastVideoFlag){
          	  lastVideoFlag=true;
              $(".content").append('<center>No more posts to show.</center>');
          	}
          }
        }
      });
    }
});


}
function printData(data)
{
	var json = JSON.parse(data);
	$( ".content" ).append( "id :" +JSON.parse(data)["id"]+ "<br>");
	$( ".content" ).append( "Title :" +JSON.parse(data)["title"]+ "<br>");
	$( ".content" ).append( 'Click the thumbnail to view the video:'+'<div class="video" video_service = "1" video_player_url=http://player.vimeo.com/video/'+json["id"]+'?autoplay=1&rel=0&wmode=opaque&byline=0&portrait=0&badge=0'+' video_id='+ json["id"] +' video_service="1">   <img src='+ json["thumbnail_large"]+ ' /> </div>').ready;
	videoLoader();
	

}
function videoLoader()
{
$('.video').each(function() {	
    var videoPlayerUrl = $(this).attr('video_player_url');
    var videoId = $(this).attr('video_id');
    var videoService = $(this).attr('video_service');

    var videoSlideEl = $(this);
	$(this).click(function() {
	  $(this).children('img').remove();
	  if(videoSlideEl.find('iframe').length == 0) {
	    videoSlideEl.append('<iframe class="video-player" src="' + videoPlayerUrl + '" frameborder="0" style="width:' + '600px' + '; height:' + '400px' + ';"></iframe>');
      }
    });

  });
}