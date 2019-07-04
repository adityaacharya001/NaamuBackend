import express from 'express';
import Form from '../models/form';
import mongoose  from 'mongoose';

const router = express.Router();

router.get('/', (req, res, next)=>{
    Form.find()
        .select('_id creator approver approverDepartment creatorDepartment case status')
        .exec()
        .then(docs=>{
            const response= {
                formsCount: docs.length,
                forms: docs.map(doc=>{
                    return {
                        _id: doc._id,
                        creator: doc.creator,
                        approver: doc.approver,
                        creatorDepartment: doc.creatorDepartment,
                        approverDepartment: doc.approverDepartment,
                        case: doc.case,
                        status: doc.status,
                        request: {
                            type: "GET",
                            url: "http://localhost:4000/forms/"+doc._id
                        }
                    }
                })
            }
            console.log("forms", response);
            res.status(200).json({
                message:"formsList",
                forms: response
            })
        }).catch(error=>{
            console.log("error", error);
            res.status(500).json({
                message: "something went wrong",
                error: error
            })
        })
})

router.post('/', (req, res, next)=>{

    const form = new Form({
        _id: new mongoose.Types.ObjectId(),
        creator: req.body.creator,
        approver: req.body.approver,
        creatorDepartment: req.body.creatorDepartment,
        approverDepartment: req.body.approverDepartment,
        case: req.body.case,
        status: req.body.status
    })

    form.save()
    .then(result=>{
        console.log("form posted successfully", result);
        res.status(200).json({
            message: "form posted successfully",
            createdForm: {
                _id: result._id,
                creator: result.creator,
                approver: result.approver,
                creatorDepartment: result.creatorDepartment,
                approverDepartment: result.approverDepartment,
                case: result.case,
                status: result.status,
                request: {
                    type: 'GET',
                    url: "http://localhost:4000/forms/"+result._id
                }

            }
        })
    }).catch(error=>{
        console.log("error", error);
        res.status(200).json({
            message: "form could not be posted",
            error: error
        })
    })
})

router.get('/:formId', (req, res, next)=>{
    const formId = req.params.formId;
    Form.findById(formId)
        .select('_id creator approver dapproverDepartment creatorDepartment case status')
    .exec()
    .then(doc=>{
        console.log("selected form", doc);
        res.status(200).json({
            message: "selected form with "+ formId,
            form: doc,
            BackToForms:{
                type: 'GET',
                url: "http://localhost:4000/forms/"
            }
        })

    }).catch(error=>{
        console.log("selected form not found with formId "+ formId);
        res.status(500).json({
            message: "selected form not found with formId "+ formId,
            error: error
        })
    })
    
})

router.patch('/:formId', (req, res, next) => {
    const formId = req.params.formId;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Form.update({ _id: formId }, { $set: updateOps })
    .then(result=>{
        console.log("form updated with formID "+ formId);
        res.status(200).json({
            message: "form updated with formID " + formId,
            request: {
                type: 'GET',
                url: "http://localhost:4000/forms/"+formId
            }
        })
    }).catch(error=>{
        console.log("form could bot be updated with formID " + formId)
        res.status(500).json({
            message: "form could bot be updated with formID " + formId,
            error: error 
        })
    })
})

router.delete('/:formId', (req, res, next) => {
    const formId = req.params.formId;
    Form.remove({_id: formId})
    .exec()
    .then(result=>{
        console.log("form deleted");
        res.status(200).json({
            message: "form deleted with formId "+ formId,
            request: {
                type: 'GET',
                url: "http://localhost:4000/forms/"
            }
        })
    })
    .catch(error=>{
        console.log("form could not be deleted");
        res.status(500).json({
            message: "form could not be deleted with formId " + formId,
            error: error
        })

    })
    
})

export default router;
