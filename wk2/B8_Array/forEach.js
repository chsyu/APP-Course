var colors = ['red', 'blue', 'green'];

// loop method
for (var i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

// forEach method
colors.forEach(
  (color) => console.log(color)
);

// use forEach to add HTML elements
$(document).ready(function(){
  colors.forEach(
    (color) => $('body').append(`<div>${color}</div>`)
  );
});
