//Button-Status

// const { prefixAdmin } = require("../../../config/system");

// ko cho dung require

// const { listIndexes } = require("../../../model/product.model");

// lay theo thuoc tinh thi dung []
const listButtonStatus = document.querySelectorAll("[button-status]");
// lay ra nut ma ng dung click vao

if(listButtonStatus.length>0){
    // tao ra duong dan moi tu duong dan cu
    // widow.location.href la duong dan cu 
    let url = new URL(window.location.href);

    listButtonStatus.forEach(button=>{
        button.addEventListener("click"  , ()=>{
        
           const status = button.getAttribute("button-status");
         if(status){
             // phan sau dau ? trenn url la searchParams 
           // xet lai url them tuoc tinh sau dau ?
             url.searchParams.set("status" , status);
           //xet lai duong link
           // urll ko phai la duong link ma la 1 object tu console.log ra xem
          
        }else{
        url.searchParams.delete("status");

       } 
        window.location.href  = url.href;
        
        });
    });
   //||"" la de neu ko lay dc thi cho bang ""
 // viet ham them class active duoi day vi cai foreach nos chi xet cac th thoi chu no ko chay lan kuot
    const statusCurrent = url.searchParams.get("status")|| "";
    // lay ra status cua url 
    
    // cach truy van ra 1 phan tu co dieu kien
    // chu y  phai viet "${statusCurrent}" vi neu th no trong thi thannh"" lucs nay co the truy van dc
    const buttonCurrent = document.querySelector(`[button-status = "${statusCurrent}"]`);
    buttonCurrent.classList.add("active");

}

//END- BUTTON-status

// tim kiem co nhieu chuc nang
const formSearch = document.querySelector("[form-search]");
// neu formsearch co value
if(formSearch){
  let url = new URL(window.location.href);

  // bat su kien submit
  formSearch.addEventListener("submit" , (event)=>{
    // ngan chan form submit ngay lap tuc de lay gia triitren url
    event.preventDefault();
    
    const keyword = event.target.elements.keyword.value;
    
    console.log(keyword);
    if(keyword){
      url.searchParams.set("keyword" , keyword);

    }else{
      url.searchParams.delete("keyword");

    }
    window.location.href = url.href;



  });

}


// phan trang 

 const item = document.querySelectorAll("[button-pagination]");
const url = new URL (window.location.href);
if( item.length >0){
  item.forEach(button =>{

    button.addEventListener("click" , ()=>{
    

      
      const page = button.getAttribute("button-pagination");
      
    url.searchParams.set("page" , page);     

   window.location.href = url.href;
});


  });


  // nghi them
// const Current = url.searchParams.get("page");
// const buttonCurrent = document.querySelector(`[button-pagination = "${Current}"]`);
// console.log(buttonCurrent);

// buttonCurrent.classList.add("active");
// console.log(buttonCurrent);
// item.forEach(button =>{
//   console.log(button);
// });
 }

 // Button-change-status

 const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");

  
 if(listButtonChangeStatus.length>0){
  listButtonChangeStatus.forEach(button =>{
   button.addEventListener("click" , ()=>{
    const link  = button.getAttribute("link");
     fetch(link , {
      // din h nghia phg thuc path la de cap nhat 1 ban ghi nhu ben BE
      // ko them thi mac dinh la GET
      method : "PATCH",
      // cho dung quy ttrinh (POSTMAN)
      headers:{
        "Content-Type" : "application/json",

      },
        
     })
      // chiyen json thanh js
      .then(res=>res.json())
      .then(data =>{
        if( data.code==200){
          window.location.reload();
        }
      })


   });
  });


 }

 // Checlk item
 // chu y trong querySelector ben ngoia la "" roi thi ben trong p la ''

 const inputCheckAll = document.querySelector("input[name ='checkAll']");
 const inputCheckItem  = document.querySelectorAll("input[name = 'checkItem']");
 if( inputCheckAll){

  
   // bat su kien nut checkall
  inputCheckAll.addEventListener("click" , ()=>{
    // thuoc tinh checked cua checkbox xe tich chua
      inputCheckItem.forEach(input =>{
      input.checked= inputCheckAll.checked;
    })
  } );
  // bat su  kien nut checkitem

var count = 0;
  inputCheckItem.forEach(input =>{
  
    input.addEventListener("click" , ()=>{
    
      
     
// truy van ra nhung o input da check
      const inputCheckItemChecked = document.querySelectorAll("input[name ='checkItem']:checked")
      // if( input.checked == true){
      //   ++count;
      // }else{
      //   --count;
      // }
      // if( count == inputCheckItem.length){

      //   inputCheckAll.checked = true;
      // }else{
      //  inputCheckAll.checked = false;

      // }


      if(inputCheckItemChecked.length == inputCheckItem.length ){
        inputCheckAll.checked = true;
       }else{
        inputCheckAll.checked = false;

       }
      

    })
   

  })

 

}

// changeMulti
const boxAction = document.querySelector("[box-action]");

if(boxAction){
  const button = boxAction.querySelector("button");
  
  const ids = [];
  
  
  button.addEventListener("click" , ()=>{
   
    // nen khai bao bien trong ham xay ra de no chay dc  neu khai bao bien b=nay ben ngoai ko chay dc
    const select = boxAction.querySelector("select"); 

    const status =select.value;
    const listInputCheckItemChecked = document.querySelectorAll("input[name ='checkItem']:checked");
    
    listInputCheckItemChecked.forEach(input=>{
    if(input.checked){
     
      ids.push(input.id);
    }
    }); 
    if(ids.length >0 && status!= ""){
      // lay ra dc ids va status de gui cho backend

    // console.log(ids);
    // console.log(status);
    // tao 1 data chua status va ids
    const data = {
      status :status,
      ids  : ids
    };
    const link = boxAction.getAttribute("box-action");
    console.log(link);
    fetch(link,
      {
        // obj nay de gui cho be
        method : "PATCH",
        // cho dung quy ttrinh (POSTMAN)
        headers:{
          "Content-Type" : "application/json",
  
        },
        // gui mang data len cho BE
        body:JSON.stringify(data),

    })
      .then(res =>res.json())
      .then(data =>{
        if(data.code == 200) {
          // chu y phai tu duy khi BE nhan data xong cap nhat data r thi phai tra
          // ve cho FE roi reload() lai trang de hien thi trang thia moi

          window.location.reload();
        }
      })
    }else{
      alert("vui long chon hanh dong va cac item can thay doi");
    }
 
  });
  
  
}
// delete tam thoi
const listButtonDelete = document.querySelectorAll("[button-delete]");
console.log(listButtonDelete);
if(listButtonDelete.length>0){
  listButtonDelete.forEach(button =>{
    button.addEventListener("click" , ()=>{
        const id = button.getAttribute("button-delete");
        console.log(id);
       const data = {
        id :id,
        deleted: true
       }

        fetch(`/admin222/products/delete` , {
            method:"PATCH"
            ,
            headers:{
              "Content-Type" : "application/json",
      
            },
            // gui mang data len cho BE
            body:JSON.stringify(data),
    
          
        })
        .then(res =>res.json())
        .then(data =>{
          if( data.code==200){
            window.location.reload();

          }
        })

    });

  });
}

// xoa vinh vien 

// const listButtonDelete = document.querySelectorAll("[button-delete]");

  // if(listButtonDelete.length >0){
  //   listButtonDelete.forEach(button =>{
  //     button.addEventListener("click" , ()=>{
  //         // gui cho FE cai id 
  //         const id = button.getAttribute("button-delete");
  //         console.log(id);
  //         // gui len cho BE id
        

  //         fetch("/admin222/products/foreverDelete" , 
  //           {method:"DELETE" , 
  //             headers : {
  //               "Content-Type" : "application/json"


  //             } , 
  //             body:JSON.stringify({
  //               id:id
  //             }),



  //           })
  //         .then(res =>res.json())
  //           .then(data =>{
  //             if( data.code == 200){{
  //               window.location.reload();
  //             }}
  //           })

  //     })

  //   })
  // }

// Change-Position
const listPositionChange = document.querySelectorAll("input[name ='position']");

// console.log(listPositionChange);
if(listPositionChange.length>0){
  listPositionChange.forEach(input=>{

    input.addEventListener("change" ,()=>{
      // console.log(input);
     const id = input.getAttribute("id");
      //console.log(id);
      const position = parseInt(input.value);
     const link = input.getAttribute("link");
     console.log(link);
     fetch(link, {
      method:"PATCH",
      headers:{
        "Content-Type" : "application/json",

      },
      // gui mang data len cho BE
      body:JSON.stringify({
        position:position,
      }),
     })
    
        .then(req =>req.json())
        .then(data =>{
          if( data.code == 200){
            window.location.reload();
          }
        })

    });

  });

}

// trang thung rc
// tao chuc nang khoiiphuc
const buttonRecover =  document.querySelectorAll("[button-recover]");
console.log(buttonRecover);
if(buttonRecover.length>0){
  buttonRecover.forEach(button =>{
    button.addEventListener("click" , ()=>{
      const link = button.getAttribute("link");
      const id = button.getAttribute("button-recover");
      fetch(link , {
        method  :"PATCH" , 
        headers:{
          "Content-Type" :"application/json"
        }, 
        body:JSON.stringify({
          id :id
        })
      })
      .then(res =>res.json())
      .then(data =>{
        if( data.code == 200){
          window.location.reload();
        }
      })


    })
  })

}

// show-alert
const ShowAlert = document.querySelector("[show-alert]");

if( ShowAlert){
  let time = parseInt(ShowAlert.getAttribute("show-alert"));

  setTimeout(()=>{


ShowAlert.classList.add("hidden");

  } , time)
  
}
// shoe deleted alert
const ShowDeleted = document.querySelector("[show-deleted]");


if( ShowDeleted){
  let time = parseInt(ShowDeleted.getAttribute("show-deleted"))||3000;

  setTimeout(()=>{
    ShowDeleted.classList.add("hidden");

  } ,time )
}
//end show alter

// upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
  const uploadImageInnput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
  
  
  uploadImageInnput.addEventListener("change" ,()=>{
    const file = uploadImageInnput.files[0];
    
        if (file) {
        //   URL.createObjectURL(file) laf tamj tth
        
          uploadImagePreview.src = URL.createObjectURL(file)
        }
  }) 
    
  
  
}

// end upload image

// preview image





// end preview image

