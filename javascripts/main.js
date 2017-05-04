const dataArray=[];

$(document).ready(function(){

	const animateIt = (champion)=>{
		let badgeString;
		$("#arena").after(`<div class="row"><div class="col-md-6" id="nextBadge"></div></div>`);
		$("#nextBadge").after(`<div class="col-md-6" id="badges">something</div>`);
		for (let y=0; y< champion.badges.length; y++){
			for (let n=y; n>-1; n--){
				
				badgeString += `<img class = "badgePic" src="${champion.badges[n].icon_url}">`;
			}
			
			
			$("#badges").html(badgeString);
			badgeString="";

			let animateBadge = "";

			animateBadge=`<img id="currentBadge" class = "badgePic" src="${champion.badges[y].icon_url}">`;
			$("#nextBadge").html(animateBadge);
			$("#currentBadge").animate({left: "+=300px"}, 3000);
		}

	};

	const whoWins = ()=>{
		let winner;
		winnerString = "";
		winnerString+=`<div class="jumbotron">`;
  		winnerString+=`<h3>And the winner is...</h3>`;
  		if (dataArray[0].points.total>dataArray[1].points.total){
	  		winnerString+=`<h1>${dataArray[0].name}!</h1>`;
	  		winner = dataArray[0];
  		} else{
  			winnerString+=`<h1>${dataArray[1].name}!</h1>`;
  			winner = dataArray[1];
  		}
  		winnerString+=`</div>`;
  		$("#arena").append(winnerString);
		animateIt(winner);
	};

	const versus = ()=>{
		$(".versus").animate({fontSize: "60px"}, 1500);
		$(".versus").animate({left: "600px"}, 1500);
		whoWins();
	};
	const theMatch = ()=>{
		let battleString = "";
		battleString+=`<div class="row">`;
		for (let x=0; x<dataArray.length; x++){
		  	battleString+=`<div class="col-sm-6 col-md-4">`;
			battleString+=`<div class="thumbnail">`;
	     	battleString+=`<img src="${dataArray[x].gravatar_url}" alt="avatar">`;
	     	battleString+=`<div class="caption">`;
	        battleString+=`<h3>${dataArray[x].name}</h3>`;
	        battleString+=`<p>Points:</p><br><p>${dataArray[x].points.total}</p>`;
	      	battleString+=`</div></div></div>`;
	      	if (x%2===0){
	      		battleString+=`<div class = "col-sm-6 col-md-4">`;
	      		battleString+=`<p class="versus">VS</p>`;
	      		battleString+=`</div>`;
	      	}
      	}
      	battleString+=`</div>`;
      	$("#arena").html(battleString).ready(versus);
	};

	const retrieveData = (dataFile1, dataFile2) =>{
		const getFirstContestant = ()=>{
			return new Promise ((resolve, reject)=>{
			$.ajax(dataFile1)
			.done((challengerData1)=>resolve(challengerData1))
			.fail((error)=>reject(error));
			});
		};
		const getSecondContestant =()=>{
			return new Promise ((resolve, reject)=>{
			$.ajax(dataFile2)
			.done((challengerData2)=>resolve(challengerData2))
			.fail((error)=>reject(error));
			});
		};

		Promise.all([getFirstContestant(),getSecondContestant()])
		.then(function(result){
			let counter =0;
			result.forEach(function(userData){
				dataArray[counter]=userData;
				counter++;
			});
			theMatch();
		})
		.catch((error)=>{
			alert("Please make sure you have spelled both user names correctly and that you have not added any extra spaces.");
		});
	};

	const collectInput = ()=>{
		let challenger1 = $("#challenger1").val();
		let challenger2 = $("#challenger2").val();
		if (challenger1 === "" || challenger2===""){
			alert("Please enter a user name in both boxes!");
		} else {
			challenger1 = "https://teamtreehouse.com/"+challenger1 +".json";
			challenger2 = "https://teamtreehouse.com/"+challenger2 +".json";
			retrieveData(challenger1, challenger2);
		}
	};

	$("#initiate").click(collectInput);
});