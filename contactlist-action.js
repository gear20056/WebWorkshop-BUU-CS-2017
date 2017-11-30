/************
 * This Javascript Code For Contact List HTML5
 * This Workshop For Webtechnology
 * Id:58660111,58660043,57160667
 ************/
/**************************************/
/************
 * Function Add Data to WebApplication
 ************/
var data = {};
var checknumber = false;
$("#telnum").keyup(function () {
  var checknum = $(this).val();
  if (checknum.length == 10) {
    $("#alert").fadeOut("fast");
    checknumber = true;
  } else {
    $("#alert").fadeIn("fast");
    $("#alert").html('โปรดใส่ตัวเลขให้ครบสิบตัว');
  }
});
$("#add-contact").unbind().on("click", function (e) {
  e.preventDefault;
  var name = $("#name").val();
  var surname = $("#surname").val();
  var telnum = $("#telnum").val();
  var email = $("#email").val();
  if (checknumber == false && isBlank(name) && isBlank(surname) && isBlank(telnum) && isBlank(name) || isBlank(surname) || isBlank(telnum)) {
    swal({
      title: "กรุณาใส่ข้อมูลให้ครบ",
      text: " ",
      icon: "warning",
      buttons: false,
      timer: 1500,
    })
  } else {
    data.name = name;
    data.surname = surname;
    data.telnum = telnum;
    data.email = email;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://localhost:3000/insertdata',
      success: function (data) {
        swal({
          title: "เพิ่มข้อมูลสำเร็จ",
          text: " ",
          icon: "success",
          buttons: false,
          timer: 2000,
        }).then(function () {
          $('#addcontact').modal('toggle');
          $('#loading').modal('show');
          setTimeout(function () {
            $('#loading').modal('hide');
            emptyform();
            showdata();
          }, 1200);
        });
      }
    });
  }
});
