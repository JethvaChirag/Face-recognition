$(document).on('submit','#profile',function(e){
    var nullValues=0;
    var mobilenumber=false;
    var input=document.querySelectorAll('input')
    for(var i =0;i<input.length;i++){
        if(input[i].value==''){
            alert(input[i].name+' cannot be null.');
            nullValues+=1;
        }
        if(input[i].id=='mno'){
            if(input[i].value.length==10){
                mobilenumber=true;
            }
            else{
                alert('Please enter proper mobile number.');
            }
        }
    }

    e.preventDefault();
    if(nullValues==0 & mobilenumber){
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
    }
    
})