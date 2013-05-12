// JavaScript Document

$(document).bind('pageinit',function() {
	
	

	var findContact;
	<!--查询URL的参数-->
	 function GetQueryString(name)   
     {   
       var reg= new RegExp("(^|&)"+name+"=([^&]*)(&|$)");   
       var r= window.location.search.substr(1).match(reg);   
       if(r!=null)
		 return unescape(r[2]);
		return null;   
      }   

	$('#save').on('click',saveContact);
	$('.back').bind('click',function(){
		navigator.app.backHistory();
		});
	
	document.addEventListener('deviceready',onDeviceReady,false);
	
	function onDeviceReady()
	{
		if(GetQueryString('type')=="edit")
		{
			 $.mobile.loading( "show", {
            text: "加载中.....",
            textVisible:true,
            theme: "a",
            textonly: false,
    });
			$('.title').text('编辑联系人');
			findContacts();
		}
		document.addEventListener('backbutton',onBackButton,false);
	}
	
	<!--返回按钮-->
	function onBackButton()
	{
		window.history.back();
	}
	
	<!--查找联系人-->
	function findContacts()
	{
		var option = new ContactFindOptions();
		console.log(GetQueryString('number'));
		option.filter= GetQueryString('number');
		option.multiple = true;
		var fields = ["*"];
		navigator.contacts.find(fields,findSuccess,findError,option);
	}
			
	<!--查找联系人成功-->
	function findSuccess(contacts)
	{
		$.mobile.loading('hide');
		findContact = contacts[0];
		$('#name').val(contacts[0].displayName);
		$('#tel').val(contacts[0].phoneNumbers[0].value);
		$('#email').val(contacts[0].emails[0].value);
		$('#address').val(contacts[0].addresses[0].formatted);
	}
			
	function findError(error)
	{
				
	}
			
			
	<!--保存联系人-->
	function saveContact()
	{ 
		 $.mobile.loading( "show", {
            text: "加载中.....",
            textVisible:true,
            theme: "a",
            textonly: false,
		 });
		if(GetQueryString('type')=="edit"&&findContact!=null)
		{
			findContact.remove(function(){
			console.log('delete success');
			
			},function(){
				console.log('delete error');
			});
		}
		var newContact = navigator.contacts.create();
		
		var name = $('#name').val();
		var phoneNumber = $('#tel').val();
		var email = $('#email').val();
		var addr = $('#address').val();
		
		console.log(name+"//"+phoneNumber+"//"+email+"//"+addr);
		newContact.displayName = name;
		var numbers = [];
		numbers[0] = new ContactField('mobile',phoneNumber,true);
		newContact.phoneNumbers = numbers;
		
		var emails = [];
		var e = new ContactField();
		e.value = email;
		e.pref = true;
		emails[0] = e;
		newContact.emails = emails;
		
		var addrs = [];
		var add = new ContactAddress();
		add.formatted = addr;
		addrs[0] = add;
		newContact.addresses=addrs;
		
		newContact.save(onSuccess,onError);
			
	}
	
	<!---读取联系人成功->
	function onSuccess(contact)
	{
		$.mobile.loading('hide');
		$('#name').val("");
		$('#tel').val("");
		$('#email').val("");
		$('#address').val("");
		$('#popupDialog').popup('open');
	}
	
	
		
	<!--读取联系人失败-->
	function onError(contactError)
	{
		console.log(''+contactError);
	}
});