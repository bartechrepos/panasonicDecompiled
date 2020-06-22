// Initialize app
var myApp = new Framework7({
  // App id
  id: 'com.myapp.test',
  name: 'Almanara',
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
  ignoreCache:true,
  reloadPrevious:true,
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
var userInfo;

function onDeviceReady() {
  // Now safe to use the Cordova API
  console.log('device Ready');

  releaseApp();

  ln.init();
  checkConnection();
  //setTimeout(function(){ ln.init(); }, 3000);
  document.addEventListener("backbutton", function(e){
    myApp.closePanel();
    if(myCalendar){
      myCalendar.close();
    }
    if ( mainView.activePage.name === 'index') {
      //window.location = "#exitDialog";
      exitAppPopup();
    }else{
      myApp.closeModal('.picker-modal');
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
document.addEventListener('deviceready', onDeviceReady);
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});
var AppMainData={};
var Areas={};
var Branches={};
var AreasObj={};
var BranchesObj={};
/*var Language=[
   {'id':'en','language':'English','logo':'images/english.png'},
   {'id':'ar','language':'Arabic','logo':'images/arabic.png'},
   {'id':'in','language':'India','logo':'images/india.png'},
   {'id':'ur','language':'Urdu','logo':'images/india.png'},
   {'id':'be','language':'Bengali','logo':'images/india.png'},
];
*/
function changeLaguage(){
  var lang=window.localStorage.getItem("appLanguage");
  lang=JSON.parse(lang);
  getAllLanguageData(lang,getLocalLanguage);

}
var currentLang;
function getLocalLanguage(lang){
  for(var i=0;i< AppMainData.Language.length;i++){
    if(lang.Language==AppMainData.Language[i].Id){
      currentLang=AppMainData.Language[i];
      displayLanguage();
      mainView.router.loadPage('templates/slider.html');
      break;
    }
  }
}
function displayLanguage()
{
  if(!currentLang){
    var lang=window.localStorage.getItem("appLanguage");
    lang=JSON.parse(lang);
    for(var i=0;i< AppMainData.Language.length;i++){
      if(lang.Language==AppMainData.Language[i].Id){
        currentLang=AppMainData.Language[i];
        break;
      }
    }

  }
  var languageName=currentLang.NameEn.toLowerCase();
  console.log(languageName);
  ln.getLanguage(
    {
      //Default values
      value: languageName
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
  console.log(message);
  //getAllLanguageData(currentLang.Id);

}
function reinit(){
  location.reload();
}
function drawMenu(){
  var output="";
  var userData = window.localStorage.getItem("UserData",userData);
  userData=JSON.parse(userData);

    output+="<ul class='list content-block'> ";

        output+="<li class='navbar-inner profile_nav'>";

          output+="<div class='center sliding'>";


            output+="<div class='user_profile_img'>";
              output+="<div class='img' style='background-image:url("+userData.ProfileImage+")'> </div>"
            output+="</div>";

            output+="<div class='u_data'>";
               output+="<div class='text_uppercase u_name'>"+userData.FirstName+" "+userData.LastName+"  </div>";
               output+="<div class='small'>"+userData.Email+"</div>";
            output+="</div>";

          output+="</div>";

        output+="</li>";


        output+="  <li>";
            output+="  <a class='item-link item-content' href='templates/user_profile.html'>";
              output+="   <div class='item-media'>";
              output+="      <img src='images/my_profile_icon.png'/>";
              output+="   </div>";
              output+="   <div class='item-inner' data-i18n='menu.Profile'> menu.Profile";
              output+="  </div>";
            output+=" </a>";
         output+=" </li>";


        output+="  <li>";
            output+="  <a class='item-link item-content' href='templates/settings.html'>";
              output+="   <div class='item-media'>";
              output+="      <img src='images/settings_icon.png'/>";
              output+="   </div>";
              output+="   <div class='item-inner' data-i18n='menu.Settings'> menu.Settings";
              output+="  </div>";
            output+=" </a>";
         output+=" </li>";



         output+="  <li>";
            output+="  <a class='item-link item-content' href='templates/contactus.html'>";
              output+="   <div class='item-media'>";
              output+="      <img src='images/contact_icon.png'/>";
              output+="   </div>";
              output+="   <div class='item-inner' data-i18n='menu.Contact'>menu.Contact";
              output+="  </div>";
            output+=" </a>";
         output+=" </li>";



         output+="  <li>";
            output+="  <a class='item-link item-content' href='templates/howitworks.html'>";
              output+="   <div class='item-media' >";
              output+="      <img src='images/ht.png'/>";
              output+="   </div>";
              output+="   <div class='item-inner'  data-i18n='menu.How'>menu.How";
              output+="  </div>";
            output+=" </a>";
         output+=" </li>";



         output+="  <li>";
            output+="  <a class='item-link item-content' href='templates/termsandconditions.html'>";
              output+="   <div class='item-media'>";
              output+="      <img src='images/terms_icon.png'/>";
              output+="   </div>";
              output+="   <div class='item-inner'  data-i18n='menu.term'> menu.term";
              output+="  </div>";
            output+=" </a>";
         output+=" </li>";



         output+="  <li>";
            output+="  <a class='item-link item-content'  href='templates/privacypolicy.html'>";
              output+="   <div class='item-media'>";
              output+="      <img src='images/privacy_icon.png'/>";
              output+="   </div>";
              output+="   <div class='item-inner' data-i18n='menu.Privacy'> menu.Privacy";
              output+="  </div>";
            output+=" </a>";
         output+=" </li>";



         output+="  <li>";
            output+="  <a class='item-link item-content'>";
              output+="   <div class='item-media'>";
              output+="      <img src='images/device.png'/>";
              output+="   </div>";
              output+="   <div class='item-inner' data-i18n='menu.Device'> menu.Device";
              output+="  </div>";
            output+=" </a>";
         output+=" </li>";

         output+="  <li>";
            output+="  <a class='item-link item-content' href='#' onClick='logout()' >";
              output+="   <div class='item-media'>";
              output+="      <img src='images/logout.png'/>";
              output+="   </div>";
              output+="   <div class='item-inner' data-i18n='menu.Logout'>menu.Logout ";
              output+="  </div>";
            output+=" </a>";
         output+=" </li>";
    output+="</div>";
  $$('.panel.panel_content.menu').html(output);
}
function logout(){
  userInfo=null;
  window.localStorage.removeItem("User");
  window.localStorage.removeItem("UserData");
  mainView.router.loadPage('index.html');
}
function triggerForm(){
  $$('#profile_edit_form').submit();
}
function drawNavbarprofile(userData){
  if(userData.ProfileImage){
    $$('.user_profile_img .img').attr('style','background-image:url('+userData.ProfileImage+')');
  }
  $$('.u_name').html(userData.FirstName+" "+userData.LastName);
  $$('.u_email').html(userData.Email);
}


 function readURL1(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('.user_profile_img .img').css('background-image', "url(" + e.target.result + ")");
                   //$('#the_user_img').attr('src', e.target.result) .width(150)

                };
                reader.readAsDataURL(input.files[0]);
            }
        }

function drawNavbarprofile1(userData){
  if(userData.ProfileImage){
    $$('.user_profile_img .img').attr('style','background-image:url('+userData.ProfileImage+')');
  }
  $$('.u_name').html(userData.FirstName+" "+userData.LastName);
  $$('.u_email').html(userData.Email);
}

function drawNavbarMenuPageTitle(title , clr ,title2){
  var output="";
  output+="<div class='navbar-inner "+clr+"'>";
  output+="<div class='left'>";
    output+="<a href='#' class='link icon-only open-panel'><img src='images/left_menu.png'/></a>";

  output+="</div>";
    output+="<div class='center sliding'>"+title+"</div>";
      output+="<div class='right'>";
           output+=title2;
      output+="</div>";
  output+="</div>";
  $$('.navbar_content').html(output);
}


myApp.onPageBeforeAnimation('redeem_landing',function(e){
    var output="";
      output+="<div class='col-100 row items_center auto-view redeem_item'>";
         output+="<div class='row col-100 text-center'>";
             output+="<span class='col-100 mb-10' data-i18n='redeem.title'> redeem.title </span>";
             output+="<img class='img-fluid' src='images/panasonic.png' />";
         output+="</div>";
      output+="</div>";



      output+="<a   href='templates/gifts.html' class='col-100 row items_center auto-view redeem_item'>";
         output+="<div class='col-50 text-center'>";
             output+="<span class='col-100 row ' data-i18n='redeem.Gifts'> redeem.Gifts </span>";
         output+="</div>";
         output+="<div class='col-50 text-center'>";
                  output+="<img class='img-fluid' src='images/test/gifts.png'>";
         output+="</div>";
      output+="</a>";


      output+="<a  href='templates/vouchers.html'  class='col-100 row items_center auto-view redeem_item'>";
         output+="<div class='col-50 text-center'>";
             output+="<span class='col-100 row ' data-i18n='redeem.Vouchers' > redeem.Vouchers </span>";
         output+="</div>";
         output+="<div class='col-50 text-center'>";
                  output+="<img class='img-fluid' src='images/test/vouchers.png'>";
         output+="</div>";
      output+="</a>";

   $$(mainView.activePage.container).find('.redeem_landing').html(output);

});

function getGiftsServices(callback){
  var language=currentLang.Id;
  var userData = window.localStorage.getItem("UserData");
  userData=JSON.parse(userData);

  var url=baseUrlMain+'ManageCustomer/GetAllUserGifts?UserId='+userData.Id+'&LanguageId='+language;
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      //  hideLoader();
        if(callback){
          console.log('gifts',data.Data);

          callback(data.Data);
        }
      }
  });

}

function drawGifts(data){
  var last_gifts=data.GiftList[data.GiftList.length-1];
  output+="<div class='text-left'>";
      output+="You have <span class='totalWalt'> "+data.totalWalt+"</span> <span data-i18n='vouchers.Watts'> vouchers.Watts</span>";
    output+="</div>";
    var d = new Date(last_gifts.expire_date);
     var date = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();


  var output="";
  output+="<div class='row'>";
   output+="<div class='fixed_bar two_sides_bar red_bar col-100 row '>";

     output+="<div class='text-left'>";
         output+="<span data-i18n='gifts.have'>gifts.have </span> <span class='totalWalt'> "+last_gifts.walts+"</span><span data-i18n='gifts.Watts'> gifts.Watts</span>";
       output+="</div>";

      output+="<div class='text-right two_lines'>";
           output+=last_gifts.walts+" Watts";
           output+=" <span class='line_2'> <span data-i18n='gifts.expire'>gifts.expire </span>"+date+"</span>";

       output+="</div>";
    output+="</div>";
   output+="</div>";



for(var i=0;i<data.GiftList.length;i++){
      var gift=data.GiftList[i];
      var d = new Date(gift.expire_date);
      var dates = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();


     output+="<div class='row col-100 items_stretch auto-view transactions_item redeem_item gift_"+gift.id+"'>";
        output+="<div class='col-40 text-center '>";
            output+="<div class='watts_count_inner'>";
                   output+="<img src='"+gift.image+"' class='img-fluid'/>";
           output+="</div>";
        output+="</div>";
        output+="<div class='col-60  align_self_center row des_side '>";
            output+="<div class='col-100 '>";
                 output+="<h3 class='my-0' >"+gift.name+" </h3>";
            //     output+="<h3 class='my-0' data-i18n='gifts.get'>gifts.get </h3>";
                 output+="<div class='mb-10  gray_clr s_small'>"+gift.description+"</div>";
            output+="</div>";

            output+="<div class='col-100 '>";
                 output+="<div class='mb-10  red_clr s_small'>"+gift.walts+" <span data-i18n='gifts.Watts'> gifts.Watts</span></div>";
            output+="</div>";

           output+="<div class='align_items_center row col-100 '>";
                output+="<div class='text-left small'>"
                   output+="<div class='col-100  row' data-i18n='gifts.Expite'>gifts.Expite</div>";
                   output+="<div class='col-100 gray_clr row'> "+dates+"</div>";
                output+="</div>";
                output+="<div class='text-right'>"
                   output+="<button class='link_btn btn-submit redeem_now'  data-i18n='gifts.redeem' onClick='redeemGift("+gift.id+")'> gifts.redeem</button>" ;
                output+="</div>";

          output+="</div>";
        output+="</div>";
     output+="</div>";
}


  $$(mainView.activePage.container).find('.gifts').html(output);

}
myApp.onPageBeforeAnimation('gifts',function(e){
  getGiftsServices(drawGifts);

});
function getVoucherServices(callback){
  var language=currentLang.Id;
  var userData = window.localStorage.getItem("UserData");
  userData=JSON.parse(userData);

  var url=baseUrlMain+'ManageCustomer/GetAllUserVouchers?UserId='+userData.Id+'&LanguageId='+language;
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      //  hideLoader();
        if(callback){
          console.log('voucher',data.Data);
          callback(data.Data);
        }
      }

  });

}
myApp.onPageBeforeAnimation('vouchers',function(e){
   getVoucherServices(drawVoucherPage);


});
function redeemVoucher(id){
  var userData = window.localStorage.getItem("UserData",userData);
  userData=JSON.parse(userData);
  var url=baseUrlMain+'ManageCustomer/RedeemVoucher';
  var data="UserId="+userData.Id+"&VoucherId="+id+"";

//  var data={'UserId':userData.Id,'VoucherId':id};
  $.ajax({
    url: url,
    processData: false,
    type: 'POST',
    data:data,
    success: function ( data ) {
      console.log(data);
      if(data.Data&&data.Data.Status==200){
      $$('.voucher_'+id).remove();
      //data = JSON.parse(data);


       }
    }
  });

}
function redeemGift(id){
  var userData = window.localStorage.getItem("UserData",userData);
  userData=JSON.parse(userData);
  var url=baseUrlMain+'ManageCustomer/RedeemGift';
  var data="UserId="+userData.Id+"&GiftId="+id+"";
  $.ajax({
    url: url,
    processData: false,
    type: 'POST',
    data:data,
    success: function ( data ) {
      console.log(data);
      if(data.Data&&data.Data.Status==200){
      $$('.gift_'+id).remove();
      //data = JSON.parse(data);


       }
    }
  });

}
function drawVoucherPage(data){
  var output="";
  output+="<div class='row'>";
   output+="<div class='fixed_bar two_sides_bar red_bar col-100 row '>";
     var last_voucher=data.VoucherList[data.VoucherList.length-1];
     output+="<div class='text-left'>";
         output+="You have <span class='totalWalt'> "+data.totalWalt+"</span> <span data-i18n='vouchers.Watts'> vouchers.Watts</span>";
       output+="</div>";
       var d = new Date(last_voucher.expire_date);
        var date = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();

      output+="<div class='text-right two_lines'>";
           output+=last_voucher.walts+" Watts";
           output+=" <span class='line_2'> <span data-i18n='vouchers.Expire'> vouchers.Expire </span>"+date+"</span>";

       output+="</div>";
    output+="</div>";
   output+="</div>";



for(var i=0;i<data.VoucherList.length;i++){

    var voucher=data.VoucherList[i];
    var d = new Date(voucher.expire_date);
     var dates = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();

     output+="<div class='row col-100 items_stretch auto-view transactions_item redeem_item voucher_"+voucher.id+"'>";
        output+="<div class='col-40 text-center watts_count_inner'>";
            output+="<div class='watts_inner'>";
            output+="<span class='col-100 row watts_count red_clr'>"+voucher.walts+" </span><span class='col-100 row watt' data-i18n='vouchers.Watts'>vouchers.Watts</span>";
           output+="</div>";
        output+="</div>";
        output+="<div class='col-60  align_self_center row des_side'>";
            output+="<div class='col-100 '>";
                 output+="<h3 class='my-0'>"+voucher.name+"</h3>";
                 output+="<div class='mb-10  gray_clr s_small'>"+voucher.description+"</div>";
            output+="</div>";

            output+="<div class='col-100 '>";
                 output+="<div class='mb-10  red_clr s_small' data-i18n='vouchers.kwatt'>"+voucher.walts+" vouchers.kwatt</div>";
            output+="</div>";

           output+="<div class='align_items_center row col-100 '>";
                output+="<div class='text-left small'>"
                   output+="<div class='col-100  row'  data-i18n='vouchers.Expite'>vouchers.Expite</div>";
                   output+="<div class='col-100 gray_clr row'> "+dates+"</div>";
                output+="</div>";
                output+="<div class='text-right'>"
                   output+="<button class='link_btn btn-submit redeem_now' data-i18n='vouchers.Redeem' onClick=(redeemVoucher("+voucher.id+"))>  vouchers.Redeem</button>" ;
                output+="</div>";

          output+="</div>";
        output+="</div>";
     output+="</div>";
}


  $$(mainView.activePage.container).find('.vouchers').html(output);
}
function getMaterialId(id){
  for(var i=0;i<AppMainData.MaritalStatus.length;i++){
    if(AppMainData.MaritalStatus[i].Id==id){
       return AppMainData.MaritalStatus[i].NameEn;
      break;
    }
  }

}

function getCityById(id){
  for(var i=0;i<AppMainData.City.length;i++){
    if(AppMainData.City[i].Id==id){
      return AppMainData.City[i].NameEn;
      break;
    }
  }
}
myApp.onPageAfterAnimation('user_profile',function(e){
});
myApp.onPageBeforeAnimation('user_profile',function(e){
  var userData = window.localStorage.getItem("UserData");
  userData=JSON.parse(userData);
  drawNavbarprofile1(userData);
    var output="";

    output+="<div class='item mb-20'>";
        output+="<div class='small gray_clr' data-i18n='user_profile.first'> user_profile.first </div>";
        output+="<div class=''> "+userData.FirstName+"  </div>";
    output+="</div>";

    output+="<div class='item mb-20'>";
        output+="<div class='small gray_clr' data-i18n='user_profile.last'>user_profile.last </div>";
        output+="<div class=''>  "+userData.LastName+"   </div>";
    output+="</div>";


    output+="<div class='item mb-20'>";
        output+="<div class='small gray_clr' data-i18n='user_profile.Mobile'> user_profile.Mobile  </div>";
        output+="<div class=''> "+userData.Phone+"  </div>";
    output+="</div>";

    output+="<div class='item mb-20'>";
        output+="<div class='small gray_clr' data-i18n='user_profile.Email'> user_profile.Email </div>";
        output+="<div class=''> "+userData.Email+"  </div>";
    output+="</div>";


    output+="<div class='item mb-20'>";
        output+="<div class='small gray_clr' data-i18n='user_profile.Residency'>user_profile.Residency </div>";
        output+="<div class=''>  "+userData.ResidencyId+"  </div>";
    output+="</div>";
    var d = new Date(userData.BirthDate);
     var date = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();

    output+="<div class='item mb-20'>";
        output+="<div class='small gray_clr' data-i18n='user_profile.Birth'>user_profile.Birth </div>";
        output+="<div class=''> "+date+" </div>";
    output+="</div>";



    output+="<div class='item mb-20'>";
        output+="<div class='small gray_clr' data-i18n='user_profile.City'> user_profile.City   </div>";
        output+="<div class=''>  "+getCityById(userData.CityId)+"  </div>";
    output+="</div>";

    output+="<div class='item mb-20'>";
        output+="<div class='small gray_clr' data-i18n='user_profile.Marital'>user_profile.Marital </div>";
        output+="<div class=''> "+getMaterialId(userData.MaterialStatusId)+"  </div>";
    output+="</div>";
  $$(mainView.activePage.container).find('.user_profile').html(output);
})

function draweditProfileForm(){
  var userData = window.localStorage.getItem("UserData",userData);
  userData=JSON.parse(userData);
    var output='';
    //output+="<form method='post' class='ajax-submit col-90 auto-view row first_item' id='register_form '>";
    output+= "<input type='hidden' name='Id' value='"+userData.Id+"'>";
    output+= "<input type='hidden' name='Image' value='"+userData.ProfileImage+"'>";
    output+= "<input type='hidden' name='Password' value='"+userData.Password+"'>";
   output+= "<div class='item-input-wrap row col-100 profile_edit_form_FirstName_parent'>";
     output+= "<input type='text' name='FirstName' id='profile_edit_form_FirstName' data-i18n='[placeholder]editProfile.First'  class='input_text  col-90' value='"+userData.FirstName+"'>";
     output+="<span class='col-90 input-clear-button'></span>";
   output+="</div>";
   output+= "<div class='item-input-wrap row col-100 profile_edit_form_LastName_parent'>";
     output+= "<input type='text' name='LastName' id='profile_edit_form_LastName'  data-i18n='[placeholder]editProfile.Last'  class='input_text  col-90' value='"+userData.LastName+"'>";
  //   output+= "<input type='hidden' name='ProfileImage' id='' placeholder='' class='input_text  col-90' value='"+userData.avatar+"'>";
     output+="<span class='col-90 input-clear-button'></span>";
   output+="</div>";

   output+= "<div class='item-input-wrap row col-100 profile_edit_form_Email_parent'>";
     output+= "<input type='email' name='Email' id='profile_edit_form_Email'  data-i18n='[placeholder]editProfile.Email' class='input_text  col-90' value='"+userData.Email+"'>";
     output+="<span class='col-90 input-clear-button'></span>";
   output+="</div>";

   output+= "<div class='item-input-wrap row col-100 profile_edit_form_Phone_parent'>";
     output+= "<input type='tel' name='Phone' id='profile_edit_form_Phone' data-i18n='[placeholder]editProfile.Phone'  class='input_text  col-90' value='"+userData.Phone+"'>";
     output+="<span class='col-90 input-clear-button'></span>";
   output+="</div>";

   output+= "<div class='item-input-wrap row col-100 profile_edit_form_residency_id_parent'>";
     output+= "<input type='tel' name='ResidencyId' id='profile_edit_form_residency_id' data-i18n='[placeholder]editProfile.Residency' class='input_text  col-90' value='"+userData.ResidencyId+"'>";
     output+="<span class='col-90 input-clear-button'></span>";
   output+="</div>";

   output+= "<div class='item-input-wrap row col-100 profile_edit_form_city_parent'>";
      output+="<a href='#' class='item-link smart-select select-style bg_input col-90' data-open-in='picker'  data-back-on-select='true'>"; //2018_10_14 add col-90
       output+="   <select name='CityId' id='profile_edit_form_City'>";
        output+="     <option value=''  data-i18n='editProfile.Select' >editProfile.Select </option>";
        var selected='';
        var val='Select';
          for(var i=0;i<AppMainData.City.length;i++){
            if(AppMainData.City[i].Id==userData.CityId){
               val=AppMainData.City[i].NameEn;
              selected='selected';
            }
            output+="<option value='"+AppMainData.City[i].Id+"' "+selected+">"+AppMainData.City[i].NameEn+"</option>";
          }
       output+="   </select>";
       output+="   <div class='item-content'>";
       output+="     <div class='item-inner'>";
       output+="  <div class='item-after smart-select-value'>"+val+"</div>";
       output+="     </div>";
       output+="   </div>";
     output+=" </a>";
     output+="<span class='col-90 input-clear-button'></span>";
   output+="</div>";
   var d = new Date(userData.BirthDate);
    var date =d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();

   output+= "<div class='item-input-wrap row col-100 profile_edit_form_BirthDate_parent'>";
      output+= "<input type='text' name='BirthDate' id='profile_edit_form_BirthDate'  data-i18n='[placeholder]editProfile.Birth'   class='input_text  col-90'  value='"+date+"'>";
     output+="<span class='col-90 input-clear-button'></span>";
   output+="</div>";

   output+= "<div class='item-input-wrap row col-100 profile_edit_form_MaritalStatus_parent'>";
      output+="<a href='#' class='item-link smart-select select-style bg_input col-90' data-open-in='picker'  data-back-on-select='true'>"; //2018_10_14 add col-90
       output+="   <select name='MaterialStatusId' id='profile_edit_form_MaritalStatus'>";
        output+="     <option value=''   data-i18n='editProfile.Select'  > editProfile.Select </option>";
        for(var i=0;i<AppMainData.MaritalStatus.length;i++){
          var selected='';
          var val='Select';
          if(AppMainData.MaritalStatus[i].Id==userData.MaterialStatusId){
            selected='selected';
            val=AppMainData.MaritalStatus[i].NameEn;
          }
          output+="<option value='"+AppMainData.MaritalStatus[i].Id+"' "+selected+">"+AppMainData.MaritalStatus[i].NameEn+"</option>";
        }
       output+="   </select>";
       output+="   <div class='item-content'>";
       output+="     <div class='item-inner'>";
       output+="  <div class='item-after smart-select-value'>"+val+" </div>";
       output+="     </div>";
       output+="   </div>";
     output+=" </a>";
     output+="<span class='col-90 input-clear-button'></span>";
   output+="</div>";

  return output;
}


myApp.onPageBeforeAnimation('edit_user_profile',function(e){
  var userData = window.localStorage.getItem("UserData",userData);
  userData=JSON.parse(userData);
  drawNavbarprofile(userData);

  $$(mainView.activePage.container).find('.edit_user_profile').html( draweditProfileForm());


})
myApp.onPageAfterAnimation('edit_user_profile',function(e){

  myCalendar = myApp.calendar({
     input: '#profile_edit_form_BirthDate'
 });
 requires=['FirstName','LastName','Email','Phone','CityId','BirthDate','ResidencyId','MaterialStatusId','Password','ConfirmPassword'];
 formId='profile_edit_form';
 var urlReq=baseUrlMain+'ManageCustomer/UpdateCustomer'
 listnerEditProfileFormAction(urlReq);
})

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
  output+="<div class='navbar-inner red'>";
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
function drawNavbarMenuOnlyPage(title){
  var output="";
  output+="<div class='navbar-inner gray'>";
  output+="<div class='left'>";
    output+="<a href='#' class='link icon-only open-panel'><img src='images/left_menu.png'/></a>";

  output+="</div>";
    output+="<div class='center sliding'>"+title+"</div>";
      output+="<div class='right'>";
        //output+="<a href='#' data-popup='.popup-cart' class='open-popup'><img src='images/card_icon.png'/> <img src='images/back_copy.png'/></a>";
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

})
myApp.onPageBeforeAnimation('*',function(e){
  $$('.page-on-left').removeClass('hidden');
  myApp.closeModal('.picker-modal');
  if(mainView.activePage.name!='index'){
    displayLanguage();
  }

});
function onError(error) {
    brancheDistanceMap();

    console.error("The following error occurred: " + error);
}

function handleLocationAuthorizationStatus(cb, status) {
    switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            cb(true);
            break;
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
            requestLocationAuthorization(cb);
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED:
            cb(false);
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            // Android only
            cb(false);
            break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
            // iOS only
            cb(true);
            break;
    }
}

function requestLocationAuthorization(cb) {
    cordova.plugins.diagnostic.requestLocationAuthorization(handleLocationAuthorizationStatus.bind(this, cb), onError);
}

function ensureLocationAuthorization(cb) {
    cordova.plugins.diagnostic.getLocationAuthorizationStatus(handleLocationAuthorizationStatus.bind(this, cb), onError);
}

function requestLocationAccuracy(callback){
   var recal=callback;
    ensureLocationAuthorization(function(isAuthorized){
        if(isAuthorized){
            cordova.plugins.locationAccuracy.canRequest(function(canRequest){
                if (canRequest) {
                    cordova.plugins.locationAccuracy.request(function () {
                        //    brancheDistanceMap();
                        recal();

                        }, function (error) {
                            onError("Error requesting location accuracy: " + JSON.stringify(error));
                            if (error) {
                                // Android only
                                onError("error code=" + error.code + "; error message=" + error.message);
                                if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                                    if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                                        cordova.plugins.diagnostic.switchToLocationSettings();
                                    }
                                }
                            }
                        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY // iOS will ignore this
                    );
                } else {
                    // On iOS, this will occur if Location Services is currently on OR a request is currently in progress.
                    // On Android, this will occur if the app doesn't have authorization to use location.
                    onError("Cannot request location accuracy");
                }
            });
        }else{
            onError("User denied permission to use location");
        }
    });
    recal();

}

myApp.onPageAfterAnimation('*',function(e){
  console.log('onPageBeforeAnimation',mainView.activePage.name);
  /*  // drawNavbarBack();
  //drawMenu();
  */
  if(mainView.activePage.name!='index'){
    displayLanguage();
  }


  if(map_distance){
    map_distance.clear();
  }
  if(map){
    map.clear();
  }
  myApp.closePanel();
  $$('.page-on-left').removeClass('hidden');

  if(mainView.activePage.name==='show_profile'||mainView.activePage.name==='offers'||mainView.activePage.name==='products'||mainView.activePage.name==='gifts'||mainView.activePage.name==='redeem_landing'||mainView.activePage.name==='vouchers'||mainView.activePage.name==='user_profile'){
    drawMenu();
  }
  myApp.params.swipePanel = false;
  if(mainView.activePage.name==='show_profile'||mainView.activePage.name==='offers'||mainView.activePage.name==='products'||mainView.activePage.name==='transactions'||mainView.activePage.name==='product_details'||mainView.activePage.name==='notifications'||mainView.activePage.name==='gifts'||mainView.activePage.name==='vouchers'||mainView.activePage.name==='redeem_landing'){
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
myApp.onPageInit('index',function(e){
  //myApp.params.swipePanel = 'left';
});
myApp.onPageBeforeAnimation('index',function(e){
  //drawNavbarEmpty();
  //drawIndex();
  checkUser();
  drawCountryLanguage();
});
myApp.onPageBeforeAnimation('slider',function(e){
  if(userInfo){
    if(userInfo.ProfileImage){
      mainView.router.loadPage('templates/show_profile.html');
    }else{
      mainView.router.loadPage('templates/profile.html');
    }
  }
/*  if(!AppMainData.Banners){
    getBasicUrl(drawIndex);
  }else{
  }*/
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
  output+="<div class='row bg_country '  style='background-image:url(images/branch_1.jpeg)'>";

    output+="<div class='text_center margin-data col-100'>";
      output+= "<img src='images/language_logo.png'/>";
  //    output+="<h2 class='txt_cover col-100'>Discover a world of rewards</h2>";
    output+="</div>";

    output+="<div class='col-90 flex_center center_block'>";
       output+="<form method='post' class='ajax-submit' id='main_form'>";
      output+= "<div class='item-input-wrap main_form_language_parent'>";
         output+="<a href='#' class='item-link smart-select select-style' data-open-in='picker'  data-back-on-select='true'>";
          output+="   <select name='language' id='main_form_language'>";
          output+=" <option value='' >Select </option>";
             for(var i=0;i< AppMainData.Language.length;i++){
          //      output+=" <option value='"+AppMainData.Language[i].id+"' data-option-image='"+AppMainData.Language[i].logo+"'>"+Language[i].language+"</option>";
                output+=" <option value='"+AppMainData.Language[i].Id+"' data-option-image='"+AppMainData.Language[i].Image+"'>"+AppMainData.Language[i].NameEn+"</option>";
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
              output+="     <option value='"+AppMainData.Country[i].Id+"' > +"+AppMainData.Country[i].Code+" "+AppMainData.Country[i].NameEn+"</option>";
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
//    output+="<div class='bottom_bar'></div>";
  output+="</div>";
  $$(mainView.activePage.container).find('.index').html(output);
 eventListnerLanguage();

}
myApp.onPageBeforeAnimation('language_country',function(e){
  checkUser();
  if(AppMainData){
    drawCountryLanguage();
  }
});
var requires,formId;
myApp.onPageAfterAnimation('language_country',function(e){
  requires=['language','country'];
  formId='main_form';
  LanguageFormAction();
});
function eventListnerLanguage(){
  requires=['language','country'];
  formId='main_form';
  LanguageFormAction();
}
function LanguageFormAction(){
  $$('#'+formId).on('submit', submitLang);
//  $$('#'+formId).off('submit', submitLang);
}
function submitLang(e){
     if(checkRequires(requires,formId)){
       $$('#'+formId).find('.input-clear-button').html('');
       var appLanguage={
                'Language':$$('#'+formId +' #'+formId+'_language').val(),
                'Country':$$('#'+formId +' #'+formId+'_country').val(),
              }

       appLanguage=JSON.stringify(appLanguage);
      // console.log('applang',appLanguage);
       window.localStorage.setItem("appLanguage",appLanguage);
      changeLaguage();

   }
  //  e.preventDefault();
    return false;
}
/*function goToLang(){
  showLoader();
  getBasicUrl(langLoad);

}
function langLoad(){

  mainView.router.loadPage('templates/language_country.html');
}
*/function checkRequires(requires,formId){
  var flag=true;
     $$('#'+formId).find('.input-clear-button').html('');
  for(var i=0;i<requires.length;i++){
  //   console.log(requires[i]);
    if(!$$('#'+formId+' #'+formId+'_'+requires[i]).val()){
       $$('#'+formId+' .'+formId+'_'+requires[i]+'_parent').find('.input-clear-button').html('Data Required .');
       flag=false;
    }
  }
  return flag;
}
function checkRequiresMobile(requires,formId){
  var flag=true;
  $$('#'+formId).find('.input-clear-button').html('');
  for(var i=0;i<requires.length;i++){
    if(!$$('#'+formId+' #'+formId+'_'+requires[i]).val()){
  //    console.log(requires[i]);
      if(requires[i]=='mobile'){
        $$('#'+formId+' .verif_form_mobile_parent').find('.input-clear-button').html('<span data-i18n="req.valid">req.valid</span>');

      }else{
        $$('#'+formId+' .verif_form_number_parent').find('.input-clear-button').html('<span data-i18n="req.right">req.right</span>');

      }
       flag=false;
    }
  }
  return flag;
}

//visitor Signup Or Register
myApp.onPageBeforeAnimation('visitor',function(e){
  checkUser();
  var output="";
  output+="<div class='row bg_cover go_login_select '  style='background-image:url(images/vistor_bg.jpg)'>";

    output+="<div class='text_center margin-data col-100'>";
      output+= "<img src='images/language_logo.png'/>";
    output+="</div>";

    output+="<div class='row col-100 bottom-data'>";
      output+="<div class=' col-90 auto-view'>";
        output+="<a href='templates/login.html' class='link_btn' data-i18n='vistor.Memeber'>vistor.Memeber </a>";
      output+="</div>";

      output+="<div class=' col-100 row'>";
       output+="<div class='two_bars'><span class='white_color' data-i18n='vistor.Connect'>vistor.Connect</span></div>";
      output+="</div>";

      output+="<div class='col-90 row  no-gap social_btns auto-view'>";
        output+="<div class='col-50 text-center '><a href='' class='white_color btn face_book_btn '><i class='fa fa-facebook'></i>Facebook</a></div>";
        output+="<div class='col-50 text-center '><a href='' class='white_color btn googleplus_btn '><img src='images/google.png'/></a></div>";
      output+="</div>";

      output+="<div class=' col-100 text-center go_sign_up'>";
      output+="<p><a class='white_color' href='templates/register.html' data-i18n='vistor.register'>vistor.register</a></p>";



      output+="</div>";
    output+="</div>";

  output+="</div>";
  $$(mainView.activePage.container).find('#visitor').html(output);
});
function drawRegisterForm(){
  var output='';
  //output+="<form method='post' class='ajax-submit col-90 auto-view row first_item' id='register_form '>";
 output+= "<div class='item-input-wrap row col-100 register_form_FirstName_parent'>";
   output+= "<input type='text' name='FirstName' id='register_form_FirstName' data-i18n='[placeholder]register.First'  class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";
 output+= "<div class='item-input-wrap row col-100 register_form_LastName_parent'>";
   output+= "<input type='text' name='LastName' id='register_form_LastName' data-i18n='[placeholder]register.Last'   class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";

 output+= "<div class='item-input-wrap row col-100 register_form_Email_parent'>";
   output+= "<input type='email' name='Email' id='register_form_Email'  data-i18n='[placeholder]register.Email'   class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";

 output+= "<div class='item-input-wrap row col-100 register_form_Phone_parent'>";
   output+= "<input type='tel' name='Phone' id='register_form_Phone'  data-i18n='[placeholder]register.Phone'   class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";

 output+= "<div class='item-input-wrap row col-100 register_form_ResidencyId_parent'>";
   output+= "<input type='tel' name='ResidencyId' id='register_form_ResidencyId'  data-i18n='[placeholder]register.Residency'  class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";

 output+= "<div class='item-input-wrap row col-100 register_form_CityId_parent'>";
    output+="<a href='#' class='item-link smart-select select-style bg_input col-90' data-open-in='picker'  data-back-on-select='true'>"; //2018_10_14 add col-90
     output+="   <select name='CityId' id='register_form_CityId'>";
      output+="     <option value='' data-i18n='register.Select' >register.Select </option>";
        for(var i=0;i<AppMainData.City.length;i++){
          output+="     <option value='"+AppMainData.City[i].Id+"' >"+AppMainData.City[i].NameEn+"</option>";
        }
     output+="   </select>";
     output+="   <div class='item-content'>";
     output+="     <div class='item-inner'>";
     output+="  <div class='item-after smart-select-value'  data-i18n='register.City'>register.City</div>";
     output+="     </div>";
     output+="   </div>";
   output+=" </a>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";

 output+= "<div class='item-input-wrap row col-100 register_form_BirthDate_parent'>";
//     output+= "<input type='tel' name='residency_id' id='register_form_residency_id' placeholder='Residency ID' class='input_text  col-90'>";
    output+= "<input type='text' name='BirthDate' id='register_form_BirthDate' data-i18n='[placeholder]register.Birth'  class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";

 output+= "<div class='item-input-wrap row col-100 register_form_MaterialStatusId_parent'>";
    output+="<a href='#' class='item-link smart-select select-style bg_input col-90' data-open-in='picker'  data-back-on-select='true'>"; //2018_10_14 add col-90
     output+="   <select name='MaterialStatusId' id='register_form_MaterialStatusId'>";
     output+="     <option value='' data-i18n='register.Select' >register.Select </option>";
        for(var i=0;i<AppMainData.MaritalStatus.length;i++){
          output+="     <option value='"+AppMainData.MaritalStatus[i].Id+"' >"+AppMainData.MaritalStatus[i].NameEn+"</option>";
        }
     output+="   </select>";
     output+="   <div class='item-content'>";
     output+="     <div class='item-inner'>";
     output+="  <div class='item-after smart-select-value'  data-i18n='register.Marital'>register.Marital</div>";
     output+="     </div>";
     output+="   </div>";
   output+=" </a>";
   output+="<span class='col-90 input-clear-button'></span>";
 output+="</div>";
 output+="<div class='global_error col-90 input-clear-button'></div>";

 output+= "<div class='item-input-wrap col-100'>";
    output+=" <input type='button' name='submit'  data-i18n='[value]register.Next'  class='col-90 btn-submit' onclick='getNextSlide()'>";  //2018_10_14 add col-90
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
    output+= "<input type='password' name='Password' id='register_form_Password'  data-i18n='[placeholder]register.Password'  class='input_text  col-90'>";
    output+="<span class='col-90 input-clear-button'></span>";
  output+="</div>";
  output+= "<div class='item-input-wrap row col-100 register_form_ConfirmPassword_parent'>";
    output+= "<input type='password' name='ConfirmPassword' id='register_form_ConfirmPassword' data-i18n='[placeholder]register.PasswordConfirm'  class='input_text  col-90'>";
   output+="<span class='col-90 input-clear-button'></span>";
  output+="</div>";

  output+= "<div class='item-input-wrap row col-100'>";
     output+=" <input type='button' name='submit' data-i18n='[value]register.Next'  class='btn-submit col-90' onclick='getNextSlide()'>";
  output+="</div>";
  //  output+="</form>";
  return output;
}
function drawAgrement(){
  var output='';
  output+="<h2 class='col-90  text-center title_center top_reg m_auto'  data-i18n='register.Term'   >register.Term</h2>";
  output+="<div class='col-90 agree'>"+AppMainData.TermAndConditions+"</div>";
  output+= "<div class='item-input-wrap col-100 mt-3'>";
     output+=" <input type='submit' name='submit' data-i18n='[value]register.Agree'  class='btn-submit col-90' >";//2018_10_14 add col-90
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
                output+="<h2 class='col-100  text-center title_center top_reg m_auto'  data-i18n='register.reg' >register.reg</h2>";

            output+=drawRegisterForm();

         output+=" </div>";
        output+=" </div>";

      output+=" </div>";

    output+="    <div class='swiper-slide' >";

      output+="   <div class='first_item row password_screen'> ";//--new 2018_10_14 addClass password_screen-//
         output+="<h2 class='col-100  text-center title_center top_reg m_auto'   data-i18n='register.reg'>register.reg</h2>";
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
function checkUser(){
  setTimeout(function(){
    var userData = window.localStorage.getItem("UserData");
    console.log('ssss',userData);
    if(userData){
      userData=JSON.parse(userData);
      if(userData.ProfileImage){
        console.log('userDatassss');
        myApp.mainView.allowPageChange = true;

        mainView.router.loadPage('templates/show_profile.html');
      }else{
        console.log('userDatasssssqqqss');
        myApp.mainView.allowPageChange = true;
        mainView.router.loadPage('templates/profile.html');
      }

    }

  },10)
}
myApp.onPageBeforeAnimation('register',function(e){
  checkUser();
  drawRegister();

});
var mySwiper;
myApp.onPageAfterAnimation('register',function(e){
   myCalendar = myApp.calendar({
      input: '#register_form_BirthDate'
  });

   mySwiper = new Swiper('.regisrer-slider', {
    pagination:'.swiper-pagination',
  });
  requires=['FirstName','LastName','Email','Phone','CityId','BirthDate','ResidencyId','MaterialStatusId','Password','ConfirmPassword'];
  formId='register_form';
  var urlReq=baseUrlMain+'ManageCustomer/CreateCustomer'
  listnerRegisterFormAction(urlReq);

});
//verification code
myApp.onPageAfterAnimation('verification',function(e){
  requires=['number_1','number_2','number_3','number_4','mobile'];
  formId='verif_form';
  var urlReq=baseUrlMain+'ManageAccount/Verification'
  listnerverificationFormAction(urlReq);
});
myApp.onPageBeforeAnimation('verification',function(e){
  var btn='Change password Now';
  if(mainView.activePage.query.q==1){
    mobileUser=user.mobile;
    btn='Submit';
  }
  var output="";
  output+="<div class='row'>";
  output+="<div class='col-100 verification_title'>";
    output+="<h1  data-i18n='Verification.Title'>Verification.Title</h1>";
  output+="</div>";
  output+="<div class='col-100 verification_content'>";
    output+="<div  data-i18n='Verification.Msg'>Verification.Msg</div>";
    output+="<div  data-i18n='Verification.MsgData'>Verification.MsgData</div>";
  output+="</div>";
  output+="<div class='col-100 verification_content'>";
    output+="<div data-i18n='Verification.viaSms'>Verification.viaSms </div>";
  output+="</div>";
  output+="<form method='post' class='ajax-submit col-90 auto-view row' id='verif_form'>";
  output+="<div class='col-100 verification_content verif_form_mobile_parent'>";
  output+= "<input type='number' name='mobile' id='verif_form_mobile' value='"+mobileUser+"' class='input_text  col-80 disable'  >";
  output+="<span class='input-clear-button'></span>";
  output+="</div>";
  if(mainView.activePage.query.q==1){

    output+="<div class='col-100 verification_content click_here' onClick='activeInput()'>";
    output+="<div>To change number <span class='red_clr' data-i18n='Verification.click'>Verification.click</span></div>";
    output+="</div>";
  }
  output+="<div class='col-100 verification_content enter_code'>";
    output+="<a onclick='activeInput()' ' data-i18n='Verification.code'>Verification.code</a>";
  output+="</div>";
 output+= "<div class='item-input-wrap col-100 verif_form_number_parent row'>";
 output+= "<input type='number' name='number_1' id='verif_form_number_1' placeholder=''   class='input_text col-25 verif_form_number'>";
 output+= "<input type='number' name='number_2' id='verif_form_number_2' placeholder=''   class='input_text col-25 verif_form_number '>";
   output+= "<input type='number' name='number_3' id='verif_form_number_3' placeholder=''   class='input_text col-25 verif_form_number'>";
   output+= "<input type='number' name='number_4' id='verif_form_number_4' placeholder=''   class='input_text  col-25 verif_form_number'>";
   output+="<span class='input-clear-button'></span>";
 output+="</div>";
 output+=" <input type='submit' name='submit' value='"+btn+"' class='btn-submit'>";
  output+="</form>";
  output+="<div class='col-100 verification_content resend'>";
    output+="<div onClick='resendCode()' data-i18n='Verification.resend'>Verification.resend</div><span class='resendcodeUser preloader preloader-yellow hidden'></span><span class='resendcodeUserMsg '></span>";
  output+="</div>";
  output+="</div>";
  $$(mainView.activePage.container).find('#verification').html(output);
});
function HideToolbar(){
 // $$('.toolbar.toolbar-bottom-md').attr('style','display:none');
 $$('.toolbar.toolbar-bottom-md').addClass('hidethetoolbar');
}
function toolbar(){
   $$('.toolbar.toolbar-bottom-md').removeClass('hidethetoolbar');

  //$$('.toolbar.toolbar-bottom-md').removeAttr('style');
  var output="";
  output+='    <div class="toolbar-inner">';
  output+='    <a class="link" href="templates/offers.html"><img src="images/offer.png" /></a>';
  if(mainView.activePage.name==='branches'){
    output+='    <a class="link" href="templates/branches.html"><img src="images/my_location_icon_active.png" /></a>';
  }else {
    output+='    <a class="link" href="templates/branches.html"><img src="images/my_location_icon.png" /></a>';
  }
  output+='<a class="link" href="templates/redeem_landing.html"><img src="images/group.png" /></a>';
  if(mainView.activePage.name==='notifications'){
    output+='<a class="link" href="templates/notifications.html"><img src="images/notification_icon_active.png" /></a>';
  }else {
    output+='<a class="link" href="templates/notifications.html"><img src="images/notification_icon.png" /></a>';
  }
  if(mainView.activePage.name==='show_profile'){
    output+='<a class="link" href="templates/show_profile.html"><img src="images/my_profile_icon_active.png" /></a>';
  }else {
    output+='<a class="link" href="templates/show_profile.html"><img src="images/my_profile_icon.png" /></a>';
  }
  output+='  </div>';
  $$('.toolbar').html(output);
}
function activeInput(){
  $$('#verif_form_mobile').removeClass('disable');
}
myApp.onPageAfterAnimation('show_profile',function(e){

});
myApp.onPageBeforeAnimation('show_profile',function(e){
  var userData = window.localStorage.getItem("UserData");
   userData=JSON.parse(userData);
  var output="";
  drawPointsPopup();
  //platinum or silver or blue to user_profile
  userData.type=userData.type.toLowerCase();

  output+="<div class='row "+userData.type+" user_profile'>";

    output+="<div class='text-center top_side row col-100'>";
      output+="<div class='col-100'>";
        output+="<h3 class='name'>"+userData.FirstName+" "+userData.LastName+"</h3>";
        output+="<div class='status' data-i18n='show_profile.Active'>show_profile.Active</div>";
        output+="<div>";
         if(userData.ProfileImage){
           output+="<div class='user_profile_img'><img src='"+userData.ProfileImage+"' /></div>";
         }else{
           output+="<div class='user_profile_img'><img src='images/test/profile_photo.png' /></div>";
         }
        output+="</div>";
       output+="</div>";

      output+="<div class='col-90 row auto-view '>";
        output+="<div class='row col-100 text-center rev_pos'>";
            output+="<div class='col-100  small text-center gray_clr' data-i18n='show_profile.available'>show_profile.available</div>";
            output+="<h2 class='col-100  user_points'>"+userData.walts+" <span data-i18n='transactions.Watts'>transactions.Watts<span></h2>";
            output+="<a href='#' class='info_icon open_timline open-popup' data-popup='.popup-points'><img src='images/info_icon.png' /></a>";

        output+="</div>";

      output+="</div>";
    output+="</div>";

    output+="<div class='col-90 row auto-view '>";
      output+="<div class='row rev_pos col-100 '>";
      output+="<div class='expired col-100 row'>";
        output+="<div class=' small gray_clr'><span data-i18n='show_profile.Expire'>show_profile.Expire </span> 30 <span data-i18n='show_profile.days'>show_profile.days </span> </div>";
        output+="<div data-i18n='show_profile.Watts'>345 show_profile.Watts</div>";
       output+="<div data-i18n='show_profile.Expires'>show_profile.Expires 23/7/2018</div>";
      output+="</div>";
      output+="<a class='share_ico' onclick='window.plugins.socialsharing.share(\'Message only\', null, null, null)'><img src='images/share.png' /></a>";
      output+="</div>";
    output+="</div>";
    output+="<div class='col-100 row'><a class='profile_btn'  href='templates/redeem_landing.html' role='button' data-i18n='show_profile.Coupons' >show_profile.Coupons</a> </div>";
    output+="<div class='col-100 row'><a  class='profile_btn' href='templates/transactions.html' role='button' data-i18n='show_profile.Transactions' >show_profile.Transactions</a></div>";

  output+="</div>";
$$(mainView.activePage.container).find('.show_profile').html(output);
drawCartPopup();
});
function drawCartPopup(){
  var userData = window.localStorage.getItem("UserData");
   userData=JSON.parse(userData);

  var output="";

  output+='<div class="content-block">';
  output+='  <p><a href="#" class="close-popup"><img src="images/back_up.png" /></a></p>';

      output+='<div class="max_wdth">';
      output+='<h3 data-i18n="cart.Discover" >cart.Discover</h3>';
      userData.cart=userData.cart.toLowerCase();
      output+='<div class="card_img" style="background-image:url(images/'+userData.cart+'_card.png)">';
      output+='<img class="img-fluid" src="images/almanara_logo_details.png" />';

        output+='<div class="row card_details">';
          output+='<div class="text-left col-40">'+userData.cart+'</div>';
          output+='<div class="text-right col-60">';
             output+='<h1 class="walts">'+userData.walts+'</h1>';
             output+='<div class="s_small" data-i18n="cart.available">cart.available</div>';
           output+='</div>';
        output+='</div>';

        output+='<h1 class="text-left username my-0">'+userData.FirstName+" "+userData.LastName+'</h1>';
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
function changePage(){


}
function changeSelect(){
  $$('.products_filter').on('change', function(e){
    var item=$$(this).val();
    if(item=='Offers'){
      mainView.router.loadPage('templates/offers.html');

    }else if(item=='Products'){
      mainView.router.loadPage('templates/products.html');
    }
    //console.log("Selected city : " + item);
  });

}
myApp.onPageAfterAnimation('offers',function(e){
  changeSelect();
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
var offers=[];
var products=[];
myApp.onPageBeforeAnimation('offers',function(e){
/*  if(offers.length>0){
    drawOfferPage(offers);
  }else{
  }*/
  offer_page=0;
  requestOfferData(drawOfferPage);
});
function requestOfferData(callback){
  //showLoader();

  offer_page++;
  var language=currentLang.Id;
  var perPage=10;
  var url=baseUrlMain+'ManageGeneralData/GetAllOffers?PageIndex='+offer_page+'&LanguageId='+language+'&PageSize='+perPage;
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      //data = JSON.parse(data);
  //    maxItems=data.Data.length;
      maxItems=data.MaxJsonLength;
      if(data.Data){
        if(offer_page==1){
          offers=data.Data.offers;
        }else{
          if(data.Data.offers.length>0){
            offers.push(data.Data.offers);
          }
        }
      //  hideLoader();
        if(callback){
          callback(data.Data);
        }
      }
    }
  });
}
function requestProductData(callback){
  //showLoader();
  product_page++;
  var language=currentLang.Id;
  var perPage=10;
  var url=baseUrlMain+'ManageGeneralData/GetAllProduct?PageIndex='+product_page+'&LanguageId='+language+'&PageSize='+perPage;
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      console.log(data);
    //  data = JSON.parse(data);
    //    maxItems=data.Data.length;
      maxItemsProduct=data.Data.length;
    //  maxItemsProduct=data.Data.length;
      if(data.Data){
        if(product_page==1){
          products=data.Data.products;
        }else{
          if(data.Data.products.length>0){
            products.push(data.Data.products);
          }
        }

      //  hideLoader();
        if(callback){
          callback(data.Data);
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
            output+="<div  ><span data-i18n='offers.Available'> offers.Available  </span>( "+data.avalibleInBranch+" )</div>";
          output+="</div>";
          output+="<div class='col-35 text-right'>";
            output+="<a class='show_map' href='templates/branches.html' ><img src='images/pin.png'/><span data-i18n='offers.map'> offers.map</span></a>";
          output+="</div>";
        output+="</div>";
         if(data.length>0){
           output+=drawItemsOffers(data.offers);
         }else{
           output+="<span data-i18n='offers.Exists'>offers.Exists</span>";
         }
    output+="</div>";

   $$(mainView.activePage.container).find('.offers').html(output);
   displayLanguage();

}
function drawProductPage(data){
  //data.avalibleInBranch=100;
  var output="";
  output+="<div class='row'>";
    output+="<div class='col-100 text-center cat_img'>";
        output+="<img  class='img-fluid' src='images/panasonic.png' />";
      output+="</div>";

        output+="<div class='row col-100  available_on auto'>";
          output+="<div class='col-65'>";
          output+="<div ><span  data-i18n='products.Available'>products.Available </span>( "+data.avalibleInBranch+" )</div>";
          output+="</div>";
          output+="<div class='col-35 text-right'>";
            output+="<a class='show_map' href='templates/branches.html' ><img src='images/pin.png'/> <span data-i18n='products.Map'> products.Map </span></a>";
          output+="</div>";
        output+="</div>";


    output+="</div>";
      output+=drawItemsProducts(data.products);

     $$(mainView.activePage.container).find('.products').html(output);
     displayLanguage();

}
myApp.onPageBeforeAnimation('products',function(e){
  //drawNavbarMenuOfferPage('Products Panasonic','gray');
/*  if(products.length>0){
    drawProductPage(products);
  }else{
  }*/
  product_page=0;
  requestProductData(drawProductPage);


});
myApp.onPageAfterAnimation('products',function(e){
  changeSelect();
  productsListnerPagination();
});
myApp.onPageBeforeAnimation('transactions',function(e){
 // drawNavbarMenuBackPage('Transactions');
  drawPointsPopup();

  var output="";
  output+="<div class='row'>";
    output+="<div class='fixed_bar red_bar col-100 row '>";

      output+="<div class='col-70 '>";
          output+="You have <span class='totalWalt'></span><span  data-i18n='transactions.Watts'>transactions.Watts</span> ";
        output+="</div>";

      output+="<div class='col-30'>";

      output+="<p class='my-0 text-right'><a href='#' data-popup='.popup-points' class='open_timline open-popup'><i class='fa fa-calendar' aria-hidden='true'></i></a></p>";
  //     output+="<a href='#'data-popup='.popup' class='open-popup'><i class='fa fa-calendar' aria-hidden='true'></i></a>";
        output+="</div>";
     output+="</div>";

    output+="<div class='col-100 transactionsList'>";
        output+="<div class='preloader preloader-yellow'></div>";
      output+="</div>";

    output+="</div>";

   $$(mainView.activePage.container).find('.transactions').html(output);
   getTransactionDataUser(drawItemsTransactions);

});
function getTransactionDataUser(callback){
  var userData = window.localStorage.getItem("UserData",userData);
  userData=JSON.parse(userData);
  var url=baseUrlMain+'ManageGeneralData/GetAllCustomerTransactions?CustomerId='+userData.Id+'&LanguageId='+currentLang.Id+'&&PageIndex=1&PageSize=0';
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
    //  console.log(data);
      //data = JSON.parse(data);
      if(data.Data){
        if(callback){
          callback(data.Data);
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
  var userData = window.localStorage.getItem("UserData");
   userData=JSON.parse(userData);


        output+='<div class="timeline">';
          output+='<div class="timeline-item all_points">';
        //  output+='  <div class="timeline-item-date">21 <small>DEC</small></div>';
            output+='  <div class="timeline-item-divider"></div>';
            output+='    <div class="timeline-item-content">';
            output+='      <div class="timeline-item-time" data-i18n="points.available">points.available</div>';
            output+='      <div class="timeline-item-title">'+userData.walts+'</div>';
            output+='    </div>';
          output+='</div>';
         for(var i=0;i<userData.points.length;i++){
          //expired or  expire_second or  expire_first  to timeline-item
          var d = new Date(userData.points[i].date);
           var date = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
           userData.points[i].status.replace(/["']/g, "");

           output+='  <div class="timeline-item '+userData.points[i].status.replace(/["']/g, "")+'">';
           //  output+='    <div class="timeline-item-date">22 <small>DEC</small></div>';
           output+='    <div class="timeline-item-divider"></div>';
           output+='    <div class="timeline-item-content">';
           output+='      <div class="timeline-item-time">Expire '+date+'</div>';
           output+='      <div class="timeline-item-title">'+userData.points[i].walts+'</div>';
           output+='    </div>';
           output+='  </div>';

         }


       output+='</div>';
       return output;
}
/*function getProductDetails(callback){
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

}*/


function calcTime(){
  var id= mainView.activePage.query.query;
  var branch=BranchesObj[id];
  var option = {
    enableHighAccuracy: true // use GPS as much as possible
  };
  plugin.google.maps.LocationService.getMyLocation(option, function(location) {
    my_location=location;
    console.log('my_location',my_location.time);

    var request = {
      origin: {
        lat: my_location.latLng.lat,
        lng: my_location.latLng.lng
      },
      destination: {
        lat: parseFloat(branch.Latitude),
        lng: parseFloat(branch.Longitude)
      },
      travelMode: google.maps.TravelMode.DRIVING
      //  travelMode: google.maps.TravelMode.WALKING
    };
    time_distance=convertMS(my_location.time); // "4:59"
     var time='';
     if(time_distance.day!='0'){
       time+='<span data-i18n="show_profile.days"> show_profile.days:</span> '+time_distance.day;
     }
     if(time_distance.hour!='0'){
       time+='<span data-i18n="branch.hour"> branch.hour:</span> '+time_distance.hour;
     }
     if(time_distance.minute!='0'){
       time+='<span data-i18n="branch.min"> branch.min:</span> '+time_distance.minute;
     }
     if(time_distance.seconds!='0'){
       time+='<span data-i18n="branch.seconds"> branch.seconds:</span> '+time_distance.seconds;
     }
    $$('.nearby').html(time);
    displayLanguage();
    console.log('my_location',time_distance);
  });

}


myApp.onPageBeforeAnimation('branch_details',function(e){
   drawBranch();
    requestLocationAccuracy(calcTime);
  //drawBranch();
});
function drawBranch(){
  var id= mainView.activePage.query.query;
  var branch=BranchesObj[id];
  var output="";

  output+="<div class='row  details_wrapp rev_pos'>";

         output+="<div class='col-100 branch_img text-center auto-view'>";
           output+="<img  class='img-fluid ' src='"+branch.Image+"' />";
         output+="</div>"
         output+="<div class='col-90 auto"
         output+="<div class='col-90 auto-view'>";
            output+="<h1 class='col-100 my-0 '>"+branch.Name+" </h1>";
            output+=branch.Description;
             output+="<div class='contact_branch'>"
               output+="<h4 class='col-100 row my-0 '  data-i18n='branch.Contact'>branch.Contact</h4>";

               output+="<div class='col-100 row'><a href='tel:"+branch.Phone+"'>"+branch.Phone+" </a></div>";
             output+="</div>"

        output+="<h4 class='col-100 row my-0' ><span data-i18n='branch.Nearby'>branch.Nearby</span> <span class='nearby'></span> <span data-i18n='branch.min'>branch.min</span> </h4>";
        output+="<div class='col-100 row' >"+branch.Address+"</div>";

        output+="<div class='col-100 row auto-view' >";
         output+="<a class='btn-submit text_uppercase get_branch_dir' href='templates/branch_distance.html?query="+branch.Id+"' data-i18n='branch.direction'>branch.direction</a>";
       output+="</div>";

      output+="</div>";

    output+="</div>";

   $$(mainView.activePage.container).find('.branch_details').html(output);
   displayLanguage();

}
myApp.onPageBeforeAnimation('branches',function(e){
  //drawNavbarEmpty();
  drawBranches();
  $$(mainView.activePage.container).find('.error_data').html('');
});
myApp.onPageBeforeAnimation('brnches_map',function(e){
  branchesMap();
});
var map;
myApp.onPageAfterAnimation('brnches_map',function(e){
  var mapDiv = document.getElementById("map_canvas");
  var areaId=mainView.activePage.query.query;
  var options = {
    camera: {
      target: {lng:  AreasObj[areaId].Longitude, lat: AreasObj[areaId].Latitude},
      zoom: 8
    }
  };
  map = plugin.google.maps.Map.getMap(mapDiv,options);
   // The MAP_READY event notifies the native map view is fully ready to use.
   map.on(plugin.google.maps.event.MAP_READY, onMapInit);
   listnerMap();
  });
  myApp.onPageBeforeAnimation('branch_distance',function(e){
    //requestLocationAccuracy();
    brancheDistanceMap();
    requestLocationAccuracy(show_distance);
  });
var map;
var map_distance;
var my_location;
function show_distance(){

    var option = {
      enableHighAccuracy: true // use GPS as much as possible
    };
  /*  cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        if(canRequest){
            cordova.plugins.locationAccuracy.request(function(){
                console.log("Successfully made request to invoke native Location Services dialog");
            }, function(){
              //  myApp.alert('Please Enable GPS');
                console.error("Failed to invoke native Location Services dialog");
            });
        }else{
            // request location permission and try again
        }
    });
  */
  var id= mainView.activePage.query.query;
  var branch=BranchesObj[id];
  console.log(branch,'branch');
  console.log(BranchesObj,'BranchesObj');
    plugin.google.maps.LocationService.getMyLocation(option, function(location) {
     my_location=location;
      // Create a map with the device location
      var mapDiv = document.getElementById('map_branch');
      //map_distance.setMyLocationEnabled(true);

  /*    var HND_AIR_PORT = {lat: my_location.latLng.lat, lng:  my_location.latLng.lng};
      var SFO_AIR_PORT = {lat: 30.09098369999999, lng: 31.32270900000003};
  */
  /*var HND_AIR_PORT = {lat: 37.736033, lng:  -122.406750};
  var SFO_AIR_PORT = {lat: 37.787060, lng: -122.389584};
  */
    var HND_AIR_PORT = {lat: my_location.latLng.lat, lng:  my_location.latLng.lng};
    var SFO_AIR_PORT = {lat:parseFloat(branch.Latitude), lng: parseFloat(branch.Longitude)};
      var AIR_PORTS = [
        HND_AIR_PORT,
        SFO_AIR_PORT
      ];

       map_distance = plugin.google.maps.Map.getMap(mapDiv, {
        'camera': {
          target: AIR_PORTS,
          zoom: 16
        }
      });
      map_distance.setMyLocationEnabled(true);
      //  map_distance.on(plugin.google.maps.event.MAP_READY, onMapInitBranch);

      map_distance.addEventListener(plugin.google.maps.event.MAP_READY,onMapInitBranch);
    });

  /*

    var mapDiv = document.getElementById("map_branch");
    var options = {
      camera: {
        target: {lng: -122.1180187, lat: 37.3960513},
        zoom: 19
      }
    };*/
    //map_distance
    /*var HND_AIR_PORT = {lat: 35.548852, lng: 139.784086};
    var SFO_AIR_PORT = {lat: 37.615223, lng: -122.389979};
    var AIR_PORTS = [
      HND_AIR_PORT,
      SFO_Ae.maps.Map.getMap(mapDiv,{
    camera: {
      target: AIR_PORTS
    }
    });*/
    // The MAP_READY event notifies the native map view is fully ready to use.
  //  map_distance.on(plugin.google.maps.event.MAP_READY, onMapInitBranch);
}
myApp.onPageAfterAnimation('branch_distance',function(e){

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
    var id =$(this).val();
    var lat=AreasObj[id].Latitude;
    var long=AreasObj[id].Longitude;
    map.animateCamera({
      target: {lng: long, lat: lat},
    });
  /*  map.moveCamera({
      target: {lng: -122.1180187, lat: 37.3960513},

    });*/
  });
}
function onMapInitBranch() {
  $$('.page-on-left').addClass('hidden');
  var width=$$('body').outerWidth();
  var height=$$('body').outerHeight();
  $$('#map_branch').attr('style','width:'+width+'px !important;height: '+height+'px !important');
  var id= mainView.activePage.query.query;
  var branch=BranchesObj[id];

  // Add a polyline
  //map_distance
/*  var HND_AIR_PORT = {lat: 37.736033, lng:  -122.406750};
  var SFO_AIR_PORT = {lat: 37.787060, lng: -122.389584};
*/var HND_AIR_PORT = {lat: my_location.latLng.lat, lng:  my_location.latLng.lng};
var SFO_AIR_PORT = {lat:parseFloat(branch.Latitude), lng: parseFloat(branch.Longitude)};
  var AIR_PORTS = [
    HND_AIR_PORT,
    SFO_AIR_PORT
  ];
  var request = {
                  origin: {
                      lat: my_location.latLng.lat,
                      lng: my_location.latLng.lng
                  },
                  destination: {
                      lat: parseFloat(branch.Latitude),
                      lng: parseFloat(branch.Longitude)
                  },
                  travelMode: google.maps.TravelMode.DRIVING
              };
  var route=[];
  new google.maps.DirectionsService().route(request, function(response, status)
  {
      if (status == google.maps.DirectionsStatus.OK)
      {
          //var route = new google.maps.DirectionsRenderer({suppressMarkers: true});
        //  route.setMap(map);
        //  route.setDirections(response);
    //    console.log(response.routes);
          var gRoute = response.routes[0]['overview_path'];
          for (var s = 0; s < gRoute.length; s++) {
            route.push(new plugin.google.maps.LatLng(gRoute[s].lat(), gRoute[s].lng()));
          }

            map_distance.addPolyline({
              points: route,
              'color' : 'red',
              'width': 5,
            });
      }

      map_distance.addMarker({
        'position': HND_AIR_PORT,
        icon:'images/pin.png',
      });
      map_distance.addMarker({
        'position': SFO_AIR_PORT,
        icon:branch.Icon,
      });
  });

  //console.log(route);


}
/*map.moveCamera({
  target: bounds
});*/

function onMapInit(map) {
  $$('.page-on-left').addClass('hidden');
  var width=$$('body').outerWidth();
  var height=$$('body').outerHeight();
  $$('#map_canvas').attr('style','width:'+width+'px !important;height: '+height+'px !important');
  var data=[];
  for(var i=0;i<Branches.length;i++){
    var obj={
      position: {lng: Branches[i].Longitude, lat:  Branches[i].Latitude},
      title: Branches[i].Name,
      icon: Branches[i].Icon,
      id: Branches[i].Id
    };
    data.push(obj);
  }
  var bounds = [];
  var markers = data.map(function(options) {
    bounds.push(options.position);
    map.addMarker(options,function(marker){
      marker.set("data_id", options.id);
      marker.on(plugin.google.maps.event.MARKER_CLICK, function() {
        console.log(this);
        //console.log(this.get("data_id"));
        var id=this.get("data_id");
        drawBranchData(id);
      });
    });

  });
  var areaId=mainView.activePage.query.query;

  if(areaId){
    var lat=AreasObj[areaId].Latitude;
    var long=AreasObj[areaId].Longitude;
    map.animateCamera({
      target: {lng: long, lat: lat},

    });

  }

}
var time_distance;

function drawBranchData(id){
  console.log('id',id);
  console.log('id',BranchesObj);
  console.log('id',BranchesObj[id]);
  var branch=BranchesObj[id];
  var option = {
    enableHighAccuracy: true // use GPS as much as possible
  };
  plugin.google.maps.LocationService.getMyLocation(option, function(location) {
    my_location=location;
    console.log('my_location',my_location.time);

    var request = {
      origin: {
        lat: my_location.latLng.lat,
        lng: my_location.latLng.lng
      },
      destination: {
        lat: parseFloat(branch.Latitude),
        lng: parseFloat(branch.Longitude)
      },
      travelMode: google.maps.TravelMode.DRIVING
    //  travelMode: google.maps.TravelMode.WALKING
    };
//    time_distance=convertMS(my_location.time); // "4:59"

    time_distance=convertMS(my_location.time); // "4:59"
     var time='';
     if(time_distance.day!='0'){
       time+='<span data-i18n="show_profile.days"> show_profile.days:</span> '+time_distance.day;
     }
     if(time_distance.hour!='0'){
       time+='<span data-i18n="branch.hour"> branch.hour:</span> '+time_distance.hour;
     }
     if(time_distance.minute!='0'){
       time+='<span data-i18n="branch.min"> branch.min:</span> '+time_distance.minute;
     }
     if(time_distance.seconds!='0'){
       time+='<span data-i18n="branch.seconds"> branch.seconds:</span> '+time_distance.seconds;
     }
  //  $$('.nearby').html(time);

    $$('.nearby').html(time);
    console.log('my_location',time_distance);
  });


  var output="";
  output+="<div>";
        output+="<img src='"+branch.Image+"'/>";
       output+="<div class='col-100 text-center small nearby_map'><span data-i18n='branch.Nearby'>branch.Nearby</span> <span class='nearby'></span> <span data-i18n='branch.min'>branch.min</span> </div>"
      output+="<a  class='btn-submit text_uppercase get_branch_dir' href='templates/branch_details.html?query="+id+"' data-i18n='branch.direction'> branch.direction </a>";

    output+="</div>";
  output+="</div>";

 $$(mainView.activePage.container).find('.branch_data').html(output);

displayLanguage();
}
function convertMS( milliseconds ) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
}


/*map.moveCamera({
  target: bounds
});*/

function brancheDistanceMap(){
  var output='';
  var branchId=mainView.activePage.query.query;
  var area=AreasObj[BranchesObj[branchId].AreaId];
  output+="<div class='row'>";
     output+="<div class='col-100 map_wrapper'>";
        output+="<div class='map_canvas' id='map_branch'></div>";
      output+='<div id="searchBox">';
               output+="<a href='#' class='item-link smart-select select-style' data-open-in='picker'  data-back-on-select='true'>";
               output+="   <select name='area' id='map_area'>";
               output+=" <option value=''  data-i18n='profile.Select'>profile.Select </option>";
               var namearea='';

               for(var i=0;i<Areas.length;i++){
                 var selected='';
                 if(Areas[i].Id==area.Id){
                   selected='selected="selected"';
                   namearea=Areas[i].Name;
                 }
                 output+=" <option value='"+Areas[i].Id+"' "+selected+"  >"+Areas[i].Name+"</option>";
               }
               output+="   </select>";
               output+="   <div class='item-content'>";
               output+="     <div class='item-inner'>";
               output+="     <div class='item-after smart-select-value'>"+namearea+"</div>";
               output+="     </div>";
               output+="   </div>";
               output+=" </a>";
          output+='</div>';



     output+="</div>";
  output+="</div>";

  $$(mainView.activePage.container).find('.branch_distance').html(output);
  displayLanguage();
}

function branchesMap(){
  var output='';
  var areaId=mainView.activePage.query.query;
  output+="<div class='row'>";
     output+="<div class='col-100 map_wrapper'>";
        output+="<div class='map_canvas' id='map_canvas'> </div>";
      output+='<div id="searchBox">';
               output+="<a href='#' class='item-link smart-select select-style' data-open-in='picker'  data-back-on-select='true'>";
               output+="   <select name='area' id='map_area'>";
               output+=" <option value='' >Select </option>";
               var namearea='';
               for(var i=0;i<Areas.length;i++){
                 var selected='';
                 console.log('jjj',areaId);
                 console.log('ss',Areas[i].Id);
                 if(Areas[i].Id==areaId){
                    selected='selected="selected"';
                    namearea=Areas[i].Name;
                 }
                 output+=" <option value='"+Areas[i].Id+"' "+selected+" >"+Areas[i].Name+"</option>";
               }
               console.log('namearea',namearea)
               output+="   </select>";
               output+="   <div class='item-content'>";
               output+="     <div class='item-inner'>";
            //   output+="             <div class='item-title'  data-i18n='profile.area'>profile.area</div>";
               output+="  <div class='item-after smart-select-value' >"+namearea+"</div>";
               output+="     </div>";
               output+="   </div>";
               output+=" </a>";
          output+='</div>';

          output+='<div class="branch_data"></div>';


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
      output+="<div class='row'>";


      output+="<div class='col-100 branches_bg bg_cover' style='background-image:url(images/branch_2.jpeg)'> </div>";
    //  output+="<div class='col-100 branches_bg bg_cover' style='background-image:url(images/branch.jpg)'> </div>";

      output+="<div class='col-100 find_branche_screen'>";
         output+="<img  src='images/pin_branch.png' />";

         output+="<h3 class='text_uppercase'  data-i18n='profile.choose'>profile.choose</h3>";

         output+="<form method='post' class='ajax-submit col-90 auto-view row' id='form_area'>";
         output+= "<div class='item-input-wrap col-100 row form_area_area_parent'>";

         output+="<a href='#' class=' col-100 item-link smart-select select-style' data-open-in='picker'  data-back-on-select='true'>";
         output+="   <select name='area' id='form_area_area'>";
         output+=" <option value='' data-i18n='profile.Select'>profile.Select </option>";
         for(var i=0;i<Areas.length;i++){
           output+=" <option value='"+Areas[i].Id+"' >"+Areas[i].Name+"</option>";
         }
         output+="   </select>";
         output+="   <div class='item-content'>";
         output+="     <div class='item-inner'>";
         output+="  <div class='item-after smart-select-value'  data-i18n='profile.area' >profile.area</div>";
         output+="     </div>";
         output+="   </div>";
         output+=" </a>";
         output+="<span class='input-clear-button'></span>";
         output+="</div>";

         output+= "<div class='item-input-wrap col-100'>";
         output+=" <input type='submit' name='submit'   data-i18n='[value]profile.Findloc'  class='col-100 link_btn'>";
         output+="</div>";
         output+="</form>";


       output+="</div>";

      output+="</div>";
   $$(mainView.activePage.container).find('.branches').html(output);
}
function getItemProduct(id,callback){
  for(var i=0;i<products.length;i++){
    if(id==products[i].Id){
      callback( products[i]);
      break;
    }
  }
}
function getItemOffer(id,callback){
  for(var i=0;i<offers.length;i++){
    if(id==offers[i].Id){
      callback(offers[i]);
      break;
    }
  }
}
myApp.onPageBeforeAnimation('product_details',function(e){
  var paramters=mainView.activePage.query;
  if(paramters.id){
    if(paramters.filter==1){
      getItemProduct(paramters.id,drawProductDetails);
    }else {
      getItemOffer(paramters.id,drawProductDetails);
    }
  }else{
    mainView.router.loadPage('templates/index.html');
  }
  //getProductDetails(drawProductDetails);
});
function drawProductDetails(data){
  //console.log(data);
  $$('.navbar-inner span.detail').html("<span data-i18n='details.MODEL'>details.MODEL </span>"+data.Model)
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
            output+="<img  class='img-fluid'  src='"+data.Image+"' />";
            output+="<h3 class='mb-0 text_uppercase'  data-i18n='details.help'>details.help</h3>";
            output+="<div class='small gray_clr' data-i18n='details.Search'>details.Search</div>";
        output+="</div>";

    output+="</div>";

    output+="<div class='bottom_bar bottom_go_location'>";
      output+="<a href='templates/branches.html' class='col-100 '>";

        output+="<span class='col-100 arrow'>";
            output+="<div class='small gray_clr'  data-i18n='details.Let'>details.Let</div>";
            output+="<img src='images/arrow.png' />";
        output+="</span>";

        output+="<div class='col-100 '>";
            output+="<img src='images/white_pin.png' />";
        output+="</div>";
      output+="</a>";


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
     $$(mainView.activePage.container).find('.totalWalt').html(data.Total_Points);
     for(var i=0;i<data.transactions.length;i++){
       output+=drawItemTransaction(data.transactions[i]);
     }
     $$(mainView.activePage.container).find('.transactionsList').html(output);
}
function drawItemTransaction(item){
  var output="";
      output+="<div class='row col-95 items_stretch auto-view transactions_item'>";
         output+="<div class='col-40 text-center watts_count_inner'>";
             output+="<div class='watts_inner'>";
             output+="<span class='col-100 row watts_count'>"+item.PriceWithDiscount+"</span><span class='col-100 row watt' data-i18n='details.Watt'>details.Watt</span>";
            output+="</div>";
         output+="</div>";
         output+="<div class='col-60 row'>";
             output+="<div class='col-100 '>";
                  output+="<h3 class='my-0'>"+item.Name+"</h3>";
                  output+="<div class='mb-20  gray_clr s_small'>"+item.Description+"</div>";
            output+="</div>";
            output+="<div class='small row col-100 '>";
               output+="<div class='col-100  row' data-i18n='details.Date'>details.Date</div>";
               var d = new Date(item.Date);
                var date = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
               output+="<div class='col-100 gray_clr row'> "+date+"</div>";
           output+="</div>";
         output+="</div>";
      output+="</div>";
  return output;

}
function drawItemsOffers(offers){
  console.log('offers',offers);
  var output ="";
     for(var i=0;i<offers.length;i++){
       output+=drawItemOffer(offers[i]);
     }
   return output;
}
function drawItemOffer(item){
console.log('item',item);
console.log('Model',item.Model);
  var output="";
  var d = new Date(item.ExpiryDate);
   var date = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();

      output+="<a class='product_item offer_item row col-95 auto-view' href='templates/product_details.html?id="+item.Id+"&filter=2' class='offer_item'>";
          output+="<div class='row col-100'>";
            // output+="<div class='col-50'><img src='images/20_icon.png'/>"+item.discount+"</div>";
              output+="<div class='col-50 '></div>";
             output+="<div class='col-50 text-right s_small' ><span data-i18n='details.Expiry'>details.Expiry :</span> "+date+"</div>";
          output+="</div>";

          output+="<div class='row col-100'>";
            output+="<div class='col-100 product_img text-center'>";
               // output+="<div class='col-50 discount_img'><img src='images/20_icon.png'/>"+item.DiscountPercent+"</div>";
                output+="<img class='img-fluid' src='"+item.Image+"' />";
            output+="</div>";
          output+="</div>";

          output+="<div class='details row col-100'>";
          output+="<div class='col-70'>";
          output+="<h1 class='model' ><span  data-i18n='details.MODEL'>details.MODEL </span>"+ item.Model +"</h1>";
          output+="</div>";
          output+="<div class='col-30 text-right before_after'>";
              output+="<div class='before small gray_clr'>"+item.OriginalPrice+"<span  data-i18n='details.Watts' > details.Watts</span></div>";
                 output+="<h2>"+item.PriceWithDiscount+"<span   data-i18n='details.Watts'> details.Watts </span></h2>";
              output+="</div>";

        output+="<div class='col-100 desc s_small bb'>"+item.Description+"</div>";


         output+="</div>";

      output+="</a>";
  return output;
}
function drawItemProduct(item){
  var output="";
      output+="<a  href='templates/product_details.html?id="+item.Id+"&filter=1' class='row col-95 auto-view text-center product_item'>";
      output+="<div class='col-100 row'>";
          output+="<div class='col-100 product_img text-center'>";
            output+="<img class='img-fluid' src='"+item.Image+"' />";
           output+="</div>";
      output+="</div>";

      output+="<div class='row col-100'>";
        output+="<div class='col-100'>";
           output+="<h1 class='model' ><span data-i18n='details.MODEL'> details.MODEL </span>"+item.Model+"</h1>";
           output+="<div class='col-100 desc s_small'>"+item.Description+"</div>";
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
  //drawNavbarEmpty();

  var userData = window.localStorage.getItem("UserData");
       userData=JSON.parse(userData);
  var output="";
  output+="<div class='row'>";

    output+="<form method='post' class='ajax-submit gray_clr text-center min_h justify_content_ col-90 auto-view row' id='profile_form' enctype='multipart/form-data'>";

      output+= "<div class='my-1 item-input-wrap col-100 profile_form_avatar_parent' style='background-image:url()'>";
        output+="<div class='avatar_img'><img src='images/avatar.png'/>";

          output+="<div id='the_user_img' class='the_user_img'></div>";
          output+="<span class='photo_txt' data-i18n='profile.photo'>profile.photo</span>";
          output+="<span class='cam_ico'><img src='images/camara.png'></span>";

          output+= "<input type='hidden' name='userId' value='"+userData.Id+"'>";
          output+= "<input type='file' name='Image' onchange='readURL(this);' id='profile_form_Image' accept='image/*;capture=camera'>";
        output+="</div>";
        output+="<span class='input-clear-button'></span>";

      output+="</div>";

      output+="<h1 class='col-100 my-1 red_clr'>Welcome</h1>";
      output+="<div class='col-100 my-1' data-i18n='profile.first'>profile.first<br/><span  data-i18n='profile.complete'>profile.complete</span></div>";
      output+= "<div class='my-1 item-input-wrap col-100'>";

        output+=" <input type='submit' name='submit'  data-i18n='[value]profile.Save' class='btn-submit'>";
      output+="</div>";
    output+="</form>";
    output+= "<div class='item-input-wrap col-90 auto-view my-1'>";
      output+="<a class='skip_to_profile gray_clr' href='templates/show_profile.html' data-i18n='profile.Skip'>profile.Skip >></a>";
    output+="</div>";

    output+="</div>";

  $$(mainView.activePage.container).find('.profile').html(output);
});
myApp.onPageAfterAnimation('profile',function(e){
   requires=['Image'];
   formId='profile_form';
  var urlReq=baseUrlMain+'/ManageCustomer/UpdateImageProfile'
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
//  console.log(requires);
  $$('#'+formId).attr('action',urlReq);
  $$('#'+formId).on('form:beforesend',submitFormRegister);
  $$('#'+formId).on('submitted',submitFormResultRegister);
//  $$('#'+formId).off('submit',submitForm(requires,formId));
}
function listnerEditProfileFormAction(urlReq){
  //console.log(requires);
  $$('#'+formId).attr('action',urlReq);
  $$('#'+formId).on('form:beforesend',submitFormProfile);
  $$('#'+formId).on('submitted',submitFormResultProfile);
//  $$('#'+formId).off('submit',submitForm(requires,formId));
}
function listnerverificationFormAction(urlReq){
  $$('#'+formId).attr('action','#');
  $$('#'+formId).on('form:beforesend',submitFormResultVerification);
  //number_1','number_2','number_3','number_4'
  //$$('#'+formId).on('submitted',submitFormResultVerification);
//  $$('#'+formId).off('submit',submitForm(requires,formId));
}
function listnerProfileFormAction(urlReq){
  //console.log(urlReq);
  //console.log(formId);
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
   data = JSON.parse(data);

  if(data.Data.Status==200){
    $$('#'+formId).find('.input-clear-button').html('');
     var user={
       'email':  $$('#'+formId+'_Email').val(),
       'password':  $$('#'+formId+'_Password').val(),
     };
    user=JSON.stringify(user);
    var userData=JSON.stringify(data.Data.User);
    userInfo=data.Data.User;
    window.localStorage.setItem("User",user);
    window.localStorage.setItem("UserData",userData);
   console.log(data.Data.User);
   console.log(data.Data.ProfileImage);
    if(data.Data.User.ProfileImage){
      mainView.router.loadPage('templates/show_profile.html');
    }else{
      mainView.router.loadPage('templates/profile.html');
    }
    //save User
  }else{
    showError(data.Data.Message);
  }
}
function submitFormResultChangePassword(e){
  var xhr = e.detail.xhr; // actual XHR object
  var data = e.detail.data; // Ajax response from action file
   data = JSON.parse(data);
  if(data.Data.Status==200){
    $$('#'+formId).find('.input-clear-button').html('');
     var user={
       'email': data.Data.User.Email,
       'password':data.Data.User.Password,
     };
    user=JSON.stringify(user);
    window.localStorage.setItem("User",user);
    var userData=JSON.stringify(data.Data.User);
    window.localStorage.setItem("UserData",userData);
    if(data.Data.User.ProfileImage){
      mainView.router.loadPage('templates/show_profile.html');
    }else{
      mainView.router.loadPage('templates/profile.html');
    }
    //save User
  }else{

  //  console.log(data.Data.Message);
    $$('.input-clear-button').html("");
    //$$('.input-clear-button.global_error').html(data.Message);
    showError(data.Data.Message);
  }
}
var user;
function submitFormResultRegister(e){
  var xhr = e.detail.xhr; // actual XHR object
  var data = e.detail.data; // Ajax response from action file
   data = JSON.parse(data);

  if(data.Data.Status==200){
    $$('#'+formId).find('.input-clear-button').html('');
     user={
       'email':  $$('#'+formId+'_Email').val(),
       'password':  $$('#'+formId+'_Password').val(),
       'mobile':  $$('#'+formId+'_Phone').val(),
     };
     user.id=data.Data.User.Id;
    // console.log(user);
    var user_country=window.localStorage.getItem("appLanguage");
       user_country=JSON.parse(user_country);
      var $mobile=user.mobile;
       var urlReq=baseUrlMain+'ManageAccount/ForgetPassword'
    $.post(urlReq,
    {
        mobile:$mobile,
        countyId:user_country.Country
    },
    function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
    });
     mainView.router.loadPage('templates/verification.html?q=1');
    //save User
  }else{
  //  console.log('data.Data.Message',data.Data.Message);
    showError(data.Data.Message);
    mySwiper.slideTo('0');
  }
}
function submitFormResultProfile(e){
  var xhr = e.detail.xhr; // actual XHR object
  var data = e.detail.data; // Ajax response from action file
   data = JSON.parse(data);
  // console.log(data);
/*
  if(data.Data.Status==200){
    $$('#'+formId).find('.input-clear-button').html('');
     user={
       'email':  $$('#'+formId+'_Email').val(),
       'password':  $$('#'+formId+'_Password').val(),
       'mobile':  $$('#'+formId+'_Phone').val(),
     };
    var user_country=window.localStorage.getItem("appLanguage");
       user_country=JSON.parse(user_country);
      var $mobile=user.mobile;
       var urlReq=baseUrlMain+'ManageAccount/ForgetPassword'
    $.post(urlReq,
    {
        mobile:$mobile,
        countyId:user_country.Country
    },
    function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
    });
     mainView.router.loadPage('templates/verification.html?q=1');
    //save User
  }else{
    console.log('data.Data.Message',data.Data.Message);
    showError(data.Data.Message);
    mySwiper.slideTo('0');
  }*/
}
function resendCode(){
  $$('.resendcodeUser').removeClass('hidden');
  var user_country=window.localStorage.getItem("appLanguage");
     user_country=JSON.parse(user_country);
     var mobile=$$('#verif_form_mobile').val();

     var urlReq=baseUrlMain+'ManageAccount/ForgetPassword'
  $.post(urlReq,
  {
      mobile:mobile,
      countyId:user_country.Country
  },
  function(data, status){

    $$('.resendcodeUser').addClass('hidden');
    $$('.resendcodeUserMsg').html('done');

      console.log("Data: " + data + "\nStatus: " + status);
  });
}
var verfication_user;
function submitFormResultVerification(e){
  var xhr = e.detail.xhr; // actual XHR object
  var urlReq=baseUrlMain+'ManageAccount/Verification';
  var flag=true;
  if(user){
    user.mobile=$$('#'+formId+'_mobile').val();
    //changeuserMobile
    if(!$$('#verif_form_mobile').hasClass('disable')){
      var req=baseUrlMain+'ManageAccount/ChangePhone'
      $.post(req,
        {
          UserId:user.id,
          NewPhone:user.mobile,
        },
        function(data, status){
      //    console.log(data);
          if(data.Data.Status==200){
            flag=true;

          }else{
            flag=false;
            $$('#'+formId+' .verif_form_number_parent').find('.input-clear-button').html(data.Data.Message);
          }
        });

      }
  }

  if(flag&&checkRequiresMobile(requires,formId)){
    $$('#'+formId).find('.input-clear-button').html('');
    var code=$$('#'+formId+'_number_1').val()+$$('#'+formId+'_number_2').val()+$$('#'+formId+'_number_3').val()+$$('#'+formId+'_number_4').val();
    var urlReq=baseUrlMain+'ManageAccount/Verification'
    $.post(urlReq,
      {
        mobile:$$('#'+formId+'_mobile').val(),
        code:code,
      },
      function(data, status){
        if(data.Data.Status==200){
          verfication_user=data.Data.User;
           if(mainView.activePage.query.q==1){
            mainView.router.loadPage('templates/login.html');
          }else{
            mainView.router.loadPage('templates/change_password.html');
          }
        }else{
          $$('#'+formId+' .verif_form_number_parent').find('.input-clear-button').html(data.Data.Message);
        }
      });
  }
  xhr.abort();
  return false;
  /*var data = e.detail.data; // Ajax response from action file
        console.log(data);
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
  }*/
}
function submitFormResultProfile(e){
  var xhr = e.detail.xhr; // actual XHR object
  var data = e.detail.data; // Ajax response from action file
   data = JSON.parse(data);
  if(data.Data.Status==200){
    var userData=JSON.stringify(data.Data.User);
    window.localStorage.setItem("UserData",userData);
    $$('#'+formId).find('.input-clear-button').html('');
/*    var userData = window.localStorage.getItem("UserData");
     userData=JSON.parse(userData);
*/
    if(data.Data.User.ProfileImage){
      mainView.router.loadPage('templates/show_profile.html');
    }else{
      mainView.router.loadPage('templates/profile.html');
    }
    //save User
  }else{
    showError(data.Data.Message);
  }
}
function submitFormResultForget(e){
  var xhr = e.detail.xhr; // actual XHR object
  var data = e.detail.data; // Ajax response from action file
   data = JSON.parse(data);
   mobileUser=$$('#forget_password_form_mobile').val();
  if(data.Data.Status==200){
    $$('#'+formId).find('.input-clear-button').html('');
  //  window.localStorage.setItem("Verfication",data.verificationNumber);
    mainView.router.loadPage('templates/verification.html?q=2');
    //save User
  }else{
    showError(data.Data.Message);
  }
}

function showError(msg){
//  console.log(msg);
  var arr = Array.from(Object.keys(msg), k=>msg[k]);
//  console.log(arr.length);

  if(typeof msg=='string'){
    $$('#'+formId+' .global_error').html(msg);
  }
  if(arr.length>0){
    for (var k in msg){
      $$('#'+formId+' .'+formId+'_'+k+'_parent').find('.input-clear-button').html(msg[k]);
    }
  }

}
function submitForm(e){
  //var xhr = e.detail.xhr;
   document.activeElement.blur();
   if(checkRequires(requires,formId)){
     $$('#'+formId).find('.input-clear-button').html('');
     /*       window.localStorage.setItem("UserLanguage", $$('#'+formId +'#'+formId+'_language').val());
     window.localStorage.setItem("UserCountry", $$('#'+formId +'#'+formId+'_country').val());
     */    //   add to storage
     //   mainView.router.loadPage('templates/visitor.html')
   }
   //xhr.abort();
   return false;

}
function submitFormRegister(e){
  var xhr = e.detail.xhr;
   document.activeElement.blur();
   if(!checkRequires(requires,formId)){
     mySwiper.slideTo('0');
     xhr.abort();
     return false;
   }else if($$('#'+formId+' #'+formId+'_ConfirmPassword').val()!==$$('#'+formId+' #'+formId+'_Password').val()){
     $$('#'+formId+' .'+formId+'_ConfirmPassword_parent').find('.input-clear-button').html('<span data-i18n="req.pass">req.pass</span>');
     mySwiper.slideTo('1');
     xhr.abort();
     return false;
   }
}
function submitFormProfile(e){
  var xhr = e.detail.xhr;
   document.activeElement.blur();

   if(!checkRequires(requires,formId)){
     xhr.abort();
     return false;
   }
}
myApp.onPageBeforeAnimation('login',function(e){
  checkUser();
  var output="";
      output+="<div class='row bg_country ' style='background-image:url(images/vistor_bg.jpg)'>";

        output+="<div class='text_center margin-data col-100'>";
          output+= "<img src='images/language_logo.png'/>";
        output+="</div>";

        output+="<div class='row col-100'>";
          output+="<h2 class='col-100  text-center title_center' data-i18n='login.Title'>login.Title</h2>";
          output+="<form method='post' class='ajax-submit col-90 auto-view row' id='login_form'>";
         output+= "<div class='item-input-wrap col-100 row login_form_Email_parent'>";
           output+= "<input type='email' name='Email' id='login_form_Email'  data-i18n='[placeholder]login.Email'   class='input_text  col-100'>";
           output+="<span class='input-clear-button'></span>";
         output+="</div>";
         output+= "<div class='item-input-wrap col-100 row login_form_Password_parent'>";
           output+= "<input type='password' name='Password' id='login_form_Password'  data-i18n='[placeholder]login.Password' class='input_text  col-100'>";
           output+="<span class='input-clear-button'></span>";
         output+="</div>";

            output+="<div class='global_error col-90 input-clear-button'></div>";

         output+= "<div class='item-input-wrap col-100'>";
            output+=" <input type='submit' name='submit'  data-i18n='[value]login.Now'   class='btn-submit'>";
         output+="</div>";
         output+="<div class='forget_password col-100'><a href='templates/forgot_password.html'  data-i18n='login.Forget'>login.Forget</a></div>";
          output+="</form>";

          output+="<div class=' col-100 row text-agreement'>";
          output+="<p class='col-90 text-center' data-i18n='login.Signby' >login.Signby</p>";
          output+="</div>";
        output+="</div>";

      output+="</div>";
  $$(mainView.activePage.container).find('#login').html(output);
});
//forgot_password Page
myApp.onPageBeforeAnimation('forgot_password',function(e){
  checkUser();

  var appLanguage=window.localStorage.getItem("appLanguage");
  appLanguage=JSON.parse(appLanguage);
  var output="";
      output+="<div class='row bg_country align_items_center' style='background-image:url(images/forget_bg.jpg)'>";

        output+="<div class='row col-100 forget'>";
          output+="<h1 class='col-100 my-0  text-center title_center' data-i18n='forget.Title'> forget.Title </h1>";
          output+="<div class='my-1 col-90  text-center my-1 title_center center_box'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</div>";
          output+="<form method='post' class='ajax-submit col-90 auto-view row' id='forget_password_form'>";
         output+= "<div class='item-input-wrap col-100 row forget_form_mobile_parent'>";
           output+= "<input type='tel' name='mobile' id='forget_password_form_mobile' data-i18n='[placeholder]forget.Phone'  class='input_text  col-100'>";
           output+= "<input type='hidden' name='countyId' value='"+appLanguage.Country+"'>";
           output+="<span class='input-clear-button global_error'></span>";
         output+="</div>";
         output+= "<div class='item-input-wrap col-100'>";
            output+=" <input type='submit' name='submit' data-i18n='[placeholder]forget.Send'   class='btn-submit'>";
         output+="</div>";

        output+="</div>";

      output+="</div>";


  $$(mainView.activePage.container).find('#forgot_password').html(output);
});


myApp.onPageAfterAnimation('forgot_password',function(e){
  requires=['mobile'];
  formId='forget_password_form';
  var urlReq=baseUrlMain+'ManageAccount/ForgetPassword'
  listnerForgetFormAction(urlReq);
});

//change_password Page
myApp.onPageBeforeAnimation('change_password',function(e){
  var output="";
      output+="<div class='row'>";
      output+="<div class='col-100 verification_title change_password_title'>";
        output+="<h1 data-i18n='ChangePassword.change'>ChangePassword.change</h1>";
        output+="<img src='images/password_icon.png'>";
      output+="</div>";
      output+="<form method='post' class='ajax-submit col-90 auto-view row' id='change_password_form'>";
      output+="<div class='col-100  change_password_form_password_parent'>";
      output+= "<input type='hidden' name='email' value="+verfication_user.Email+"  class='input_text  col-90 '  >";
      output+= "<input type='password' name='password' data-i18n='[placeholder]ChangePassword.Password' id='change_password_form_password'  class='input_text  col-90 '  >";
      output+="<span class='input-clear-button'></span>";
      output+="</div>";
      output+="<div class='col-100  change_password_form_confirm_password_parent'>";
      output+= "<input type='password' name='confirm_password' data-i18n='[placeholder]ChangePassword.PasswordConfirm'  id='change_password_form_confirm_confirm_password_parent' class='input_text  col-90 '  >";
      output+="<span class='input-clear-button'></span>";
      output+="</div>";

      output+="<span class='input-clear-button global_error'></span>";
      output+="<div class='col-100 '>";
       output+=" <input type='submit' name='submit' data-i18n='[placeholder]ChangePassword.changePassword'   class='col-100 btn-submit'>";
      output+="</div>";

      output+="</form>";
      output+="</div>";
  $$(mainView.activePage.container).find('.change_password').html(output);
});
myApp.onPageAfterAnimation('change_password',function(e){
 // drawNavbarBack();
  requires=['password','confirm_password'];
  formId='change_password_form';
  var urlReq=baseUrlMain+"ManageAccount/ChangePassword";
  listnerchangePasswordFormAction(urlReq);
});

function drawIndex(){
  checkUser();
  var output='';
  output+='   <div  class="swiper-container home-slider swiper-init" data-pagination=".swiper-pagination" data-space-between="0">';
  output+="             <img class='img-fluid intro-logo' src='images/almanara_logo.png'/>";

  output+=" <div class='home_text home__bottom_text text-center abs-pos'>";
  output+="         <div class='inner'>";
  output+="             <span class='bold'  data-i18n='slider_text.Panasonic'>slider_text.Panasonic</span>";
  output+="             <span class='orange_colr'  data-i18n='slider_text.HomaAndLiving'>slider_text.HomaAndLiving</span>";
  output+="         </div>";
  output+="         <a  class='next' href='templates/visitor.html' data-i18n='slider_text.Next'> slider_text.Next</a>";
  output+="     </div>";
  output+='  <div class="swiper-pagination"></div>';
  output+=' <div class="swiper-wrapper ">';
  //for(var i=0;i<AppMainData.Banners.length;i++){
  //AppMainData.Banners[i].Image=  AppMainData.Banners[i].Image.replace(/ /g, '%20');
  if(window.devicePixelRatio == 0.75) {
    output+= "<div class='swiper-slide'>";
    output+= "  <div class='home_blured_img' style='background:url(images/sizes/drawable-hdpi/1.jpg)'> </div>";
    output+= "  <img class='home_img' src='images/sizes/drawable-hdpi/1.jpg'/> ";
    output+= "</div>";
    output+= "<div class='swiper-slide'>";
    output+= "  <div class='home_blured_img' style='background:url(images/sizes/drawable-hdpi/2.jpg)'> </div>";
    output+= "  <img class='home_img' src='images/sizes/drawable-hdpi/2.jpg'/> ";
    output+= "</div>";
    output+= "<div class='swiper-slide'>";
    output+= "  <div class='home_blured_img' style='background:url(images/sizes/drawable-hdpi/3.jpg)'> </div>";
    output+= "  <img class='home_img' src='images/sizes/drawable-hdpi/3.jpg'/> ";
    output+= "</div>";

  //  $("#app-icon").attr('src', '/images/lpdi/app-icon.png');
  }
  else if(window.devicePixelRatio == 1) {
    output+= "<div class='swiper-slide'>";
    output+= "  <div class='home_blured_img' style='background:url(images/sizes/drawable-mdpi/1.jpg)'> </div>";
    output+= "  <img class='home_img' src='images/sizes/drawable-mdpi/1.jpg'/> ";
    output+= "</div>";
    output+= "<div class='swiper-slide'>";
    output+= "  <div class='home_blured_img' style='background:url(images/sizes/drawable-mdpi/2.jpg)'> </div>";
    output+= "  <img class='home_img' src='images/sizes/drawable-mdpi/2.jpg'/> ";
    output+= "</div>";
    output+= "<div class='swiper-slide'>";
    output+= "  <div class='home_blured_img' style='background:url(images/sizes/drawable-mdpi/3.jpg)'> </div>";
    output+= "  <img class='home_img' src='images/sizes/drawable-mdpi/3.jpg'/> ";
    output+= "</div>";

  //  $("#app-icon").attr('src', '/images/mdi/app-icon.png');
  }
  else if(window.devicePixelRatio == 1.5) {
    output+= "<div class='swiper-slide'>";
    output+= "  <div class='home_blured_img' style='background:url(images/sizes/drawable-hdpi/1.jpg)'> </div>";
    output+= "  <img class='home_img' src='images/sizes/drawable-hdpi/1.jpg'/> ";
    output+= "</div>";
    output+= "<div class='swiper-slide'>";
    output+= "  <div class='home_blured_img' style='background:url(images/sizes/drawable-hdpi/2.jpg)'> </div>";
    output+= "  <img class='home_img' src='images/sizes/drawable-hdpi/2.jpg'/> ";
    output+= "</div>";
    output+= "<div class='swiper-slide'>";
    output+= "  <div class='home_blured_img' style='background:url(images/sizes/drawable-hdpi/3.jpg)'> </div>";
    output+= "  <img class='home_img' src='images/sizes/drawable-hdpi/3.jpg'/> ";
    output+= "</div>";

  //  $("#app-icon").attr('src', '/images/hpdi/app-icon.png');
  }
  else if(window.devicePixelRatio == 2) {
    output+= "<div class='swiper-slide'>";
    output+= "  <div class='home_blured_img' style='background:url(images/sizes/drawable-xhdpi/1.jpg)'> </div>";
    output+= "  <img class='home_img' src='images/sizes/drawable-xhdpi/1.jpg'/> ";
    output+= "</div>";
    output+= "<div class='swiper-slide'>";
    output+= "  <div class='home_blured_img' style='background:url(images/sizes/drawable-xhdpi/2.jpg)'> </div>";
    output+= "  <img class='home_img' src='images/sizes/drawable-xhdpi/2.jpg'/> ";
    output+= "</div>";
    output+= "<div class='swiper-slide'>";
    output+= "  <div class='home_blured_img' style='background:url(images/sizes/drawable-xhdpi/3.jpg)'> </div>";
    output+= "  <img class='home_img' src='images/sizes/drawable-xhdpi/3.jpg'/> ";
    output+= "</div>";

    //$("#app-icon").attr('src', '/images/xpdi/app-icon.png');
//  }

/*  output+= "<div class='swiper-slide'>";
  output+= "  <div class='home_blured_img' style='background:url("+AppMainData.Banners[i].Image+")'> </div>";
  output+= "  <img class='home_img' src='"+AppMainData.Banners[i].Image+"'/> ";
  output+= "</div>";
*/
 /*  output+=  "<div class='swiper-slide' style='background:url("+AppMainData.Banners[i].Image+")' >";
    output+=  "<div class='home_text des text-center abs-pos'>";*/
/*    output+=  "<p class=''>";
    output+= " We <span class='bold'>DELIVER</span> Quality  <p> Just For  You</p>";
*/   /* output+= " </div>";

    output+= "</div>";*/
  }
  output+='       </div>';
  output+='   </div>';
  $$(mainView.activePage.container).find('.slider').html(output);
  var swiper = new Swiper('.home-slider', {
   pagination:'.swiper-pagination',
 });
}

$$('.deleted-callback').on('swipeout:deleted', function () {
  app.dialog.alert('Thanks, item removed!');
});

function drawNavbarMenuPageTitleBack(title , clr ,title2){
  var output="";
  output+="<div class='navbar-inner "+clr+"'>";
  output+="<div class='left'>";
    output+="<a href='#' class='link back'>";
    output+="  <i class='fa fa-angle-left' aria-hidden='true'></i>";
    output+="</a>";
  output+="</div>";
    output+="<div class='center sliding'>"+title+"</div>";
      output+="<div class='right'>";
           output+=title2;
      output+="</div>";
  output+="</div>";
  $$('.navbar_content').html(output);
}
var notification;
function getUserNotification(callback){
  var userData = window.localStorage.getItem("UserData",userData);
  userData=JSON.parse(userData);
  var url=baseUrlMain+'ManageGeneralData/GetAllNotifications?CustomerId='+userData.Id+'&LanguageId='+currentLang.Id;
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
    //  console.log(data);
      //data = JSON.parse(data);
      if(data.Data){
        notification=data.Data;
        if(callback){
          callback(notification);
        }
       }
    }
  });
}
function deleteNotification(id){
  var url=baseUrlMain+'ManageGeneralData/DeleteNotifications?NotificationId='+id;
  $.ajax({
    url: url,
    processData: false,
    type: 'Post',
    success: function ( data ) {
    //  console.log(data);
      //data = JSON.parse(data);
      if(data.Data.Status==200){
        //AppMainData=data.Data;
    //    console.log('data',AppMainData);
        $$('.noti_'+id).remove();
       }
    }
  });

}
function drawNotificationData(data){
  var output="";
   output+='<ul class="col-100">';
   if(data&&data.length==0){
     output+='<li class="">'; //appear if no notifications
     output+='<div class="item-content swipeout-content">';
     output+='<div class="item-inner row col-100">';
     output+='<div class="item-title row col-100" data-i18n="Notifications.no">Notifications.no</div>';
     output+=' </div>';
     output+='</div>';
     output+='</li>';
   }
   for(var i=0;i<data.length;i++){
     output+='<li class="swipeout deleted-callback noti_'+data[i].Id+'">';
     output+='<div class="item-content swipeout-content">';
     output+='<div class="item-media">';
     output+='<img src="images/notification_list_ico.png"/>';
     output+='</div>';
     output+='<div class="item-inner row col-100">';

     output+='<div class="item-title row col-100">'+data[i].Name+'</div>';
     output+='<div class="item-text row col-100">';
     output+=data[i].Description;
     output+='</div>';
     output+=' </div>';
     output+='</div>';
     output+='<div class="swipeout-actions-right">';
     output+='<a href="#" data-confirm="Are you sure you want to delete this item?"  data-confirm-title="Almanara" class="swipeout-delete" onclick="deleteNotification('+data[i].Id+')">Delete</a>';
     output+='</div>';
     output+='</li>';
   }
output+='</ul>';
$$(mainView.activePage.container).find('.notifications_list .list-block').html(output);

}
 myApp.onPageBeforeAnimation('notifications',function(e){
   getUserNotification(drawNotificationData);
  //drawNavbarMenuPageTitleBack('Notifications','gray','');


})

myApp.onPageAfterAnimation('settings',function(e){
  $$(document.body).on('change','#s_Language_settings', function(e){
    var langId=$(this).val();
    var lang=window.localStorage.getItem("appLanguage");
    lang=JSON.parse(lang);
    lang.Language=langId;
    var appLanguage=JSON.stringify(lang);

    window.localStorage.setItem("appLanguage",appLanguage);

    for(var i=0;i< AppMainData.Language.length;i++){
      if(AppMainData.Language[i].Id==langId){

        currentLang=AppMainData.Language[i];
        displayLanguage();
        break;
      }

    }

  });
});
myApp.onPageBeforeAnimation('settings',function(e){
  //drawNavbarMenuPageTitle('Settings','gray','');
   var output="";
   output+='<ul class=" row col-100">';
      output+='<li class=" row col-100">';
         output+='<div class="row col-100 item-content">';
            output+='<div class="item-inner">';
               output+='<div class="item-title label"  data-i18n="settings.Alerts">settings.Alerts</div>';
               output+='<div class="item-input">';
                  output+='<label class="label-switch">';
                     output+='<input type="checkbox">';
                     output+='<div class="checkbox"></div>';
                  output+='</label>';
               output+='</div>';
           output+=' </div>';
        output+=' </div>';
      output+='</li>';
      output+='<li class=" row col-100 change_password">';
         output+='<a href="templates/change_password.html" class="col-100 item-link item-content">';
           output+=' <div class="item-inner">';
              output+=' <div class="item-title" data-i18n="settings.Change">settings.Change</div>';
            output+='</div>';
        output+=' </a>';
      output+='</li>';
      output+='<li class=" row col-100">';
            output+="<a href='#' class='col-100 item-link smart-select ' data-open-in='picker'  data-back-on-select='true'>";
          output+="   <select name='s_Language_settings' id='s_Language_settings'>";
          output+=" <option value='' data-i18n='profile.Select'>profile.Select </option>";
             for(var i=0;i< AppMainData.Language.length;i++){
                output+=" <option value='"+AppMainData.Language[i].Id+"' >"+AppMainData.Language[i].NameEn+"</option>";
             }
          output+="   </select>";
            output+='<div class="item-content row col-100">';
               output+='<div class="item-inner">';
                 output+=' <div class="item-after" data-i18n="settings.Language">settings.Language</div>';
               output+='</div>';
           output+=' </div>';
        output+=" </a>";

     output+=' </li>';
  output+=' </ul>';

$$(mainView.activePage.container).find('.list-block').html(output);
})




function drawNavbarstaticpages(title,title2){

    var output="";
  output+="<div class='navbar-inner static_nav'>";
  output+="<div class='left'>";
    output+="<a href='#' class='link back'>";
    output+="  <i class='fa fa-angle-left' aria-hidden='true'></i>";
    output+="</a>";
  output+="</div>";
    output+="<div class='center sliding'>"+title+"</div>";
      output+="<div class='right'>";
           output+=title2;
      output+="</div>";
  output+="</div>";
  $$('.navbar_content').html(output);


}

myApp.onPageBeforeAnimation('terms',function(e){
  var output='';
  output+= AppMainData.TermAndConditions;
  $$(mainView.activePage.container).find('.terms').html(output);

})

myApp.onPageBeforeAnimation('privacy',function(e){
  var output='';
  output+= AppMainData.Privacy;
  $$(mainView.activePage.container).find('.privacy').html(output);

})
myApp.onPageBeforeAnimation('howitworks',function(e){

  var output='';
  output+= AppMainData.HowItWork;
  $$(mainView.activePage.container).find('.howitworks').html(output);

})
//amany

function drawNavbartitle_icon_page(title,icon){

    var output="";
  output+="<div class='navbar-inner Navbartitle_icon'>";
  output+="<div class='left'>";
    output+="<a href='#' class='link back'>";
    output+="  <i class='fa fa-angle-left' aria-hidden='true'></i>";
    output+="</a>";
  output+="</div>";
    output+="<div class='center sliding'>"+title+"</div>";
      output+="<div class='right'>";
      output+="</div>";

   output+="<div class='img_wrapp'><img src='images/contact_white_icon.png'></div>";

  output+="</div>";
  $$('.navbar_content').html(output);


}

myApp.onPageBeforeAnimation('contact',function(e){
  //drawNavbartitle_icon_page('contact','images/contact_white_icon.png');

});
//end amany

function releaseApp(){
//  drawNavbar();
//  drawMenu();
//if User Already Exists
 //Get Data From server
 //else New User
//window.localStorage.removeItem("User");
//window.localStorage.clear();
HideToolbar();

showLoader();
 var user = window.localStorage.getItem("User");
  if(user&&user!=null){
    getBasicUrl();
    var urlReq=baseUrlMain+'ManageAccount/Login'
    user=JSON.parse(user);
    userInfo=user;
    $.post(urlReq,
    {
        Email:user.email,
        Password:user.password
    },
    function(data, status){
      if(data.Data.Status==200){
        getAllLanguageList();
      }else{
        mainView.router.loadPage('index.html');
      }
    });

  }else{
    getBasicUrl(drawCountryLanguage);
    //getBasicUrl(drawIndex);
  }

}
function getBasicUrl(callback){
  getAllData(callback);
  hideLoader();
}
function getAllData(callback){
  var url=baseUrlMain+'ManageGeneralData/GetAllGeneralData?LanguageId=2&CountryId=1';
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      //data = JSON.parse(data);
      if(data.Data.Status==200){
        AppMainData=data.Data;
      //  console.log('data',AppMainData);
        if(callback){
          callback();
        }
       }
    }
  });
}
function getAllLanguageData(lang,callback){
  console.log('lang',lang);
  var url=baseUrlMain+'ManageGeneralData/GetAllAreas?&LanguageId='+lang.Language;
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      //data = JSON.parse(data);
  //    maxItems=data.Data.length;
      if(data.Data){
        console.log(data.Data);

        Areas=data.Data;
        AreasObj=arrayToObj(Areas);
      }
    }
  });
  var url=baseUrlMain+'ManageGeneralData/GetAllBranches?&LanguageId='+lang.Language;
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      //data = JSON.parse(data);
  //    maxItems=data.Data.length;
      if(data.Data){
        Branches=data.Data;
        console.log(Branches);
        BranchesObj=arrayToObj(Branches);
        console.log(BranchesObj);

      }
    }
  });
  var lisdata= window.localStorage.getItem("appLanguage");
  lisdata=JSON.parse(lisdata);

  var url=baseUrlMain+'ManageGeneralData/GetAllGeneralData?LanguageId='+lang.Language+'&CountryId='+lisdata.Country;
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      //data = JSON.parse(data);
      if(data.Data.Status==200){
        AppMainData=data.Data;
        if(callback){
          callback(lang);
        }
        //  console.log('data',AppMainData);
      //  mainView.router.loadPage('templates/slider.html');
      }
    }
  });
}
function arrayToObj(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[arr[i].Id] = arr[i];
  return rv;
}
function getAllLanguageList(){
  var lang=window.localStorage.getItem("appLanguage");
  lang=JSON.parse(lang);
  var url=baseUrlMain+'ManageGeneralData/GetAllAreas?&LanguageId='+lang.Language;
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      //data = JSON.parse(data);
  //    maxItems=data.Data.length;
      if(data.Data){
        console.log(data.Data);

        Areas=data.Data;
        AreasObj=arrayToObj(Areas);
      }
    }
  });
  var url=baseUrlMain+'ManageGeneralData/GetAllBranches?&LanguageId='+lang.Language;
  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      //data = JSON.parse(data);
  //    maxItems=data.Data.length;
      if(data.Data){
        console.log(data.Data);
        Branches=data.Data;
        BranchesObj=arrayToObj(Branches);

      }
    }
  });

  var lisdata= window.localStorage.getItem("appLanguage");
  lisdata=JSON.parse(lisdata);

  var url=baseUrlMain+'ManageGeneralData/GetAllGeneralData?LanguageId='+lang.Language+'&CountryId='+lisdata.Country;

  $.ajax({
    url: url,
    processData: false,
    type: 'Get',
    success: function ( data ) {
      //data = JSON.parse(data);
      if(data.Data.Status==200){
        AppMainData=data.Data;
        mainView.router.loadPage('templates/show_profile.html');

        //  console.log('data',AppMainData);
      //  mainView.router.loadPage('templates/slider.html');
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
//var baseUrl='https://www.mina-myworks.com/Reham/Service/';
var baseUrlMain='http://13.94.246.91:881/api/';
