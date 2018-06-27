var arr1 = ['investments', '"wealth investment"', '"trust fund"', 'money'];
var arr2 = ['"trust fund"', 'alcohol', 'money'];
var arr3 = ['kale chips', '"trust fund"', 'drugs', 'poverty', 'alcohol', 'money'];
var searchTerm;

function displayNews(salBudDiff) {
  if (salBudDiff > 500){
    searchTerm = arr1[Math.floor(Math.random() * arr1.length)];
  } else if (salBudDiff > 200){
    searchTerm = arr2[Math.floor(Math.random() * arr2length)];
  } else {
    searchTerm = arr3[Math.floor(Math.random() * arr3.length)];
  }

console.log(searchTerm);


  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  url += '?' + $.param({
    'api-key': "8a14b3804439479bb94920652a67585a",
    'q': searchTerm
  });
  $.ajax({
    url: url,
    method: 'GET',
  }).then(updatePage);
}


function updatePage(NYTData) {

  var numArticles = 1;
  articleCount =0;
  console.log(NYTData);
  console.log("------------------------------------");
  
  var article = NYTData.response.docs[Math.floor(Math.random() * NYTData.response.docs.length)];

  var $articleList = $("<p>");
  $articleList.addClass("list-group");

  $("#NYT").append($articleList);

  var headline = article.headline;
  var $articleListItem = $("<p class='list-group-item articleHeadline'>");

  if (headline && headline.main) {
    console.log(headline.main);
    $articleListItem.append(
      "<h5 class='label label-primary' style='text-align: center'>" +
      "<strong> <a href='" + article.web_url + "'>" +
      headline.main +
      "</a> </strong> </h5>"
    );
  }

    $articleListItem.append("<h5>" + article.snippet + "</h5>");

  $articleList.append($articleListItem);


}
