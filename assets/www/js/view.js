// JavaScript Document
$(document).bind('pageinit',function(){
	
	
	 $.mobile.loading( "show", {
            text: "加载中.....",
            textVisible:true,
            theme: "a",
            textonly: false,
    });
	
	$('#back_link').click(function(e){
		e.preventDefault();
		navigator.app.backHistory();
		});
		
	<!--查询url的参数-->
	 function GetQueryString(name)   
     {   
       var reg= new RegExp("(^|&)"+name+"=([^&]*)(&|$)");   
       var r= window.location.search.substr(1).match(reg);   
       if(r!=null)
		 return unescape(r[2]);
		return null;   
      }   
	
	$('#edit').attr('href','add.html?type=edit&number='+GetQueryString('number'));
	
	document.addEventListener('deviceready',onDeviceReady,false);
	
	function onDeviceReady()
	{
		findContacts();
		document.addEventListener('backbutton',onBackButton,false);
	}
	
	<!--返回按钮事件-->
	function onBackButton()
	{
		navigator.app.backHistory();
	}
	<!--读取联系人-->
	function findContacts()
	{
		var option = new ContactFindOptions();
		option.filter= GetQueryString('number');
		option.multiple = true;
		var fields = ["*"];
		navigator.contacts.find(fields,findSuccess,findError,option);
	}
			
	<!--读取联系人成功-->
	function findSuccess(contacts)
	{
		
	 $.mobile.loading('hide');
		if(contacts.length>0)
		{
			$('#name').append(contacts[0].displayName);
			$('#number').append(contacts[0].phoneNumbers[0].value);
			$('#email').append(contacts[0].emails[0].value);
			$('#address').append(contacts[0].addresses[0].formatted);
			$('#delete').bind('click',function(){
				contacts[0].remove(function(){
					console.log('delete success');
					$('#delete_success').popup('open');
					},function(){
						console.log('delete error');
					});
				});
		}
	}
	
	<!--删除联系人-->
	function deleteContact(contact)
	{
		contact.remove(function(){
			console.log('delete success');
			$('#delete_success').popup('open');
			},function(){
				console.log('delete error');
			});
	}
	
	function findError(error)
	{
		
	}
});