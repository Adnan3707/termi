console.log("******** Two Diamensional Array *********");
{
    let arr = [
        ['adnan','azaan','misbha','sadaf'],
        ['delhi','pune','sopore','india']
    ]
    console.log(arr[1][3]);
    
}
// Join
{
let arr = ['adnan','azaan','misbha','sadaf']
console.log(arr.join())
let jn =arr.join('   ')
console.log(arr.join(' '))
console.log(jn)
console.log('arr to string',arr.toString())
// changing / replacting using assignment operator
arr[2]='Nidha';
console.log(arr)
arr.unshift('farooq')
console.log(arr)
arr.shift();
console.log(arr)
arr.pop();
console.log(arr)
}
console.log('******** splice ***********');
// Splice Array.splice( index, remove_count, item_list )
{
 var Pokemon = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Caterpie"];
 Pokemon.splice(-2)
 console.log(Pokemon)
  var Pokemon2 = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Caterpie"];
 Pokemon.splice(1);
 console.log(Pokemon);
  var Pokemon3 = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Caterpie"];
  Pokemon3.splice(2,2)
  console.log(Pokemon3)
  console.log('*********** Adding using splice *****')
  var Pokemon4 = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Caterpie"];
  Pokemon4.splice(2,0,'Junaid')
  console.log(Pokemon4)
}
{
      let Pokemon5 = [
        "adnan",
        "azaan",
        "yasmeen",
        "farooq",
        "ali dar",
      ];
      let pokimonCopy = Pokemon5.splice(0, 4);
      console.log(
        " ***** Splice is Destructive Function --> hatana new array",
        pokimonCopy
      );
      Pokemon5.splice(4,1);
      console.log('********* Shamil yaa hatana *********')
      console.log(' **** Splice is Destructive Function  --> haatan ',Pokemon5)
}
console.log('***** Splice &  Shift  Show *********  ')
{
let f =['akram','masee','md.aslam','arif']
let a = f.shift();
console.log(a)
function Splice(val){
    return val.splice(0,1)
}
let m = Splice(f)
console.log(m)
console.log(f)

}
console.log('**************** splice ********');
{
    let arr = ['a','b','c','d','e','f'];
    console.log(arr.slice(1,3)) // Includes 1 , excludes 3
    console.log(arr)
    let arr2 =['q','w','3','4','5','y','g']
    console.log(arr2.slice(2,5))
}
console.log('****************** slice *******')
{
  let arr=[1,2,3,4,5,6,7,8];
  let newarr = arr.slice(1,3)
  console.log(newarr)
  function inp(val){
    return val.slice()
  }
  console.log(inp([1,2,3]))
}
console.log('************ Split *********')
{
  let name = 'adnan Farooq Peer From Sopore jammu and Kashmir'
  let spl = name.split(' ',3)
  console.log(spl)
  {
    console.log("******** to check if palindrome ******** ");
    let p = 'abcba'
    function ispal(val){
      return val === val.split('').reverse().join('')
    }
    console.log(ispal(p))
    }
  }
console.log('************* Sort *************');
{
 let arr = [1,2,3,4,5,6,5,4,1,2,5,4,6,2,1,5,4,2,5,1,4,5,2,1,4,5,2,111,222,152222,4];
 arr.sort(function (a,b){
    return a-b
 })
 console.log(arr)
console.log(arr.reverse())
}
console.log('********** map ****')
{
    let arr = [1,2,3,4,5,6,7]
    let newarr = arr.map(ele =>`${ele} is a number` )
    console.log(newarr)
    const carsWithPrice = [
      { brand: "Porsche", price: 100000 },
      { brand: "Audi", price: 80000 },
    ];
   const carsWithTax = carsWithPrice.map(carsobj => {
        return {
            ...carsobj,priceWithTax : carsobj.price * 2
        }
    })
    console.log(carsWithTax);
}
console.log('******* Filter ******')
{
 let cars = [
   { brand: "Porsche", price: 100000 },
   { brand: "Audi", price: 80000 },
   { brand: "Suziki", price: 800005 },
   { brand: "BMW", price: 8000 },
];
 let expensive = cars.filter((obj) => obj.price > 80000);
  console.log(expensive)
}
console.log('******* reduce Method ***')
{
 let arr =  [13, 65, 29, 81, 47]
 arr.forEach((val,ind)=>{
    console.log(`arr value is :- ${val}  and index is :- ${ind} `)
 });
 let redu = arr.reduce((acc,curVal)=>acc+curVal,0);
 console.log(redu)
let arr1 = [[1], 2, 3, 4];
console.log(arr1.reduce((acc, val) => console.log(val, acc), []));

let arrflat = [[5,6],[8,2],[54,56],[78,54]]

let norarr = arrflat.reduce((acc,val)=>acc.concat(val),[])
console.log(norarr)
}
console.log('******* foreach*****');
{
 let arr = [13, 65, 29, 81, 47]
 arr.forEach((val,ind)=>{
    console.log(`arr value is :- ${val}  and index is :- ${ind} `)
 })
}
console.log('***** Find ******')
{
 let arr = [13, 65, 29, 81, 47];
 let find = arr.find(ele=>ele>13)
 console.log(find)
}
console.log('****** every ********')
{
 const cars = [
   { brand: "Porsche", price: 100000, builtIn: 2018 },
   { brand: "Audi", price: 80000, builtIn: 2019 },
   { brand: "Toyota", price: 30000, builtIn: 2019 },
 ];
 console.log(cars.every(obj=>obj.builtIn >= 2018))
}
console.log('********** Array Interview Questions ****')
{

console.log('******* Copy array using slice method ****')
let arr = [1,2,3,4,5,6,7,8,9]

function cpyarr(val){
  return val.slice()
}
let copy =cpyarr(arr)
console.log('copied array',copy)
console.log("******* Copy array using forloop method ****");
{
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let arrcpy =[]
  for(let i =0 ; i< arr.length;i++){
   arrcpy[i]=arr[i]
  }
  console.log(arrcpy)
}
}
console.log('***** Empty an array using using splice ****')
{
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  arr.splice(0,arr.length);
  console.log(arr)
 let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 function emptyarr(arr){
  while(arr.length > 0 ){
    arr.pop()
  }
 }
 emptyarr(arr1);
 console.log(arr1)
}
console.log('******** Check if it  an array *******')
{
 function checkArr(arr){
  if(Object.prototype.toString.call(arr) === '[object Array]')
  {
 console.log('It is an array')
  }else{
    console.log('It is NOT array')
  }
 }
 let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 let arrt = 'Adnan '
 checkArr(arrt)
}
console.log('******** Check Index of  ****** ')
{
  let arr= ['a','b','c','d','e','f',]
  console.log(arr.indexOf('f'))
}
console.log('******* splice and slice ***')
{
  let arr = ['rohaan','ali','jagharati','varsha','ali dar','basit untoo']
  let sli = arr.slice(2,4)
  console.log(sli)
  let arr2 = ['roohan','arslan','ibhari bhat','jp','untoo']
  let spli = arr2.splice(0,4)
  console.log(spli)
  console.log(arr2)
}

console.log('********* Conver To Upper case using map');
{
  let arr =[{name:"íbharim bhat"},{name:'jee soor'},{name:'ali dar'},{name:'adnan'}]
  function upper(arr){
    return arr.map((obj) =>{
        obj.name =obj.name.toUpperCase()
        return obj
        } );
  }
  console.log(upper(arr))
}
console.log('********** to sum using reduce ******')
{
 let exp = [{ price: 4055 }, { price: 4058 }, { price: 545 }];
 function expense(arr){
  return arr.reduce(function(acc,val){
    return acc+val.price
  },0)
}
console.log('total expense :- ',expense(exp))
}
console.log('***** filter****')
{
  let arr = [
    { name: "adnan", place: "sopore" },
    { name: "Ibharim Bhat", place: "sopore" },
    { name: "Roohan", place: "sopore" },
    { name: "adnan zargar", place: "baramulla" },
    { name: "jee", place: "baramulla" },
    { name: "Untoo", place: "sopore" },
  ];
  function filter(val){
    return val.filter(obj=> obj.place === 'sopore')
  }
  console.log(filter(arr))
}


console.log('**** Job *******')
{
    let arr = [
        [ 'Username; Identifier;First name;Last name' ],
        [ 'booker12;9012;Rachel;Booker' ],
        [ 'grey07;2070;Laura;Grey' ],
        [ 'johnson81;4081;Craig;Johnson' ],
        [ 'jenkins46;9346;Mary;Jenkins' ],
        [ 'smith79;5079;Jamie;Smith' ],
        []
      ]
      let arr1 =[
        [ 'testone', 'one', 'two', 'three' ],
        [ 'testtwo', 'T', 'N', 'S' ],
        [ 'testthree', 'TT', 'NN', 'SS' ]
      ]
      let arr3 = [
        [ 'testone', 'one', 'two', 'three' ],
        [ 'testtwo', 'T', 'N', 'S' ],
        [ 'testthree', 'TT', 'NN', 'SS' ]
      ]
      console.log(arr3[2][0])  
      // console.log(arr3[0].slice(1).join(','))
      for(let i = 0 ; i<arr1.length;i++){
        // console.log(arr[i][0])
      //   // console.log(arr[i][0])
      //   let n;1
      //   let val;
      //   // console.log(arr[i][0].split(';').shift())  
      //   // console.log(arr[i][0].split(';').slice(1).join(','))
      //   console.log(arr1[i][0])  
      //   console.log(arr1[i][0].slice(1).join(','))
      // console.log('dprname',arr1[i][0])  
      // console.log('dpr value',arr1[i].slice(1).join(','))
      }
    //   console.log(arr[0][0].split(';').slice(1).join(','))
    //   console.log(arr[0][0].split(';').shift())
}