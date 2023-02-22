document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
  // Progress bar shenanigans
  let winHeight = $(window).height(), 
    docHeight = $(document).height(),
    progressBar = $('progress'),
    max, value;

  /* Set the max scrollable area */
  max = docHeight - winHeight;
  progressBar.attr('max', max);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
        el.classList.toggle('has-background-info-dark');
        $target.classList.toggle('has-background-info-dark');
  
      });
    });


    $(document).on('scroll', function(){
      value = $(window).scrollTop();
      progressBar.attr('value', value);
    });
});