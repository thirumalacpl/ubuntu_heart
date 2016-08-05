$(document).on('pageshow', '#cond_patient_details', function(){ 

//alert('ASD');

condition_emer =  JSON.parse(sessionStorage.getItem("emergency")); 


//alert(condition_emer+'condition');


	$(document).off('click', '#pate_enter_but').on('click', '#pate_enter_but', function() {
//alert('condition emergency but clcik');

 var pat_name = document.getElementById('pat_name').value;
 var age_nn = document.getElementById('age_n').value;
 var gender_d = $('input:radio[name=gender_de]:checked').val();
  var mob_no = document.getElementById('mob_no').value;
   //alert(pat_name+'pat_name');
/*
  alert(pat_name+'pat_name');
  alert(age_nn+'age_nn');
  alert(gender_d+'gender_d');
  alert(mob_no+'mob_no');*/
if(pat_name != ""){
$.ajax({
  url: "http://staging.eimpressive.com/slim/slim-heart-mergedb/pat_detai_inser.php?pat_name="+pat_name+"&age_nn="+age_nn+"&gender_d="+gender_d+"&mob_no="+mob_no+"&condition_emer="+condition_emer,
  data:$('#pat_detai').serialize(),
  type: 'post',                   
  async: 'true',
  crossDomain: true,
  dataType: 'json',
  beforeSend: function() {
  },
  complete: function() {
  },
  success: function (result) {
    console.log('searchlpa ' +result);
    if(result[0]){
      $("#popupsearchmade").popup("open");

//alert('Data available for the search made');

       sessionStorage.setItem("patient_detaias_array",JSON.stringify(result[0]));
        sessionStorage.setItem("question_emergency_array",JSON.stringify(result[1]));
    
 
     document.getElementById('pat_name').value = '';
      document.getElementById('mob_no').value = '';
      document.getElementById('age_n').value='';

$.mobile.loading().hide();
$.mobile.changePage($('#question_li'), { transition: "none", changeHash: true, reverse: false });
           //   $.mobile.changePage("five.html", { transition: "slide", changeHash: true, reverse: false }); 

}else {
  alert('No Data Found for the search record'); 
}

return false;
},
error: function (request,error) {
// This callback function will trigger on unsuccessful action     
console.log(request);
console.log(error);  

alert('Network error has occurred please try again!');
}
});
}
else{
  alert("Fill the empty fields" );
  $.mobile.changePage($('#cond_patient_details'), { transition: "none", changeHash: true, reverse: false });
}
});


});