## Sample Query

### Get user info
  * GET `/api/user`

**Success Status Code:** `200`

app.get('api/user', (req, res) => {
  let userId = {"userId": req.body["userId"]}
  User.find(userId, (err, users) => {
    if(err) {
      console.log(err, `server get user info err`);
      res.status(400);
      res.end();
    } else {
      console.log(`server get user info success`);
      res.status(200);
      res.send(null, users);
      res.end;
    }
  })
})

**Returns:** JSON

```json
      {
        "_id" : ObjectId("5f4e9ea407211a6264e8d77a"),
        "userId" : 8,
        "userName" : "Haven",
        "profileImg" : "https://fecmoreplacestostayimages.s3-us-west-1.amazonaws.com/image/elegance.jpg"
      }
```