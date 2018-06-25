var url = "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/Your Money/1.json";
url += '?' + $.param({
  'api-key': "8a14b3804439479bb94920652a67585a"
});
$.ajax({
  url: url,
  method: 'GET',
}).then(updatePage);



  function updatePage(NYTData) {
    // Get from the form the number of results to display
    // API doesn't have a "limit" parameter, so we have to do this ourselves
    var numArticles = 1;
  
    // Log the NYTData to console, where it will show up as an object
    console.log(NYTData);
    console.log("------------------------------------");
  
    // Loop through and build elements for the defined number of articles
      // Get specific article info for current index
      var article = NYTData.results[0];
  
      // Increase the articleCount (track article # - starting at 1)
      
  
      // Create the  list group to contain the articles and add the article content for each
      var $articleList = $("<p>");
      $articleList.addClass("list-group");
  
      // Add the newly created element to the DOM
      $("#NYT").append($articleList);
  
      // If the article has a headline, log and append to $articleList
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
  
      // If the article has a byline, log and append to $articleList
      var byline = article.byline;
  
      if (byline && byline.original) {
        console.log(byline.original);
        $articleListItem.append("<h5>" + byline.original + "</h5>");
      }
  
      // Log section, and append to document if exists
      var section = article.abstract;
      console.log(article.abstract);
      if (section) {
        $articleListItem.append("<h5>" + section + "</h5>");
      }
  
      // Log published date, and append to document if exists
      
  
      // Append and log url
      
  
      // Append the article
      $articleList.append($articleListItem);
    
  }
  
  // Function to empty out the articles
//   function clear() {
//     $("#article-section").empty();
//   }
  
//   // CLICK HANDLERS
//   // ==========================================================
  
//   // .on("click") function associated with the Search Button
//   $("#run-search").on("click", function(event) {
//     // This line allows us to take advantage of the HTML "submit" property
//     // This way we can hit enter on the keyboard and it registers the search
//     // (in addition to clicks). Prevents the page from reloading on form submit.
//     event.preventDefault();
  
//     // Empty the region associated with the articles
//     clear();
  
//     // Build the query URL for the ajax request to the NYT API
//     var queryURL = buildQueryURL();
  
//     // Make the AJAX request to the API - GETs the JSON data at the queryURL.
//     // The data then gets passed as an argument to the updatePage function
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(updatePage);
//   });
  
//   //  .on("click") function associated with the clear button
//   $("#clear-all").on("click", clear);
  