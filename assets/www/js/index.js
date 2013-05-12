// JavaScript Document
$(document).bind('pageinit',function(){
	
	 $.mobile.loading( "show", {
            text: "加载中.....",
            textVisible:true,
            theme: "a",
            textonly: false,
    });

	document.addEventListener('deviceready',onDeviceReady,false);
		function onDeviceReady()
	{
		findContacts();
		document.addEventListener('backbutton',onBackButton,false);
		
	}	
			<!--返回按钮事件-->
			function onBackButton()
			{
				console.log('you click the back button');
				$('#popupDialog').popup('open');
				//$.mobile.changePage("view.html", {transition : "slide"});  
			}
			
			$('#exit').bind('click',function(){ 
				navigator.app.exitApp();
				});
				
			$('#cancel').bind('click',function(){
				$('#popupDialog').popup('close');
				});
				
			
			<!--读取联系人-->
			function findContacts()
			{
				var option = new ContactFindOptions();
				option.filter="";
				option.multiple = true;
				var fields = ["*"];
				navigator.contacts.find(fields,onSuccess,onError,option);
			}
			
			<!--读取联系人成功-->
			function onSuccess(contacts)
			{
				for(var i=0;i<contacts.length;i++)
				{
					$('#contactList').append('<li><a href="view.html?number='+contacts[i].phoneNumbers[0].value+'" data-ajax="false">'+contacts[i].displayName+'<br>'+contacts[i].phoneNumbers[0].value+'</br></a></li>');
				}	
				$('#contactList').listview('refresh');
				$.mobile.loading('hide');
				/*
			$('.ui-link-inherit').bind('click',function(){
				$('#popupMenu').popup('open');
				$.mobile.changePage('add.html?id=1');});
					
				$('#contactList').append('<li><a href="view.html?number='+contacts[i].phoneNumbers[0].value+'" data-ajax="false">'+contacts[i].displayName+'<br>'+contacts[i].phoneNumbers[0].value+'</br></a></li>');
				*/			}
			<!--读取联系人出错-->
			function onError(contactError)
			{
				alert('读取联系人出错');
			}
			
			
	});
