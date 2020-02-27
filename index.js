let itemArray = [];
let userArray=[];
let userEmailArray=[];
let userPasswordArray = [];
let itemPriceArray = [];

let selectedCategory = "not selected";
//let selectedBrand="not selected";
let currentUser;
const newAccountBtn = document.getElementById("newaccount");
const toLoginbtn=document.getElementById("toLoginPage");
const loginBtn=document.getElementById("loginBtn");
var divUserlist = document.getElementById("divUserList");


// define a constructor to create Consignment item objects
var ItemObject = function (pCategory,pBrand, pName, pCondition,pPrice, pOwner) {
  this.ID = itemArray.length + 1;
  this.Category = pCategory;  // select list for category
  this.Brand=pBrand;
  this.Name = pName;
  this.Condition = pCondition;
  this.Price = pPrice;
  this.Owner = pOwner;
}

var UserObject= function(pFirstName,pLastName,pEmail,pPassword){
  this.FirstName=pFirstName;
  this.LastName=pLastName;
  this.Email=pEmail;
  this.Password=pPassword;

}
userArray.push(new UserObject("Amy","Lee","xixi@email.com","xxxx"));
userArray.push(new UserObject("John","Throne","jt@email.com","xxxx"));



/* itemArray.push(new ItemObject("Jewery", "Tiffany","Green jade brackelet","excellent", 49000,"Amy, Lee"));
itemArray.push(new ItemObject("Furniture", "Other","table","good", 100,"John, Lee"));
itemArray.push(new ItemObject("Jewery", "Cartier","Diamond Ring","excellent", 5000,"Kate, Throne")); */




newAccountBtn.addEventListener("click",createNeWAccount);

toLoginbtn.addEventListener("click", function () {
 
  document.location.href = "index.html#loginPage";
});

loginBtn.addEventListener("click", Login);
 
 


 document.addEventListener("DOMContentLoaded", function () {


  document.getElementById("buttonAdd").addEventListener("click", function () {
  
   
    if (document.getElementById("loginEmail").value.toString().length==0){
      document.getElementById("buttonAdd").disabled==true;
      alert("Please Login First!");
 }
else
   {  
      alert("You just add one item!  "+ document.getElementById("loginEmail").value +" ! You may add more or check Inventory page ")
      itemArray.push(new ItemObject( document.getElementById("select-category").value,
                                   document.getElementById("brand").value,
                                   document.getElementById("name").value,
                                   document.getElementById("condition").value,
                                   document.getElementById("price").value,
                                   document.getElementById("loginEmail").value));
   }
});


  $(document).bind("change", "#select-category", function (event, ui) {
    selectedCategory = $("#select-category").val();
  });
 ;

  document.getElementById("buttonSortBrand").addEventListener("click", function () {
    itemArray.sort(dynamicSort("Brand"));
    createItemList();
    document.location.href = "index.html#ListAll";
  });

  document.getElementById("buttonSortCategory").addEventListener("click", function () {
   itemArray.sort(dynamicSort("Category"));
  
    createItemList();
    document.location.href = "index.html#ListAll";
  });
      // sortPrice function is not working yet. Will fix later
     /* document.getElementById("buttonSortPrice").addEventListener("click", function () {
         itemArray.sort(dynamicSort("Price)"));
         createItemList();
         document.location.href = "index.html#ListAll";
     }); */
     
$(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
 // document.getElementById("IDparmHere").innerHTML = "";
  createItemList();
});
  
     document.getElementById("buttonClear").addEventListener("click", function () {
         document.getElementById("select-category").value = "Select a Category";
         document.getElementById("brand").value = "Select a Brand";
    document.getElementById("name").value = "";
    document.getElementById("condition").value = "";
      document.getElementById("price").value = "";
      document.getElementById("owner").value = document.getElementById("loginEmail").value;
  });
  
$(document).on("pagebeforeshow", "#Consign", function (event) {   // have to use jQuery 
  document.getElementById("select-category").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("name").value = "";
    document.getElementById("condition").value = "";
    document.getElementById("price").value = "";

    document.getElementById("owner").value = document.getElementById("loginEmail").value;
  });

$(document).on("pagebeforeshow", "#page3", function (event) {   // have to use jQuery 
  let localID =  document.getElementById("IDparmHere").innerHTML;
  document.getElementById("oneCategory").innerHTML = "Category: " + itemArray[localID - 1].Category;
  document.getElementById("oneBrand").innerHTML = "Brand : " + itemArray[localID-1].Brand;
  document.getElementById("oneName").innerHTML = "Description:  " + itemArray[localID - 1].Name;
  document.getElementById("oneCondition").innerHTML = "Condition: " + itemArray[localID - 1].Condition;
  document.getElementById("onePrice").innerHTML = "Estimated Price: $ " + itemArray[localID - 1].Price;
  document.getElementById("oneOwner").innerHTML = "Owner: " + itemArray[localID - 1].Owner;
 });

});

function createNeWAccount()
{
   const vFirstName= document.getElementById("firstName").value;
  const vLastName=document.getElementById("lastName").value;
  const  vEmail=document.getElementById("email").value;
  const  vPassword= document.getElementById("password").value; 

  let newUser=new UserObject(vFirstName,vLastName,vEmail,vPassword);
  userArray.push(newUser);
  //console.log(newUser);
  currentUser = newUser;
 // console.log (userArray);
};

function Login(){
  const currentEmail=document.getElementById("loginEmail").value;
  const currentPassword=document.getElementById("loginPassword").value;

  let currentUserIndex;

  for (let i=0;i<userArray.length;i++)
  {   
   userEmailArray[i]=userArray[i].Email;
   userPasswordArray[i]=userArray[i].Password;
  }
   currentUserIndex=userEmailArray.indexOf(currentEmail);
  if(currentUserIndex>=0){
    if (currentPassword==userPasswordArray[currentUserIndex])
    {
      prompt("Welcome "+userArray[currentUserIndex].FirstName+" ! Now you can go Consignment Page!");
    }
    else{
      prompt("Your email and password are not matching");
    }
  }
  else
  {
    prompt("This user doesn't exit");
  }
  }
 

function createItemList()
{
  // clear prior data
  var divItemlist = document.getElementById("divItemList");
  while (divItemList.firstChild) {    // remove any old data so don't get duplicates
  divItemList.removeChild(divItemList.firstChild);
  };

  var ul = document.createElement('ul');  
  console.log(itemArray);
  itemArray.forEach(function (element,) {   // use handy array forEach method
    var li = document.createElement('li');
      li.innerHTML = "<a data-transition='pop' class='oneItem' data-parm=" + element.ID + "  href='#page3'>Click to Review Details </a> " + element.ID + ":     "
          + element.Category+"     |" + element.Name + "     |" 
    +"  $"+element.Price;
  
    ul.appendChild(li);
  });
  divItemList.appendChild(ul)

    //set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
    var classname = document.getElementsByClassName("oneItem");
    Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            //do something here with parameter on  pickbet page
            document.getElementById("IDparmHere").innerHTML = parm;
            document.location.href = "index.html#page3";
        });
    });
   
};
  

/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  }
}