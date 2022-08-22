const express = require("express");
const app = express();

const connectDb = require("./config/connectDb");
require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT || 6000;
console.log(process.env.PORT);
app.listen(port, (err) => {
  err
    ? console.log("server is failed")
    : console.log(`server is running on ${port}`);
});
connectDb();

//create and save a person
var Person = require("./model/person");

var createAndSavePerson = function () {
  var john = new Person({
    name: "John",
    age: "20",
    favoriteFoods: ["Apple", "Banana"],
  });
//   console.log("test");

  john.save(function (err, data) {
    if (err) {
      console.log("Failed");
    } else {
      console.log("Saved person Successful");
      console.log(data);
    }
  });
};
//exec
createAndSavePerson()
//create people
var arrayOfPeople = [
  new Person({
    name: "Sarra",
    age: "20",
    favoriteFoods: ["chocolat", "pizza"],
  }),
  new Person({ name: "titi", age: "70", favoriteFoods: ["chicken"] }),
  new Person({ name: "mimi", age: "4", favoriteFoods: ["banana"] }),
];
var createManyPeople = function (arrayOfPeople) {
  Person.create(arrayOfPeople)
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.error(err);
    });
};
//exec
  createManyPeople(arrayOfPeople);
//find people by name

// Person.find({name:"Sarra"}).then(doc=>{console.log(doc)})
// .catch(err=>{console.error(err)})

var findPeopleByName = function (personName) {
  Person.find({ name: personName })
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.error(err);
    });
};
//exec
findPeopleByName("mimi")

//find people by favorite foods

// Person.findOne({favoriteFoods : {$all : ['Apple','Banana']}}).then(doc=>{console.log(doc)})
// .catch(err=>{console.error(err)})

var findOneByFood = function (food) {
  Person.findOne({ favoriteFoods: { $all: [food] } })
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.error(err);
    });
};
//exec
 findOneByFood('Apple','Banana')

//find people by id

// Person.findById('630363e85baa16bfcac03945').then(doc=>{console.log(doc)})
//  .catch(err=>{console.error(err)})

var findPersonById = function (personId) {
  Person.findById(personId)
    .then((doc) => {
      console.log(doc.toJSON());
    })
    .catch((err) => {
      console.error(err);
    });
};
//exec
 findPersonById('630363e85baa16bfcac03945')
//find people by name and modify age and update her favorite food by adding in favoriteFoods table
//mimi 4 banana
// Person.findOne({ name: "mimi" })
//   .then((data) => {
//     data.age = 40;
//     data.favoriteFoods.push("pizza");
//     data.save((err, updated) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(updated);
//         console('mimi updated')
//       }
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

//find people by id and add hamburger as favorite fooods
var findEditThenSave = function (personId) {
  var foodToAdd = "hamburger";

  Person.findById(personId)
    .then((data) => {
      data.favoriteFoods.push(foodToAdd);
      data.save((err, updated) => {
        if (err) {
          console.log(err);
          console.log('failed to update')
        } else {
          console.log(updated);
          console.log('successfully updated')
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
//exec 
  findEditThenSave('6303641dd21e689607a03b33')

//find person by name and update her name

//new:true return the modified document rather than original
//  Person.findOneAndUpdate({name:'mimi'},{name:'sisi'},{new:true},
//  (err,data)=>{
//     if (err) {
//         console.log('failed to update')
//     } else {
//         console.log('successfully updated')
//         console.log(data)
//     }
//  }
//  )

//find person by id and set her age to 20
var findAndUpdate = function (personName) {
  var ageToSet = 20;

  Person.findOneAndUpdate({ name: personName },{ age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) {
        console.log("failed to update");
      } else {
        console.log("successfully updated");
        console.log(data);
      }
    }
  );
};
findAndUpdate("sisi")

//find person by name and delete them

// Person.findOneAndRemove({name:"John"} ,(err, data) => {
//           if (err) {
//             console.log("failed to delete");
//           } else {
//             console.log("successfully deleted");
//             console.log(data);
//           }
//         })

//find person by id and delete them

// Person.findByIdAndRemove('63036d0a42cab4135806e029' ,(err, data) => {
//     if (err) {
//       console.log("failed to delete");
//     } else {
//         console.log(data);
//       console.log("successfully deleted");

//     }
//   })

  var removeById = function(personId, done) {

    Person.findByIdAndRemove(personId,
        (err, data) => {
            if (err) {
              console.log("failed to delete");
            } else {
                console.log(data);
              console.log("successfully deleted");

            }
          })
  };
  removeById("63036c80623cb6ea1396f1ad")

// Person.remove({age:{$lte:18}},(err, data) => {
//                 if (err) {
//                   console.log("failed to delete");
//                 } else {
//                     console.log(data);
//                   console.log("successfully deleted");

//                 }
//               })


// var mary = new Person({
//     name: "mary",
//     age: "20",
//     favoriteFoods: ["kiwi", "mlewi"],
//   });
//   mary.save()

//delete all the people whose name is 'mary
var nameToRemove="mary"
var removePeople=function (nameToRemove) {
        Person.remove({name:nameToRemove},
            (err, data) => {
                if (err) {
                  console.log("failed to delete");
                } else {
                    console.log(data);
                  console.log("successfully deleted");
    
                }
              })
}
removePeople(nameToRemove)


//people that like mlewi 
// Person.find({favoriteFoods:{$all:['mlewi']}})
// .sort({age:'asc'})
// .limit(2)
// .select('name age')
// .exec( (err, data) => {
//     if (err) {
//       console.log("failed to find");
//     } else {
//         console.log(data);
//     }
//   })


//find all the people like burrito
var foodToSearch="burrito"
var findPeopleLikeBurrito=function(foodToSearch) {
   Person.find({favoriteFoods:{$all:[foodToSearch]}})
    .sort({name:'asc'})
    .limit(2)
    .select('-age')
    .exec( (err, data) => {
            if (err) {
              console.log("failed to find");
            } else {
                console.log(data);
            }
          })
}

findPeopleLikeBurrito(foodToSearch)