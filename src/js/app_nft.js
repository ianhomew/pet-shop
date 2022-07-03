App = {
  web3Provider: null,
  contracts: {},
  nftData: {},

  init: async function() {
    // https://ipfs.io/ipfs/Qmehg3LhFH68f743uTE9HoXCpjSYUmhaLAPSGbsRn2RBM8
    // http://127.0.0.1:8080/ipfs/Qmehg3LhFH68f743uTE9HoXCpjSYUmhaLAPSGbsRn2RBM8
    App.nftData = await $.getJSON('http://127.0.0.1:8080/ipfs/Qmehg3LhFH68f743uTE9HoXCpjSYUmhaLAPSGbsRn2RBM8');

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    // App.web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');

    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.log('User denied account access!');
      }
    } else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    }

    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: async function() {

    let contract = await $.getJSON('EGGNft.json');

    App.contracts.EGGNft = await TruffleContract(contract);
    App.contracts.EGGNft.setProvider(App.web3Provider);


    $.getJSON('EGGNft.json', function(data) {
      var EGGNftArtifact = data;
      App.contracts.EGGNft = TruffleContract(EGGNftArtifact);
      App.contracts.EGGNft.setProvider(App.web3Provider);
    });

    App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-mint', App.handleMint);
    $(document).on('click', '.btn-my-pets', App.getMyPets);
    
  },

  handleMint: function(event) {
    event.preventDefault();

    // var petId = parseInt($(event.target).data('id'));

    var EGGNftInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.EGGNft.deployed().then(function(instance) {
        EGGNftInstance = instance;

        // getNextMintIndex 這個會有問題 在 nodejs 上面跑是正常可以取到直的
        EGGNftInstance.getNextMintIndex().then(function (petId) {
          if (petId >=16) {
            alert('Mint finished');
            return
          }
          $('div.mint-index').text(`mint index = ${petId}`);
          url = App.nftData[petId]['picture'];

          EGGNftInstance.adopt(url, {from: account, gas: 6721975}).then(function (data) {
            console.log('tx = ',data['tx'])

            var petsRow = $('#petsRow');
            var petTemplate = $('#petTemplate');

            petTemplate.find('.pet-token-id').text(petId);
            petTemplate.find('.panel-title').text(App.nftData[petId].name);
            petTemplate.find('img').attr('src', App.nftData[petId].picture);
            petTemplate.find('.pet-breed').text(App.nftData[petId].breed);
            petTemplate.find('.pet-age').text(App.nftData[petId].age);
            petTemplate.find('.pet-location').text(App.nftData[petId].location);
    
            petsRow.append(petTemplate.html());
          });
        });
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },
  getMyPets: async function () {
    $('#petsRow').html('')
    App.contracts.EGGNft.deployed().then(function (contract) {
        
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          console.log(error)
          return
        }
        console.log('accounts', accounts)
        try {
          for (let i = 0 ; i< 16; i++) {
            contract.ownerOf(i).then(function (addr) {

              if (addr === accounts[0]) {
                console.log(`token ${i} addr = ${addr}`)

                var petsRow = $('#petsRow');
                var petTemplate = $('#petTemplate');
                
                petTemplate.find('.pet-token-id').text(App.nftData[i].id + '(' + accounts[0] + ')');
                petTemplate.find('.panel-title').text(App.nftData[i].name);
                petTemplate.find('img').attr('src', App.nftData[i].picture);
                petTemplate.find('.pet-breed').text(App.nftData[i].breed);
                petTemplate.find('.pet-age').text(App.nftData[i].age);
                petTemplate.find('.pet-location').text(App.nftData[i].location);
        
                petsRow.append(petTemplate.html());
              }
            });
          }
        } catch (error) {
          console.log(error)
        }
      });
    });
  },

};

  $(function() {
    $(window).load(function() {
      App.init();
    });

    ethereum.on('chainChanged', (chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      window.location.reload();
    });


  });
