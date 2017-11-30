/************
 * This Javascript Code For Contact List HTML5
 * This Workshop For Webtechnology
 * Id:58660111,58660043,57160667
 ************/
/**************************************/
/************
 * Show Data first
 ************/
showdata();
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
/************
 * Function Get Data From WebApplication
 ************/
function showdata() {
  $("#list-contact").empty();
  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url: 'http://localhost:3000/showdata',
    success: function (data) {
      for (var i in data) {
        //console.log(data[i].idContact);
        $("#list-contact").append('<div class="col-md-6 my-1" id="test"><div class="card"><div class="card-header" id="text">' + data[i].Name + ' ' + data[i].Surname + '</div><div class="card-body"><h4>รายละเอียด</h4><p class="p-y-1">ชื่อ : ' + data[i].Name + '<br> นามสกุล : ' + data[i].Surname + '<br> เบอร์โทรศัพท์ : ' + data[i].Telnumber + '<br> อีเมล์ : ' + data[i].Email + '</p><div class="float-right"><button type="button" class="btn btn-info" onclick="editcontact(' + '\'' + data[i].Telnumber + '\'' + ');"><i class="fa fa-pencil-square-o" aria-hidden="true" ></i> แก่ไข</button>' + ' ' + '<button type="button" class="btn btn-danger" id="delete-contact" onclick="deletecontact(' + '\'' + data[i].Telnumber + '\'' + ');"><i class="fa fa-minus-square" aria-hidden="true"></i> ลบ</button></div></div></div></div>');
      }
    }
  });
}
/************
 * Search live in Contactlist 
 ************/
$("#filter").keyup(function () {
  var filter = $(this).val(),
    count = 0;
  $("#text,#test").each(function () {
    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
      $(this).fadeOut();
    } else {
      $(this).show();
    }
  });
});