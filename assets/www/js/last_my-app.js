// Initialize app
var myApp = new Framework7({
  // App id
  id: 'com.myapp.test',
  name: 'My App',
  fastClicks:false,
  pushState: true,
  swipePanel: 'left',
  animatePages:true,
  animateNavBackIcon:true,
  precompileTemplates: true, //
  template7Pages: true ,
  swipeBackPage:false,
  swipePanelCloseOpposite:false,
  swipePanelOnlyClose:false,
  pushState: true,
  swipeout:true,
  smartSelectPopupCloseTemplate: '',
  smartSelectBackOnSelect: true,
  cache: true, /* disable caching */
  domCache: true ,//enable inline pages
  cacheDuration:1000*60*10,
  fastClicks:false,
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  statusbar: {
    iosOverlaysWebview: true,
  },

    // ... other parameters
});
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var loadingProduct = false;
var maxItemsProduct = 60;
var product_page=0;
var lastIndexProduct =0;
var loading = false;
var maxItems = 60;
var offer_page=0;
var lastIndex =0;
// Append items per load
var itemsPerLoad = 20;
var myCalendar;
function onDeviceReady() {
  // Now safe to use the Cordova API
  console.log('device Ready');
  checkConnection();
  setTimeout(function(){   ln.init(); }, 3000);
  document.addEventListener("backbutton", function(e){
    myApp.closePanel();
    if(myCalendar){
      myCalendar.close();
    }
      if ( mainView.activePage.name === 'index') {
          //window.location = "#exitDialog";
          exitAppPopup();
      }else{
          history.back();
      };
  });


}
function exitAppPopup() {
  myApp.confirm('Do you really want to close this app?','Almanara',function () {
    navigator.app.exitApp();
  });
    //return false;
};

// Handle Cordova Device Ready Event
$$(document).on('deviceready', onDeviceReady);
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});
var AppData=[];
var AppMainData={};
var Language=[
   {'id':'en','language':'English','logo':'images/english.png'},
   {'id':'ar','language':'Arabic','logo':'images/arabic.png'},
   {'id':'in','language':'India','logo':'images/india.png'},
   {'id':'ur','language':'Urdu','logo':'images/india.png'},
   {'id':'be','language':'Bengali','logo':'images/india.png'},
];
function displayLanguage()
{
  ln.getLanguage(
    {
      //Default values
      value: 'arabic',
    }
  );
  var message = i18n.t
  (
    'messages.success',
    {
      code: ln.language.code,
      local: ln.language.local,
      language: ln.language.international
    }
  );
}
function reinit(){
  location.reload();
}
function drawMenu(){
  var output="";
    output+="<div class='content-block'>";
      output+="<a href='templates/products.html'>Left panel content goes here</a>";
    output+="</div>";
  $$('.panel.panel_content.menu').html(output);
}
function drawNavbarEmpty(){
  $$('.navbar_content').html('');

}
function drawNavbarBack(){
  var output="";
  output+="<div class='navbar-inner'>";
  output+="<div class='left'>";
  //  output+="<a href='#' class='link icon-only open-panel'><i class='icon icon-bars'></i></a>";

    output+="<a href='#' class='link back'>";
    output+="  <i class='fa fa-angle-left' aria-hidden='true'></i>";
    //output+="  <span>Back</span>";
    output+="</a>";
  output+="</div>";
    output+="<div class='center sliding'></div>";
      output+="<div class='right'>";
      //  output+="<a href='#' class='link icon-only open-panel'><i class='icon icon-bars'></i></a>";
      output+="</div>";
  output+="</div>";
  $$('.navbar_content').html(output);
}
function drawNavbarRedBack(){
  var output="";
  output+="<div class='navbar-inner'>";
  output+="<div class='left'>";
  //  output+="<a href='#' class='link icon-only open-panel'><i class='icon icon-bars'></i></a>";

    output+="<a href='#' class='link back'>";
    output+="  <i class='fa fa-angle-left' aria-hidden='true'></i>";
    //output+="  <span>Back</span>";
    output+="</a>";
  output+="</div>";
    output+="<div class='center sliding'></div>";
      output+="<div class='right'>";
      //  output+="<a href='#' class='link icon-only open-panel'><i class='icon icon-bars'></i></a>";
      output+="</div>";
  output+="</div>";
  $$('.navbar_content').html(output);
}
function drawNavbarMenuPage(title){
  var output="";
  output+="<div class='navbar-inner gray'>";
  output+="<div class='left'>";
    output+="<a href='#' class='link icon-only open-panel'><img src='images/left_menu.png'/></a>";

  output+="</div>";
    output+="<div class='center sliding'>"+title+"</div>";
      output+="<div class='right'>";
        output+="<a href='#' data-popup='.popup-cart' class='open-popup'><img src='images/card_icon.png'/> <img src='images/back_copy.png'/></a>";
      //  output+="<a href='#' class='link icon-only open-panel'><i class='icon icon-bars'></i></a>";
      output+="</div>";
  output+="</div>";
  $$('.navbar_content').html(output);
}
function drawNavbarMenuBackPage(title){
  var output="";
  output+="<div class='navbar-inner gray'>";
  output+="<div class='left'>";
    output+="<a href='#' class='link back'><img src='images/back.png'/></a>";
  output+="</div>";
    output+="<div class='center sliding'>"+title+"</div>";
      output+="<div class='right'>";
      //  output+="<a href='#' class='link icon-only open-panel'><i class='icon icon-bars'></i></a>";
      output+="</div>";
  output+="</div>";
  $$('.navbar_content').html(output);
}
function drawNavbarMenuOfferPage(title,color){
  var output="";
  output+="<div class='navbar-inner "+color+"'>";
  output+="<div class='left'>";
    output+="<a href='#' class='link icon-only open-panel'><img src='images/left_menu.png'/></a>";

  output+="</div>";
    output+="<div class='center sliding'>"+title+"</div>";
      output+="<div class='right'>";
        output+="<a href='#' class='link icon-only open-panel'><img src='images/filtter.png'/></a>";
      output+="</div>";
  output+="</div>";
  $$('.navbar_content').html(output);
}
// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
  // Do something here for "about" page
})
// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
  // Get page data from event data
  var page = e.detail.page;

  if (page.name === 'about') {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
  }
})
myApp.onPageBeforeAnimation('*',function(e){
  /*  // drawNavbarBack();
  //drawMenu();
  */
  $$('.page-on-left').removeClass('hidden');

  if(mainView.activePage.name==='show_profile'||mainView.activePage.name==='offers'||mainView.activePage.name==='products'){
    drawMenu();
  }
  myApp.params.swipePanel = false;
  if(mainView.activePage.name==='show_profile'||mainView.activePage.name==='offers'||mainView.activePage.name==='products'||mainView.activePage.name==='transactions'||mainView.activePage.name==='product_details'){
    toolbar();
  }else{
    HideToolbar();
  }
});
/*
$$('.hide-navbar').on('click', function () {
  app.navbar.hide('.navbar');
});
$$('.show-navbar').on('click', function () {
  app.navbar.show('.navbar');
});*/
// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
  // Following code will be executed for page with data-page attribute equal to "about"
  myApp.alert('Here comes About page');
});
myApp.onPageInit('index',function(e){
  //myApp.params.swipePanel = 'left';
});
myApp.onPageBeforeAnimation('index',function(e){
  drawIndex();
});
function checkConnection() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    if(networkState==Connection.NONE){
      $$('.connection-msg').addClass('showMsg');
    }else{
      $$('.connection-msg').removeClass('showMsg');
    }
}


//Select language_country Page

//Select language_country Page
function drawCountryLanguage(){
  var output="";
  output+="<div class='row bg_country '  style='background-image:url(images/language.jpg)'>";

    output+="<div class='text_center margin-data col-100'>";
      output+= "<img src='images/language_logo.png'/>";
      output+="<h2 class='txt_cover col-100'>Discover a world of rewards</h2>";
    output+="</div>";

    output+="<div class='col-90 flex_center center_block'>";
       output+="<form method='post' class='ajax-submit' id='main_form'>";
      output+= "<div class='item-input-wrap main_form_language_parent'>";
         output+="<a href='#' class='item-link smart-select select-style' data-open-in='picker'  data-back-on-select='true'>";
          output+="   <select name='language' id='main_form_language'>";
          output+=" <option value='' >Select </option>";
             for(var i=0;i< AppMainData.Language.length;i++){
          //      output+=" <option value='"+AppMainData.Language[i].id+"' data-option-image='"+AppMainData.Language[i].logo+"'>"+Language[i].language+"</option>";
                output+=" <option value='"+AppMainData.Language[i].Id+"' data-option-image='images/arabic.png'>"+AppMainData.Language[i].NameEn+"</option>";
             }
          output+="   </select>";
          output+="   <div class='item-content'>";
          output+="     <div class='item-inner'>";
          output+="  <div class='item-after smart-select-value'>Select Your Language</div>";
          output+="     </div>";
          output+="   </div>";
        output+=" </a>";
        output+="<span class='input-clear-button'></span>";
      output+="</div>";
      output+= "<div class='item-input-wrap main_form_country_parent'>";
        output+="<a href='#' class='item-link smart-select select-style' data-open-in='picker' data-back-on-select='true' >";
            output+="   <select name='country' id='main_form_country'> ";
            output+=" <option value='' >Select </option>";
            for(var i=0;i<AppMainData.Country.length;i++){
              output+="     <option value='"+AppMainData.Country[i].Id+"' >"+AppMainData.Country[i].NameEn+"</option>";
            }
            output+="   </select>";
            output+="   <div class='item-content'>";
            output+="     <div class='item-inner'>";
            output+="  <div class='item-after smart-select-value'>Select Your Country</div>";
            output+="     </div>";
            output+="   </div>";
          output+=" </a>";
        output+="<span class='input-clear-button'></span>";
      output+="</div>";
      output+= "<div class='item-input-wrap'>";
         output+=" <input type='submit' name='submit' value='GET STARTED' class='btn-submit'>";
      output+="</div>";
       output+="</form>";
    output+="</div>";
    output+="<div class='bottom_bar'></div>";
  output+="</div>";
  $$(mainView.activePage.container).find('.language_country').html(output);
}
myApp.onPageBeforeAnimation('language_country',function(e){
  if(AppMainData){
    drawCountryLanguage();
  }else{
  /*  showLoader();
    getBasicUrl(drawCountryLanguage);*/
  }
});
var requires,formId;
myApp.onPageAfterAnimation('language_country',function(e){
  requires=['language','country'];
  formId='main_form';
  LanguageFormAction();
});
function LanguageFormAction(){
  $$('#'+formId).on('submit', submitLang);
//  $$('#'+formId).off('submit', submitLang);
}
function submitLang(e){
     if(checkRequires(requires,formId)){
       $$('#'+formId).find('.input-clear-button').html('');
       var appLanguage={
                'Language':$$('#'+formId +'#'+formId+'_language').val(),
                'Country':$$('#'+formId +'#'+formId+'_country').val(),
              }
       appLanguage=JSON.stringify(appLanguage);
       window.localStorage.setItem("appLanguage",appLanguage);
       mainView.router.loadPage('templates/visitor.html');
   }
  //  e.preventDefault();
    return false;
}
function goToLang(){
  showLoader();
  getBasicUrl(langLoad);
}
function langLoad(){

  mainView.router.loadPage('templates/language_country.html');
}
function checkRequires(requires,formId){
  var flag=true;
  for(var i=0;i<requires.length;i++){
     console.log(requires[i]);
    if(!$$('#'+formId+' #'+formId+'_'+requires[i]).val()){
       $$('#'+formId+' .'+formId+'_'+requires[i]+'_parent').find('.input-clear-button').html('Data Required .');
       flag=false;
    }
  }
  return flag;
}
/*function formEventListner(requires,formId){
  $$('#'+formId).on('beforeSubmit', function (e) {
    if(!$$("#use_name").val())
    return false;
  });
  $$('form.ajax-submit').on('submitted', function (e) {
    var xhr = e.detail.xhr;
    var json = e.detail.data;
  });


}
*/
//visitor Signup Or Register
//visitor Signup Or Register
myApp.onPageBeforeAnimation('visitor',function(e){
  var output="";
  output+="<div class='row bg_cover go_login_select '  style='background-image:url(images/vistor_bg.jpg)'>";

    output+="<div class='text_center margin-data col-100'>";
      output+= "<img src='images/language_logo.png'/>";
    output+="</div>";

    output+="<div class='row col-100 bottom-data'>";
      output+="<div class=' col-90 auto-view'>";
        output+="<a href='templates/login.html' class='link_btn'>Already a Member</a>";
      output+="</div>";

      output+="<div class=' col-100 row'>";
       output+="<div class='two_bars'><span class='white_color'>or connect with</span></div>";
      output+="</div>";

      output+="<div class='col-90 row  no-gap social_btns auto-view'>";
        output+="<div class='col-50 text-center '><a href='' class='white_color btn face_book_btn '><i class='fa fa-facebook'></i>Facebook</a></div>";
        output+="<div class='col-50 text-center '><a href='' class='white_color btn googleplus_btn '><img src='images/google.png'/></a></div>";
      output+="</div>";

      output+="<div class=' col-100 text-center go_sign_up'>";
      output+="<p><a class='white_color' href='templates/register.html'>Don't have an acount?Register Now</a></p>";



      output+="</div>";
    output+="</div>";

  output+="</div>";
  $$(mainView.activePage.container).find('#visitor').html(output);
});
function drawRegisterForm(){
  var output='';
  //output+="<form method='post' class='ajax-submit col-90 auto-view row first_item' id='register_form '>";
 output+= "<div class='item-input-wrap row col-100 register_form_FirstName_parent'>";
   output+= "<input type='text' name='FirstName' id='register_form_FirstName' placeholder='First Name' class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";
 output+= "<div class='item-input-wrap row col-100 register_form_LastName_parent'>";
   output+= "<input type='text' name='LastName' id='register_form_LastName' placeholder='Last Name' class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";

 output+= "<div class='item-input-wrap row col-100 register_form_Email_parent'>";
   output+= "<input type='email' name='Email' id='register_form_Email' placeholder='Email' class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";

 output+= "<div class='item-input-wrap row col-100 register_form_Phone_parent'>";
   output+= "<input type='tel' name='Phone' id='register_form_Phone' placeholder='Phone Number' class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";

 output+= "<div class='item-input-wrap row col-100 register_form_residency_id_parent'>";
   output+= "<input type='tel' name='residency_id' id='register_form_residency_id' placeholder='Residency ID' class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";

 output+= "<div class='item-input-wrap row col-100 register_form_city_parent'>";
    output+="<a href='#' class='item-link smart-select select-style bg_input col-90' data-open-in='picker'  data-back-on-select='true'>"; //2018_10_14 add col-90
     output+="   <select name='City' id='register_form_City'>";
      output+="     <option value='' >Select </option>";
        for(var i=0;i<AppMainData.City.length;i++){
          output+="     <option value='"+AppMainData.City[i].id+"' >"+Language[i].NameEn+"</option>";
        }
     output+="   </select>";
     output+="   <div class='item-content'>";
     output+="     <div class='item-inner'>";
     output+="  <div class='item-after smart-select-value'>Select City</div>";
     output+="     </div>";
     output+="   </div>";
   output+=" </a>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";

 output+= "<div class='item-input-wrap row col-100 register_form_BirthDate_parent'>";
//     output+= "<input type='tel' name='residency_id' id='register_form_residency_id' placeholder='Residency ID' class='input_text  col-90'>";
    output+= "<input type='text' name='BirthDate' id='register_form_BirthDate' placeholder='Birth Date' class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";

 output+= "<div class='item-input-wrap row col-100 register_form_marital_status_parent'>";
    output+="<a href='#' class='item-link smart-select select-style bg_input col-90' data-open-in='picker'  data-back-on-select='true'>"; //2018_10_14 add col-90
     output+="   <select name='marital_status' id='register_form_marital_status'>";
      output+="     <option value='' >Select </option>";
          output+="     <option value='Single' >Single</option>";
          output+="     <option value='Married' >Married</option>";
          output+="     <option value='Widowed' >Widowed</option>";
          output+="     <option value='Separated' >Separated</option>";
          output+="     <option value='Divorced' >Divorced</option>";
     output+="   </select>";
     output+="   <div class='item-content'>";
     output+="     <div class='item-inner'>";
     output+="  <div class='item-after smart-select-value'>Marital Status</div>";
     output+="     </div>";
     output+="   </div>";
   output+=" </a>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";

 output+= "<div class='item-input-wrap col-100'>";
    output+=" <input type='button' name='submit' value='Next' class='col-90 btn-submit' onclick='getNextSlide()'>";  //2018_10_14 add col-90
 output+="</div>";
//  output+="</form>";
return output;
}
function getNextSlide(){
  mySwiper.slideNext();
}
function drawPasswordForm(){
  var output='';
  //  output+="<form method='post' class='ajax-submit col-90 auto-view row ' id='forget_form '>";
  output+= "<div class='item-input-wrap row col-100 register_form_Password_parent'>";
    output+= "<input type='password' name='Password' id='register_form_password' placeholder='Password' class='input_text  col-90'>";
    output+="<span class='col-90 input-clear-button'></span>";
  output+="</div>";
  output+= "<div class='item-input-wrap row col-100 register_form_ConfirmPassword_parent'>";
    output+= "<input type='password' name='ConfirmPassword' id='register_form_ConfirmPassword' placeholder='Confirm Password' class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
  output+="</div>";

  output+= "<div class='item-input-wrap row col-100'>";
     output+=" <input type='button' name='submit' value='Next' class='btn-submit col-90' onclick='getNextSlide()'>";
  output+="</div>";
  //  output+="</form>";
  return output;
}
function drawAgrement(){
  var output='';
  output+="<h2 class='col-90  text-center title_center top_reg m_auto'>Terms and Conditions</h2>";
  output+="<div class='col-90 agree'> is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their";
   output+="infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like) There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum";
  output+="generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</div>";
  output+= "<div class='item-input-wrap col-100 mt-3'>";
     output+=" <input type='submit' name='submit' value='Agree And Submit' class='btn-submit col-90' >";//2018_10_14 add col-90
  output+="</div>";
  return output;
}
//drawRegister
function drawRegister(){
  var output="";
  output+="<div class=' register_page bg_fixed '  style='background-image:url(images/regisrer.jpg)'>";
    output+="<div class='navbar navbar_content'></div>";
    output+="<form method='post' class='ajax-submit col-90 auto-view row ' id='register_form'>";

  output+='  <div class = "swiper-container regisrer-slider ">';
  output+='    <div class = "swiper-wrapper">';

      output+="   <div class='swiper-slide'> ";

        output+="   <div class='row'> ";
           output+="   <div class='row first_item'> ";
                output+="<h2 class='col-100  text-center title_center top_reg m_auto'>register</h2>";

            output+=drawRegisterForm();

         output+=" </div>";
        output+=" </div>";

      output+=" </div>";

    output+="    <div class='swiper-slide' >";

      output+="   <div class='first_item row password_screen'> ";//--new 2018_10_14 addClass password_screen-//
         output+="<h2 class='col-100  text-center title_center top_reg m_auto'>Register</h2>";
         output+=drawPasswordForm();
      output+=" </div>";

    output+="</div>";

    output+="    <div class='swiper-slide '  >";
     output+="   <div class='row first_item'> ";

      output+=drawAgrement();
    output+=" </div>";

    output+=" </div>";



  output+='</div>';

  output+='</div>';
  output+='  <div class = "swiper-pagination pos"></div>';
  output+="</form>";
  output+="</div>";
  $$(mainView.activePage.container).find('.register').html(output);
}

//visitor  Register
myApp.onPageBeforeAnimation('register',function(e){

  drawRegister();


});
var mySwiper;
myApp.onPageAfterAnimation('register',function(e){

  drawNavbarBack();
   myCalendar = myApp.calendar({
      input: '#register_form_BirthDate'
  });

   mySwiper = new Swiper('.regisrer-slider', {
    pagination:'.swiper-pagination',
  });
  requires=['FirstName','LastName','Email','Phone','City','BirthDate'];
  formId='register_form';
  var urlReq=baseUrlMain+'ManageCustomer/CreateCustomer'
  listnerRegisterFormAction(urlReq);

});
//verification code
myApp.onPageAfterAnimation('verification',function(e){
    requires=['number_1','number_2','number_3','number_4','mobile'];
  formId='verif_form';
  var urlReq=baseUrl+'verification.php'
  listnerverificationFormAction(urlReq);
});
myApp.onPageBeforeAnimation('verification',function(e){
  var output="";
  output+="<div class='row'>";
  output+="<div class='col-100 verification_title'>";
    output+="<h1 >Verification</h1>";
  output+="</div>";
  output+="<div class='col-100 verification_content'>";
    output+="<div>We have sent you an access code</div>";
    output+="<div>via SMS for Mobile number verifications</div>";
  output+="</div>";
  output+="<div class='col-100 verification_content'>";
    output+="<div>Sent via SMS on this number</div>";
  output+="</div>";
  output+="<form method='post' class='ajax-submit col-90 auto-view row' id='verif_form'>";
  output+="<div class='col-100 verification_content verif_form_mobile_parent'>";
  output+= "<input type='number' name='mobile' id='verif_form_mobile' value='"+mobileUser+"' class='input_text  col-80 disable'  >";
  output+="<span class='input-clear-button'></span>";
  output+="</div>";
  output+="<div class='col-100 verification_content click_here'>";
    output+="<div>To change number <span class='red_clr'>Clik here</span></div>";
  output+="</div>";
  output+="<div class='col-100 verification_content enter_code'>";
    output+="<a onclick='activeInput()'>enter code here</a>";
  output+="</div>";

 output+= "<div class='item-input-wrap col-100 verif_form_number_parent row'>";
 output+= "<input type='number' name='number_1' id='' placeholder='' max='1'  class='input_text col-25 verif_form_number'>";
 output+= "<input type='number' name='number_2' id='' placeholder=''  max='1' class='input_text col-25 verif_form_number '>";
   output+= "<input type='number' name='number_3' id='' placeholder=''  max='1' class='input_text col-25 verif_form_number'>";
   output+= "<input type='number' name='number_4' id='' placeholder='' max='1'  class='input_text  col-25 verif_form_number'>";
   output+="<span class='input-clear-button'></span>";
 output+="</div>";
 output+=" <input type='submit' name='submit' value='Change password Now' class='btn-submit'>";
  output+="</form>";
  output+="<div class='col-100 verification_content resend'>";
    output+="<a href=''>Resend Code</div>";
  output+="</div>";
  output+="</div>";
  $$(mainView.activePage.container).find('#verification').html(output);
});
function HideToolbar(){
  $$('.toolbar.toolbar-bottom-md').attr('style','display:none');
}
function toolbar(){
  $$('.toolbar.toolbar-bottom-md').removeAttr('style');
  var output="";
  output+='    <div class="toolbar-inner">';
  output+='    <a class="link" href="templates/offers.html"><img src="images/offer.png" /></a>';
  output+='    <a class="link"><img src="images/my_location_icon.png" /></a>';
  output+='    <a class="link"><img src="images/group.png" /></a>';
  output+='    <a class="link"><img src="images/notification_icon.png" /></a>';
  output+='    <a class="link"><img src="images/my_profile_icon.png" /></a>';
  output+='  </div>';
  $$('.toolbar').html(output);
}
function activeInput(){
  $$('#verif_form_mobile').removeClass('disable');
}
myApp.onPageAfterAnimation('show_profile',function(e){
  drawNavbarMenuPage('My Manarti');

});
myApp.onPageBeforeAnimation('show_profile',function(e){
  drawNavbarMenuPage('My Manarti','gray');
  var output="";
  //platinum or silver or blue to user_profile
  output+="<div class='row gold user_profile'>";

    output+="<div class='text-center top_side row col-100'>";
      output+="<div class='col-100'>";
        output+="<h3 class='name'> User Name Here</h3>";
        output+="<div class='status'>Active</div>";
        output+="<div>";

          output+="<div class='user_profile_img'><img src='images/test/profile_photo.png' /></div>";
        output+="</div>";
       output+="</div>";

      output+="<div class='col-90 row auto-view '>";
        output+="<div class='row col-100 text-center rev_pos'>";
            output+="<div class='col-100  small text-center gray_clr'>Watts available to spend</div>";
            output+="<h2 class='col-100  user_points'>1600</h2>";
            output+="<a class='info_icon'><img src='images/info_icon.png' /></a>";
        output+="</div>";

      output+="</div>";
    output+="</div>";

    output+="<div class='col-90 row auto-view '>";
      output+="<div class='row rev_pos col-100 '>";
      output+="<div class='expired col-100 row'>";
        output+="<div class=' small gray_clr'>Expire in 30 days</div>";
        output+="<div>345 Watts</div>";
       output+="<div>Expire 23/7/2018</div>";
      output+="</div>";
      output+="<a class='share_ico'><img src='images/share.png' /></a>";
      output+="</div>";
    output+="</div>";
    output+="<div class='col-100 row'><a class='profile_btn'  href='#' role='button'>Available Coupons</a> </div>";
    output+="<div class='col-100 row'><a  class='profile_btn' href='templates/transactions.html' role='button'>Recent Transactions</a></div>";

  output+="</div>";
$$(mainView.activePage.container).find('.show_profile').html(output);
drawCartPopup();
});
var User={
  'type':'golden',
  'name':'Ahmed Mohmed',
  'cart':'Golden Cart',
  'walts':'1200',
  'avatar':'',
  'expire':'10/10/2019',
  'points':[
            { 'date':'10/10/2019','walts':'1200'},
            { 'date':'10/10/2019','walts':'1000'},
            { 'date':'10/10/2019','walts':'200'},
       ],
}
function drawCartPopup(){
  var output="";

  output+='<div class="content-block">';
  output+='  <p><a href="#" class="close-popup"><img src="images/back_up.png" /></a></p>';

      output+='<div class="max_wdth">';
      output+='<h3>Discover a world of rewards</h3>';
      output+='<div class="card_img" style="background-image:url(images/'+User.type+'_card.png)">';
      output+='<img class="img-fluid" src="images/almanara_logo_details.png" />';

        output+='<div class="row card_details">';
          output+='<div class="text-left col-40">'+User.cart+'</div>';
          output+='<div class="text-right col-60">';
             output+='<h1 class="walts">'+User.walts+'</h1>';
             output+='<div class="s_small">Watts available to spend</div>';
           output+='</div>';
        output+='</div>';

        output+='<h1 class="text-left username my-0">'+User.name+'</h1>';
      output+='</div>';
      output+='</div>';

     output+='<div class="barcode_bg">';
      output+='<div class="max_wdth">';
           output+='<img class="img-fluid" src="images/test/barcode.png" />';
      output+='</div>';
     output+='</div>';



  output+='</div>';

  $$('.popup-cart').html(output);
}
function drawPointsPopup(){
  var output="";
  output+='<div class="content-block">';
  output+='  <p><a href="#" class="close-popup"><img src="images/back_up.png" /></a></p>';
  output+=drawPoints();
  output+='</div>';

  $$('.popup-points').html(output);
}
myApp.onPageAfterAnimation('offers',function(e){
  offerListnerPagination();
});
function offerListnerPagination(){

  // Last loaded index
  lastIndex = $$(mainView.activePage.container).find('.offers .offer_item').length;
  // Attach 'infinite' event handler
  $$('.infinite-scroll').on('infinite', function () {
    // Exit, if loading in progress
    if (loading) return;
    // Set loading flag
    loading = true;
    // Emulate 1s loading
    setTimeout(function () {
      // Reset loading flag
      loading = false;
      if (lastIndex >= maxItems) {
        // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
        myApp.detachInfiniteScroll($$('.infinite-scroll'));
        // Remove preloader
        $$('.infinite-scroll-preloader').remove();
        return;
      }
      appendToOfferData();
    }, 1000);
  });
}
function productsListnerPagination(){

  // Last loaded index
  lastIndexProduct = $$(mainView.activePage.container).find('.products .product_item').length;
  // Attach 'infinite' event handler
  $$('.infinite-scroll').on('infinite', function () {
    // Exit, if loading in progress
    if (loadingProduct) return;
    // Set loading flag
    loadingProduct = true;
    // Emulate 1s loading
    setTimeout(function () {
      // Reset loading flag
      loadingProduct = false;
      if (lastIndexProduct >= maxItemsProduct) {
        // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
        myApp.detachInfiniteScroll($$('.infinite-scroll'));
        // Remove preloader
        $$('.infinite-scroll-preloader').remove();
        return;
      }
      appendToProductData();
    }, 1000);
  });
}
function appendToOfferData(){
  // Generate new items HTML
  requestOfferData(drawOfferAppend);

}
function appendToProductData(){
  // Generate new items HTML
  requestProductData(drawProductAppend);

}
function drawOfferAppend(data){
  var output = '';
  output+=drawItemsOffers(data.offers);
  // Append new items
  $$(mainView.activePage.container).find('.offers').append(output);

  // Update last loaded index
  lastIndex = $$(mainView.activePage.container).find('.offers .offer_item').length;
}
function drawProductAppend(data){
  var output = '';
  output+=drawItemsProducts(data.products);
  // Append new items
  $$(mainView.activePage.container).find('.products').append(output);

  // Update last loaded index
  lastIndexProduct = $$(mainView.activePage.container).find('.products .product_item').length;

}
myApp.onPageBeforeAnimation('offers',function(e){
  drawNavbarMenuOfferPage('Offer','gray');
  requestOfferData(drawOfferPage);
});
function requestOfferData(callback){
  //showLoader();
  offer_page++;
  var language='en';
  var url=baseUrl+'offers.php?pageNumber='+offer_page+'&language='+language;
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      data = JSON.parse(data);
      maxItems=data.data.length;
      if(data.status==200){
      //  hideLoader();
        if(callback){
          callback(data.data);
        }
      }
    }
  });
}
function requestProductData(callback){
  //showLoader();
  product_page++;
  var language='en';
  var url=baseUrl+'products.php?pageNumber='+product_page+'&language='+language;
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      data = JSON.parse(data);
      maxItemsProduct=data.data.length;
      if(data.status==200){
      //  hideLoader();
        if(callback){
          callback(data.data);
        }
      }
    }
  });
}
function drawOfferPage(data){
  var output="";
  output+="<div class='row'>";

      output+="<div class='row col-100  available_on auto '>";
          output+="<div class='col-65'>";
            output+="<div>Available in branches ( "+data.avalibleInBranch+" )</div>";
          output+="</div>";
          output+="<div class='col-35 text-right'>";
            output+="<a class='show_map' href=''><img src='images/pin.png'/> Show Map</a>";
          output+="</div>";
        output+="</div>";
         if(data.length>0){
           output+=drawItemsOffers(data.offers);
         }else{
           output+="No Offer Exists";
         }
    output+="</div>";

   $$(mainView.activePage.container).find('.offers').html(output);

}
function drawProductPage(data){

  var output="";
  output+="<div class='row'>";
    output+="<div class='col-100 text-center cat_img'>";
        output+="<img  class='img-fluid' src='images/panasonic.png' />";
      output+="</div>";

      output+="<div class='row col-100  available_on auto'>";
          output+="<div class='col-65'>";
          output+="<div>Available in branches ( "+data.avalibleInBranch+" )</div>";
          output+="</div>";
          output+="<div class='col-35 text-right'>";
            output+="<a class='show_map' href=''><img src='images/pin.png'/> Show Map</a>";
          output+="</div>";
        output+="</div>";


        output+=drawItemsProducts(data.products);
    output+="</div>";

     $$(mainView.activePage.container).find('.products').html(output);
}
myApp.onPageBeforeAnimation('products',function(e){
  drawNavbarMenuOfferPage('Products Panasonic','gray');
  requestProductData(drawProductPage);
});
myApp.onPageAfterAnimation('products',function(e){
  productsListnerPagination();
});
myApp.onPageBeforeAnimation('transactions',function(e){
  drawNavbarMenuBackPage('Transactions');
  drawPointsPopup();

  var output="";
  output+="<div class='row'>";
    output+="<div class='fixed_bar red_bar col-100 row '>";

      output+="<div class='col-70 '>";
          output+="You have <span class='totalWalt'></span> Watts";
        output+="</div>";

      output+="<div class='col-30'>";

      output+="<p class='my-0 text-right'><a href='#' data-popup='.popup-points' class='open_timline open-popup'><i class='fa fa-calendar' aria-hidden='true'></i></a></p>";
  //     output+="<a href='#'data-popup='.popup' class='open-popup'><i class='fa fa-calendar' aria-hidden='true'></i></a>";
        output+="</div>";
     output+="</div>";

    output+="<div class='col-100 transactionsList'>";
      output+="</div>";

    output+="</div>";

   $$(mainView.activePage.container).find('.transactions').html(output);
   getTransactionDataUser(drawItemsTransactions);

});
function getTransactionDataUser(callback){
  showLoader();
  offer_page++;
  var language='en';
  var url=baseUrl+'transactions.php';
  var formData = new FormData(); // Currently empty
  formData.append('email', 'me@gmail.com');
  formData.append('password', '1234');
  formData.append('language', 'en');

  $.ajax({
    url: url,
    processData: false,
    type: 'POST',
    data:formData,
    data:'email=me@gmail.com&password=1234&language=en',
    success: function ( data ) {
      data = JSON.parse(data);
      if(data.status==200){
        hideLoader();
        if(callback){
          callback(data);
        }
      }
    }
  });


}
myApp.onPageBeforeAnimation('points',function(e){
  var output="";

      output+='<a href="#"><img src="images/back_up.png" /></a>';
       output+=drawPoints();
   $$(mainView.activePage.container).find('.points').html(output);
});
function drawPoints(){
  var output="";

//expired
//expire_second
//expire_first

        output+='<div class="timeline">';
          output+='<div class="timeline-item all_points">';
        //  output+='  <div class="timeline-item-date">21 <small>DEC</small></div>';
            output+='  <div class="timeline-item-divider"></div>';
            output+='    <div class="timeline-item-content">';
            output+='      <div class="timeline-item-time">Watts available to spend</div>';
            output+='      <div class="timeline-item-title">1600</div>';
            output+='    </div>';
          output+='</div>';
         for(var i=0;i<User.points.length;i++){
          //expired or  expire_second or  expire_first  to timeline-item
           output+='  <div class="timeline-item">';
           //  output+='    <div class="timeline-item-date">22 <small>DEC</small></div>';
           output+='    <div class="timeline-item-divider"></div>';
           output+='    <div class="timeline-item-content">';
           output+='      <div class="timeline-item-time">Expire '+User.points[i].date+'</div>';
           output+='      <div class="timeline-item-title">'+User.points[i].walts+'</div>';
           output+='    </div>';
           output+='  </div>';

         }

        output+='  <div class="timeline-item">';
      //  output+='    <div class="timeline-item-date">22 <small>DEC</small></div>';
        output+='    <div class="timeline-item-divider"></div>';
        output+='    <div class="timeline-item-content">';
        output+='      <div class="timeline-item-time">Expire 15/8/2018</div>';
        output+='      <div class="timeline-item-title">975</div>';
        output+='    </div>';
        output+='  </div>';

        output+='  <div class="timeline-item">';
      //  output+='    <div class="timeline-item-date">22 <small>DEC</small></div>';
        output+='    <div class="timeline-item-divider"></div>';
        output+='    <div class="timeline-item-content">';
        output+='      <div class="timeline-item-time">Expire 23/7/2018</div>';
        output+='      <div class="timeline-item-title">345</div>';
        output+='    </div>';
        output+='  </div>';

        output+='  <div class="timeline-item">';
      //  output+='    <div class="timeline-item-date">22 <small>DEC</small></div>';
        output+='    <div class="timeline-item-divider"></div>';
        output+='    <div class="timeline-item-content">';
        output+='      <div class="timeline-item-time">Expired</div>';
        output+='      <div class="timeline-item-title">200</div>';
        output+='    </div>';
        output+='  </div>';

       output+='</div>';
       return output;
}
function getProductDetails(callback){
  var url=baseUrl+'product.php?id=1&language=en';
  $.ajax({
    url: url,
  //  data: data,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      data = JSON.parse(data);
      if(data.status==200){
        hideLoader();
        if(callback){
          callback(data.data);
        }
      }
    }
  });

}

myApp.onPageBeforeAnimation('branch_details',function(e){
  drawNavbarEmpty();
  drawBranch();
});
function drawBranch(){
  var output="";
  output+="<div class='row  text-center details_wrapp rev_pos'>";
        output+="<img src='images/test/group_8.jpg' />";
        output+="<h1>Representative name here</h1>";

        output+="<div class=''>";
            output+="t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem I";
        output+="</div>";
        output+="<h4>Contact</h4>";
        output+="<div>+966 59 573 1400</div>";
        output+="<div>Nearby 15 min</div>";
        output+="<div>Prince Abdul Mohsin Bin Abdulaziz Rd.Al Malaz, Ar Riyad, Saudi Arabia</div>";
        output+="<a href='templates/branch_distance.html?query=1'> get direction</a>";


    output+="</div>";

   $$(mainView.activePage.container).find('.branch_details').html(output);
}
myApp.onPageBeforeAnimation('branches',function(e){
  drawNavbarEmpty();
  drawBranches();
  $$(mainView.activePage.container).find('.error_data').html('');
});
myApp.onPageBeforeAnimation('brnches_map',function(e){
  drawNavbarRedBack();
  branchesMap();
});
var map;
myApp.onPageAfterAnimation('brnches_map',function(e){
  var mapDiv = document.getElementById("map_canvas");
  var options = {
    camera: {
      target: {lng: -122.1180187, lat: 37.3960513},
      zoom: 19
    }
  };
  map = plugin.google.maps.Map.getMap(mapDiv,options);
   // The MAP_READY event notifies the native map view is fully ready to use.
   map.on(plugin.google.maps.event.MAP_READY, onMapInit);
   listnerMap();
  });
  myApp.onPageBeforeAnimation('branch_distance',function(e){
    drawNavbarRedBack();
    brancheDistanceMap();
  });
var map;
var map_distance;
myApp.onPageAfterAnimation('branch_distance',function(e){
  console.log('ddd');
  var mapDiv = document.getElementById("map_branch");
  var options = {
    camera: {
      target: {lng: -122.1180187, lat: 37.3960513},
      zoom: 19
    }
  };
  //map_distance
  var HND_AIR_PORT = {lat: 35.548852, lng: 139.784086};
  var SFO_AIR_PORT = {lat: 37.615223, lng: -122.389979};
  var AIR_PORTS = [
    HND_AIR_PORT,
    SFO_AIR_PORT
  ];

  map_distance = plugin.google.maps.Map.getMap(mapDiv,{
  camera: {
    target: AIR_PORTS
  }
  });
  // The MAP_READY event notifies the native map view is fully ready to use.
  map_distance.on(plugin.google.maps.event.MAP_READY, onMapInitBranch);
  listnerMap();
});
function listnerMap(){
  $$("#map_area").on("blur", function () {
    map.setClickable(true);
  }).on("click", function () {
    map.setClickable(false);
  }).on("change", function () {
    event.stopPropagation();
    event.preventDefault();
    // searching
  });

  $$("#map_area").on('change',function(){
    map.animateCamera({
      target: bounds
    });
    map.moveCamera({
      target: bounds
    });
  });
}
function onMapInitBranch() {
  $$('.page-on-left').addClass('hidden');
  var width=$$('body').outerWidth();
  var height=$$('body').outerHeight();
  $$('#map_branch').attr('style','width:'+width+'px !important;height: '+height+'px !important');
  // Add a polyline
  //map_distance
  var HND_AIR_PORT = {lat: 35.548852, lng: 139.784086};
  var SFO_AIR_PORT = {lat: 37.615223, lng: -122.389979};
  var AIR_PORTS = [
    HND_AIR_PORT,
    SFO_AIR_PORT
  ];

  map_distance.addMarker({
    'position': HND_AIR_PORT,
    icon:'images/branch_map.png',
  });
  map_distance.addMarker({
    'position': SFO_AIR_PORT,
    icon:'images/manara_icon.png',
  });


  map_distance.addPolyline({
    points: AIR_PORTS,
    'color' : 'red',
    'width': 10,
    'geodesic': true
  });
}
function drawBranchData(id){
  var output="";
  output+="<div>";
    output+="<div style='background-image:url(images/test/group_8.jpg)'>";
      output+="<a href='templates/branch_details.html?query="+id+"'> get direction</a>";

    output+="</div>";
  output+="</div>";

 $$(mainView.activePage.container).find('.branch_data').html(output);
}
/*map.moveCamera({
  target: bounds
});*/

function onMapInit(map) {
  $$('.page-on-left').addClass('hidden');
  var width=$$('body').outerWidth();
  var height=$$('body').outerHeight();
  $$('#map_canvas').attr('style','width:'+width+'px !important;height: '+height+'px !important');
  var data = [
    {
      position: {lng: -122.1180187, lat: 37.3960513},
      title: "Ardis G Egan Intermediate School",
      icon:'images/branch_map.png',
      id:1,
    },
    {
      position: {lng: -122.1102408, lat: 37.3943847},
      title: "Portola School",
      icon:'images/manara_icon.png',
      id:2,
    },
    {
      position: {lng: -122.0848257, lat: 37.3818032},
      title: "Isaac Newton Graham Middle School",
      icon:'images/manara_icon.png',
      id:3,
    },
    {
      position: {lng: -122.1082962, lat: 37.3863294},
      title: "Los Altos High School",
      icon:'images/branch_map.png',
      id:4,
    },
    {
      position: {lng: -122.013571, lat: 37.3874409},
      title: "The Kings Academy",
      icon:'images/branch_map.png',
      id:5,
    },
    {
      position: {lng: -122.082462, lat: 37.3627189},
      title: "Georgina P Blach Intermediate School",
      icon:'images/manara_icon.png',
      id:6,
    },
    {
      position: {lng: -122.0421832, lat: 37.3766077},
      title: "Benner Junior High School",
      icon:'images/branch_map.png',
      id:7,
    }
  ];
  var bounds = [];
  var markers = data.map(function(options) {
    bounds.push(options.position);
    map.addMarker(options,function(marker){
      marker.set("data_id", 1);
      marker.on(plugin.google.maps.event.MARKER_CLICK, function() {
        console.log(this);
        console.log(this.get("data_id"));
        var id=this.get("data_id");
        drawBranchData(id);
      });
    });

  });

}
function drawBranchData(id){
  var output="";
  output+="<div>";
    output+="<div style='background-image:url(images/test/group_8.jpg)'>";
      output+="<a href='templates/branch_details.html?query="+id+"'> get direction</a>";

    output+="</div>";
  output+="</div>";

 $$(mainView.activePage.container).find('.branch_data').html(output);
}
/*map.moveCamera({
  target: bounds
});*/


function brancheDistanceMap(){
  var output='';
  output+="<div class='row'>";
     output+="<div class='col-100'>";
        output+="<div class='map_canvas' id='map_branch'>";
      output+='<div id="searchBox">';
               output+="<a href='#' class='item-link smart-select select-style' data-open-in='picker'  data-back-on-select='true'>";
               output+="   <select name='area' id='map_area'>";
               output+=" <option value='' >Select </option>";
               output+=" <option value='2' >Cairo</option>";
               output+=" <option value='3' >Cairo</option>";
               output+=" <option value='4' >Cairo</option>";
               output+=" <option value='5' >Cairo</option>";
               output+=" <option value='6' >Cairo</option>";
               output+="   </select>";
               output+="   <div class='item-content'>";
               output+="     <div class='item-inner'>";
               output+="  <div class='item-after smart-select-value'>Select Your Area</div>";
               output+="     </div>";
               output+="   </div>";
               output+=" </a>";
          output+='</div>';


        output+="</div>";
     output+="</div>";
  output+="</div>";

  $$(mainView.activePage.container).find('.branch_distance').html(output);

}
function branchesMap(){
  var output='';
  output+="<div class='row'>";
     output+="<div class='col-100'>";
        output+="<div class='map_canvas' id='map_canvas'>";
      output+='<div id="searchBox">';
               output+="<a href='#' class='item-link smart-select select-style' data-open-in='picker'  data-back-on-select='true'>";
               output+="   <select name='area' id='map_area'>";
               output+=" <option value='' >Select </option>";
               output+=" <option value='2' >Cairo</option>";
               output+=" <option value='3' >Cairo</option>";
               output+=" <option value='4' >Cairo</option>";
               output+=" <option value='5' >Cairo</option>";
               output+=" <option value='6' >Cairo</option>";
               output+="   </select>";
               output+="   <div class='item-content'>";
               output+="     <div class='item-inner'>";
               output+="  <div class='item-after smart-select-value'>Select Your Area</div>";
               output+="     </div>";
               output+="   </div>";
               output+=" </a>";
          output+='</div>';

          output+='<div class="branch_data"></div>';

        output+="</div>";
     output+="</div>";
  output+="</div>";

  $$(mainView.activePage.container).find('.brnches_map').html(output);
}
myApp.onPageAfterAnimation('branches',function(e){
  //form_area
  requires=['area'];
  formId='form_area';
  $$('.input-clear-button').html('');
  branchesListerner();
});
function branchesListerner(){
  $$('#'+formId).on('submit',branchesData);

  //$$('#'+formId).on('submitted',submitFormResult);
   //$$(mainView.activePage.container).find('#find_branches').off('click',CheckBranches());
}
function branchesData(e){
//  e.preventDefault();
  if(checkRequires(requires,formId)){
    $$('#'+formId).find('.input-clear-button').html('');
  var areaId=  $$(mainView.activePage.container).find('#form_area_area').val()
    mainView.router.loadPage('templates/brnches_map.html?query='+areaId);
    return false;
  }
  return false;
}
function drawBranches(){
  var output="";
      output+="<div class='row' style='background-image:url(images/branch.jpg)'>";

      output+="<div class='col-100'>";
         output+="<img  src='images/pin_branch.png' />";
         output+="<h3>Choose your Location</h3>";

         output+="<form method='post' class='ajax-submit col-90 auto-view row' id='form_area'>";
         output+= "<div class='item-input-wrap col-100 row form_area_area_parent'>";

         output+="<a href='#' class='item-link smart-select select-style' data-open-in='picker'  data-back-on-select='true'>";
         output+="   <select name='area' id='form_area_area'>";
         output+=" <option value='' >Select </option>";
         output+=" <option value='2' >Cairo</option>";
         output+=" <option value='3' >Cairo</option>";
         output+=" <option value='4' >Cairo</option>";
         output+=" <option value='5' >Cairo</option>";
         output+=" <option value='6' >Cairo</option>";
         output+="   </select>";
         output+="   <div class='item-content'>";
         output+="     <div class='item-inner'>";
         output+="  <div class='item-after smart-select-value'>Select Your Area</div>";
         output+="     </div>";
         output+="   </div>";
         output+=" </a>";
         output+="<span class='input-clear-button'></span>";
         output+="</div>";

         output+= "<div class='item-input-wrap col-100'>";
         output+=" <input type='submit' name='submit' value='Find Branch now' class='btn-submit'>";
         output+="</div>";
         output+="</form>";


       output+="</div>";

      output+="</div>";
   $$(mainView.activePage.container).find('.branches').html(output);
}
myApp.onPageBeforeAnimation('product_details',function(e){
  drawNavbarEmpty();
  getProductDetails(drawProductDetails);
});
function drawProductDetails(data){
  var output="";
  output+="<div class='row  text-center details_wrapp rev_pos'>";

        output+="<div class='max_wdth the_top_sec'>";

         output+="<div class='col-100'>";
            output+="<img class='img-fluid' src='images/almanara_logo_details.png' />";
          output+="</div>";

        output+="<div class='col-100'>";
            output+="<img class='img-fluid' src='images/panasonic.png' />";
        output+="</div>";

        output+="<div class='col-100'>";
            output+="<img  class='img-fluid'  src='"+data.product.image+"' />";
            output+="<h3 class='mb-0 text_uppercase'>you need help?</h3>";
            output+="<div class='small gray_clr'>Search now for nearby branch for you</div>";
        output+="</div>";

    output+="</div>";

    output+="<div class='bottom_bar bottom_go_location'>";

      output+="<a href='templates/branches.html' class='col-100 arrow'>";
          output+="<div class='small gray_clr'>Let’s Go</div>";
          output+="<img src='images/arrow.png' />";
      output+="</a>";

      output+="<div class='col-100 '>";
          output+="<img src='images/white_pin.png' />";
      output+="</div>";

    output+="</div>";

    output+="</div>";

   $$(mainView.activePage.container).find('.product_details').html(output);
}
function drawItemsProducts(products){
  var output ="";
  for(var i=0;i<products.length;i++){
    output+=drawItemProduct(products[i]);
  }
   return output;
}
function drawItemsTransactions(data){
  var output ="";
   //add total point
     $$(mainView.activePage.container).find('.totalWalt').html(data.data.total_point);
     for(var i=0;i<data.data.transactions.length;i++){
       output+=drawItemTransaction(data.data.transactions[i]);
     }
     $$(mainView.activePage.container).find('.transactionsList').html(output);
}
function drawItemTransaction(item){
  var output="";
      output+="<div class='row col-95 items_stretch auto-view transactions_item'>";
         output+="<div class='col-40 text-center watts_count_inner'>";
             output+="<div class='watts_inner'>";
             output+="<span class='col-100 row watts_count'>"+item.watts+"</span><span class='col-100 row watt'>Watt</span>";
            output+="</div>";
         output+="</div>";
         output+="<div class='col-60 row'>";
             output+="<div class='col-100 '>";
                  output+="<h3 class='my-0'>"+item.name+"</h3>";
                  output+="<div class='mb-20  gray_clr s_small'>"+item.description+"</div>";
            output+="</div>";
            output+="<div class='small row col-100 '>";
               output+="<div class='col-100  row'>Date</div>";
               output+="<div class='col-100 gray_clr row'> "+item.date+"</div>";
           output+="</div>";
         output+="</div>";
      output+="</div>";
  return output;

}
function drawItemsOffers(offers){
  var output ="";
     for(var i=0;i<offers.length;i++){
       output+=drawItemOffer(offers[i]);
     }
   return output;
}
function drawItemOffer(item){
  var output="";
      output+="<a class='product_item offer_item row col-95 auto-view' href='templates/product_details.html' class='offer_item'>";
          output+="<div class='row col-100'>";
            // output+="<div class='col-50'><img src='images/20_icon.png'/>"+item.discount+"</div>";
              output+="<div class='col-50 '></div>";
             output+="<div class='col-50 text-right s_small'>Expiry date : "+item.expiry_date+"</div>";
          output+="</div>";

          output+="<div class='row col-100'>";
            output+="<div class='col-100 product_img text-center'>";
                output+="<div class='col-50 discount_img'><img src='images/20_icon.png'/></div>";
                output+="<img class='img-fluid' src='"+item.image+"' />";
            output+="</div>";
          output+="</div>";

          output+="<div class='details row col-100'>";
          output+="<div class='col-70'>";
          output+="<h1 class='model'>MODEL NO. "+item.model+"</h1>";
          output+="</div>";
          output+="<div class='col-30 text-right before_after'>";
              output+="<div class='before small gray_clr'>"+item.watts_before_discount+" Watts</div>";
                 output+="<h2>"+item.watts_after_discount+" Watts</h2>";
              output+="</div>";

        output+="<div class='col-100 desc s_small bb'>"+item.description+"</div>";


         output+="</div>";

      output+="</a>";
  return output;
}
function drawItemProduct(item){
  var output="";
      output+="<a  href='templates/product_details.html' class='row col-95 auto-view text-center product_item'>";
      output+="<div class='col-100 row'>";
          output+="<div class='col-100 product_img text-center'>";
            output+="<img class='img-fluid' src='"+item.image+"' />";
           output+="</div>";
      output+="</div>";

      output+="<div class='row col-100'>";
        output+="<div class='col-100'>";
           output+="<h1 class='model'>MODEL NO. "+item.model+"</h1>";
           output+="<div class='col-100 desc s_small'>"+item.description+"</div>";
        output+="</div>";
      output+="</div>";
      output+="</a>";
  return output;
}

//when user select img
 function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#the_user_img').css('background-image', "url(" + e.target.result + ")");
                    $('.the_user_img').css('opacity', "1");
                   //$('#the_user_img').attr('src', e.target.result) .width(150)

                };
                reader.readAsDataURL(input.files[0]);
            }
        }
//
myApp.onPageBeforeAnimation('profile',function(e){
  var user=JSON.parse(window.localStorage.getItem('User'));

  var output="";
  output+="<div class='row'>";

    output+="<form method='post' class='ajax-submit gray_clr text-center min_h justify_content_ col-90 auto-view row' id='profile_form' enctype='multipart/form-data'>";

      output+= "<div class='my-1 item-input-wrap col-100 profile_form_avatar_parent' style='background-image:url()'>";
        output+="<div class='avatar_img'><img src=' images/avatar.png'/>";

          output+="<div id='the_user_img' class='the_user_img'></div>";
          output+="<span class='photo_txt'>your photo</span>";
          output+="<span class='cam_ico'><img src='images/camara.png'></span>";

          output+= "<input type='file' name='avatar' onchange='readURL(this);' id='profile_form_avatar' accept='image/*;capture=camera'>";
        output+="</div>";
        output+="<span class='input-clear-button'></span>";

      output+="</div>";

      output+="<h1 class='col-100 my-1 red_clr'>Welcome</h1>";
      output+="<div class='col-100 my-1'>this is your first login <br/> Please complete your data and enjoy</div>";
      output+= "<div class='my-1 item-input-wrap col-100'>";
        output+=" <input type='submit' name='submit' value='Save' class='btn-submit'>";
      output+="</div>";
    output+="</form>";
    output+= "<div class='item-input-wrap col-90 auto-view my-1'>";
      output+="<a class='skip_to_profile gray_clr' href='templates/show_profile.html'>Skip >></a>";
    output+="</div>";

    output+="</div>";

  $$(mainView.activePage.container).find('.profile').html(output);
});
myApp.onPageAfterAnimation('profile',function(e){
   requires=['avatar'];
   formId='profile_form';
  var urlReq=baseUrl+'profile.php'
  listnerProfileFormAction(urlReq);
});


//login Page
myApp.onPageAfterAnimation('login',function(e){
   requires=['Email','Password'];
   formId='login_form';
   var urlReq=baseUrlMain+'ManageAccount/Login'
   listnerFormAction(urlReq);
});
function listnerFormAction(urlReq){
  $$('#'+formId).attr('action',urlReq);
  $$('#'+formId).on('submit',submitForm);
  $$('#'+formId).on('submitted',submitFormResult);
//  $$('#'+formId).off('submit',submitForm(requires,formId));
}
function listnerRegisterFormAction(urlReq){
  $$('#'+formId).attr('action',urlReq);
  $$('#'+formId).on('submit',submitFormRegister);
  $$('#'+formId).on('submitted',submitFormResultRegister);
//  $$('#'+formId).off('submit',submitForm(requires,formId));
}
function listnerverificationFormAction(urlReq){
  $$('#'+formId).attr('action',urlReq);
  $$('#'+formId).on('submit',submitForm);
  //number_1','number_2','number_3','number_4'
  $$('#'+formId).on('submitted',submitFormResultVerification);
//  $$('#'+formId).off('submit',submitForm(requires,formId));
}
function listnerProfileFormAction(urlReq){
  $$('#'+formId).attr('action',urlReq);
  $$('#'+formId).on('submit',submitForm);
  //number_1','number_2','number_3','number_4'
  $$('#'+formId).on('submitted',submitFormResultProfile);
//  $$('#'+formId).off('submit',submitForm(requires,formId));
}
var mobileUser;
function listnerForgetFormAction(urlReq){
  $$('#'+formId).attr('action',urlReq);
  $$('#'+formId).on('submit',submitForm);
  $$('#'+formId).on('submitted',submitFormResultForget);
//  $$('#'+formId).off('submit',submitForm(requires,formId));
}
function listnerchangePasswordFormAction(urlReq){
  $$('#'+formId).attr('action',urlReq);
  $$('#'+formId).on('submit',submitForm);
  $$('#'+formId).on('submitted',submitFormResultChangePassword);
//  $$('#'+formId).off('submit',submitForm(requires,formId));
}
function submitFormResult(e){
  var xhr = e.detail.xhr; // actual XHR object
  var data = e.detail.data; // Ajax response from action file
   console.log(data.Data);
  // data = JSON.parse(data);
  mainView.router.loadPage('templates/profile.html');

  if(data.Data){
    $$('#'+formId).find('.input-clear-button').html('');
     var user={
       'email':  $$('#'+formId+'_email').val(),
       'password':  $$('#'+formId+'_password').val(),
     };
    user=JSON.stringify(user);
    var userData=JSON.stringify(data.Data);
    window.localStorage.setItem("appLanguage",appLanguage);
    window.localStorage.setItem("User",user);
    window.localStorage.setItem("UserData",userData);
    mainView.router.loadPage('templates/profile.html');
    //save User
  }else{
    showError(data.messages);
  }
}
function submitFormResultChangePassword(e){
  var xhr = e.detail.xhr; // actual XHR object
  var data = e.detail.data; // Ajax response from action file
   data = JSON.parse(data);
  if(data.status==200){
    $$('#'+formId).find('.input-clear-button').html('');
     var user={
       'email': data.user.email,
       'password':  $$('#'+formId+'_password').val(),
     };
     user=JSON.stringify(user);
    window.localStorage.setItem("User",user);
    mainView.router.loadPage('templates/profile.html');
    //save User
  }else{
    showError(data.messages);
  }
}
function submitFormResultRegister(e){
  var xhr = e.detail.xhr; // actual XHR object
  var data = e.detail.data; // Ajax response from action file
  console.log(data);
   data = JSON.parse(data);
  if(data.status==200){
    $$('#'+formId).find('.input-clear-button').html('');
     var user={
       'email':  $$('#'+formId+'_email').val(),
       'password':  $$('#'+formId+'_password').val(),
     };
     user=JSON.stringify(user);
    window.localStorage.setItem("User",user);
    mainView.router.loadPage('templates/profile.html');
    //save User
  }else{
    showError(data.messages);
    mySwiper.slideTo('0');
  }
}
function submitFormResultVerification(e){
  var xhr = e.detail.xhr; // actual XHR object
  var data = e.detail.data; // Ajax response from action file
   data = JSON.parse(data);
  if(data.status==200){
    $$('#'+formId).find('.input-clear-button').html('');
    mainView.router.loadPage('templates/change_password.html');
    //save User
  }else{
    for (var k in data.messages){
      if(k=='mobile'){
        $$('#'+formId+' .'+formId+'_'+k+'_parent').find('.input-clear-button').html(data.messages[k]);
      }else {
        $$('#'+formId+' .'+formId+'_number'+'_parent').find('.input-clear-button').html(data.messages[k]);
      }
    }
  }
}
function submitFormResultProfile(e){
  var xhr = e.detail.xhr; // actual XHR object
  var data = e.detail.data; // Ajax response from action file
   data = JSON.parse(data);
  if(data.status==200){
    $$('#'+formId).find('.input-clear-button').html('');
    mainView.router.loadPage('templates/show_profile.html');
    //save User
  }else{
    showError(data.messages);
  }
}
function submitFormResultForget(e){
  var xhr = e.detail.xhr; // actual XHR object
  var data = e.detail.data; // Ajax response from action file
   data = JSON.parse(data);
   mobileUser=$$('#forget_password_form_mobile').val();
  if(data.status==200){
    $$('#'+formId).find('.input-clear-button').html('');
    window.localStorage.setItem("Verfication",data.verificationNumber);
    mainView.router.loadPage('templates/verification.html');
    //save User
  }else{
    showError(data.messages);
  }
}
function showError(msg){
  for (var k in msg){
    $$('#'+formId+' .'+formId+'_'+k+'_parent').find('.input-clear-button').html(msg[k]);
  }
}
function submitForm(e){
   document.activeElement.blur();
   if(checkRequires(requires,formId)){

     $$('#'+formId).find('.input-clear-button').html('');
     /*       window.localStorage.setItem("UserLanguage", $$('#'+formId +'#'+formId+'_language').val());
     window.localStorage.setItem("UserCountry", $$('#'+formId +'#'+formId+'_country').val());
     */    //   add to storage
     //   mainView.router.loadPage('templates/visitor.html')
   }
   return false;

}
function submitFormRegister(e){
   document.activeElement.blur();
   if(requires['Password']==requires['ConfirmPassword']&&checkRequires(requires,formId)){
     $$('#'+formId).find('.input-clear-button').html('');
     /*       window.localStorage.setItem("UserLanguage", $$('#'+formId +'#'+formId+'_language').val());
     window.localStorage.setItem("UserCountry", $$('#'+formId +'#'+formId+'_country').val());
     */    //   add to storage
     //   mainView.router.loadPage('templates/visitor.html')
   }
   return false;
}
myApp.onPageBeforeAnimation('login',function(e){
  var output="";
      output+="<div class='row bg_country ' style='background-image:url(images/vistor_bg.jpg)'>";

        output+="<div class='text_center margin-data col-100'>";
          output+= "<img src='images/language_logo.png'/>";
        output+="</div>";

        output+="<div class='row col-100'>";
          output+="<h2 class='col-100  text-center title_center'>LOGIN</h2>";
          output+="<form method='post' class='ajax-submit col-90 auto-view row' id='login_form'>";
         output+= "<div class='item-input-wrap col-100 row login_form_Email_parent'>";
           output+= "<input type='email' name='Email' id='login_form_Email' placeholder='User Id' class='input_text  col-100'>";
           output+="<span class='input-clear-button'></span>";
         output+="</div>";
         output+= "<div class='item-input-wrap col-100 row login_form_Password_parent'>";
           output+= "<input type='password' name='Password' id='login_form_Password' placeholder='Password'  class='input_text  col-100'>";
           output+="<span class='input-clear-button'></span>";
         output+="</div>";

         output+= "<div class='item-input-wrap col-100'>";
            output+=" <input type='submit' name='submit' value='Login now' class='btn-submit'>";
         output+="</div>";
         output+="<div class='forget_password col-100'><a href='templates/forgot_password.html'>Forgot password ?</a></div>";
          output+="</form>";

          output+="<div class=' col-100 row text-agreement'>";
          output+="<p class='col-90 text-center'>By signing up or logging in to this app, you agree to our Terms &amp; Conditions and Privacy Policy.</p>";
          output+="</div>";
        output+="</div>";

      output+="</div>";
  $$(mainView.activePage.container).find('#login').html(output);
});
//forgot_password Page
myApp.onPageBeforeAnimation('forgot_password',function(e){
  var output="";
  var output="";
      output+="<div class='row bg_country align_items_center' style='background-image:url(images/forget_bg.jpg)'>";

        output+="<div class='row col-100 forget'>";
          output+="<h1 class='col-100 my-0  text-center title_center'>Forgot Password</h1>";
          output+="<div class='my-1 col-90  text-center my-1 title_center center_box'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</div>";
          output+="<form method='post' class='ajax-submit col-90 auto-view row' id='forget_password_form'>";
         output+= "<div class='item-input-wrap col-100 row forget_form_mobile_parent'>";
           output+= "<input type='tel' name='mobile' id='forget_password_form_mobile' placeholder='Mobile Number' class='input_text  col-100'>";
           output+="<span class='input-clear-button'></span>";
         output+="</div>";
         output+= "<div class='item-input-wrap col-100'>";
            output+=" <input type='submit' name='submit' value='Send' class='btn-submit'>";
         output+="</div>";

        output+="</div>";

      output+="</div>";


  $$(mainView.activePage.container).find('#forgot_password').html(output);
});


myApp.onPageAfterAnimation('forgot_password',function(e){
  requires=['mobile'];
  formId='forget_password_form';
  var urlReq=baseUrl+'forget_password.php'
  listnerForgetFormAction(urlReq);
});

//change_password Page
myApp.onPageBeforeAnimation('change_password',function(e){
  var output="";
      output+="<div class='row'>";
      output+="<div class='col-100 verification_title'>";
        output+="<h1 >Change Password</h1>";
        output+="<img src='images/password_icon.png'>";
      output+="</div>";
      output+="<form method='post' class='ajax-submit col-90 auto-view row' id='change_password_form'>";
      output+="<div class='col-100 verification_content change_password_form_password_parent'>";
      output+= "<input type='password' name='password' placeholder='Password' id='change_password_form_password' value='' class='input_text  col-90 '  >";
      output+="<span class='input-clear-button'></span>";
      output+="</div>";
      output+="<div class='col-100 verification_content change_password_form_confirm_password_parent'>";
      output+= "<input type='password' name='confirm_password' placeholder='Confirm Password' id='change_password_form_confirm_confirm_password_parent' value='' class='input_text  col-90 '  >";
      output+="<span class='input-clear-button'></span>";
      output+="</div>";

     output+=" <input type='submit' name='submit' value='Change Password' class='btn-submit'>";
      output+="</form>";
      output+="</div>";
  $$(mainView.activePage.container).find('.change_password').html(output);
});
myApp.onPageAfterAnimation('change_password',function(e){
  drawNavbarBack();
  requires=['password','confirm_password'];
  formId='change_password_form';
  var urlReq=baseUrl+'change_password.php'
  listnerchangePasswordFormAction(urlReq);

});

function drawIndex(){
  var output='';
  output+='   <div  class="swiper-container home-slider swiper-init" data-pagination=".swiper-pagination" data-space-between="0">';
  output+="             <img class='img-fluid intro-logo' src='images/almanara_logo.png'/>";

  output+=" <div class='home_text home__bottom_text text-center abs-pos'>";
  output+="         <div class='inner'>";
  output+="             <span class='bold'>Panasonic</span>";
  output+="             <span class='orange_colr'>Homes & Living</span>";
  output+="         </div>";
  output+="         <a  class='next' href='#' onclick='goToLang()'> Next</a>";
  output+="     </div>";
  output+='  <div class="swiper-pagination"></div>';
  output+=' <div class="swiper-wrapper ">';
  for(var i=0;i<AppData.Banners.length;i++){
    output+=  "<div class='swiper-slide' style='background:url("+AppData.Banners[i].image+")' >";
    output+=  "<div class='home_text des text-center abs-pos'>";
    output+=  "<p class=''>";
    output+= " We <span class='bold'>DELIVER</span> Quality  <p> Just For  You</p>";
    output+= " </div>";

    output+= "</div>";
  }
  output+='       </div>';
  output+='   </div>';
  $$('.index').html(output);
  var swiper = new Swiper('.home-slider', {
   pagination:'.swiper-pagination',
 });
}

function releaseApp(){
//  drawNavbar();
//  drawMenu();
//if User Already Exists
 //Get Data From server
 //else New User
 HideToolbar();
//window.localStorage.removeItem("User");
//window.localStorage.clear();

 var user = window.localStorage.getItem("User");
  showLoader();
  getBasicUrl(drawIndex);
  if(user&&user!=null){
    mainView.router.loadPage('templates/products.html');
  }
}
function getBasicUrl(callback){
  var url=baseUrl+'list.php';
  $.ajax({
    url: url,
  //  data: data,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      data = JSON.parse(data);
      if(data.status==200){
        AppData=data.data;
        hideLoader();
        if(callback){
          callback();
        }
      }
    }
  });
  getLanguageApi();
  getCountryApi();
  getCityApi();
}
function getLanguageApi(){
  var url=baseUrlMain+'ManageGeneralData/GetAllLanguage';
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      //data = JSON.parse(data);
      if(data.Data){
        AppMainData.Language=data.Data;
        console.log('data',data.Data);
        console.log(typeof data.Data);
       }
    }
  });
}
function getCityApi(){
  var url=baseUrlMain+'ManageGeneralData/GetAllCity';
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      //data = JSON.parse(data);
      if(data.Data){
        AppMainData.City=data.Data;
        console.log('data',data.Data);
       }
    }
  });
}
function getCountryApi(){
  var url=baseUrlMain+'ManageGeneralData/GetAllCountry';
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      //data = JSON.parse(data);
      if(data.Data){
        AppMainData.Country=data.Data;
        console.log('data',data.Data);
       }
    }
  });
}
function showLoader(){
  $$('.loader-bg').removeClass('hidden');
}
function hideLoader(){
  $$('.loader-bg').addClass('hidden');
}
var baseUrl='https://www.mina-myworks.com/Reham/Service/';
var baseUrlMain='http://46.105.99.135:881/api/';
releaseApp();
