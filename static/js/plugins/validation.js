// JavaScript Document
// Pop-up notification
// Multiple Notification can be set here also
// Change both to 1 and then they are enabled
// See Lines  (), for the functionality
// MG. Added feature 07/2014


var BoltNotify = true;
var multipleNotice = true;
if ($('.IgnoreBolt').is(':visible')) {
    var IgnoreBolt = true;
    var BoltNotify = false;
    var multipleNotice = false;
}

var validatejson = {
    formats: {
        name: /^[a-zA-Z ]*$/,
        email: /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        ip: /^(\d{1,3}\.){3}\d{1,3}$/,
        date: /^\d{2}[- \/.]\d{2}[- \/.]\d{4}$/,
        datetime: /^\d{2}[- \/.]\d{2}[- \/.]\d{4}\s?\d{2}[- :.]\d{2}$/,
        phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        zipUS: /^(\d{5})(-\d{4})?$/,
        zipCanada: /^[a-z][0-9][a-z]\s?[0-9][a-z][0-9]$/i,
        zip: /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+))?$/,
        cityUS: /^[A-Za-z]/,
        creditCard: /^\d{13,16}$/,
        numeric: /^\d+$/,
        number: /^\d+$/,
        ssn: /^(\d{3}-?\d{2}-?\d{4})|(xxx-xx-xxxx)$/i,
        cvvnum: /^\d+$/,
        dollar: /^[$0-9]+/,
        numericNotRequired: /^\d$/,
        decimal: /^[0-9\.,]+$/,
        decimalNotRequired: /^[0-9\.,]$/,
        alphabet: /^[A-Za-z]/,
        alphabetWithUnderscore: /^[A-Za-z_]/,
        alphabetWithSpace: /^[A-Za-z ]/,
        alphanumeric: /^([a-z]|\d|\s|-|\.|_|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+$/i,
        alphanumericWithUnderscore: /^[A-Za-z0-9_]$/,
        alphanumericWithSpace: /^[A-Za-z0-9 ]$/,
        year: /^\d+$/,
        month: /^\d+$/,
        day: /^\d+$/,
        nopobox: /^[^p]{1}[^.]*[^o]{1}[^.]*[^ ]*[^b]{1}[^o]{1}[^x]{1}$/i,
        physicalAddress: /^[0-9a-zA-Z,. @#$%&*\'`_-]*$\" /

    }
};
var errorsMessage = {
    en: {
        empty: '100',
        selected: '105',
        checked: '110',
        username: '115',
        password: '120',
        email: '125',
        ip: '130',
        date: '135',
        datetime: '140',
        phone: '145',
        zipUS: '150',
        zipCanada: '155',
        zip: '160',
        creditCard: '165',
        expDateCard: '170',
        cvvnum: '175',
        cvv: '175',
        numeric: '180',
        numericNotRequired: '185',
        decimal: '190',
        decimalNotRequired: '195',
        cityUS: '200',
        alphabet: '205',
        alphabetWithUnderscore: '210',
        alphabetWithSpace: '215',
        alphanumeric: '220',
        alphanumericWithUnderscore: '225',
        alphanumericWithSpace: '230',
        year: '235',
        month: '240',
        yearId: '245',
        monthId: '250',
        dayId: '255',
        nopobox: '260',
        correctOrderID: '265',
        name: '270',
        firstName: '275',
        lastName: '280',
        physicalAddress: '285',
        purchaserName: '290',
        minlength: '295',
        maxlength: '300'
    },
    es: {
        empty: '100',
        selected: '105',
        checked: '110',
        username: '115',
        password: '120',
        email: '125',
        ip: '130',
        date: '135',
        datetime: '140',
        phone: '145',
        zipUS: '150',
        zipCanada: '155',
        zip: '160',
        creditCard: '165',
        expDateCard: '170',
        cvvnum: '175',
        cvv: '175',
        numeric: '180',
        numericNotRequired: '185',
        decimal: '190',
        decimalNotRequired: '195',
        cityUS: '200',
        alphabet: '205',
        alphabetWithUnderscore: '210',
        alphabetWithSpace: '215',
        alphanumeric: '220',
        alphanumericWithUnderscore: '225',
        alphanumericWithSpace: '230',
        year: '235',
        month: '240',
        yearId: '245',
        monthId: '250',
        dayId: '255',
        nopobox: '260',
        correctOrderID: '265',
        name: '270',
        firstName: '275',
        lastName: '280',
        physicalAddress: '285',
        purchaserName: '290',
        minlength: '295',
        maxlength: '300'
    }
};

function validateElement(formRef, fieldref) {
    var totalErrormsg = "";
    var $fieldref = $(fieldref);
    var req = $fieldref.attr("mandatory");
    var maxlength = $fieldref.attr("maxlength");
    var minlength = $fieldref.attr("minlength");
    req = (req != undefined && (req == "required" || req + "" == "true")) ? true : false;
    var validateType = $fieldref.attr("validate");
    var errorMsg = "";
    var fieldmsg = $fieldref.attr("data-code");
    var tagType = $fieldref.prop("type").toLowerCase();
    var tagName = $.trim($fieldref.prop("tagName")).toLowerCase();
    var group = $fieldref.attr("group");
    var placeholder = $fieldref.attr('placeholder');
    var value = $.trim($fieldref.val());
    $fieldref.val(value);
    var mergeError = $fieldref.attr("mergeError");
    var mismatchederror = "Mismatched field";
    //alert("errorMsg"+errorMsg);
    //alert("totalErrormsg"+totalErrormsg.length);
    var mergeErrorFlag = true;
    if (!$fieldref.is(":visible")) {
        return true;
    }
    //*new style for error Messages*/
    var errorMessageId = $fieldref.attr("errorMessageId");
    if (errorMessageId) {
        $("#" + errorMessageId).empty();
    }
    //*new style for error Messages*/
    //MG updated. 09-2014
    //Every field Valdiation is tracekd by var fieldmsg
    //field Settings must by data-code=""
    if (req) {
        if (tagType == "text" || tagName == "textarea" || tagType == "password") {
            if (placeholder != undefined && $.trim(placeholder) == value) {
                value = "";

            }
            if (value.length == 0) {
                //errorMsg = validatejson.errors.empty;
                errorMsg = validatejson.errors.empty;
                errorMsg = fieldmsg;
            }
            //*new style for error Messages*/
            else if (minlength && !(value.length >= minlength)) {
                errorMsg = (validatejson.errors.minlength).replace("number", minlength);

            }
            //*new style for error Messages*/
        } else if (tagType == "radio" && !$fieldref.is(":checked")) {

            var radioFlag = false;
            if ($fieldref.attr("name") != undefined) {
                radioFlag = $("input[type=radio][name=" + $fieldref.attr("name") + "]").is(":checked");
            }
            if (!radioFlag) {
                //errorMsg = validatejson.errors.checked;
                errorMsg = validatejson.errors.checked;
                errorMsg = fieldmsg;
            }

        } else if (tagType == "checkbox" && !$fieldref.is(":checked")) {
            //errorMsg = validatejson.errors.checked;
            errorMsg = validatejson.errors.checked;
            errorMsg = fieldmsg;
        }

        else if ((tagName == "select")) {
            if (mergeError != undefined) {
                $("select[mergeError=" + mergeError + "]").each(function (index, element) {
                    var innerVal = $.trim($(this).val());
                    if (innerVal.length == 0 || (innerVal + "") == "-1" || (innerVal + "") == "") {
                        //errorMsg = validatejson.errors.selected;
                        errorMsg = validatejson.errors.selected.fieldmsg;
                        errorMsg = fieldmsg;
                        alert('you got errors here buddy');
                    }
                });
            } else if (("" + $fieldref.val()) == "-1" || $.trim($fieldref.val()) == "" || $.trim($fieldref.val()).length <= 0) {
                //errorMsg = validatejson.errors.selected;
                errorMsg = validatejson.errors.selected.fieldmsg;
                errorMsg = fieldmsg;
            }
        }
    }

    if (errorMsg.length == 0) {
        if (tagType == "text" || tagType == "password" || tagName == "textarea") {
            var value = $fieldref.val();
            if (placeholder != undefined && $.trim(placeholder) == value) {
                value = "";

            }
            if (value.length > 0) {
                if (validateType != undefined && (validatejson.formats[validateType]) != undefined && value.match((validatejson.formats[validateType])) == null) {
                    errorMsg = validatejson.errors[validateType];
                } else if (validateType != undefined && (validateType == "month" || validateType == "year" || validateType == "date" || validateType == "datetime") && !isValidateDateTime(value, validateType)) {
                    errorMsg = validatejson.errors[validateType];
                } else if ($fieldref.attr("maxlength") != undefined && value.length > $fieldref.attr("maxlength")) {
                    errorMsg = "length should not exceed " + maxlength + " characters";
                } else {
                    if (group != undefined) {
                        $("#" + formRef).find("*[group=" + group + "]").each(function () {
                            if (value != $.trim($(this).val()) && errorMsg.length == 0) {
                                errorMsg = mismatchederror;
                            } else {
                                var errormsg = $(this).attr("errorMsg");
                                var prevErrorMsg;
                                if (errormsg != undefined) {
                                    prevErrorMsg = $("#" + $.trim($(this).attr("id")) + "error");
                                } else {
                                    prevErrorMsg = $(this).parent().find("span.error");
                                }
                                if ((prevErrorMsg != undefined && ($.trim(prevErrorMsg.text()) == $.trim(mismatchederror)))) {
                                    prevErrorMsg.hide("fast").remove();
                                }
                            }
                        });
                    }
                }
            }
        }
    }
    $("#" + $fieldref.attr("errorMsg")).html("");
    $fieldref.parent().find("span.error").hide("fast").remove();

    // alert('turnon dis-able feature');
    var flag = true;

    if (errorMsg.length > 0) {
        //totalErrormsg = ($fieldref.attr("title")==undefined?$fieldref.attr("name"):$fieldref.attr("title"))+" "+errorMsg;
        //totalErrormsg = ($fieldref.attr("title")==undefined?"":$fieldref.attr("title"))+" "+errorMsg;
        totalErrormsg = ($fieldref.attr("data-code") == undefined ? "" : $fieldref.attr("data-code"));
        //alert("totalErrormsg...."+totalErrormsg);

        var errormsg = $fieldref.attr("errorMsg");
        var errorMsgLocationTag = $fieldref.attr("errorTagClass");
        var groupLocation = $fieldref.attr("grouperrorlocation");
        //*new style for error Messages*/
        if (errorMessageId) {
            $("#" + errorMessageId).html(totalErrormsg);
            flag = false;
        }
        /*new style for error Messages*/
        else if (group && groupLocation == undefined && errorMsg == mismatchederror) {
            var otherRef = $("[group=" + $fieldref.attr("group") + "][grouperrorlocation=true]");
            $fieldref.parent().find("span.error").hide("fast").remove();
            if (otherRef != undefined && otherRef.val().length > 0) {
                otherRef.trigger("blur");
                $fieldref.parent().find("span.error").hide("fast").remove();
            }

            flag = true;
        } else if (errorMsgLocationTag == undefined) {
            if (errormsg != undefined) {
                $("#" + $.trim($fieldref.attr("id")) + "error").hide("fast").remove();
                //alert("hi");

                var diverrorgen = $("<div/>").css("color", "#D00").hide().addClass("error").html(totalErrormsg).attr("id", $.trim($fieldref.attr("id")) + "error");
                //var divtext = "<div id='"+$.trim($fieldref.attr("id"))+"error'>"+totalErrormsg+"</div>";
                $("." + errormsg).append(diverrorgen).css("color", "#D00").hide().show("fast");
                //alert('turnon dis-able location feature');
            } else {
                //Bolt Notification Called and Enabled here
                //MG added the JSON CMS error catch
                //08-2014. Still implementing and updating.
                var dataCode = totalErrormsg;
                var errorObj = $.trim(backendErrorObj);
                var successObj = $.trim(backendSuccessObj);

                // Calling FrontEnd Error Message.
                //_getErrorMessage(errorCode, $fieldref);
                _getErrorMessage($.trim(feErrorObj), dataCode, $fieldref);
                $(".button ").attr("disabled", true);
                $(".button ").addClass("disabled");
                $(".field.select").addClass("errors");
                if (req === false) {
                    $fieldref.removeClass("error");
                    $fieldref.removeAttr("errorMsg");
                    $fieldref.removeAttr("class");
                } else {
                    $fieldref.addClass("error");
                }
                $fieldref.removeClass("success");
                //$(validatejson.errors.empty).html('Please enter a valid' +$fieldref);
                //$(validatejson.errors.empty == 'Please enter a valid' +$fieldref);
                $("#" + formRef).find("input[name*='address2']").removeClass("error");
                $("#" + formRef).find("input[name*='emailAddress2']").removeClass("error");
                $("#" + formRef).find(".button-secondary").removeClass("disabled");
                $("#" + formRef).find(".button-secondary").removeAttr("disabled", true);
                $("#" + formRef).find("input[type='button']").addClass("disabled");
                $("#" + formRef).find(".button ").addClass("disabled");
                $("#" + formRef).find(".button ").attr("disabled", true);
                $("#" + formRef).find("input[type='submit']").attr("disabled", true);
                $("#" + formRef).find('input[type="submit"]').addClass("disabled");
                //$('input[type="Submit"]').attr('disabled','disabled');
                $("#" + formRef).find('#az_cancel_btn').removeClass("disabled");
                $("#" + formRef).find('#az_cancel_btn').removeAttr("disabled", true);
                $("#" + formRef).find('#managePinButton').removeClass("disabled");
                $("#" + formRef).find('#managePinButton').removeAttr("disabled", true);
            }
        } else {
            if (errormsg != undefined) {
                $("." + errorMsgLocationTag).find("span.error").hide("fast").remove();

            } else {
                if ($fieldref.attr("customErrorMsg") != undefined) {
                    totalErrormsg = $fieldref.attr("customErrorMsg");
                } else if ($fieldref.attr("prefixErrorMsg") != undefined) {
                    totalErrormsg = $fieldref.attr("prefixErrorMsg") + totalErrormsg;
                }
                var spanerrorgen = $("<span/>").css("color", "#D00").hide().addClass("error").html(totalErrormsg);
                $("." + errorMsgLocationTag).html(spanerrorgen)
                spanerrorgen.show("fast");
                //alert('radio');


            }
        }
        flag = false;
    }
    //*new style for error Messages*/
    var otherRef = $("[group=" + $fieldref.attr("group") + "]");

    if (req === true && flag === true) {
        $fieldref.removeClass("error");
        $fieldref.parent().find("span.error").hide("fast").remove();
        if (!$fieldref.hasClass("success")) {
            $fieldref.addClass("success");
            $fieldref.parent().find("span.error").hide("fast").remove();
            $(this).find("span.error").hide("fast").remove();
            WLGift.BoltModal.removeLoading();
        }
        ;
        if (otherRef) {
            otherRef.each(function () {
                $(this).removeClass("error");
                $(this).parent().find("span.error").hide("fast").remove();
                if (!$(this).hasClass("success")) {
                    $(this).addClass("success");
                    $(this).parent().find("span.error").hide("fast").remove();
                    $(this).find("span.error").hide("fast").remove();
                    WLGift.BoltModal.removeLoading();
                }
                ;
            });
        }
    } else if (flag === false) {
        $fieldref.removeClass("success");
        //$fieldref.parent().find("span.error").hide( "fast").remove();
        if (!$fieldref.hasClass("error")) {
            $fieldref.addClass("error");
            WLGift.BoltModal.removeLoading();
        }
        ;
        if (otherRef) {
            otherRef.each(function () {
                $(this).removeClass("success");
                //$fieldref.parent().find("span.error").hide( "fast").remove();
                if (!$(this).hasClass("error")) {
                    $(this).addClass("error");
                    WLGift.BoltModal.removeLoading();
                }
                ;

            });
        }
    } else {
        $(this).removeClass("success").removeClass("error");
        $fieldref.parent().find("span.error").hide("fast").remove();
    }

    //*new style for error Messages*/
    return flag;
}


//*new style for error Messages*/
//var jsonErrors = frontEndErrorCodes;
//JC wrote.
//MG added. To retrieve Front-end error codes as well as
var FrontEnderrorCodeObj = $.trim(feErrorObj);

//Backend Error Codes
var errorObj = $.trim(backendErrorObj);

//Backend Success Messages
var successObj = $.trim(backendSuccessObj);

$(document).ready(function() {
    if (errorObj != '') {
        var formRef = $('form').attr('id');
        var $fieldref = $("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").blur();
        var req = $fieldref.attr("mandatory");
        req = (req != undefined && (req == "required" || req + "" == "true")) ? true : false;
        var errorMsg = "";
        _getBackEndErrorMessage(errorObj, formRef, $fieldref);
    } else if (successObj != '') {
        var formRef = $('form').attr('id');
        var $fieldref = $("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").blur();
        var req = $fieldref.attr("mandatory");
        req = (req != undefined && (req == "required" || req + "" == "true")) ? true : false;
        var errorMsg = "";
        _getBackEndSucessMessage(successObj, formRef);
    }
});



//Backend Form Success Messages
//Independent per form
//MG. added 9-11
function _getBackEndSucessMessage(successObj, formRef) {
    successCode = $.trim(successObj);
    var data = $.parseJSON(successCode);
    //var error_message = '';
    if (successCode != '') {
        //console.log(successCode);
        $.each(data, function (successCode, successObjMsg) {
            success_message = successObjMsg.message;
        });
    }
    var success_message = success_message;
    //Bolt Notification Called and Enabled here
    if (BoltNotify == true) {
        var spanerrorgen = $('.success.message').contents().find('h4').text(success_message);
        spanerrorgen.show();
        WLGift.notify.showNotification(".success");
    } else if (IgnoreBolt == true) {
        var spanerrorgen = $('.success.message').contents().find('h4').text(success_message);
        WLGift.notify.showNotification(".success");
        //spanerrorgen.show("fast");
    } else {
        $fieldref.addClass("success");
        var spanerrorgen = $('#' + formRef + '<span/>').css("color", "#00b289").hide().addClass("success").html(success_message);
        $fieldref.parent().append(spanerrorgen);
        spanerrorgen.show("fast");
    }
    return false;
}


//Back-end Error Messages
//Server -Side Validations
function _getBackEndErrorMessage(errorObj, formRef, $fieldref) {
    errorCode = $.trim(errorObj);
    //var errorData = JSON.stringify({backend_error:  errorCode});
    var errorData = errorCode;
    var data = $.parseJSON(errorData);
    //var error_message = '';
    //if(data.row_id.length > 0) {
    //console.log(errorCode);
    $.each(data, function (objCode, errorObjMsg) {
        if (errorObjMsg.server_code != '' && errorObjMsg.error_code == -1) {
            error_message = errorObjMsg.message;
            error_field = errorObjMsg.field_name;
            $('.mask').remove();
            WLGift.BoltModal.removeLoading();
            return false;
        }
    });
    //}
    var error_message = error_message;
    //Bolt Notification Called and Enabled here
    if (BoltNotify == true && multipleNotice == false) {
        $fieldref.addClass("error");
        var spanerrorgen = $('.error.message').contents().find('h4').html(error_message);
        WLGift.notify.showNotification(".error");
    } else if (BoltNotify == true && multipleNotice == true) {
        $fieldref.addClass("error");
        var spanerrorgen = $('.error.message').contents().find('h4').html(error_message);
        WLGift.notify.showNotification(".error");
    } else if (IgnoreBolt == true && error_field == null || error_field == '') {
        $fieldref.addClass("error");
        var spanerrorgen = $('.error.message').contents().find('h4').html(error_message);
        WLGift.notify.showNotification(".error");
        spanerrorgen.show("fast");
    } else if (IgnoreBolt == true && error_field != null || error_field != '') {
        $.each(data, function (objCode, errorObjMsg) {
            if (errorObjMsg.field_name != '') {
                error_message = errorObjMsg.message;
                error_field = errorObjMsg.field_name;
            }
            var error_field = error_field;
            var spanerrorgen = $("<span/>").css("color", "#D00").hide().addClass("error").html(error_message);
            $("#" + formRef).find($fieldref).each(function (i, field) {
                var fieldName = field.id;
                if (fieldName == error_field) {
                    $(this).parent().append(spanerrorgen);
                    $(this).addClass("error");
                    spanerrorgen.show("fast");
                    return false;
                }
            });
        });
        $('html,body').animate({
                scrollTop: $($fieldref).offset().top
            },
            'fast');
    } else {
        $fieldref.addClass("error");
        var spanerrorgen = $("<span/>").css("color", "#D00").hide().addClass("error").html(error_message);
        $fieldref.parent().append(spanerrorgen)
        spanerrorgen.show("fast");
    }
    return false;
}


//Front-End Error Messages
//Front-End Non-Error (Success on all fields level)
// MG, added 9-11
//Puru Updated with JSON Obj 11/23/14
function _getErrorMessage(feErrorObj, dataCode, $fieldref) {
    errorCode = $.trim(feErrorObj);
    //var errorData = JSON.stringify({error_code:  errorCode, message:  feErrorObj});
    var fieldError = dataCode;
    var errorData = errorCode;
    var data = $.parseJSON(errorData);

    var error_message = "";
    if (data.length > 0) {
        $.each(data, function (error_code, message) {
            if (fieldError == $.trim(message.error_code) && fieldError != -1) {
                error_message += message.message + "<br>";
                $('.mask').remove();
                WLGift.BoltModal.removeLoading();

            }
        });
    }

    var error_message = error_message;
    //Bolt Notification Called and Enabled here
    //Bolt Notification Called and Enabled here
    if (BoltNotify === true && multipleNotice === false) {
        var spanerrorgen = $('.error.message').contents().find('h4').html(error_message);
        WLGift.notify.showNotification(".error");
    } else if (BoltNotify === true && multipleNotice === true) {
        //var error_message += error_message;
        var spanerrorgen = $('.error.message').contents().find('h4').html(error_message);
        var appenderrorgen = $('.error.message').contents().find('h4');
        $(appenderrorgen).each(function () {
            $(this).append(spanerrorgen);
        });
        WLGift.notify.showNotification(".error");
    } else if (IgnoreBolt === true) {
        var spanerrorgen = $("<span/>").css("color", "#D00").hide().addClass("error").html(error_message);
        $fieldref.parent().append(spanerrorgen)
        spanerrorgen.show("fast");
        $('html,body').animate({
                scrollTop: $($fieldref).offset().top
            },
            'fast');
    } else {
        var spanerrorgen = $("<span/>").css("color", "#D00").hide().addClass("error").html(error_message);
        $fieldref.parent().append(spanerrorgen)
        spanerrorgen.show("fast");


    }
    return false;
}


/* DO  NOT REMOVE UNTIL 2016
 //This is used in VRN 2014
 //Puru Updated with JSON Obj 11/23/14

 function _getErrorMessage(errorCode,$fieldref,message){
 //errorCode = $.trim(errorCode);
 errorCode = $.trim(errorCode);
 var errorData = JSON.stringify({error_code:  errorCode, message:  message});
 var dataString = $.parseJSON(errorData);
 $.ajax({
 url: './retrieveErrorMessage.json',
 type: 'POST',
 data: dataString,
 dataType: "json",
 contentType: 'application/json',
 mimeType: 'application/json',
 success: function(data) {

 var error_message = "";
 if(data.length > 0) {
 $.each(data, function(error_code, message ) {
 if(errorCode == $.trim(message.error_code) && errorCode != -1 ){
 error_message += message.message + "<br>";
 $('.mask').remove();
 WLGift.BoltModal.removeLoading();
 // return false;

 }
 });
 }
 //var error_message = error_message;

 //Bolt Notification Called and Enabled here
 if(BoltNotify === true && multipleNotice === false){
 var spanerrorgen = $('.error.message').contents().find('h4').html(error_message);
 WLGift.notify.showNotification(".error");
 }else if(BoltNotify === true && multipleNotice === true){
 //var error_message += error_message;
 var spanerrorgen = $('.error.message').contents().find('h4').html(error_message);
 var appenderrorgen = $('.error.message').contents().find('h4');
 $(appenderrorgen).each(function(){
 $(this).append(spanerrorgen);
 });
 WLGift.notify.showNotification(".error");
 }else if(IgnoreBolt === true){
 var spanerrorgen = $("<span/>").css("color","#D00").hide().addClass("error").html(error_message);
 $fieldref.parent().append(spanerrorgen)
 spanerrorgen.show("fast");
 }else{
 var spanerrorgen = $("<span/>").css("color","#D00").hide().addClass("error").html(error_message);
 $fieldref.parent().append(spanerrorgen)
 spanerrorgen.show("fast");
 }
 },

 error: function(data) {

 //var error_message = '';
 //if(data.row_id.length > 0){
 if(data == '' || data === null || data === undefined) {
 $.each(data, function(error_code, message ) {
 if(errorCode == $.trim(message.error_code) && errorCode != -1 ){
 error_message = message.message;
 $('.mask').remove();
 WLGift.BoltModal.removeLoading();
 return false;
 }
 });
 }else{
 return true;
 }
 var error_message = error_message;

 //Bolt Notification Called and Enabled here
 if(BoltNotify == true){
 var spanerrorgen = $('.error.message').contents().find('h4').html(error_message);
 WLGift.notify.showNotification(".error");
 }else if(BoltNotify == true && multipleNotice ==true ){
 var spanerrorgen = $('.error.message').contents().find('h4').html(error_message);
 WLGift.notify.showNotification(".error");
 }else{
 var spanerrorgen = $("<span/>").css("color","#D00").hide().addClass("error").html(error_message);
 $fieldref.parent().append(spanerrorgen)
 spanerrorgen.show("fast");
 }

 },
 fail: function(jqXHR, textStatus) {
 alert(data);
 if(textStatus == "parsererror"){
 return "We're Sorry a system error occured";
 }
 }

 });


 }
 */


function isValidateDateTime(value, type) {
    value = $.trim(value);
    if (type == "year") {
        var year = (new Date().getFullYear() - parseInt(value, 10));
        //alert(year);
        return (year >= 18 && year <= 150);
    }
    if (type == "month") {
        var month = parseInt(value, 10);
        //alert(month);
        return (month >= 1 && month <= 12);
    }
    var maxlength = 10; //date
    if (type == validatejson.formats.date && value.length == 10) {
        return isValidateDate(value);
    } else if (type == validatejson.formats.datetime && value.length == 19) {
        var datetimestr = value.split(" ");
        if (datetimestr.length == 2) {
            return (isValidateTime(datetimestr[1]) && isValidateDate(datetimestr[0]));
        }
    }
    return false;
}


function isValidateTime(value) {
    var timearr = value.split(":");
    if (!(timearr.length == 3 && timearr[0] < 24 && timearr[0] > -1 && timearr[1] < 60 && timearr[1] > -1 && timearr[2] < 60 && timearr[2] > -1)) {
        return false;
    }
    return true;
}


function isValidateDate(value) {
    if (value == '')
        return false;
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; //Declare Regex
    var dtArray = value.match(rxDatePattern); // is format OK?
    if (dtArray == null)
        return false;
    //Checks for mm/dd/yyyy format.
    dtMonth = dtArray[1];
    dtDay = dtArray[3];
    dtYear = dtArray[5];
    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}


function languageMessage(lang) {
    validatejson.errors = ((errorsMessage[lang] != undefined) ? errorsMessage[lang] : errorsMessage['en']);
}
function bindValidation(formRef, lang) {
    //alert("#"+formRef);
    languageMessage(lang);
    $("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").focus(function () {
        $(this).parent().find("span.error").hide("fast").remove();
        $(this).parent().find("input .error").hide("fast").remove();
        $("#" + formRef).parent().find("#validError").hide("fast");
        $(this).parent().find(".input_2.error").removeClass("error");
        $(this).parent().find(".error").removeClass("error");
        $(this).parent().find(".field.select.errors").hide("fast").remove();
        $("#" + $.trim($(this).attr("id")) + "error").hide("fast").remove();


        $(".buttonTwo").removeClass("disabled");
        $("#button").removeClass("disabled");
        $(".button").removeClass("disabled");
        $(".field.select").removeClass("errors");
        $('button[type="submit"]').removeAttr('disabled');
        $('button[type="submit"]').removeClass("disabled");
        $(".button").removeClass("disabled");
        $(".button").removeAttr("disabled", true);

    });
    $("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").blur(function () {
        //alert("sai");
        validateElement(formRef, this);
    });

    $("select[name='alternateIdType']").change(function (e) {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        }
        $("input[name='identificationNumber']").parent().find("span.error").remove();
        $("input[name='alternateIdNumber'],select[name='selectBoxExpMonth'],select[name='selectBoxExpDay'],select[name='selectBoxExpYear']").parent().find("span.error").remove();
        var mandatory = true;
        if (($(this).val().trim() + '') === '-1') {
            $("input[name='identificationNumber']").attr("validate", "number").attr("mandatory", mandatory);
            $("input[name='alternateIdNumber'],select[name='selectBoxExpMonth'],select[name='selectBoxExpDay'],select[name='selectBoxExpYear']").removeAttr("validate", "number").removeAttr("mandatory", true);
        } else {
            mandatory = false;
            $("input[name='identificationNumber']").removeAttr("validate", "number").removeAttr("mandatory", mandatory);
            $("input[name='alternateIdNumber'],select[name='selectBoxExpMonth'],select[name='selectBoxExpDay'],select[name='selectBoxExpYear']").attr("validate", "alphanumeric").attr("mandatory", true);
        }

        //*new style for error Messages*/
        if ($(this).hasClass("parent")) {
            $("[dependency=" + $(this).attr("dependency") + "].child").each(function (e) {
                var dependencymandatory = $(this).attr("mandatory");
                if (dependencymandatory === true) {
                    if (this.value) {
                        $(this).removeClass("error");
                        if (!$(this).hasClass("success")) {
                            $(this).addClass("success");
                        }
                        ;
                    } else {
                        $(this).removeClass("success");
                        if (!$(this).hasClass("error")) {
                            $(this).addClass("error");
                        }
                        ;
                    }
                } else {
                    $(this).removeClass("success").removeClass("error");
                }
            });
        }

    });//*new style for error Messages*/
    $("select[name='alternateIdType']").trigger("change");

}

//Submit. Disable and call to modalpoplite for loading the wait page
//MG added these features in here so that Jquery Can be used on any site built from here moving forward
//Can be modified id known more about jQuery, feel free to update as see fit, if you*r b:tt3r d4n |'|3
//Sai S.. Added the validation. Great Job Sai!!!! {:-)

function isValidation(formRef, lang) {
    //alert("#"+formRef);
    languageMessage(lang);
    var status = true;
    $("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").each(function () {
        var innerstatus = validateElement(formRef, this);
        var successStatus = $(this).parent().find(".success");
        var errorStatus = $(this).parent().find(".error");


        if (!innerstatus) {
            status = false
            $("button[type='submit']").addClass("disabled");
            $('input[type="submit"]').addClass("disabled");
            $('input[type="submit"]').attr("disabled", true);
            $("input[type='button']").addClass("disabled");
            $("button[type='submit']").addClass("disabled");

            $('#az_cancel_btn').removeClass("disabled");
            $('#az_cancel_btn').removeAttr("disabled", true);
            $('#managePinButton').removeClass("disabled");
            $('#managePinButton').removeAttr("disabled", true);
        } else {
            $("button[type='submit']").attr("disabled", true);
            $("button[type='submit']").addClass("disabled");
            $('input[type="submit"]').addClass("disabled");

            $('#az_cancel_btn').removeClass("disabled");
            $('#az_cancel_btn').removeAttr("disabled", true);
            $('#managePinButton').removeClass("disabled");
            $('#managePinButton').removeAttr("disabled", true);
        }
        $(successStatus).each(function () {
            if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").val().length == 0) {
                WLGift.BoltModal.removeLoading();
                $('.mask').remove();
            } else if ($("#" + formRef).find("[name=expMonth],[name=expYear],[name=cvv], [name=az_zipcode]").val().length == '' || $("#" + formRef).find("[name=expMonth],[name=expYear],[name=cvv], [name=az_zipcode]").val().length == undefined) {
                WLGift.BoltModal.removeLoading();
                $('.mask').remove();
            } else if (!$("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").hasClass('.error')) {
                WLGift.BoltModal.showLoading();
            } else if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").hasClass('success') && !$("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").hasClass('.error')) {
                WLGift.BoltModal.showLoading();
            } else if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").addClass('class', 'success')) {
                WLGift.BoltModal.showLoading();
            }
            return false;
        });
        $(errorStatus).each(function () {
            if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").val().length == 0) {
                WLGift.BoltModal.removeLoading();
                $('.mask').remove();
            } else if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").addClass('class', 'error')) {
                WLGift.BoltModal.removeLoading();
                $('.mask').remove();
            } else if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").hasClass('.error')) {
                WLGift.BoltModal.removeLoading();
            } else if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").hasClass('error') && $("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").not('.success')) {
                WLGift.BoltModal.removeLoading();
                $('.mask').remove();
            }
            return false;
        });

    });
    return status;


}


function isHomeValidation(formRef, lang) {
    //alert("#"+formRef);
    languageMessage(lang);
    var status = true;
    $("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").each(function () {
        var innerstatus = validateElement(formRef, this);
        var successStatus = $(this).parent().find(".success");
        var errorStatus = $(this).parent().find(".error");
        status = status && innerstatus;
        //WLGift.BoltModal.removeLoading();
        //});
        if (!status) {
            $(".homeLogin").addClass("disabled");
            //$("p.links").hide();
        } else {
            $(".homeLogin").addClass("disabled");
            //$('input[type="button"]').attr('disabled','disabled');
        }
        $(successStatus).each(function () {
            if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").val().length == 0) {
                WLGift.BoltModal.removeLoading();
                $('.mask').remove();
            } else if ($("#" + formRef).find("[name=expMonth],[name=expYear],[name=cvv]").val().length == '' || $("#" + formRef).find("[name=expMonth],[name=expYear],[name=cvv]").val().length == undefined || $("#" + formRef).find("[name=expMonth],[name=expYear],[name=cvv]").is(".error")) {
                $('.mask').remove();
                WLGift.BoltModal.removeLoading();
            } else if (!$("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").hasClass('.error')) {
                WLGift.BoltModal.showLoading();
            } else if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").hasClass('success') && !$("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").hasClass('.error')) {
                WLGift.BoltModal.showLoading();
            } else if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").addClass('class', 'success')) {
                WLGift.BoltModal.showLoading();
            }
            return false;
        });
        $(errorStatus).each(function () {
            if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").val().length == 0) {
                WLGift.BoltModal.removeLoading();
                $('.mask').remove();
            } else if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").addClass('class', 'error')) {
                WLGift.BoltModal.removeLoading();
                $('.mask').remove();
            } else if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").hasClass('.error')) {
                WLGift.BoltModal.removeLoading();
            } else if ($("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").hasClass('error') && $("#" + formRef).find("input:text,input:password,input:radio,input:checkbox,select,textarea").not('.success')) {
                WLGift.BoltModal.removeLoading();
                $('.mask').remove();
            }
            return false;
        });
    });
    return status;
}


//Application From Validation Processing
//MG. 11.2014
//SSN Validation/Adapation placed here	 
/**/
$('#ssn').keydown(function (e) {
    if (e.keyCode == 8 || e.keyCode == 9) {
        return;
    }
    if ($(this).val().length > 10) {
        e.preventDefault();
    }
}).blur(function (e) {
    this.val = $(this).val();
    this.value = this.value.substring(0, 3) + "-" + this.value.substring(3, 5) + "-" + this.value.substring(5, 9);
    $(this).val(this.value);
    $('#identificationNumber').val(this.val.replace(/-/g, ''));
});


/**
 * Redirect ManageCard PAge to correct URL
 * User is Login
 * Changes the href tag for only that link with csrfToken
 **/
if ($('body.authenticated.signed_in')) {
    //$('#subNavigation ul li a:first-child').html();
    $("footer ul.inline li a.Manage.Pin").attr("href", './managePin.html?');
}


//MG.added 07/2014. J.C. Coded this
//Strips non numeric characters from the given input field.
function _stripFields() {
    //Clear sensitive form data
    stripChars('login_id', /\D/g);
    stripChars('conf_num', /\D/g);
    stripChars('cardNumber', /\D/g);
    stripChars('expMonth', /\D/g);
    stripChars('expYear', /\D/g);
    stripChars('cvv', /\D/g);
    stripChars('az_zipcode', /\D/g);
    stripChars('newsletter_email', /\W/g);
}


/**
 * Strips non numeric characters from the given input field.
 * @param  {[type]} input the input field to be stripped.
 * @param {[regex]} regex string of allowed characters /\W/g for alphanumeric /\D/g for digits
 * @return {[type]}       none
 */
function stripChars(input, regex) {
    var originalMaxLength = $('#' + input).attr('maxlength');
    $('#' + input).on('keyup', function (event) {
        if (!(event.keyCode <= 46)) {
            var val = $(this).val();
            $(this).val(charStripper(val, originalMaxLength, regex));
            $(this).attr('maxlength', originalMaxLength);
        }
    });
    $('#' + input).on('paste', function () {
        $(this).attr('maxlength', 100);
        element = $(this);
        setTimeout(function () {
            var val = element.val();
            element.val(charStripper(val, originalMaxLength, regex));
            element.attr('maxlength', originalMaxLength);
        }, 100);
    });

}
/**
 * Removes all non numeric characters from a string and shortens the string to the max length of the input field being used.
 * @param  {[type]} str       The string to be stripped.
 * @param  {[type]} maxlength The max length of the input field being used.
 * @param {[boolean]} allowLetters If true it strips only special characters. If False it strips all non numeric characters.
 * @return {[type]}           The stripped string.
 */
function charStripper(str, maxLength, regex) {
    str = str.replace(regex, '');
    str = str.substring(0, maxLength);
    return str;
}

/**
 * This function watches key presses and updates the "submit"
 * button of a form to "enabled" if all of the fields meet their minimum length requirements.
 * Based on the function isValid(formid).
 * @param  {[type]} formid The form to be watched.
 * @return {[type]}        [description]
 */
function enableSubmitOnFormFill(formid) {
    $(formid + " input").on('keyup', function (e) {
        if (isValid(formid)) {
            $(formid + ' .button').removeClass('disabled');
            $(formid + ' .button').attr('disabled', false);
        } else {
            if (!($(formid + ' .button').hasClass('secondary'))) {
                $(formid + ' .button').addClass('disabled');
            }

        }

    });
}

/**
 * Enables a form to be submitted by pressing Enter
 * @param  {[type]} formid  the form to be submitted
 */
function enterSubmission(formid) {
    $(formid + " input").on("keyup", function (e) {
        if (e.keyCode == 13) {
            $(formid).submit();
            $(formid).trigger();
        }
    });
}


//Application From Validation Processing
//Mg. 07.2014
//sign In Process Validation placed here	 
/**/
if ($('#login_form').length > 0) {
    var formRef = $('form').attr('id');
    _SignInNow();
    _stripFields();
}
function _SignInNow() {
    //Validation Begins Login form with Card Number and EXPiration Date
    bindValidation("login_form", "${pageContext.response.locale}");
    $("#btn_load_fund").click(function () {
		
        return isHomeValidation("login_form", "${pageContext.response.locale}");
    });
}

//Assigne Zipcode controls
//MG. If zipCodeActive then hide form
//07.2014
$(function (e) {
    $(document).ready(function () {
        var zipEdit = $('#lbl_zipcode');
        if ($(zipEdit).hasClass('zipCodeActive')) {
            //alert("has  zip code saved");
            $("#lbl_zipcode").show();
            $("#az_buttons").hide();
        } else {
            $("#lbl_zipcode").hide();
            $("#az_buttons").show();
        }
        $(".btnEditZip").on('click', function () {
            var zipEdit = $('#lbl_zipcode');
            var zipAdd = $('#az_buttons');
            $(zipEdit).addClass('zipCodeActive');
            if ($(zipEdit).hasClass('zipCodeActive')) {
                zipEdit.hide();
                zipAdd.show();
                $("#az_zipcode").val("");
                $("#az_zipcode").removeClass("success");
            } else {
                zipEdit.show();
                zipAdd.hide();
                $("#az_zipcode").val("");
            }
            $(zipEdit).toggleClass("on zipCodeActive");
        });
        //Application From Validation Processing
        //Mg. 07.2014
        //Zipcode Update/Manage Validation placed here
        if ($('#assign_zip').length > 0) {
            var formRef = $('form').attr('id');
            _stripFields();

        }
        /**
         *Zipcode JSON obj passer
         *validates Zipcode then send it to back-end Services
         *Changes and come back with success or error
         **/
        $('#az_cancel_btn').on("click", function () {
            $("#az_zipcode").val("");
            var zipEdit = $('#lbl_zipcode');
            var zipAdd = $('#az_buttons');
            zipEdit.show();
            zipAdd.hide();
            $("#az_zipcode").val("");
            //window.scrollTo(0, 1);
        });

        $('#az_btn').click(function () {
            //var zipCode = "50505";
            var original_zip = $('#az_zipcode').val();
            var input_zip = $('#az_zipcode').val();

            var csrfToken = $(this).data('id');

            var dataString = JSON.stringify({zipCode: input_zip});
            $.ajax({
                type: 'POST',
                url: "./zipcode.json",
                headers: {'X-CSRFToken': csrftoken, 'X-FRAME-OPTIONS': 'DENY'},
                dataType: 'json',
                data: dataString,
                contentType: 'application/json',
                mimeType: 'application/json',
                success: function (data) {
                    var messageValue = '';
                    var code = '';
                    if (data.length > 0) {
                        $.each(data, function (server_code, message) {
                            if (message.server_code != '' && message.message != '') {
                                messageValue = message.message;
                                code = message.server_code;
                                return false;
                            } else if (message.error_code == -1 && message.message != '') {
                                messageValue = message.message;
                                return false;
                            }
                            //console.log(message.server_code + message.message);
                        });
                    }
                    if (code != '' && code == 'code.ws.zipCodeSuccess') {
                        $('.success.message').contents().find('h4').html(messageValue);
                        WLGift.notify.showNotification(".success");
                        //TODO: change this to JQ
                        document.getElementById('az_buttons').style.display = 'none';
                        document.getElementById('lbl_zipcode').style.display = 'block';
                        $("#lbl_zipcode").addClass('zipCodeActive');
                        $("#update_lblzip strong").text(input_zip);
                        WLGift.BoltModal.removeLoading();
                        $('.mask').fadeOut();
                    } else {
                        $('.error.message').contents().find('h4').html(messageValue);
                        WLGift.notify.showNotification(".error");
                        WLGift.BoltModal.removeLoading();
                        $('.mask').fadeOut();
                    }
                },
                error: function (data, er) {
                    WLGift.BoltModal.removeLoading();
                    $('.error.message').contents().find('h4').html();
                    $('.mask').fadeOut();
                    WLGift.notify.showNotification(".error");
                },
                complete: function (data) {
                    //console.log("Completed data: [" + data + "]");

                }
            });

            // }
        });
// enter button code here for ZIPCODE....
        $('#az_zipcode').keypress(function (e) {
            var key = e.which;
            if (key == 13) {
                $('#az_btn').click();
                //console.log('enter button pressed....');
                return false;

            }
        });
        return false;
    })
});

/*
 if($('#assign_zip').length > 0) {
 var formRef = $('form').attr('id');
 _ZipCodeUserNow();
 _stripFields();

 }
 function _ZipCodeUserNow(){
 bindValidation("assign_zip","${pageContext.response.locale}");
 $("#az_btn").click(function(){
 return isValidation("assign_zip","${pageContext.response.locale}");
 });
 }
 */


//Clear PIN Form
//Seshu. 08-2015
//This keep the Tab on the Tab, no pagnating
$(document).ready(function() {
    $('#managePinFormBtn').click(function () {
        var csrfToken = $(this).data('id');
        $.ajax({
            type: 'POST',
            url: "./clearPin.json",
            headers: {'X-CSRFToken': csrftoken, 'X-FRAME-OPTIONS': 'DENY'},
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
            success: function (data) {
                var messageValue = '';
                var code = '';
                $.each(data, function (server_code, message) {
                    if (message.server_code != '' && message.message != '') {
                        messageValue = message.message;
                        code = message.server_code;
                        return false;
                    }
                });
                if (code != '' && code == 'code.ws.clearPIN') {
                    $('.success.message').contents().find('h4').html(messageValue);
                    WLGift.notify.showNotification(".success");
                    WLGift.BoltModal.removeLoading();
                    $('.mask').fadeOut();
                } else {
                    $('.error.message').contents().find('h4').html(messageValue);
                    WLGift.notify.showNotification(".error");
                    $('.mask').fadeOut();
                }
            },
            error: function (data, er) {
                WLGift.BoltModal.removeLoading();
                $('.error.message').contents().find('h4').html();
                $('.mask').fadeOut();
                WLGift.notify.showNotification(".error");
            }

        });
    });
});


//Replace Card Form
//This keep the Tab on the Tab, no pagnating


$(document).ready(function() {
	 
	$('#replaceCardForm').submit(function(e) {
		var frm = $('#replaceCardForm');
		e.preventDefault();

	    var values = {};
	    $.each(frm.serializeArray(), function(i, field) {
	        values[field.name] = field.value;
	        delete values["undefined"]
	    });
	    
	    var csrfToken = values.csrfToken;
    $.ajax({
        contentType : 'application/json; charset=utf-8',
        type: 'POST',
        url: "./replaceCardStep1.json",
        headers: {'X-CSRFToken': csrftoken, 'X-FRAME-OPTIONS': 'DENY'},
        dataType : 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
        data : JSON.stringify(values),
        success: function (data) {
            var messageValue = '';
            var code = '';
            $.each(data, function (server_code, message) {
                if (message.server_code != '' && message.message != '') {
                    messageValue = message.message;
                    code = message.server_code;
                    return false;
                }
            });
            if (code != '' && code == 'code.ws.replacementCard') {
                $('.success.message').contents().find('h4').html(messageValue);
                WLGift.notify.showNotification(".success");
                WLGift.BoltModal.removeLoading();
                $('.mask').fadeOut();
            } else {
                $('.error.message').contents().find('h4').html(messageValue);
                WLGift.notify.showNotification(".error");
                $('.mask').fadeOut();
            }
        },
        error: function (data, er) {
            WLGift.BoltModal.removeLoading();
            $('.error.message').contents().find('h4').html();
            $('.mask').fadeOut();
            WLGift.notify.showNotification(".error");
        }
    });
	});
});



//Application From Validation Processing
//Mg. 07.2014
//Get Scoop Email Validation 
/**/
$(document).ready(function() {
    if ($('#newsletter').length > 0) {
        _getTheScoop();
    }
});
function _getTheScoop() {
    var newsletter = $('footer form#newsletter').attr('id');
    bindValidation(newsletter, "${pageContext.response.locale}");
    $("#ButtonGo").click(function () {
        return isValidation(newsletter, "${pageContext.response.locale}");
    });
}

//GET Email Address
//This propigates user E-mail in .csv file system
//MG. added 09-18
$(document).ready(function() {
    $('#newsletter').submit(function () {
        //E-mail is passed
        var values = $(this).serialize();
        var formRef = $(this).attr('id');
        var dataString = JSON.stringify(values);
        //var values = $("#newsletter_email").val();
        if ($('#newsletter_tc_check').is(':checked')) {
            $.ajax({
                type: 'POST',
                url: "./saveNewsletterSignupEmailPost.json",
                dataType: 'json',
                data: dataString,
                contentType: 'application/json',
                mimeType: 'application/json',
                success: function (data) {
                    //var result = $.parseJSON(data);
                    if (data.length > 0) {
                        $.each(data, function (server_code, message) {
                            if (message.server_code != '' && message.message != '') {
                                success_message = message.message;
                                return false;
                            }
                        });
                    }
                    if (success_message != '') {
                        var success_message = success_message;
                        $('.success.message').contents().find('h4').text(success_message);
                        WLGift.notify.showNotification(".success");
                        $("#newsletter_email").val("");
                        WLGift.BoltModal.removeLoading();
                        $('.mask').remove();
                    } else {
                        $('.error.message').contents().find('h4').text('Enter Valid Email Address');
                        WLGift.notify.showNotification(".error");
                    }
                }
            });
            return false;
        } else {
            $('.error.message').contents().find('h4').text(newsletter_privacy_message);
            WLGift.notify.showNotification(".error");
        }
        return false;

    });
});