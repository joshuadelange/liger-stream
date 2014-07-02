//declare items! :D
var Items = new Meteor.Collection('items');

if (Meteor.isClient) {

  //give the items to the template
  Template.stream.items = function () {
    //fetch items from DB
    return Items.find();
  };

  Template.stream.events({

    //listen for submits on the form
    'submit #new-item': function (ev, el) {
      //getting the $form
      var $form = $(ev.target);
      //adding to db
      Items.insert({url: $form.find('[name="url"]').val()});
      //clearing the field
      $form.find('[name="url"]').val('');
      //making sure the browser doesnt go anywhere because of the form submit
      ev.preventDefault();
    }

  });

}

if (Meteor.isServer) {

  Meteor.startup(function () {
    // code to run on server at startup
  });

}