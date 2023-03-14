import knn from "knn-recommender";
// import { CF } from "node-cf";

const indexToArray = (skills) => {
  const skillsArray = new Array(20).fill(0);
  if (skills && skills.length > 0) {
    skills.forEach((skill) => {
      skillsArray[skill] = 1;
    });
  }
  return skillsArray;
};

const initialize = (users) => {
  const activities = [];
  const labels = [];
  users.forEach((user) => {
    activities.push(indexToArray(user.skills));
    labels.push(user._id);
  });

  const knnClassifier = knn(activities, labels);

  // const cf = new CF({ k: 3, similarity: "pearson" });
  // cf.train(activities);

  return { knnClassifier, cf };
};

function recommendActivities(knnClassifier, cf, user) {
  console.log("\nUsername : " + user.username);
  // KNN Recommendation
  const knnRecommendations = knnClassifier.classify(
    indexToArray(user.skills),
    3
  );
  console.log("KNN Recommendations:", knnRecommendations);

  // Collaborative Filtering Recommendation
  // const cfRecommendations = cf.recommend(indexToArray(user.skills), 2);
  // console.log("Collaborative Filtering Recommendations:", cfRecommendations);

  // // Hybrid Recommendation
  // const hybridRecommendations = knnRecommendations.concat(cfRecommendations);
  // const uniqueRecommendations = Array.from(new Set(hybridRecommendations));
  // console.log("Hybrid Recommendations:", uniqueRecommendations);
}

export { initialize, recommendActivities };
