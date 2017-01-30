/*
This function will add the banner (header)
 */

function putBanner() {
    console.log("start");
    var hDiv = "<div class = 'banner'>";
    var image = "<img src='IST.png' alt='ist_logo' id = 'ist-logo' />";
    var text = "<span id = 'ban-text'> Information Sciences & Technologies</span>";
    hDiv += text;
    hDiv += image;
    hDiv += "</div>";
    $("body").append(hDiv);
    console.log("end");
}

/**
 * This function will fetch the quote and description from api/about and add it as first page of the website
 */


function putQuote() {
    console.log("q_start");
    var q = "<div class='quote web-block'>";
    getData('get',{path:'/about/'}).done(function(json){
      var tempQ = json;
      var pText = "<h2 id = 'quote-title'>"+ tempQ.title + "</h3>";
      pText += "<p id = 'quote-description'>" + tempQ.description + "</p>";
      pText += "<q id = 'quote-quote'>" + tempQ.quote + "</q>";
      pText += "<p id = 'quote-quoteAuthor'> -" + tempQ.quoteAuthor + "</p>";
      q += pText + "</div>";
      $(".main-div").append(q);
    });
}

/**
 * This function will add undergraduate page.
 * It will create 2 tabs as degrres and minors and fetch information about them.
 */

function putUG() {
  var q = "<div class='ug web-block'></div>";
  $(".main-div").append(q);
  var ugHead = "<div class='degree-name' id='quote-title'>Undergraduate Studies</div>";
  $(".ug").append(ugHead);
  var dgTabs = "<div class = 'ugMainTabs'></div>";
  $(".ug").append(dgTabs);
  putUGDegree();
  putUGMinors();
  tabsForUg();
}


/**
 * This function will fetch and add undergraduate degrees
 */

function putUGDegree() {

  var a = "<div class='degree' data-pws-tab='degrees' data-pws-tab-name='Undergraduate Degrees'></div>";

  $(".ugMainTabs").append(a);

  getData('get',{path:'/degrees/'}).done(function(json){
    var tempug = json.undergraduate;
    $.each(tempug, function (index, element) {
      var dgDiv = "<div class='ug-degree'>";
      dgDiv += "<div class='degree-title'>" + element.title + "</div>";
      dgDiv += "<p class='degree-desc'>" + element.description + "</p>";
      dgDiv += "<div class='box-hidden' id='ug"+ index +"'><div class='box-title'>" + element.title + "</div><hr class = 'lineForBox'/><div class='box-line-1'>Concentrations :</div><ul class='fa-ul'>";

      $.each(element.concentrations, function (index, concentration) {
          dgDiv += "<li class = 'conc'><i class='fa-li fa fa-laptop' ></i>" + concentration + "</li>";
      });

      dgDiv += "</ul><div>website: <a href='http://" + element.degreeName +".rit.edu'>" + element.degreeName + ".rit.edu</a></div></div>";

      dgDiv += "<a href ='#ug" + index +"' rel='modal:open'><div style='padding:0px 120px'><div class='click-menu'>More Info</div></div><a>";

      dgDiv += "</div>";
      $(".degree").append(dgDiv);
    });
  });
}

/**
 * This function will fetch and add undergraduate minors on the undergraduate
 * page.
 */

function putUGMinors() {
  var a = "<div class='holder' data-pws-tab='minors' data-pws-tab-name='Undergraduate Minors'><div class='minor'></div></div>";

  $(".ugMainTabs").append(a);

  getData('get',{path:'/minors/'}).done(function(json){

    var tempug = json.UgMinors;

    var dgDiv = "";
    $.each(tempug, function (index, element) {
      dgDiv += "<div data-pws-tab='anynameyouwant" + (index+1) + "' data-pws-tab-name='" + element.title +"'><div>" + element.description +"</div>";

      dgDiv += "<div><p class='course'>Courses:</p><ul class='col-2 fa-ul'>";
      $.each(element.courses, function(index, course){
        dgDiv += "<li><i class = 'fa-li fa fa-book'></i>" + course + "</li>";
      });

      dgDiv += "</ul></div></div>";

    });
    $(".minor").append(dgDiv);
    tabsForUgMinors();
  });
}


/**
 * This functon will add graduate degrees and certifications and create graduate page.
 */

function putG() {
  var q = "<div class='grad web-block'></div>";
  $(".main-div").append(q);
  var ugHead = "<div class='degree-name' id='quote-title'>Graduate Studies</div>";
  $(".grad").append(ugHead);
  var dgTabs = "<div class = 'gradMainTabs'></div>";
  $(".grad").append(dgTabs);
  putGDegree();
  putGCerti();
  tabsGrad();
}


/**
 * This function will fetch and add information about graduate degrees.
 */

function putGDegree() {
  console.log("");
  var a = "<div class='gdegree' data-pws-tab='degrees' data-pws-tab-name='Graduate Degrees'></div>";

  $(".gradMainTabs").append(a);

  getData('get',{path:'/degrees/'}).done(function(json){
    var tempug = json.graduate;
    $.each(tempug, function (index, element) {
      if (index < 3) {
        var dgDiv = "<div class='ug-degree'>";
        dgDiv += "<div class='degree-title'>" + element.title + "</div>";
        dgDiv += "<p class='degree-desc'>" + element.description + "</p>";
        dgDiv += "<div class='box-hidden' id='g"+ index +"'><div class='box-title'>" + element.title + "</div><hr class = 'lineForBox'/><div class='box-line-1'>Concentrations :</div><ul class='fa-ul'>";

        $.each(element.concentrations, function (index, concentration) {
            dgDiv += "<li class = 'conc'><i class='fa-li fa fa-laptop' ></i>" + concentration + "</li>";
        });

        dgDiv += "</ul><div>website: <a href='http://" + element.degreeName +".rit.edu'>" + element.degreeName + ".rit.edu</a></div></div>";

        dgDiv += "<a href ='#g" + index +"' rel='modal:open'><div style='padding:0px 120px'><div class='click-menu'>More Info</div></div><a>";

        dgDiv += "</div>";
        $(".gdegree").append(dgDiv);
      }
    });
  });
}


/**
 * This function will fetch and add information about graduate certificates.
 */

function putGCerti() {
  var a = "<div class='gCerti certi' data-pws-tab='certificates' data-pws-tab-name='Graduate certificates'></div>";

  $(".gradMainTabs").append(a);

  getData('get',{path:'/degrees/'}).done(function(json){
    var tempug = json.graduate[3];
    console.log(tempug.availableCertificates);
        var dgDiv2 = "<a href='http://www.rit.edu/programs/web-development-adv-cert'><div class='certificate'><div class='image'><img src='HTML5.svg' width='150' height='150' alt='HTML5 Powered'></div><div></a>" + tempug.availableCertificates[0]+ "</div></div>";
        $(".gCerti").append(dgDiv2);

        dgDiv2 = "<a href='http://www.rit.edu/programs/networking-planning-and-design-adv-cert'><div class='certificate'><div class='image'><i class='fa fa-sitemap fa-5x' style='color:#7454CC;'></i></div><div></a>" + tempug.availableCertificates[1]+ "</div></div>";
        $(".gCerti").append(dgDiv2);
  });
}

/**
 * This function will fetch and add Employement information.
 */

function putEmp() {
  var q = "<div class='emp web-block'></div>";
  $(".main-div").append(q);
  var ugHead = "<div class='degree-name'> Employement </div>";
  $(".emp").append(ugHead);
  var dgTabs = "<div class = 'empMainTabs'></div>";
  $(".emp").append(dgTabs);
  putEmpBasic();
  // putEmpMap();
  putEmpTables();
  tabsForEmp();
}

/**
 * This function will fetch and add basic inforation and statistics about Employement.
 */

function putEmpBasic() {
  var a = "<div class='emp-basic' data-pws-tab='Statistics' data-pws-tab-name='Employement Statistics'></div>";

  $(".empMainTabs").append(a);

  getData('get',{path:'/employment/'}).done(function(json){
    // console.log(json.locations);
    var tempug = json;
        var dgDiv = "<div id = 'quote-quote'>" + tempug.introduction.title + "</div>";

        $.each(tempug.introduction.content, function(index, con){
          dgDiv += "<div class = 'content'><h2 class = 'content-header'>" + con.title+ "</h2><div class = 'content-desc'>" + con.description +"</div></div>";
        });

        $.each(tempug.degreeStatistics.statistics, function(index, stat){
          dgDiv += "<div class='emp-stats emp-stats-" + index + "'><div class = 'emp-num'>" + stat.value + "</div><div class = 'content-desc'>" + stat.description+ "</div></div>";
        });

        $(".emp-basic").append(dgDiv);
  });

  a = "<div class='emp-map' data-pws-tab='map' data-pws-tab-name='Locations'><div class = 'map'></div></div>";

  $(".empMainTabs").append(a);

  $("body").append('<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrxJBuiF4GUKXvvx8FGXQaYwMU74NDjqQ&callback=putEmpMap"></script>');

}

/**
 * This function will initiate the map on employment page.
 */

function putEmpMap() {

   var mapCanvas = $(".map")[0];
    // console.log(mapCanvas);
    var mapOptions = {
    center: new google.maps.LatLng(47.6062095, -122.3320708),
    zoom: 4
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);

getData('get',{path:'/location/'}).done(function(json){

  var locations = json;

    $.each(locations, function(index, location){
        mapLoc = new google.maps.LatLng(parseInt(location.latitude),parseInt(location.longitude));
        mapMarker = new google.maps.Marker({
            position: mapLoc,
            title: location.city + ", " + location.state
        });
        mapMarker.setMap(map);
    });
});
}

/**
 * This function will fetch and add information about previous Employement histiry. The information is represented in form of tables.
 */

function putEmpTables() {
  var a = "<div class='emp-table' data-pws-tab='tables' data-pws-tab-name='Employement History'></div>";

  $(".empMainTabs").append(a);
  var dgDiv = "";
  getData('get',{path:'/employment/'}).done(function(json){


    dgDiv += "<table class='coopTab' id = 'coopTab'><tr class = 'coopTabHead'><td>Employer</td><td>Degree</td><td>City</td><td>Term</td></tr>";

    var coops = json.coopTable.coopInformation;

      $.each(coops, function(index, coop){
        dgDiv += "<tr class='coopRow'><td>"+coop.employer+"</td><td>"+coop.degree+"</td><td>"+coop.city+"</td><td>"+coop.term+"</td></tr>";
      });

      dgDiv += "</table>";

      dgDiv += "<a href = '#coopTab' rel='modal:open'><div class = 'coop'>Co-op Table</div></a>";
      $(".emp-table").append(dgDiv);


var dgDiv2 = "<table class='coopTab empHistory' id = 'empHistory'><tr class = 'coopTabHead'><td>Degree</td><td>Employer</td><td>City</td><td>Title</td><td>Start Date</td></tr>";

coops = json.employmentTable.professionalEmploymentInformation;

$.each(coops, function(index, coop){
  dgDiv2 += "<tr class='coopRow'><td>"+coop.degree+"</td><td>"+coop.employer+"</td><td>"+coop.city+"</td><td>"+coop.title+"</td><td>"+coop.startDate+"</td></tr>";
});


dgDiv2 += "</table>";

dgDiv2 += "<a href = '#empHistory' rel='modal:open'><div class = 'coop'>Employement Table</div></a>";
$(".emp-table").append(dgDiv2);
});
}

/**
 * This function will fetch all required elements and setup the website.
 */

function setupWebsite() {
  putBanner();
  init();
  putQuote();
  putUG();
  putG();
  putEmp();
}

/**
 * This function will initialize the plugin used for scrolling.
 */

function init() {

/* ========== DRAWING THE PATH AND INITIATING THE PLUGIN ============= */
	$.fn.scrollPath("getPath")
		// Move to 'start' element
		.moveTo(755, -10, {name: "start"})
		// Line to 'description' element
		.lineTo(2300, -10, {name: "quote1"})

    .lineTo(3700, -10, {name: "grad"})
    .lineTo(5050, -10, {name: "emp"});

	// We're done with the path, let's initate the plugin on our wrapper element
	$(".main-div").scrollPath({drawPath: false, wrapAround: false, scrollBar: false});
	/* ===================================================================== */
}

/**
 * This function will initialize tabs for undergraduate minors.
 *//**
  * This function will initialize tabs for undergraduate page.
  */
function tabsForUgMinors() {
   $('.minor').pwstabs({
       effect: 'slideleft',       // Transition effect
       defaultTab: 1,             // Tab opened by default
       containerWidth: '1300px',   // Container width
       tabsPosition: 'vertical',  // Tabs position: horizontal / vertical
       verticalPosition: 'left',   // Tabs Vertical position: left / right
       theme: 'pws_theme_dark_orange'
   });
}

/**
 * This function will initialize tabs for undergraduate page.
 */
function tabsForUg() {
   $('.ugMainTabs').pwstabs({
       effect: 'scale',       // Transition effect
       defaultTab: 1,             // Tab opened by default
       containerWidth: '1300px',   // Container width
       tabsPosition: 'horizontal',  // Tabs position: horizontal / vertical
       horizontalPosition: 'top',   // Tabs Vertical position: left / right
        theme: 'pws_theme_green'
   });
}


/**
 * This function will initialize tabs for graduate page.
 */
function tabsGrad() {
  $('.gradMainTabs').pwstabs({
      effect: 'scale',       // Transition effect
      defaultTab: 1,             // Tab opened by default
      containerWidth: '1300px',   // Container width
      tabsPosition: 'horizontal',  // Tabs position: horizontal / vertical
      horizontalPosition: 'top',   // Tabs Vertical position: left / right
       theme: 'pws_theme_green'
  });
}


/**
 * This function will initialize tabs for employment page.
 */
function tabsForEmp() {
  $('.empMainTabs').pwstabs({
      effect: 'scale',       // Transition effect
      defaultTab: 1,             // Tab opened by default
      containerWidth: '1300px',   // Container width
      tabsPosition: 'horizontal',  // Tabs position: horizontal / vertical
      horizontalPosition: 'top',   // Tabs Vertical position: left / right
       theme: 'pws_theme_green'
  });
}

/**
 * This function will get required data using proxy.php file.
 * This is helper to get information from ist.rit.edu/api.
 */


function getData(t, d) {
    return $.ajax({
  			type:t,
  			url:'proxy.php',
  			dataType:'json',
  			data:d,
  			cache:false,
  			async:true}).fail(function(){
          //handle failure
      });
}
