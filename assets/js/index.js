const debounce = function (fn, d) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      ByValue.apply(context, arguments);
    }, d);
  };
};

const betterFunction = debounce(ByValue, 5000);

const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
var rnage = { value1: 0, value2: 0 };
let priceGap = 1000;
priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
    rnage.value1 = minPrice;
    rnage.value2 = maxPrice;
    ByValue();
  });
});
rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
    rnage.value1 = minVal;
    rnage.value2 = maxVal;
    betterFunction();
  });
});

function ByValue() {
  var request = {
    url: `http://localhost:3000/api/users/search/id`,
    method: "GET",
    data: rnage,
  };
  $.ajax(request).done(function (response) {
    // console.log(response)
    document.getElementById("tbody").innerHTML = "";
    response.data.forEach((ele, idx) => {
      document.getElementById("tbody").innerHTML += document.getElementById(
        "tbody"
      ).innerHTML = `
              <tr class="row">  <td class="ckb"> 
              <input class="myCheckbox" id="${
                idx + 1
              }" name="id" type="checkbox" value="${ele.id}" />
              </td> <td class="test"> ${idx + 1} </td> <td id="name-${
        idx + 1
      }">${ele.Name}</td> <td id="email-${idx + 1}">${
        ele.Email
      } </td> <td id="gender-${idx + 1}">${ele.Gender} </td> <td id="status-${
        idx + 1
      }">${ele.Status}</td> <td>    
         <a href="/update-user?id=${
           ele.id
         }" class="btn border-shadow update">         <span class="text-gradent"><i class="fas fa-pencil-alt"></i></span>     </a>     <a class="btn border-shadow delete" data-id=${
        ele.id
      }>         <span class="text-gradent"><i class="fas fa-times"></i></span>     </a> </td> </tr>`;
    });
  });
}

$("#add_user").submit(function (event) {
  alert("Data Saved Sucessfully");
});
$("#update_user").submit(function (event) {
  console.log("clicked");
  event.preventDefault();
  var unindexed_array = $(this).serializeArray();
  var data = {};
  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });
  console.log(data)
  var request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert("Data Updated Successfully!");
  });
});

function search() {
  var data = $("input:text").val();
  const search = new Object();
  search.first = data.toString() + "%";
  var request = {
    url: `http://localhost:3000/api/users/search/new`,
    method: "GET",
    data: search,
  };
  $.ajax(request).done(function (response) {
    console.log(response)
    document.getElementById("tbody").innerHTML = "";
    response.data.forEach((ele, idx) => {
      document.getElementById("tbody").innerHTML += document.getElementById(
        "tbody"
      ).innerHTML = `<tr class="row">  <td class="ckb"> 
              <input class="myCheckbox" id="${
                idx + 1
              }" name="id" type="checkbox" value="${
        ele.id
      }" /></td> <td class="test"> ${idx + 1} </td> <td id="name-${idx + 1}">${
        ele.Name
      }</td> <td id="email-${idx + 1}">${ele.Email} </td> <td id="gender-${
        idx + 1
      }">${ele.Gender} </td> <td id="status-${idx + 1}">${
        ele.Status
      }</td> <td>    
         <a href="/update-user?id=${
           ele.id
         }" class="btn border-shadow update">         <span class="text-gradent"><i class="fas fa-pencil-alt"></i></span>     </a>     <a class="btn border-shadow delete" data-id=${
        ele.id
      }>         <span class="text-gradent"><i class="fas fa-times"></i></span>     </a> </td> </tr>`;
    });
  });
}

if (window.location.pathname == "/") {
  $onTabel = $(".table tbody tr button.update");
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function (response) {
        alert("Data Deleted Successfully!");
        location.reload();
      });
    }
  });



  var arr = [];
  var arrdel = [];
  $("input:checkbox").change(function () {
    var $this = $(this);
    console.log(this);
    if ($this.is(":checked")) {
      if (!arr.includes(this.id)) {
        arr.push(this.id);
        arrdel.push(this.value);
      }
    }
  });
}
// var edit = document.getElementById("edit");
// edit.addEventListener("click", function (event) {
//   console.log(arr);
//   event.preventDefault();
//   arr.forEach((ele) => {
//     let first = document.getElementById(`name-${ele}`).innerHTML;
//     var email = document.getElementById(`email-${ele}`).innerHTML;
//     let mf = document.getElementById(`gender-${ele}`).innerHTML;
//     var ai = document.getElementById(`status-${ele}`).innerHTML;
//     // var ai1 = $(`#status-${ele}`).html()
//     document.getElementById(
//       `name-${ele}`
//     ).innerHTML = `<input  type="text" name="name" value="${first}" placeholder="Mark Stoenis" >`;
//     document.getElementById(
//       `email-${ele}`
//     ).innerHTML = `<input  type="text" name="email" value="${email}" placeholder="example@gmail.com">`;

//     ai.startsWith("A")
//       ? (document.getElementById(`status-${ele}`).innerHTML = `
//             <select name='status'>
//                 <option value="Active" selected="selected">Active</option>
//                 <option value="Inactive">Inactive</option>
//             </select>
//               `)
//       : (document.getElementById(`status-${ele}`).innerHTML = `
//             <select name='status'>
//                 <option value="Active">Active</option>
//                 <option value="Inactive" selected="selected">Inactive</option>
//             </select>
//             `);

//     if (mf == "Male") {
//       document.getElementById(`gender-${ele}`).innerHTML = ` 
//                 <select name='gender'>
//                     <option value="Male" selected="selected">Male</option>
//                     <option value="Female">Female</option>
//                 </select>
//                 `;
//     } else {
//       document.getElementById(`gender-${ele}`).innerHTML = `
//                 <select name='gender'>
//                     <option value="Male">Male</option>
//                     <option value="Female" selected="selected">Female</option>
//                 </select>
//                  `;
//     }
//   });
//   arr = [];
// });
// $("#index").submit(function (event) {
//   event.preventDefault();
//   var data = {};
//   var unindexed_array = $(this).serializeArray();
//   console.log(unindexed_array);
//   for (var r = 0; r < unindexed_array.length; r++) {
//     if (unindexed_array[r].name) {
//       data[unindexed_array[r].name] = unindexed_array[r].value;
//     }
//     if (unindexed_array[r].name == "status") {
//       var request = {
//         url: `http://localhost:3000/api/users/${data.id}`,
//         method: "PUT",
//         data: data,
//       };

//       $.ajax(request).done(function (response) {});
//     }
//   }
//   swal({
//     title: "Good job!",
//     text: "Data Updated",
//     icon: "success",
//     button: true,
//     function(isConfirm) {
//       debugger;
//       setTimeout(function () {
//         if (isConfirm) {
//           swal("yes, do it!");
//         } else {
//           swal("cannel!");
//         }
//       }, 400);
//     },
//   }).then(function () {
//     location.reload();
//   });
// });
// $("input:text").change(function (event) {
//   console.log("Entered TExt");
//   $("#sea").prop(
//     "href",
//     `http://localhost:3000/Search?first=${$("input:text").val()}%`
//   );
// });
// $("#search").click(function (event) {
//   event.preventDefault();
//   console.log($("input:text").val());
//   var request = {
//     url: `http://localhost:3000/Search?first=${$("input:text").val()}%`,
//     method: "GET",
//   };

//   $.ajax(request)
// });
$("#delete").click(function (event) {
  console.log("clicked");
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      {
        arrdel.forEach((ele) => {
          let request = {
            url: `http://localhost:3000/api/users/${ele}`,
            method: "DELETE",
          };
          $.ajax(request).done(function (response) {});
        });
      }
      swal("Rows has been deleted!", {
        icon: "success",
      }).then(function () {
        location.reload();
      });
    } else {
      swal("Everything is safe!");
    }
  });
});
// $('input[name="id"]').change(function () {
//   console.log("Hello");
// });
// $("input[name='id']").each(function () {
//   console.log(this.value + ":" + this.checked);
// });
$("#statusSearch").change(function () {
  var search = new Object();
  search.first = $("#statusSearch").find(":selected").text().toString();
  var request = {
    url: `http://localhost:3000/api/users/search/sta`,
    method: "GET",
    data: search,
  };
  $.ajax(request).done(function (response) {
    document.getElementById("tbody").innerHTML = "";
    // console.log(response.data)
    response.data.forEach((ele, idx) => {
      document.getElementById("tbody").innerHTML +=document.getElementById(
        "tbody"
      ).innerHTML = `<tr class="row">  <td >
              <input class="myCheckbox" id="${
                idx + 1
              }" name="id" type="checkbox" value="${ele.id}" />
              </td> <td class="test"> ${idx + 1} </td> <td id="name-${
        idx + 1
      }">${ele.Name}</td> <td id="email-${idx + 1}">${
        ele.Email
      } </td> <td id="gender-${idx + 1}">${ele.Gender} </td> <td id="status-${
        idx + 1
      }">${ele.Status}</td> <td>    
         <a href="/update-user?id=${
           ele.id
         }" class="btn border-shadow update">         <span class="text-gradent"><i class="fas fa-pencil-alt"></i></span>     </a>     <a class="btn border-shadow delete" data-id=${
        ele.id
      }>         <span class="text-gradent"><i class="fas fa-times"></i></span>     </a> </td> </tr>`;
    });
  });
});
// $(".myCheckbox").prop("checked", true).change(function(){
//   console.log("clicked")
// })
$("tbody").on("change", "input[class='myCheckbox']", function () {
  if (this.checked) {
    if (!arr.includes(this.id)) {
      arr.push(this.id);
      arrdel.push(this.value);
    }
  }
});
$("#AddColumn").click(function () {
  console.log($("#AddColumninp").val());
    var add = new Object();
    add.first = $("#AddColumninp").val();
  // var data = $("#AddColumninp").val();
    var request = {
    url: `http://localhost:3000/api/users/addclm`,
    method: "GET",
    data: add
  };
  $.ajax(request).done(function (response) {
    console.log(response)
  })


$(document).ready(function () {
  // Executes when the HTML document is loaded and the DOM is ready
  alert("Document is ready");
});
    // console.log(
    //   $("#AddColumn").find(":selected").text().toString().includes("Input")
    // );
});

// function searchdata(self){
// var val=String(self.value).toLowerCase();
// var table=document.getElementById('mytable')
// var altr=table.getElementsByTagName('tr')

// if(val!=''){
//   for (var r = 1; r < altr.length; r++) {
//     var row = altr[r];
//     var alltd = row.getElementsByTagName("td");
//     var value = alltd[2].innerText;
//     // console.log(value);

//     if (String(value).toLowerCase().indexOf(val) == -1) {
//       row.style.display = "none";
//     }else{
//       row.style.display = "";
//     }
//   }
// }else{
//     for (var r = 1; r < altr.length; r++) {
//       var row = altr[r];
//         row.style.display = "";
      
//     }

// }

// }



