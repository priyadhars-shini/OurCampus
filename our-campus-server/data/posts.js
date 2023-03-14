const posts = [
  {
    username: "19EUCB045",
    image: "/images/1.jpg",
    dp: "/images/1.jpg",
    caption: "My First Post",
  },
  {
    username: "19EUCB045",
    image: "/images/2.jpg",
    dp: "/images/1.jpg",
    caption: "My Second Post",
  },
  {
    username: "19EUCB045",
    image: "/images/3.jpg",
    dp: "/images/1.jpg",
    caption: "My Third Post",
  },
  {
    username: "19EUCB011",
    dp: "/images/4.jpg",
    image: "/images/4.jpg",
    caption: "My Third Post",
  },
  {
    username: "19EUCB011",
    image: "/images/5.jpg",
    dp: "/images/4.jpg",
    caption: "My Third Post",
  },
  {
    _id: { $oid: "61c19e5cdb06621401cadd51" },
    username: "19eucb026",
    image: "/uploads/image-1640078906251.jpg",
    dp: "/uploads/image-1640078524467.jpg",
    caption: "Krishna",
    likes: [
      { $oid: "61c19c00db06621401cadca0" },
      { $oid: "61c1614b87eb002c7445301d" },
    ],
    comments: [
      {
        name: "19eucb026",
        user: { $oid: "61c19c00db06621401cadca0" },
        comment: "Awesome",
        _id: { $oid: "61c19e78db06621401cadd5c" },
      },
      {
        name: "19eucb045",
        user: { $oid: "61c1614b87eb002c7445301d" },
        comment: "PC podave illaye 😂",
        _id: { $oid: "61c19fdcdb06621401caddc9" },
      },
    ],
    createdAt: { $date: { $numberLong: "1640078940508" } },
    updatedAt: { $date: { $numberLong: "1640079324318" } },
    __v: { $numberInt: "4" },
    numComments: { $numberInt: "2" },
  },
];

export default posts;
