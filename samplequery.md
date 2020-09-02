## Sample Query

### Get user info
  * GET `/api/user`

**Success Status Code:** `200`

app.get('api/user', (req, res) => {
  let userId = {"userId": req.body["userId"]}
  User.find(userId, (err, users) => {
    if(err) {
      callback(err)
      console.log(`server get user info err`)
    } else {
      callback(null, users)
      console.log(`server get user info success`)
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