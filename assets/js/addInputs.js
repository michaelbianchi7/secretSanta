$(function() {
    $("#addnew").click(function(e) {
        $("#firstrow").clone() // copy the #firstrow
            .removeAttr("id")  // remove the duplicate ID
            .find('input').val('').end()
            .append('<a class="remover" style="color:#1e1f23;" href="#">Remove</a>') // add a "remove" link
            .insertAfter("#firstrow");  // add to the form
        e.preventDefault();
    });
    $(".remover").live("click",function(e) {
        // .live() acts on .removers that aren't created yet
        $(this).parent().remove();  // remove the parent div
        e.preventDefault();
    });
});
