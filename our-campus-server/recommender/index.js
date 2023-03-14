import ger from "ger";

const esm = new ger.MemESM();
const recommend = new ger.GER(esm);

const recommendationSystem = async (users, posts) => {
  const data = [];
  const usernameVsIdMapper = new Object();
  const idVsUsernameMapper = new Object();
  users.forEach((user) => {
    // idVsUsernameMapper[user._id] = user.username;
    // usernameVsIdMapper[user.username] = user._id;

    user.skills.forEach((skill) => {
      const convertedData = {
        namespace: "college",
        thing: user._id,
        action: "skills",
        person: skill,
        expires_at: "2050-06-06",
      };
      data.push(convertedData);
    });

    user.following.forEach((follow) => {
      //   const convertedData = {
      //     namespace: "college",
      //     person: user._id,
      //     action: "follow",
      //     thing: follow,
      //     expires_at: "2050-06-06",
      //   };
      //   data.push(convertedData);
      //   user.requested.forEach((request) => {
      //     const convertedData = {
      //       namespace: "college",
      //       person: user._id,
      //       action: "request",
      //       thing: request,
      //       expires_at: "2050-06-06",
      //     };
      //     data.push(convertedData);
      //   });
    });
  });

  // posts.forEach((post) => {
  //   post.likes.forEach((like) => {
  //     const convertedData = {
  //       namespace: "college",
  //       person: like,
  //       action: "likes",
  //       thing: post._id,
  //       expires_at: "2050-06-06",
  //     };
  //     data.push(convertedData);
  //   });
  //   post.comments.forEach((comment) => {
  //     if (comment.name !== post.username) {
  //       const convertedData = {
  //         namespace: "college",
  //         person: comment.user,
  //         action: "comment",
  //         thing: post._id,
  //         expires_at: "2050-06-06",
  //       };
  //       data.push(convertedData);
  //     }
  //   });
  // });

  // console.log(data);
  return await recommenderInitialization(data, "college");
};

/*
  data = [
    {
      namespace: 'movies',
      person: 'bob',
      action: 'likes',
      thing: 'xmen',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'movies',
      person: 'bob',
      action: 'likes',
      thing: 'avengers',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'movies',
      person: 'alice',
      action: 'likes',
      thing: 'xmen',
      expires_at: '2020-06-06'
    },
  ]
*/
const recommenderInitialization = async (data, namespace) => {
  await recommend.initialize_namespace(namespace);
  // await console.log(recommend.esm);
  await recommend.events([...data]);
  // await console.log(recommend.esm);
  return await recommend;
};

/*
const val = {
  suggestions: [
    {
      thing: "xmen",
      weight: 1.5,
      last_actioned_at: "2015-07-09T14:33:37+01:00",
      last_expires_at: "2020-06-06T01:00:00+01:00",
      people: ["alice", "bob"],
    },
    {
      thing: "avengers",
      weight: 0.5,
      last_actioned_at: "2015-07-09T14:33:37+01:00",
      last_expires_at: "2020-06-06T01:00:00+01:00",
      people: ["bob"],
    },
  ],
  neighbourhood: {
    bob: 0.5,
    alice: 1,
  },
  confidence: 0.0007147696406599602,
};
*/

const recommendationForUser = async (recommender, user) => {
  // console.log("After");
  // console.log(recommender);

  const suggestionsOnPeople = await recommender.recommendations_for_thing(
    "college",
    user._id,
    { actions: { skills: 1 } }
  );

  // const suggestionsOnPeople = await recommender.recommendations_for_person(
  //   "college",
  //   user._id,
  //   { actions: { request: 1, follow: 4 } }
  // );

  // const suggestionsOnPosts = await recommender.recommendations_for_person(
  //   "college",
  //   user._id,
  //   { actions: { likes: 2, comment: 4 } }
  // );
  // console.log(
  //   "Recommender User : " +
  //     (suggestionsOnPeople.neighbourhood
  //       ? Object.keys(suggestionsOnPeople.neighbourhood)
  //       : suggestionsOnPeople.neighbourhood)
  // );
  // console.log(
  //   "Suggestions for " +
  //     user.username +
  //     " : " +
  //     JSON.stringify(suggestionsOnPeople, null, 2)
  // );

  const suggestedusers = [];
  suggestionsOnPeople.recommendations.forEach((sug) => {
    suggestedusers.push(sug.thing);
  });

  // console.log(user._id + " : " + suggestedusers);

  return suggestedusers.length > 5
    ? suggestedusers.splice(0, 5)
    : suggestedusers;
};

export { recommendationForUser, recommendationSystem };
