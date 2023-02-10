// import dbRoutes from "./db/routes/routes";

// export default (app) => {
//   app.use("/db", dbRoutes);
// };


// import xovisRoutes from "./xovis/routes/routes";
import dbRoutes from "./db/routes/routes";
// import apiRoutes from "./api/routes/routes";
// import cronRoutes from "./schedules/routes/routes";
// import reportRoutes from "./statistics/routes/routes";

export default (app) => {
  // app.use("/xovis", xovisRoutes);
  // app.use("/api", apiRoutes);
  app.use("/db", dbRoutes);
  // app.use("/cron", cronRoutes);
  // app.use("/statistics", reportRoutes);
};
