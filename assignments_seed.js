//requiering express and initializing the app:
const app = require("express")();
const mongoose = require("mongoose");
const recoAssignments = require("./schemas/assignments");
const fetch = require("node-fetch");
let resultData;
let saveCounter = 0;
mongoose
  .connect(
    "mongodb+srv://tristan:UcWtV4r9IljVDaCW@cluster0.tdpag.mongodb.net/newTest?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongodb connection success"))
  .catch((error) => console.log(error));
const url = ["https://tskoli-intranet-api-alpha.vercel.app/api/v1/gallery"];

url.map(async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    resultData = [...json];
    for (let i = 0; i < resultData.length; i++) {
      let assignments = new recoAssignments({
        unique_id: resultData.map((item) => {
          return item;
        }),
      });
      assignments.save(() => {
        console.log("saved" + assignments);

        saveCounter++;

        if (saveCounter === resultData.length) {
          mongoose
            .disconnect()
            .then(() =>
              console.log("saved succesfully and mongodb disconnected")
            )
            .catch((error) => console.log(error));
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});
