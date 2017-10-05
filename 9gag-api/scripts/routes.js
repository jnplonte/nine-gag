function setup(app, functions) {
  app.get('/api/post', functions.post.allPost);
  app.get('/api/post/:id', functions.post.getPost);

  app.put('/api/post/:id', functions.post.putPost);
}

exports.setup = setup;
