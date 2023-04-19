const express = require("express");
const routes = require("./routes/packages");
const { supabase } = require("./config/SupabaseClient");
const schedule = require('node-schedule');
const axios = require("axios");

const schedulerCallback = async () => {
  const { data, error } = await supabase.from("npm-modules").select();
  data.forEach(async (ele) => {
    const { data: newData } = await axios.get(
      `https://registry.npmjs.org/${ele?.name}`
    );
    const newCurrentVersion = newData["dist-tags"]?.latest;
    if (newCurrentVersion !== ele?.current_version) {
      const { data, error } = await supabase
        .from("npm-modules")
        .update({
          versions: newData?.versions,
          current_version: newData["dist-tags"]?.latest,
          readme: newData?.readme,
          name: newData?.name,
          description: newData?.description,
          keywords: newData?.keywords,
          license: newData?.license,
          maintainers: newData?.maintainers,
          bugs: newData?.bugs,
        })
        .eq("id", ele?.id)
        .select();
    } else {
        console.log(newCurrentVersion, ele?.current_version)
        console.log("no update for this module")
    }
  });
};
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/", routes);

const job = schedule.scheduleJob('30 * * * * *', schedulerCallback);

app.listen(8000, () => console.log("listening at 8000"));
