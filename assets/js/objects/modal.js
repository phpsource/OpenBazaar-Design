$(function() {
  window.Modal.initialize();
});

window.Modal = {
  initialize: function() {
    $(document).on("click", ".overlay, .close-modal, .trade-close, .modal-close", function(){ Modal.close() });
    $(document).on("click", ".modal-navigation li", function(event){ Modal.setActiveTab(event) });
  },

  clear: function clear(){
    $('.modal input, .modal textarea').val('');
  },

  close: function close(){
    $('.modal-pretty, .modal').fadeTo(150, 0, function(){
      $('#main, .vendor-header, .vendor-header-2, .chat').removeClass('blur');
      $('.modal-pretty, .modal, .modal-qr-payment').hide();
      $('.overlay').hide();
      $('.chat, .modal-contract-price, .modal-photo-shadow').show();
    });    
  },

  setActiveTab: function setActiveTab(event){
    var target = $(event.currentTarget);
    var section = target.data('section');
    $('.modal-navigation ul li').removeClass('modal-navigation-selected');
    target.addClass('modal-navigation-selected');
    $('.modal-purchase-detail .modal-body table, .modal-purchase-detail-dispute').hide();
    switch (section){
      case "modal-purchase-detail-dispute":
        Case.loadDispute($('.modal-transaction-id').html().replace('ID: ', ''));
        $('.input-dispute-message').focus();
        break;
    }
    Page.setColors(User.find($session.handle));    
    $('.' + section).show();
  },

  setTitle: function setTitle(title){
    $('.modal-pretty .modal-header .modal-title').html(title);
  },

  show: function show(type){
    $('.overlay').show();
    if (type === "basic"){
      $('.modal').fadeTo(100, 100); 
    }else{
      $('.modal-pretty').fadeTo(100, 100); 
    }
  },
}