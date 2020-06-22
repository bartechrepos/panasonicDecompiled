## API endpoints / functions

getGiftsServices
var url=baseUrlMain+'ManageCustomer/GetAllUserGifts?UserId='+userData.Id+'&LanguageId='+language;

getVoucherServices
var url=baseUrlMain+'ManageCustomer/GetAllUserVouchers?UserId='+userData.Id+'&LanguageId='+language;

redeemVoucher
var url=baseUrlMain+'ManageCustomer/RedeemVoucher';
var data="UserId="+userData.Id+"&VoucherId="+id+"";


redeemGift
var url=baseUrlMain+'ManageCustomer/RedeemGift';
var data="UserId="+userData.Id+"&GiftId="+id+"";
  
edit_user_profile
var urlReq=baseUrlMain+'ManageCustomer/UpdateCustomer'

register
var urlReq=baseUrlMain+'ManageCustomer/CreateCustomer'

verification / submitFormResultVerification
var urlReq=baseUrlMain+'ManageAccount/Verification'

requestOfferData
var url=baseUrlMain+'ManageGeneralData/GetAllOffers?PageIndex='+offer_page+'&LanguageId='+language+'&PageSize='+perPage;

requestProductData
var url=baseUrlMain+'ManageGeneralData/GetAllProduct?PageIndex='+product_page+'&LanguageId='+language+'&PageSize='+perPage;

getTransactionDataUser
var url=baseUrlMain+'ManageGeneralData/GetAllCustomerTransactions?CustomerId='+userData.Id+'&LanguageId='+currentLang.Id+'&&PageIndex=1&PageSize=0';

profile
var urlReq=baseUrlMain+'/ManageCustomer/UpdateImageProfile'

login
var urlReq=baseUrlMain+'ManageAccount/Login'

var urlReq=baseUrlMain+'ManageAccount/ForgetPassword'

var req=baseUrlMain+'ManageAccount/ChangePhone'

change_password
var urlReq=baseUrlMain+"ManageAccount/ChangePassword";

getUserNotification
var url=baseUrlMain+'ManageGeneralData/GetAllNotifications?CustomerId='+userData.Id+'&LanguageId='+currentLang.Id;

deleteNotification
var url=baseUrlMain+'ManageGeneralData/DeleteNotifications?NotificationId='+id;
  
getAllData
var url=baseUrlMain+'ManageGeneralData/GetAllGeneralData?LanguageId=2&CountryId=0';

getAllLanguageData / getAllLanguageList
var url=baseUrlMain+'ManageGeneralData/GetAllAreas?&LanguageId='+lang.Language;
var url=baseUrlMain+'ManageGeneralData/GetAllBranches?&LanguageId='+lang.Language;

loginWithFB
var url=baseUrlMain+'ManageCustomer/CheckMail?mail='+userData.email;
var url=baseUrlMain+'ManageCustomer/LogInWithFacebook';

loginWithFBAgin
var url=baseUrlMain+'ManageCustomer/LogInCustomerWithFacebook';
