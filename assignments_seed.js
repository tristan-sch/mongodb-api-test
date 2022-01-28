//requiering express and initializing the app:
const app = require("express")();
const mongoose = require("mongoose");
const recoAssignments = require("./schemas/assignments");
const fetch = require("node-fetch");
//let resultData;
let saveCounter = 0;

//it might be a good idea to create an async function to wait for mongoose to connect before you start using the collection:
const insertData = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tristan:UcWtV4r9IljVDaCW@cluster0.tdpag.mongodb.net/newTest?retryWrites=true&w=majority"
    );
    console.log("mongodb connection success");
  } catch (error) {
    console.log(error);
  }
  const url = "https://tskoli-intranet-api-alpha.vercel.app/api/v1/gallery";
  try {
    const response = await fetch(url);
    const json = await response.json();
    //resultData = [...json]; //there is no need to copy the array and store it in a global variable unless you intend to cache it for later

    for (let i = saveCounter; i < json.length; i++) {
      if (
        json[i].reviews &&
        json[i].reviews.filter((review) => review.vote === "recommend").length
      ) {
        let assignments = new recoAssignments({
          author: json[i].sender.name,
          title: json[i].assignment.project.Title,
          description: json[i].assignment.project.Description,
          comment: json[i].comment,
          url: json[i].url,
          //you probably want to use json[i].something since you are probably trying to get a certain property out of it
          //using map wihtin a for loop is doing the same thing twice, so it will loop two times through the json array (AKA resultData)
        });

        assignments.update(() => {
          console.log("saved" + assignments);

          saveCounter++;

          if (saveCounter === json.length) {
            mongoose
              .disconnect()
              .then(() =>
                console.log("saved succesfully and mongodb disconnected")
              )
              .catch((error) => console.log(error));
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

insertData();
