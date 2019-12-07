

var year = 0;
var arm = "";
var answers =[];
var t3UserAnswer = [];

var allArmy = [];
var oneFourArmy = [];
var oneFiveArmy = [];
var oneSixArmy = [];
var oneSevenArmy = [];
var oneEightArmy = [];
var tast1Result = 0;
var tast2Result = 0;
var tast3Result = 0;
var tast4Result = 0;
var tast5Result = 0;
var dataLength = 0;
var possibleSoldier = [];





jQuery.expr[':'].contains = function(a, i, m) {
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

function getYear2(year) {
	if(year) {
		return year.match(/[\d]{4}/); // This is regex: https://en.wikipedia.org/wiki/Regular_expression
	}
}

function getYear(year) {
    if(year) {
		return "19" + year[year.length-2] + year[year.length-1]; // This is regex: https://en.wikipedia.org/wiki/Regular_expression
    }

    
}

function goHome(){

   // $("#welcome-intro , #view-collection , #tour-intro , #tour-story-1 , #tour-story-2 , #tour-story-3 , #tour-story-4 , .task1 , .task2 , .task4 , .ending , .final").css("display","none");
    //$("#homepage").css("display","flex");
    window.location.reload();
}

function endTrip(){
    $("#homepage , #welcome-intro , #view-collection , #tour-intro , #tour-story-1 , #tour-story-2 , #tour-story-3 , #tour-story-4 , .task1 , .task2 , .task4 , .ending").css("display","none");
    $(".final").css("display","block");
}




function printData(event){
    answers = [];
    var ids = [];
    var recordTemplate = $(".record--template");
    for(var i = 0;i<40;i++){
        var id = Math.floor(Math.random()*399) +1;
		while(ids.indexOf(id) != -1){
			id = Math.floor(Math.random()*399) +1;
        }
        
		ids.push(id);
        var recordValue = JSON.parse(localStorage.getItem(id));
        var recordYear = getYear(recordValue["temporal"]);
        var recordTitle = recordValue["title"];
        var recordImage = recordValue["500_pixel"];
        //var recordImageLarge = recordValue["1000_pixel"];
        var recordDescription = recordValue["decsription"];

        if(recordTitle  && recordYear>=1914 && recordYear <=1918  && recordImage && recordDescription) {
            if(recordYear == year){
                answers.push("#record-" + id);
            }
            var clonedRecordTemplate = recordTemplate.clone();
            clonedRecordTemplate.attr("id", "record-" + id).removeClass("record--template");
            clonedRecordTemplate.appendTo("#record2");
            $("#record-" + id + " h2").html(recordTitle);
            $("#record-" + id + " .year").html(recordYear);
            $("#record-" + id + " .description").html(recordDescription);
            $("#record-" + id + " img").attr("src", recordImage);
            $("#record-" + id + " img").attr("data-strip-caption", recordTitle);

            var value = "#record-" + id;
            var $button = $("<button class='checkButton'  onclick = 'test(" + '"'+ value + '"' +");' >This One</button>");
           // $("#record-" + id).append( $button);
            $button.appendTo("#record-" + id);
            //$("#record-" + id + " a").attr("href", recordImageLarge);


         }
    }
    console.log(answers);
}

function armChoose(value){
    
    arm = value;
    var textLength = arm.length;
    possibleSoldier = [];


    for(var i =0;i<allArmy.length;i++){    
        var checksoldier = allArmy[i];
        if(textLength < checksoldier.length){
            if(checksoldier.substring(0,textLength) == arm){
                possibleSoldier.push(localStorage.getItem(checksoldier.substring(textLength)));
            }
        } 
    }

    tast4Result++;
    console.log(possibleSoldier);
    if(tast4Result == 1){
        $("<img src='img/left3.jpg'>").appendTo($("#ld"));
    }

    $("#task4Main").hide();
    $(".task").hide();
    $(".story").show();
    $(".story #findArmy").show();
    $(".story #findArmy .findArmy-start").show();
    $(".findArmy-1").hide();
    $(".findArmy-2").hide();
    $(".findArmy-3").hide();
    $(".story-army").html(arm);
    


    
    
}


function test(value){

    var right = "This seems to be relevant to you.";
    var notRight = "Are you sure?";

    if(answers.indexOf(value) != -1){
        if(t3UserAnswer.indexOf(value) == -1){
            t3UserAnswer.push(value);
        }
        if(t3UserAnswer.length == answers.length){
            $("#tassk3Tip h1").html("You have found all.");
            tast3Result++;
            if(tast3Result == 1){
                $("<img src='img/right2.jpg'>").appendTo($("#rm"));
            }
        }else{
            $("#tassk3Tip h1").html(right);
        }
        
        $(value).css("background-color","rgb(233, 227, 219)");
    }else{
        $("#tassk3Tip h1").html(notRight);
    }
    
    $("#tassk3Tip").show();
    
    if(t3UserAnswer.length != answers.length){
        $("#tassk3Tip").show();
        setTimeout(function(){
            $("#tassk3Tip").hide()
        }, 700);
    }else{
        $("<button class='tipGoAhead' onclick = '$(this).parent().parent().hide();'>Go Ahead</button>").appendTo("#tassk3Tip");
        $("<button class='closeTip' onclick = '$(this).parent().hide();'>x</button>").appendTo("#tassk3Tip");

    }
    
     
}

function soldierInforInput(event){

    var recordValue =  JSON.parse(possibleSoldier[Math.floor(Math.random()*possibleSoldier.length)]);
    var recordTemplate = $(".inforSh-template");
    var recordArm = recordValue["Military Details"];   
    var recordTitle = recordValue["Title of image"];
    var recordImage = recordValue["High resolution image"];

    var clonedRecordTemplate = recordTemplate.clone();
    clonedRecordTemplate.attr("id", "inforSh-").removeClass("inforSh-template");
    clonedRecordTemplate.appendTo("#inforSh");
    $("#inforSh-"  + " #name").html(recordTitle);
    $("#inforSh-" + " #army").html(recordArm);
            
    $("#inforSh-" + " img").attr("src", recordImage);
    $("#inforSh-" + " img").attr("data-strip-caption", recordTitle);


}

$(document).ready(function() {
    
   

    $("#start-task1").click(function(event){
        $("#tour").hide();
        $("#task0").css("display","flex");

    })

    $("#task0Page1 .nextPage").click(function(event){
        
        $("#tassk0Tip").show();
    })

    

    $(".previous").click(function(event) {
        event.preventDefault();
        $(this).parent().parent().hide();
        $(this).parent().parent().prev().fadeIn();
        $(this).parent().parent().prev().css("display","flex");
    })

    /* When the next page button is click, hide the current page and show the next element in the html document */
    $(".next").click(function(event) {
        event.preventDefault();
        $(this).parent().parent().hide();
        $(this).parent().parent().next().fadeIn();
        $(this).parent().parent().next().css("display","flex");
        
    })

    /* When the home button is click, hide the current page and show the home page */
    $(".go-back-home").click(function(event) {
        event.preventDefault();
        $(this).parent().parent().hide();
        $("#homepage").fadeIn();
        $("#homepage").css("display","flex");
    })


    //click events on the welcome introduction page 

    /* when the opt-collction button is clicked, hide the current page and show the view collection page */
    $("#opt-collection").click(function(event) {
        event.preventDefault();
        $(this).parent().hide();
        $("#view-collection").fadeIn();
        $("#view-collection").css("display","flex");

        var data = {
            resource_id: "2ac90530-58a0-4594-b6a2-04cc5c75114b",
            limit: 100
        }
        $.ajax({
            url: "https://data.qld.gov.au/api/3/action/datastore_search",
            data: data,
            dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise it'll be blocked due to cross-site scripting).
            cache: true,
            success: function(results) {
                var recordTemplate = $(".record-template");
                $.each(results.result.records, function(recordID, recordValue) {
                    var recordTitle = recordValue["title"];
                    var recordYear = getYear(recordValue["temporal"]);
                    var recordImage = recordValue["150_pixel"];
                    var recordImageLarge = recordValue["1000_pixel"];
                    var recordDescription = recordValue["decsription"];

                    if(recordTitle && recordYear && recordImage && recordDescription) {

                        var clonedRecordTemplate = recordTemplate.clone();
                        clonedRecordTemplate.attr("id", "record-" + recordID).removeClass("record-template");
                        clonedRecordTemplate.appendTo("#record");

                        $("#record-" + recordID + " h2").html(recordTitle);
                        $("#record-" + recordID + " .year").html(recordYear);
                        $("#record-" + recordID + " .description").html(recordDescription);
                        $("#record-" + recordID + " img").attr("src", recordImage);
                        $("#record-" + recordID + " img").attr("data-strip-caption", recordTitle);
                        $("#record-" + recordID + " a").attr("href", recordImageLarge);
                        
                        
                    }

                });
            }
        });
        
    })

    /* when the opt-tour button is clicked, hide the current page and show the tour page */
    $("#opt-tour").click(function(event) {
        event.preventDefault();
        $(this).parent().parent().hide();
        $("#tour").fadeIn();
        $("#tour-intro").css("display","flex");
    })



    $("#task1Button").click(function(event) {
        $("#task1Main").show();
        $("#task1Page1").css("display","block");
        $("#task1Page2").css("display","none");
        $("#tassk1Tip").css("display","none");
    })


    $("#task2Button").click(function(event) {
        $("#task2Main").show();
        $("#task2Page1").css("display","block");
        $("#tassk2Tip").css("display","none");
        
    })
    $("#task3Button").click(function(event) {
        $("#task3Main").show();
        $("#task3Page1").css("display","block");
        $("#tassk3Tip").css("display","none");
        $("#t3dataContent").css("display","none");
        $("#record2").html("");
        
    })
    $("#task4Button").click(function(event) {
        $("#task4Main").show();
        $("#task4Page1").css("display","block");
        $("#task4Page2").css("display","none");
        $("#task4Page2").html("");
        
    })

    $("#task5Button").click(function(event) {
        $("#task5Main").show();
        $("#task5Page1").css("display","block");
        $("#task5Page2").css("display","none");
        $("#task5Page3").css("display","none");
        $(".otherComen").html("");
        $("#tassk5Tip").hide();
    })

    $("#task3Page1 .nextPage").click(function(event){
        t3UserAnswer = [];
        printData();
        
    })

    $("#task4Page1 .nextPage").click(function(event){
        
        var soldierYear = year;
        if(soldierYear == "1914"){
            for(var i = 0; i < oneFourArmy.length;i++){
                var value ='"'+ oneFourArmy[i] + '"';
                $("<button class = 'armButton' onclick = 'armChoose(" +value+");'>"+ oneFourArmy[i]+"</button>").appendTo($("#task4Page2"));
            }
        }
        if(soldierYear == "1915"){
            for(var i = 0; i < oneFiveArmy.length;i++){
                var value ='"'+ oneFiveArmy[i] + '"';
                $("<button class = 'armButton' onclick = 'armChoose(" +value+");'>"+ oneFiveArmy[i]+"</button>").appendTo($("#task4Page2"));
            }
        }
        if(soldierYear == "1916"){
            for(var i = 0; i < oneSixArmy.length;i++){
                var value ='"'+ oneSixArmy[i] + '"';
                $("<button class = 'armButton' onclick = 'armChoose(" +value+");'>"+ oneSixArmy[i]+"</button>").appendTo($("#task4Page2"));
            }
        }
        if(soldierYear == "1917"){
            for(var i = 0; i < oneSevenArmy.length;i++){
                var value ='"'+ oneSevenArmy[i] + '"';
                $("<button class = 'armButton' onclick = 'armChoose(" +value+");'>"+ oneSevenArmy[i]+"</button>").appendTo($("#task4Page2"));
            }
        }
        if(soldierYear == "1918"){
            for(var i = 0; i < oneEightArmy.length;i++){
                var value ='"'+ oneEightArmy[i] + '"';
                $("<button class = 'armButton' onclick = 'armChoose(" +value+");'>"+ oneEightArmy[i]+"</button>").appendTo($("#task4Page2"));
            }
        }

    })
    $("#task5Page1 .nextPage").click(function(event){
        console.log(localStorage.length);
        console.log(dataLength);
        for(var i = 0; i < localStorage.length - dataLength ; i++){
            var userComent = localStorage.getItem("userCom-" + i);
            if(userComent != null && userComent != ""){
                $("<p> "+ userComent+"</p>").appendTo($(".otherComen"));
            }
            
        }
    })

    

    $(".closeTask , .closeTip").click(function(event) {
        $(this).parent().hide();
        
    })

    $(".nextPage").click(function(event) {
        $(this).parent().css("display","none");
        $(this).parents().next().show();
        
    })
    $(".previewPage").click(function(event) {
        $(this).parent().css("display","none");
        $(this).parents().prev().css("display","block");
        
    })
    
    $("#task1Submit").click(function(event){
        var t1Answer = $("#task1Answer").val();
        var t1Answer2 = $("#task1Answer2").val();
 
        var out = "";
        if(t1Answer == "1914" && t1Answer2 == "german"){
            out = "Congratulation, you have found the right answers. Click continue to the next task.";
            tast1Result ++;
        }else{
            out = "Sorry, that is not the answer.";
        }
        $("#tassk1Tip h1").html(out);
        $("#tassk1Tip").css("display","block");
        if(tast1Result == 1){
            $("<img src='img/right1.jpg'>").appendTo($("#ru"));
        }

        
        
    })

    $("#task2Submit").click(function(event){
        var t2Answer = $("#task2Answer").val();
        year = Math.floor(t2Answer) % 4 + 1914;
        
        var out = "";
        if(t2Answer < 2000 || t2Answer > 5000){
            out = "Your input is invalid, please try again.";
        }else{
            out = "You have found something about yourself: you join the war in " + year + ".";
            tast2Result++;
        }
        
        $("#tassk2Tip h1").html(out);
        $("#tassk2Tip").css("display","block");
        if(tast2Result == 1){
            $("<img src='img/left2.jpg'>").appendTo($("#lm"));
        }

        
        
    })
    $("#task5Submit").click(function(event){
        var coment = $("#task5ComInput").val();
        var comentid = localStorage.length - dataLength;
        localStorage.setItem("userCom-" + comentid,coment);
        $("#tassk5Tip").show();
        tast5Result++;
        if(tast5Result == 1){
            $("<img src='img/right3.jpg'>").appendTo($("#rd"));
        }
        
    })

    $(".tipTryAgain").click(function(event){
        $(this).parent().css("display","none");
    })

    $(".tipGoAhead").click(function(event){
        $(this).parent().parent().css("display","none");
        
    })

    

    $("#tassk5Tip .tipGoAhead").click(function(event){
        
        $(".task").hide();
        $("#inforSheet").show();

        if(tast1Result > 0 && tast2Result  > 0 && tast3Result  > 0 && tast4Result  > 0 && tast5Result  > 0 ){
            soldierInforInput();
            $("#inforShContent").show();
            $(".finalOutPut").css("background-image","url(img/success_background.jpg)");
        }else{
            $("#noinforShContent").show();
        }
         
    })

    $("#tassk2Tip .tipGoAhead").click(function(event){
        $(".task").hide();
        $("#findNewspaper").show();
        $("#findNewspaper #newsPaper").show();
        $(".newsPyear").html(year);
    })






    $("#newsPaper .changepage .next").click(function(event){
        $(".task").show();
        $(".story").hide();
        $(".story #newsPaper").hide();
        $(".story #findArmy").hide();
    })
    $(".findArmy-1 .changepage .next , .findArmy-2 .changepage .next , .findArmy-3 .changepage .next").click(function(event){
        $(".task").show();
        $(".story").hide();
        $(".story #newsPaper").hide();
        $(".story #findArmy").hide();
        $(".findArmy-1").hide();
        $(".findArmy-2").hide();
        $(".findArmy-3").hide();
    })

    $(".findArmy-start .changepage .next").click(function(event){
        $(".findArmy-1").hide();
        $(".findArmy-2").hide();
        $(".findArmy-3").hide();

        var i = Math.floor(Math.random()*3) + 1;

        $(".findArmy-" + i).show();



    })


    


    

    
 
    





    


    var data = {
        //resource_id: "a46b4d2b-243f-41f9-9a61-a231f1d1b6d0",
        resource_id: "2ac90530-58a0-4594-b6a2-04cc5c75114b",
        //resource_id: "2ac90530-58a0-4594-b6a2-04cc5c75114b", can use 
        //resource_id: "cf4d43d8-2aad-4512-99e6-f6be2bf24466", cannot use 
        limit: 200
    }

    var data2 = {
        //resource_id: "a46b4d2b-243f-41f9-9a61-a231f1d1b6d0",
        //resource_id: "2ac90530-58a0-4594-b6a2-04cc5c75114b",
        //resource_id: "2ac90530-58a0-4594-b6a2-04cc5c75114b", can use 
        resource_id: "cf4d43d8-2aad-4512-99e6-f6be2bf24466", 
        limit: 200
    }
    $.ajax({
        url: "https://data.qld.gov.au/api/3/action/datastore_search",
        data: data,
        dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise it'll be blocked due to cross-site scripting).
        cache: true,
        success: function(results) {
            $.each(results.result.records, function(recordID, recordValue) {
                if(!localStorage.getItem(recordID)){
                    localStorage.setItem(recordID,JSON.stringify(recordValue));
                }
                dataLength++;
            });
            
        }
    });
    $.ajax({
        url: "https://data.qld.gov.au/api/3/action/datastore_search",
        data: data2,
        dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise it'll be blocked due to cross-site scripting).
        cache: true,
        success: function(results) {
            $.each(results.result.records, function(recordID, recordValue) {
                //localStorage.setItem(recordID + 200,JSON.stringify(recordValue));
                if(!localStorage.getItem(recordID + 200)){
                    localStorage.setItem(recordID + 200,JSON.stringify(recordValue));
                }
                dataLength++;
            });
            


        }

        
    });

    var data3 = {
        resource_id: "a46b4d2b-243f-41f9-9a61-a231f1d1b6d0",
        //resource_id: "2ac90530-58a0-4594-b6a2-04cc5c75114b",
        //resource_id: "2ac90530-58a0-4594-b6a2-04cc5c75114b", can use 
        //resource_id: "cf4d43d8-2aad-4512-99e6-f6be2bf24466", 
        limit: 5000
    }
    $.ajax({
        url: "https://data.qld.gov.au/api/3/action/datastore_search",
        data: data3,
        dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise it'll be blocked due to cross-site scripting).
        cache: true,
        success: function(results) {
            $.each(results.result.records, function(recordID, recordValue) {
                
                if(recordValue["Temporal"] && recordValue["Military Details"]){
                    var armYear =  recordValue["Temporal"].toString();
                    var armYear2 = "19" + armYear[2] + armYear[3];
                    var key = recordID+1000 + "-" + armYear2;
                    if(!localStorage.getItem(key)){
                        localStorage.setItem(key,JSON.stringify(recordValue));
                    }
                    dataLength++;
                    allArmy.push(recordValue["Military Details"] +key);
                    if(armYear2 == "1914" && oneFourArmy.indexOf(recordValue["Military Details"]) == -1){
                        oneFourArmy.push(recordValue["Military Details"]);
                    }else  if(armYear2 == "1915" && oneFiveArmy.indexOf(recordValue["Military Details"]) == -1){
                        oneFiveArmy.push(recordValue["Military Details"]);
                    }else if(armYear2 == "1916" && oneSixArmy.indexOf(recordValue["Military Details"]) == -1){
                        oneSixArmy.push(recordValue["Military Details"]);
                    }if(armYear2 == "1917" && oneSevenArmy.indexOf(recordValue["Military Details"]) == -1){
                        oneSevenArmy.push(recordValue["Military Details"]);
                    }else if(armYear2 == "1918" && oneEightArmy.indexOf(recordValue["Military Details"]) == -1){
                        oneEightArmy.push(recordValue["Military Details"]);
                    }
                } 
                
            });
            console.log(dataLength);
            console.log(localStorage.length);

        }
    });



    

  
  
  });








