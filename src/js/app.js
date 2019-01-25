App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    //alert("async");
    return await App.initWeb3();
  },



  initWeb3: async function() {
    /*
     * Replace me...
     */
     // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);


    return App.initContract();
  },



  initContract: function() {  

	//alert("inside initcontract");  

	$.getJSON('ProofOfExistence.json', function(data) {
		// Get the necessary contract artifact file and instantiate it with truffle-contract
		var POEArtifact = data;
		App.contracts.ProofOfExistence = TruffleContract(POEArtifact);

		// Set the provider for our contract
		App.contracts.ProofOfExistence.setProvider(App.web3Provider);
			
		return App.showPictures();
        });

    return App.bindEvents();
  },



  bindEvents: function() {
    
    $(document).on('click', '.btn-upload', App.handleUpload);
    $(document).on('click', '.btn-verify', App.handleVerify);
	
	
  },
 

	showPictures: function(pictureHashes, account) {
		//alert("in showPictures ");
		
		var POEInstance;
		var picsRow = $('#picsRow');
     	 	var picTemplate = $('#picTemplate');
		var picTemplateDate = $('#picTemplateDate');
		var userAccount = $('#userAccount');
				    	

		web3.eth.getAccounts(function(error, accounts) {
			if (error) {
				 console.log(error);
			}
			var account = accounts[0];
			userAccount.find('.pic-owner').text(account);	

			App.contracts.ProofOfExistence.deployed().then(function(instance) {
		      		POEInstance = instance;
			
			   //alert("just before getPicturesHashes");		
			   return POEInstance.getPictureHashes.call();			

			}).then(function(result) {
				//alert("start looping hashes " + result.length);
				
				picsRow.empty();
				//picsRow.find('.pic-owner').text(account);
				
				if (result.length == 0) {
					picTemplate.find('.pic-hash').text("No pics found");
					picsRow.append(picTemplate.html());					
				}
			      	for (i = 0; i < result.length; i++) {
					picTemplate.find('.pic-number').text(i);
					picTemplate.find('.pic-hash').text(result[i]);
						
					picsRow.append(picTemplate.html());
			      	}
				//alert("just before getPicturesDates");		
				return POEInstance.getPictureDates.call();
			 
			 }).then(function(resultdate) {
				//alert("loop getPictureDates " + resultdate.length);
				//alert("content:" + result);
				var counter = 0;
				for (i = 0; i < resultdate.length; i++) {
					    
				    picTemplateDate.find('.pic-number').text(counter);
				    counter++;
					    	
				    picTemplateDate.find('.pic-year').text(resultdate[i]); i++;
				    picTemplateDate.find('.pic-month').text(resultdate[i]); i++;
				    picTemplateDate.find('.pic-day').text(resultdate[i]); i++;
				    picTemplateDate.find('.pic-hour').text(resultdate[i]); i++;
				    picTemplateDate.find('.pic-minute').text(resultdate[i]); i++;
				    picTemplateDate.find('.pic-second').text(resultdate[i]); 	
						
				    picsRow.append(picTemplateDate.html());
			      	}
					
					
			 }).catch(function(err) {
					alert(err.message);
			      		console.log(err.message);
			 })
		});


  },

 handleUpload: function(event) {
    event.preventDefault();
	//alert ("In handleUpload");   

     var POEInstance;

     web3.eth.getAccounts(function(error, accounts) {
       if (error) {
         console.log(error);
       }

       var account = accounts[0];
       var fileHash = document.getElementById('inputPicHash').value;
       var fileName = document.getElementById('inputPicFileName').value;
       
	//alert ("fileHash=" + fileHash);
	//alert ("fileName=" + fileName);

       App.contracts.ProofOfExistence.deployed().then(function(instance) {
         POEInstance = instance;	

         // Execute submitPicture as a transaction by sending account
         return POEInstance.submitPicture(fileHash, fileName, {from: account});
       }).then(function(result) {
          		 	 
	 alert ("Picture successfully uploaded!");
	 // refresh picture list on UI
	 return App.showPictures();

         document.getElementById('inputPicHash').value = "";
         document.getElementById('inputPicFileName').value = "";

       }).catch(function(err) {
         console.log(err.message);
	 alert ("Upload failed. Picture may already exist!");
       });
     });
     
  },


  handleVerify: function(event) {
     event.preventDefault();
     //alert ("In Verify");

     var POEInstance;

     web3.eth.getAccounts(function(error, accounts) {
       if (error) {
         console.log(error);
       }

       var account = accounts[0];
       var fileHash = document.getElementById('inputOwnershipPicHash').value;
       var ownerAccount = document.getElementById('inputOwnershipAccount').value;
       //alert ("fileHash=" + fileHash);
       //alert ("owner=" + ownerAccount);
       var verifyOwnershipDiv = $('#verifyOwnershipDiv');

       App.contracts.ProofOfExistence.deployed().then(function(instance) {
         POEInstance = instance;	

         // Execute adopt as a transaction by sending account
	 //alert ("about to call verify function");
         return POEInstance.verifyOwnership(ownerAccount, fileHash, {from: account});

       }).then(function(result) {	 
	 	 
	  if (result > 0){
	    alert ("OWNERSHIP VERIFIED !!");
	    verifyOwnershipDiv.find('.ownershipVerified').text("OWNERSHIP VERIFIED !!");
	   
	  }
	  else{
	    alert ("SORRY, OWNERSHIP NOT VERIFIED");
	    verifyOwnershipDiv.find('.ownershipVerified').text("SORRY, OWNERSHIP NOT VERIFIED");
 	  }           	 	 

       }).catch(function(err) {
         console.log(err.message);
       });

     });

  }
    
};

$(function() {
  $(window).load(function() {

    App.init();
  });
});
