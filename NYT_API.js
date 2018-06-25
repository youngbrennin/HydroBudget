var url = "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/Your Money/1.json";
url += '?' + $.param({
  'api-key': "8a14b3804439479bb94920652a67585a"
});
$.ajax({
  url: url,
  method: 'GET',
}).then(updatePage);



  function updatePage(NYTData) {
   
    var numArticles = 1;
    console.log(NYTData);
    console.log("------------------------------------");
  
      var article = NYTData.results[0];
      
        var $articleList = $("<p>");
      $articleList.addClass("list-group");
  
      $("#NYT").append($articleList);
  
      var headline = article.headline;
      var $articleListItem = $("<p class='list-group-item articleHeadline'>");
  
      if (headline && headline.main) {
        console.log(headline.main);
        $articleListItem.append(
          "<span class='label label-primary'>" +
            articleCount +
            "</span>" +
            "<strong> " +
            headline.main +
            "</strong>"
        );
      }
  
      var byline = article.byline;
  
      if (byline && byline.original) {
        console.log(byline.original);
        $articleListItem.append("<h5>" + byline.original + "</h5>");
      }
  
      var section = article.abstract;
      var titleName = article.title;
      var linkName = article.url;
      console.log(article.abstract);
      console.log(article.title);
      console.log(article.url);
      if (section) {
        $articleListItem.append("<h5>" + titleName + "</h5>");
        $articleListItem.append("<h6>" + section + "</h6>");
        $articleListItem.append("<h6><a href='https://www.nytimes.com/2018/06/22/your-money/fiduciary-rule-dies.html' target=_blank>" + linkName + "</a></h6>");
      }
  
      $articleList.append($articleListItem);
    
  }
