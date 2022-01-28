//requiering express and initializing the app:
const app = require("express")();
//requiering the cors middleware:
const cors = require("cors");

const mongoose = require("mongoose");
const SkateSpot = require("./SkateSpot");
const fetch = require("node-fetch");
// const db = require("./config/keys").mongoURI;
const PORT = 5001; //we will use port 5001
let resultData;
let saveCounter = 0;
mongoose
  .connect(
    "mongodb+srv://tristan:UcWtV4r9IljVDaCW@cluster0.tdpag.mongodb.net/newTest?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongodb connection success"))
  .catch((error) => console.log(error));
const url = ["https://data.cityofnewyork.us/resource/pvvr-75zk.json"];

url.map(async (url) => {
  try {
    const response = await fetch(url);

    const json = await response.json();
    resultData = [...json];
    for (let i = 0; i < resultData.length; i++) {
      let skateSpot = new SkateSpot({
        name: resultData[i].name,
        description: resultData[i].status,
        location: {
          coordinates: [
            resultData[i].polygon.coordinates[0][0][1],
            resultData[i].polygon.coordinates[0][0][0],
          ],
        },
      });
      skateSpot.save(() => {
        console.log("saved" + skateSpot);

        saveCounter++;

        if (saveCounter === resultData.length) {
          mongoose
            .disconnect()
            .then(() =>
              console.log("saved succesfully and mongodb   disconnected")
            )
            .catch((error) => console.log(error));
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  //listen to the port we chose above
  //print to the console that the server is listening
  console.log("listening to port: " + PORT);
});
