import express from 'express';

const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "handling get request at /forms"
    })
})

router.post('/', (req, res, next)=>{
    const form = {
        creator : req.body.creator,
        approver: req.body.approver,
        department: req.body.department,
        case: req.body.case,
        status: req.body.status 
    }

    res.status(200).json({
        message: "New form Posted",
        form: form
    })
})

router.get('/:formId', (req, res, next)=>{
    const formId = req.params.formId;
    res.status(200).json({
        message: "handling get request at /forms/formId",
        formId: formId
    })
})

router.patch('/:formId', (req, res, next) => {
    const formId = req.params.formId;
    res.status(200).json({
        message: "handling patch request at /forms/formId",
        formId: formId
    })
})

router.delete('/:formId', (req, res, next) => {
    const formId = req.params.formId;
    res.status(200).json({
        message: "handling delete request at /forms/formId",
        formId: formId
    })
})

export default router;
