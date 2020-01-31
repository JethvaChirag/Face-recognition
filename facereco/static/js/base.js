$(document).on('submit','#profile',function(e){

    var input=document.querySelectorAll('input')
    for(var i =0;i<input.length;i++){
        if(input[i].value==''){
            input[i].style.background='red';
        }
    }

    e.preventDefault();

    $.ajax({
        type:'POST',
        url:'/user/addPerson',
        data:{
            fname:$('#fname').val(),
            lname:$('#lname').val(),
            mno:$('#mno').val(),
            intime:$('#intime').val(),
            outtime:$('#outtime').val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success:function(){
            alert("Created new user");
        }
    });
})