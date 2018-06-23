// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.datepicker');
//   var instances = M.Datepicker.init(elems, options);

// $(document).ready(function () {
//   $('.modal').modal();
//   $('.datepicker').pickadate(
//     selectMonths, true, // Creates a dropdown to control month
//     selectYears, 16, // Creates a dropdown of 15 years to control year
//     format, 'yyyy-mm-dd',
//   )
//   var instance = M.Datepicker.getInstance(elem);
//   instance.setDate(new Date());
// });


//   $('.datepicker').datepicker();
<script>
    $(function() {
      //moment.locale('fr');

      jQuery.validator.addMethod("dateWithMoment", function(value, element) {
  // allow any non-whitespace characters as the host part
  return this.optional( element ) || moment(value, "DD/MM/YYYY", true).isValid() ;
}, 'Please enter a valid date with moment.');

      $('.datepicker').pickadate({
        editable: true,
        selectMonths: true,
        selectYears: 15,
        format: 'dd/mm/yyyy',
        // pour fermer le datepicker quand on sélectionne une date
        onSet: function(ele) {
          if (ele.select) {
            //this.close();
          }
        }
      }).dblclick(function(){
        $(this).pickadate('picker').set(moment.now());
      });

      $('.trigger-datepicker').click(function(event) {
        event.stopPropagation();
        var $datepicker = $(this).parent().parent().find('.datepicker');
        var picker = $datepicker.pickadate('picker');
        picker.open();
      });

      $('#formulaireDate').validate();
    });
  </script>