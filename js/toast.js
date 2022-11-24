var bgColors = [
    "linear-gradient(to right, #660996, #be60c1)",
    "linear-gradient(to right, #130baf, #599ef1)",
  ],
  i = 0;



// Options for the toast
var options = {
  text: "Happy toasting!",
  duration: 2500,
  callback: function() {
    console.log("Toast hidden");
    Toastify.reposition();
  },
  close: true,
  style: {
    background: "linear-gradient(to right, #660996, #be60c1)",
  }
};

// Initializing the toast
var myToast = Toastify(options);


// Displaying toast on manual action `Try`
$(document).ready(() => {
  $('.toast-enable').click(() => {
    Toastify({
      text: "Item adicionado!",
      duration: 3000,
      gravity: "bottom", 
      position: "right", 
      close:  true,
      style: {
        background: bgColors[i % 2],
      }
    }).showToast();
    i++;
  })
})