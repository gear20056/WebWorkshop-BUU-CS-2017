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
 * Function Check Empty
 ************/
function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}
/************
 * Function Setform Empty
 ************/
function emptyform() {
  $("#nameedit").val(" ");
  $("#surnameedit").val(" ");
  $("#telnumedit").val(" ");
  $("#name").val(" ");
  $("#surname").val(" ");
  $("#telnum").val(" ");
  $("#email").val(" ");
}
/************
 * Function Search in Contactlist 
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
/************
 * Function Add Data
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
    $("#alert").html('โปรดใส่ตัวเลขให้ครบสิบตัวครับ');
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
      title: "กรุณาใส่ข้อมูลให้ครบครับ",
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
 * Function Get Data
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
        $("#list-contact").append('<div class="col-md-6 my-1" id="test"><div class="card"><div class="card-header" id="text"><i class="fa fa-user-circle" aria-hidden="true"></i> ' + data[i].Name + ' ' + data[i].Surname + '</div><div class="card-body"><h4><i class="fa fa-id-badge" aria-hidden="true"></i> รายละเอียด</h4><p class="p-y-1">ชื่อ : ' + data[i].Name + '<br> นามสกุล : ' + data[i].Surname + '<br> เบอร์โทรศัพท์ : ' + data[i].Telnumber + '<br> อีเมล์ : ' + data[i].Email + '</p><div class="float-right"><button type="button" class="btn btn-info" onclick="editcontact(' + '\'' + data[i].Telnumber + '\'' + ');"><i class="fa fa-pencil-square-o" aria-hidden="true" ></i> แก่ไข</button>' + ' ' + '<button type="button" class="btn btn-danger" id="delete-contact" onclick="deletecontact(' + '\'' + data[i].Telnumber + '\'' + ');"><i class="fa fa-minus-square" aria-hidden="true"></i> ลบ</button></div></div></div></div>');
      }
    }
  });
}
/************
 * Function Edit Data
 ************/
function editcontact(data) {
  $('#editcontact').modal('show');
  var dataedit = {};
  //alert(data);
  dataedit.edit = data;
  $("#edit-contact").unbind().on("click", function (e) {
    e.preventDefault;
    var name = $("#nameedit").val();
    var surname = $("#surnameedit").val();
    if (isBlank(name) && isBlank(surname) || isBlank(name) || isBlank(surname) || isBlank(telnum)) {
      swal({
        title: "กรุณาใส่ข้อมูลให้ครบ",
        text: " ",
        icon: "warning",
        buttons: false,
        timer: 1500,
      })
    } else {
      dataedit.nameedit = name;
      dataedit.surnameedit = surname;
      dataedit.telnumedit = telnum;
      $.ajax({
        type: 'POST',
        data: JSON.stringify(dataedit),
        contentType: 'application/json',
        url: 'http://localhost:3000/editdata',
        success: function (data) {
          swal({
            title: "แก้ไขข้อมูลสำเร็จครับ",
            text: " ",
            icon: "success",
            buttons: false,
            timer: 2000,
          }).then(function () {
            $('#editcontact').modal('toggle');
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
}
/************
 * Function Delete Data
 ************/
function deletecontact(data) {
  var datadelete = {};
  //alert(data);
  console.log(data);
  datadelete.del = data;
  swal({
      title: "คุณต้องการลบรายชื่อ",
      text: " ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: {
        cancel: "ยกเลิก",
        catch: "ยืนยัน",
      },
    })
    .then((willDelete) => {
      if (willDelete) {
        $.ajax({
          type: 'POST',
          data: JSON.stringify(datadelete),
          contentType: 'application/json',
          url: 'http://localhost:3000/deletedata',
          success: function (data) {
            swal({
              title: "รายชื่อถูกลบสำเร็จ",
              text: " ",
              icon: "success",
              buttons: false,
              timer: 2000,
            }).then(function () {
              $('#loading').modal('show');
              setTimeout(function () {
                $('#loading').modal('hide');
                showdata();
              }, 1200);
            });
          }
        });
      }
    });
}