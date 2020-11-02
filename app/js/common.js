(function ($) {
   $(document).ready(function(){
       var iso = new Isotope( '.isotop', {
           itemSelector: '.grid__col-2',
           layoutMode: 'fitRows'
       });

       var filterFns = {
           numberGreaterThan50: function( itemElem ) {
               var number = itemElem.querySelector('.number').textContent;
               return parseInt( number, 10 ) > 50;
           },
           ium: function( itemElem ) {
               var name = itemElem.querySelector('.name').textContent;
               return name.match( /ium$/ );
           }
       };

       // bind filter button click
       var filtersElem = document.querySelector('.block_sort');
       filtersElem.addEventListener( 'click', function( event ) {
           // only work with buttons
           if ( !matchesSelector( event.target, 'button' ) ) {
               return;
           }
           var filterValue = event.target.getAttribute('data-filter');
           // use matching filter function
           filterValue = filterFns[ filterValue ] || filterValue;
           iso.arrange({ filter: filterValue });
       });

       // change is-checked class on buttons
       var buttonGroups = document.querySelectorAll('.block_sort');
       for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
           var buttonGroup = buttonGroups[i];
           radioButtonGroup( buttonGroup );
       } $("button[data-sort-by=\"popular\"]").on("click", function(){
        $grid.isotope({ filter: '.popular' });
    });

       function radioButtonGroup( buttonGroup ) {
           buttonGroup.addEventListener( 'click', function( event ) {
               // only work with buttons
               if ( !matchesSelector( event.target, 'button' ) ) {
                   return;
               }
               buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
               event.target.classList.add('is-checked');
           });
       }


   });
})(jQuery)
