import express from 'express';
import Credential from '../models/credential';

const router = express.Router();

router.get('/', (req, res, next)=>{
      Credential.find()
      .select('username department _id')
      .then(docs=>{
          const users = {
              usersCount : docs.length,
              users : docs.map(doc=>{
                  return{
                      userId: doc._id,
                      username: doc.username,
                      department: doc.department
                  }
              })
          }
          console.log("List of users with their department", users);
          res.status(200).json({
              message: "List of users with their department",
              usersList: users
          })
      })
      .catch(error=>{
          console.log("users cannot be found")
          res.status.apply(500).json({
              message: "users cannot be found",
              error: error
          })
      })
})

router.get('/:department', (req, res, next)=>{
    const department = req.params.department;
    Credential.find({department: department})
    .select('department username')
    .then(docs=>{
        const users = {
            usersCount: docs.length,
            users : docs.map(doc=>{
                return doc.username
            })
        }
        console.log("list of users is ", users);
        res.status(200).json({
            message: "List of users with department "+ department,
            usersList: users
        })
    })
    .catch(error=>{
        console.log("could not retrieve anyone with department " + department);
        res.status(500).json({
            message: "could not retrieve anyone with department "+ department,
            error: error
        })
    })
})

router.delete('/:userId', (req, res, next)=>{
    const userId = req.params.userId;

    Credential.remove({_id: userId})
    .exec()
    .then(result=>{
        console.log("user removed with userId "+ userId);
        res.status(200).json({
            message: "user removed successfully with userId "+ userId
        })
    })
    .catch(error=>{
        console.log("user could not be removed with userId "+ userId);
        res.status(500).json({
            message: "user could not be removed with userId " + userId,
            error: error
        })
    })
})

export default router;