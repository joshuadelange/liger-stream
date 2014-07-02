//declare items! :D
var Items = new Meteor.Collection('items');
Items.allow({
    insert: function (userId, doc) {
      return (userId);
    }
});

if (Meteor.isClient) {

  //give the items to the template
  Template.stream.items = function () {
    //fetch items from DB
    return Items.find();
  };

  Template.stream.events({

    //listen for submits on the form
    'submit #new-item': function (ev, el) {

      console.log('Meteor.user()', Meteor.user());

      //getting the $form and link
      var $form = $(ev.target),
          link = $form.find('[name="url"]').val();

      if(!/^s?https?:\/\/[-_.!~*'()a-zA-Z0-9;\/?:\@&=+\$,%#]+$/.test(link)) {

        alert('Please enter a valid URL! :D');

      }
      else {

        //adding to db
        Items.insert({
          url: link,
          posted_by: Meteor.user().profile.name
        });

        //clearing the field
        $form.find('[name="url"]').val('');

      }

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