var redditPostAmount = 5;
var SubRedditLink = "https://www.reddit.com/r/im14andthisisdeep/";
var PostLoop = 0;

function UpdatePosts() {
	$('#data').html("");
	redditPostAmountInputCheck = parseInt($('#redditPostAmountInput').val());
	if(redditPostAmountInputCheck > 24) {
		redditPostAmount = 24;
	} else {
		redditPostAmount = redditPostAmountInputCheck;
	}
	refresh();
}

function UpdateRedditLink() {
	$('#data').html("");
	SubRedditLink = String($('#subRedditLinkInput').val());
	refresh();
}

function firstPostButton(i) {
	$("#ErrorText").html("Are you sure you want to post this?");
	$("#ErrorButton").html('<button type="button" id="'+ i +'" data-dismiss="modal" class="btn btn-outline-success Post">Yes</button>');
	refresh();
	console.log("Modal Created");
}

refresh();
function refresh()
{
	

	var dataDiv = document.getElementById("data");
	var SubReddit;
		var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						var SubReddit = JSON.parse(this.responseText);
						read(SubReddit);
					}
				};
				xmlhttp.open("GET", SubRedditLink + "top.json", true);
				xmlhttp.send();

				function read(SubReddit) {
					dataDiv.innerHTML = "<h2>Posts:</h2>"
				for (i = 0; i < redditPostAmount; i++) {
					a = i + 1

					dataDiv.innerHTML += "Number " + a + ": <br>";
					dataDiv.innerHTML += "Title: " + SubReddit.data.children[i].data.title + "<br>";
					dataDiv.innerHTML += "Link: " + "<a href='https://reddit.com" + SubReddit.data.children[i].data.permalink + "'>Go to post<br>";
					dataDiv.innerHTML += "<img src=" + SubReddit.data.children[i].data.url + "><br><br>";
					dataDiv.innerHTML += "<button class='btn btn-primary' data-toggle='modal' data-target='#AreYouSureModal' onclick='firstPostButton("+ i +")'>Tweet number " + a + "</button>";

					dataDiv.innerHTML += "<br><hr>";
					if(redditPostAmount === 24 && i == 24) {
						dataDiv.innerHTML += "<span class='red'>Limit Reached</span>";
					}

					$(".Post").click(function(event) {
						
						console.log("Tweet number " + event.target.id + " send");
						PostLoop++;
						if(PostLoop / 5 == 1) {
							console.log("TweetPosted");
							PostLoop = 0;
								$.ajax({
									url: "PHP/Twitter.php",
									method: "POST",
									data: { title: SubReddit.data.children[event.target.id].data.title,
											url: SubReddit.data.children[event.target.id].data.url
										}
								});
						}
					});
					}
				}
}